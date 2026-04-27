import plan from "../../implementation_plan.json";
import type { Phase } from "./tasks";

export interface PhaseInfo {
  id: Phase;
  number: string;
  title: string;
  summary: string;
  items: string[];
}

const meta: Record<Phase, { title: string; summary: string }> = {
  Planning: {
    title: "Planning",
    summary:
      "The foundation. Legal structure, capital, a signed lease, and every license that lets a barbershop open its doors in New York.",
  },
  Renovation: {
    title: "Renovation",
    summary:
      "The space takes shape. Interior design, build-out, electrical & plumbing, and the inspections that clear us to open.",
  },
  Execution: {
    title: "Execution",
    summary:
      "Staffing, stocking, and the in-house product line. By the end of this phase the chairs are filled and the shelves are stocked.",
  },
  "Marketing & Launch": {
    title: "Marketing & Launch",
    summary:
      "The unveil. Local outreach, influencer partnerships, a soft opening, then the grand opening itself.",
  },
};

export const phases: PhaseInfo[] = plan.phases.map((p, i) => ({
  id: p.name as Phase,
  number: String(i + 1).padStart(2, "0"),
  title: meta[p.name as Phase].title,
  summary: meta[p.name as Phase].summary,
  items: p.tasks.map((t) => t.name),
}));
