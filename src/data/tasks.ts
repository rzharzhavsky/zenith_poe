import plan from "../../implementation_plan.json";

export type Phase = "Planning" | "Renovation" | "Execution" | "Marketing & Launch";

export interface Task {
  id: string;
  name: string;
  phase: Phase;
  start: Date | null;
  end: Date | null;
  durationDays: number | null;
  hasDates: boolean;
}

function parseDate(s: string | null): Date | null {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export const tasks: Task[] = plan.phases.flatMap((p) =>
  p.tasks.map((t) => {
    const start = parseDate(t.start_date);
    const end = parseDate(t.end_date);
    return {
      id: t.id,
      name: t.name,
      phase: p.name as Phase,
      start,
      end,
      durationDays: t.duration_days,
      hasDates: !!(start && end),
    };
  }),
);

export const PROJECT_START = new Date(2025, 0, 2); // Jan 2, 2025
export const PROJECT_END = new Date(2025, 5, 8); // Jun 8, 2025

export const phaseColors: Record<Phase, string> = {
  Planning: "#D4B87A",          // champagne
  Renovation: "#6B8BB8",        // steel blue
  Execution: "#7FA99A",         // muted teal
  "Marketing & Launch": "#D9856F", // warm coral
};

export const phaseOrder: Phase[] = [
  "Planning",
  "Renovation",
  "Execution",
  "Marketing & Launch",
];
