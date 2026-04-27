import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Section from "./Section";
import {
  tasks,
  phaseColors,
  phaseOrder,
  PROJECT_START,
  PROJECT_END,
} from "../data/tasks";
import type { Phase, Task } from "../data/tasks";
import { theme } from "../theme";

interface Props {
  highlightedPhase: Phase | null;
  onClearHighlight: () => void;
}

const HEADER_H = 68;
const PHASE_ROW_H = 54;
const TASK_ROW_H = 32;
const TIMELINE_MIN_W = 880;

const MONTHS = [
  { label: "January", short: "JAN", date: new Date(2025, 0, 1) },
  { label: "February", short: "FEB", date: new Date(2025, 1, 1) },
  { label: "March", short: "MAR", date: new Date(2025, 2, 1) },
  { label: "April", short: "APR", date: new Date(2025, 3, 1) },
  { label: "May", short: "MAY", date: new Date(2025, 4, 1) },
  { label: "June", short: "JUN", date: new Date(2025, 5, 1) },
  { label: "July", short: "JUL", date: new Date(2025, 6, 1) },
];

type Row =
  | { kind: "phase"; phase: Phase; start: Date | null; end: Date | null; count: number }
  | { kind: "task"; task: Task };

export default function GanttChart({ highlightedPhase, onClearHighlight }: Props) {
  const rows = useMemo<Row[]>(() => {
    const out: Row[] = [];
    for (const p of phaseOrder) {
      const phaseTasks = tasks.filter((t) => t.phase === p);
      const dated = phaseTasks.filter((t) => t.hasDates);
      const minStart = dated.length
        ? new Date(Math.min(...dated.map((t) => t.start!.getTime())))
        : null;
      const maxEnd = dated.length
        ? new Date(Math.max(...dated.map((t) => t.end!.getTime())))
        : null;
      out.push({ kind: "phase", phase: p, start: minStart, end: maxEnd, count: phaseTasks.length });
      for (const task of phaseTasks) out.push({ kind: "task", task });
    }
    return out;
  }, []);

  const positions = useMemo(() => {
    let y = HEADER_H;
    return rows.map((r) => {
      const h = r.kind === "phase" ? PHASE_ROW_H : TASK_ROW_H;
      const top = y;
      y += h;
      return { top, height: h };
    });
  }, [rows]);

  // For phase swimlane backgrounds: compute y-span including the phase header + its tasks
  const phaseSpans = useMemo(() => {
    const result: { phase: Phase; top: number; bottom: number }[] = [];
    let current: Phase | null = null;
    let currentTop = HEADER_H;
    rows.forEach((r, i) => {
      if (r.kind === "phase") {
        if (current !== null) {
          result.push({ phase: current, top: currentTop, bottom: positions[i].top });
        }
        current = r.phase;
        currentTop = positions[i].top;
      }
      if (i === rows.length - 1 && current !== null) {
        result.push({
          phase: current,
          top: currentTop,
          bottom: positions[i].top + positions[i].height,
        });
      }
    });
    return result;
  }, [rows, positions]);

  const totalH = positions.length
    ? positions[positions.length - 1].top + positions[positions.length - 1].height
    : HEADER_H;

  const totalDays =
    (PROJECT_END.getTime() - PROJECT_START.getTime()) / 86400000 + 1;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [timelineW, setTimelineW] = useState(TIMELINE_MIN_W);
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => setTimelineW(Math.max(el.clientWidth, TIMELINE_MIN_W));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const xFromDate = (date: Date) => {
    const days = (date.getTime() - PROJECT_START.getTime()) / 86400000;
    return (days / totalDays) * timelineW;
  };

  // Mondays between project start and end, for weekly gridlines
  const weeks = useMemo(() => {
    const arr: Date[] = [];
    const d = new Date(PROJECT_START);
    while (d.getDay() !== 1) d.setDate(d.getDate() + 1);
    while (d <= PROJECT_END) {
      arr.push(new Date(d));
      d.setDate(d.getDate() + 7);
    }
    return arr;
  }, []);

  const [hover, setHover] = useState<{ task: Task; x: number; y: number } | null>(null);
  const [hasHighlighted, setHasHighlighted] = useState(false);
  useEffect(() => {
    if (highlightedPhase) setHasHighlighted(true);
  }, [highlightedPhase]);

  const today = new Date();
  const todayInRange = today >= PROJECT_START && today <= PROJECT_END;
  const todayX = todayInRange ? xFromDate(today) : 0;

  const gradId = (p: Phase) => `bar-${p.replace(/[^a-zA-Z]/g, "")}`;

  return (
    <Section
      id="timeline"
      eyebrow="The Timeline"
      title="Jan 2 → Jun 8, 2025."
      lead="Every task plotted against real calendar dates. Hover a bar for start, end, and duration. Tap a phase header above to highlight its lane."
    >
      <Legend
        highlightedPhase={highlightedPhase}
        onClear={onClearHighlight}
        canClear={hasHighlighted}
      />

      <div className="border border-line/60 bg-surface/40 overflow-hidden">
        <div className="flex">
          {/* Label column */}
          <div className="flex-shrink-0 border-r border-line/60 w-[170px] sm:w-[240px] md:w-[300px]">
            <div
              style={{ height: HEADER_H }}
              className="border-b border-line/60 px-4 md:px-6 flex items-end pb-3"
            >
              <span className="text-[10px] uppercase tracking-smallcaps text-muted">
                {tasks.length} Tasks · 4 Phases
              </span>
            </div>
            {rows.map((r, i) => (
              <div
                key={i}
                style={{ height: positions[i].height }}
                className={`flex items-center px-4 md:px-6 ${
                  r.kind === "phase" ? "border-y border-line/60" : ""
                }`}
              >
                {r.kind === "phase" ? (
                  <div className="flex items-center gap-3 min-w-0 w-full">
                    <span
                      className="w-[3px] h-6 rounded-sm"
                      style={{ background: phaseColors[r.phase] }}
                    />
                    <div className="min-w-0 flex-1">
                      <div
                        className="text-[10px] uppercase tracking-smallcaps"
                        style={{ color: phaseColors[r.phase] }}
                      >
                        Phase {String(phaseOrder.indexOf(r.phase) + 1).padStart(2, "0")}
                      </div>
                      <div
                        className="font-display font-light text-base md:text-lg tracking-tightest truncate"
                        style={{
                          color:
                            highlightedPhase && highlightedPhase !== r.phase
                              ? theme.mutedSoft
                              : theme.ink,
                        }}
                      >
                        {r.phase}
                      </div>
                    </div>
                    <span
                      className="text-[10px] tabular-nums text-muted flex-shrink-0"
                      title={`${r.count} tasks`}
                    >
                      {r.count}
                    </span>
                  </div>
                ) : (
                  <span
                    className="text-[11px] md:text-[12.5px] truncate font-light"
                    style={{
                      color:
                        highlightedPhase && highlightedPhase !== r.task.phase
                          ? theme.mutedSoft
                          : theme.inkSoft,
                    }}
                    title={r.task.name}
                  >
                    {r.task.name}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Timeline column */}
          <div ref={scrollRef} className="flex-1 overflow-x-auto thin-scroll">
            <div className="relative" style={{ width: timelineW, height: totalH }}>
              <svg width={timelineW} height={totalH} className="block">
                <defs>
                  {phaseOrder.map((p) => (
                    <linearGradient
                      key={p}
                      id={gradId(p)}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={phaseColors[p]} stopOpacity={0.95} />
                      <stop offset="100%" stopColor={phaseColors[p]} stopOpacity={0.7} />
                    </linearGradient>
                  ))}
                </defs>

                {/* Phase swimlane tints */}
                {phaseSpans.map((s) => (
                  <rect
                    key={s.phase}
                    x={0}
                    y={s.top}
                    width={timelineW}
                    height={s.bottom - s.top}
                    fill={phaseColors[s.phase]}
                    opacity={
                      highlightedPhase
                        ? highlightedPhase === s.phase
                          ? 0.05
                          : 0.015
                        : 0.025
                    }
                  />
                ))}

                {/* Weekly gridlines */}
                {weeks.map((d, i) => {
                  const x = xFromDate(d);
                  return (
                    <line
                      key={i}
                      x1={x}
                      y1={HEADER_H}
                      x2={x}
                      y2={totalH}
                      stroke={theme.line}
                      strokeWidth={1}
                      opacity={0.35}
                    />
                  );
                })}

                {/* Month boundary lines + month labels in header */}
                {MONTHS.map((m) => {
                  const x = xFromDate(m.date);
                  if (x < -10 || x > timelineW + 10) return null;
                  const inRange = x >= 0 && x <= timelineW;
                  return (
                    <g key={m.short}>
                      {inRange && (
                        <line
                          x1={x}
                          y1={HEADER_H - 10}
                          x2={x}
                          y2={totalH}
                          stroke={theme.line}
                          strokeWidth={1}
                          opacity={0.9}
                        />
                      )}
                      {inRange && (
                        <>
                          <text
                            x={x + 12}
                            y={HEADER_H - 36}
                            fill={theme.inkSoft}
                            fontSize={11}
                            letterSpacing="3"
                            fontFamily="Inter, sans-serif"
                            fontWeight={500}
                          >
                            {m.short}
                          </text>
                          <text
                            x={x + 12}
                            y={HEADER_H - 20}
                            fill={theme.mutedSoft}
                            fontSize={9}
                            letterSpacing="1.5"
                            fontFamily="Inter, sans-serif"
                          >
                            2025
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}

                {/* Header divider */}
                <line
                  x1={0}
                  y1={HEADER_H - 1}
                  x2={timelineW}
                  y2={HEADER_H - 1}
                  stroke={theme.line}
                  strokeWidth={1}
                />

                {/* Row separators (only above phase rows for visual grouping) */}
                {rows.map((r, i) =>
                  r.kind === "phase" && i > 0 ? (
                    <line
                      key={`sep-${i}`}
                      x1={0}
                      y1={positions[i].top}
                      x2={timelineW}
                      y2={positions[i].top}
                      stroke={theme.line}
                      strokeWidth={1}
                      opacity={0.7}
                    />
                  ) : null,
                )}

                {/* Bars */}
                {rows.map((r, i) => {
                  const phase = r.kind === "phase" ? r.phase : r.task.phase;
                  const color = phaseColors[phase];
                  const dim =
                    !!highlightedPhase && highlightedPhase !== phase;
                  const isHl =
                    !!highlightedPhase && highlightedPhase === phase;

                  if (r.kind === "phase") {
                    if (!r.start || !r.end) return null;
                    const x1 = xFromDate(r.start);
                    const x2 = xFromDate(new Date(r.end.getTime() + 86400000));
                    const bw = Math.max(x2 - x1, 3);
                    const y = positions[i].top + PHASE_ROW_H / 2;
                    const h = 10;
                    return (
                      <g key={i} opacity={dim ? 0.2 : 1}>
                        {/* Backing plate */}
                        <rect
                          x={x1}
                          y={y - h / 2}
                          width={bw}
                          height={h}
                          fill={color}
                          opacity={0.22}
                          rx={2}
                        />
                        {/* End caps */}
                        <rect x={x1 - 1} y={y - h / 2 - 5} width={3} height={h + 10} fill={color} />
                        <rect x={x2 - 2} y={y - h / 2 - 5} width={3} height={h + 10} fill={color} />
                        {/* Connector line */}
                        <line
                          x1={x1}
                          y1={y}
                          x2={x2}
                          y2={y}
                          stroke={color}
                          strokeWidth={1.25}
                          opacity={0.7}
                        />
                      </g>
                    );
                  }

                  // Task row — may have null dates (TBD)
                  const t = r.task;
                  const y = positions[i].top + TASK_ROW_H / 2;
                  if (!t.hasDates || !t.start || !t.end) {
                    // TBD chip placed near project start area
                    const cx = 8;
                    return (
                      <g key={i} opacity={dim ? 0.3 : 0.8}>
                        <rect
                          x={cx}
                          y={y - 9}
                          width={48}
                          height={18}
                          fill="transparent"
                          stroke={theme.mutedSoft}
                          strokeDasharray="3 3"
                          rx={2}
                        />
                        <text
                          x={cx + 24}
                          y={y + 3}
                          fill={theme.muted}
                          fontSize={9}
                          letterSpacing="2"
                          fontFamily="Inter, sans-serif"
                          textAnchor="middle"
                        >
                          TBD
                        </text>
                      </g>
                    );
                  }

                  const x1 = xFromDate(t.start);
                  const x2 = xFromDate(new Date(t.end.getTime() + 86400000));
                  const bw = Math.max(x2 - x1, 3);
                  const h = 16;
                  const showLabel = bw > 52;
                  return (
                    <g
                      key={i}
                      opacity={dim ? 0.22 : 1}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() =>
                        setHover({
                          task: t,
                          x: x1 + bw / 2,
                          y: y - h / 2,
                        })
                      }
                      onMouseLeave={() => setHover(null)}
                    >
                      <rect
                        x={x1}
                        y={y - h / 2}
                        width={bw}
                        height={h}
                        fill={`url(#${gradId(phase)})`}
                        rx={2.5}
                        style={{
                          filter: isHl
                            ? `drop-shadow(0 0 8px ${color})`
                            : `drop-shadow(0 2px 4px rgba(0,0,0,0.25))`,
                        }}
                      />
                      {/* subtle top highlight */}
                      <rect
                        x={x1 + 0.5}
                        y={y - h / 2 + 0.5}
                        width={bw - 1}
                        height={1}
                        fill="#ffffff"
                        opacity={0.35}
                        rx={2}
                      />
                      {showLabel && t.durationDays && (
                        <text
                          x={x1 + bw / 2}
                          y={y + 3}
                          fill={theme.bg}
                          fontSize={9.5}
                          letterSpacing="1"
                          fontWeight={600}
                          fontFamily="Inter, sans-serif"
                          textAnchor="middle"
                          style={{ pointerEvents: "none" }}
                        >
                          {t.durationDays}d
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Today line */}
                {todayInRange && (
                  <g>
                    <line
                      x1={todayX}
                      y1={HEADER_H - 10}
                      x2={todayX}
                      y2={totalH}
                      stroke={theme.ink}
                      strokeWidth={1}
                      strokeDasharray="3 3"
                      opacity={0.7}
                    />
                    <rect
                      x={todayX - 26}
                      y={HEADER_H - 20}
                      width={52}
                      height={14}
                      fill={theme.ink}
                    />
                    <text
                      x={todayX}
                      y={HEADER_H - 10}
                      fill={theme.bg}
                      fontSize={9}
                      letterSpacing="2"
                      textAnchor="middle"
                      fontFamily="Inter, sans-serif"
                      fontWeight={600}
                    >
                      TODAY
                    </text>
                  </g>
                )}
              </svg>

              {hover && <Tooltip hover={hover} timelineW={timelineW} />}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-smallcaps text-muted">
        <span>Each bar = 1 task · width = duration in calendar days</span>
        <span className="text-mutedSoft">·</span>
        <span>Numbers inside bars = working days</span>
        <span className="text-mutedSoft">·</span>
        <span>Hover for details</span>
      </div>
    </Section>
  );
}

function Legend({
  highlightedPhase,
  onClear,
  canClear,
}: {
  highlightedPhase: Phase | null;
  onClear: () => void;
  canClear: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-10">
      {phaseOrder.map((p) => {
        const isActive = highlightedPhase === p;
        const dim = highlightedPhase && !isActive;
        return (
          <div
            key={p}
            className="flex items-center gap-3 transition-opacity duration-200"
            style={{ opacity: dim ? 0.3 : 1 }}
          >
            <span
              className="inline-block w-4 h-1.5 rounded-[1px]"
              style={{ background: phaseColors[p] }}
            />
            <span
              className="text-[11px] uppercase tracking-smallcaps"
              style={{ color: isActive ? theme.ink : theme.muted }}
            >
              {p}
            </span>
          </div>
        );
      })}
      {canClear && highlightedPhase && (
        <button
          onClick={onClear}
          className="ml-auto text-[11px] uppercase tracking-smallcaps text-muted hover:text-ink transition-colors"
        >
          Clear highlight
        </button>
      )}
    </div>
  );
}

function Tooltip({
  hover,
  timelineW,
}: {
  hover: { task: Task; x: number; y: number };
  timelineW: number;
}) {
  const { task, x, y } = hover;
  const leftFlip = x > timelineW - 240;
  return (
    <div
      className="pointer-events-none absolute z-10 w-[230px] bg-elev border border-line/80 shadow-[0_14px_40px_rgba(0,0,0,0.55)]"
      style={{
        left: leftFlip ? x - 238 : x + 10,
        top: Math.max(y - 86, 4),
      }}
    >
      <div
        className="h-[3px] w-full"
        style={{ background: phaseColors[task.phase] }}
      />
      <div className="p-4">
        <div
          className="text-[10px] uppercase tracking-smallcaps mb-2"
          style={{ color: phaseColors[task.phase] }}
        >
          {task.phase}
        </div>
        <div className="font-display font-light text-[15px] tracking-tightest leading-snug text-ink">
          {task.name}
        </div>
        <div className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[10px] uppercase tracking-smallcaps">
          <span className="text-muted">Start</span>
          <span className="text-inkSoft normal-case tracking-normal">
            {task.start ? formatDate(task.start) : "—"}
          </span>
          <span className="text-muted">End</span>
          <span className="text-inkSoft normal-case tracking-normal">
            {task.end ? formatDate(task.end) : "—"}
          </span>
          <span className="text-muted">Duration</span>
          <span className="text-champagne normal-case tracking-normal">
            {task.durationDays
              ? `${task.durationDays} ${task.durationDays === 1 ? "day" : "days"}`
              : "TBD"}
          </span>
        </div>
      </div>
    </div>
  );
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
