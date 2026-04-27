/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark restful blue palette
        bg: "#001933",       // restful blue
        surface: "#072847",  // raised surface (subtle)
        elev: "#0d3559",     // elevated card
        line: "#1a3d63",     // dividers / grid
        ink: "#EDF1F7",      // primary text
        inkSoft: "#C9D2E3",  // secondary text
        muted: "#8494B0",    // tertiary text
        mutedSoft: "#5E6F90",
        // Accents
        champagne: "#D4B87A",
        gold: "#D4B87A", // alias kept for existing references
        steel: "#6B8BB8",
        tobacco: "#6B8BB8", // alias (maps to steel blue in new palette)
        teal: "#7FA99A",
        sage: "#7FA99A",
        coral: "#D9856F",
        brick: "#D9856F",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.035em",
        smallcaps: "0.24em",
      },
      maxWidth: {
        content: "1320px",
      },
    },
  },
  plugins: [],
};
