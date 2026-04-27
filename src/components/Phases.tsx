import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Section from "./Section";
import { phases } from "../data/phases";
import type { Phase } from "../data/tasks";
import { phaseColors } from "../data/tasks";

interface Props {
  onFocusPhase: (phase: Phase) => void;
}

export default function Phases({ onFocusPhase }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = phases[activeIndex];
  const accent = phaseColors[active.id];

  return (
    <Section
      id="phases"
      eyebrow="The Four Phases"
      title="From paperwork to grand opening"
      lead="Each phase is a distinct column of the project plan. Tap one to see what it contains, or jump straight to its bars on the Gantt."
    >
      <div className="border border-line/60 bg-surface/50 overflow-hidden">
        {/* Tab row */}
        <div
          role="tablist"
          aria-label="Project phases"
          className="flex overflow-x-auto no-scrollbar border-b border-line/60"
        >
          {phases.map((p, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(i)}
                className="relative flex-1 min-w-[180px] text-left px-7 py-6 md:py-7 transition-colors hover:bg-elev/40"
              >
                <div
                  className="text-[10px] tracking-smallcaps uppercase"
                  style={{
                    color: isActive ? phaseColors[p.id] : "#5E6F90",
                  }}
                >
                  Phase {p.number}
                </div>
                <div
                  className="font-display font-light text-xl md:text-2xl tracking-tightest mt-2"
                  style={{ color: isActive ? "#EDF1F7" : "#8494B0" }}
                >
                  {p.title}
                </div>
                {isActive && (
                  <motion.span
                    layoutId="phase-underline"
                    className="absolute left-0 right-0 bottom-0 h-px"
                    style={{ background: phaseColors[p.id] }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative p-10 md:p-16 lg:p-20"
          >
            {/* Oversized ghost numeral */}
            <div
              className="absolute -top-4 md:-top-8 right-6 md:right-12 font-display font-light leading-none pointer-events-none select-none"
              style={{
                fontSize: "clamp(8rem, 22vw, 22rem)",
                color: accent,
                opacity: 0.09,
              }}
            >
              {active.number}
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
              <div className="md:col-span-5">
                <div
                  className="text-[10px] uppercase tracking-smallcaps mb-5"
                  style={{ color: accent }}
                >
                  Phase {active.number}
                </div>
                <h3 className="font-display font-light text-4xl md:text-5xl lg:text-6xl tracking-tightest leading-[1.02]">
                  {active.title}
                </h3>
                <p className="text-inkSoft/80 leading-[1.7] mt-8 max-w-md">
                  {active.summary}
                </p>
                <button
                  onClick={() => onFocusPhase(active.id)}
                  className="mt-12 inline-flex items-center gap-3 text-[11px] uppercase tracking-smallcaps py-4 px-6 border border-champagne/50 text-champagne hover:bg-champagne hover:text-bg transition-colors"
                >
                  See it on the Gantt
                  <ArrowUpRight size={14} />
                </button>
              </div>

              <ul className="md:col-span-6 md:col-start-7 flex flex-col">
                {active.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="flex items-baseline gap-6 py-4 md:py-5 border-b border-line/60 last:border-b-0"
                  >
                    <span
                      className="text-[10px] font-mono tracking-wider"
                      style={{ color: accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-inkSoft text-base md:text-lg font-light leading-snug">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
