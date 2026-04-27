export interface Founder {
  name: string;
  role: string;
  initials: string;
  bio: string;
}

// TODO(user): replace placeholder bios with the real one-liners.
export const team: Founder[] = [
  {
    name: "Lucas Zheng",
    role: "Head of Media & Advertisement",
    initials: "LZ",
    bio: "Shapes how Zenith shows up in the world.",
  },
  {
    name: "Jonah Berkowitz",
    role: "Chief Financial Officer",
    initials: "JB",
    bio: "Crunches the numbers.",
  },
  {
    name: "Ron Zharzhavsky",
    role: "Project Manager",
    initials: "RZ",
    bio: "Translates the Gantt chart into weekly milestones the team can act on.",
  },
];
