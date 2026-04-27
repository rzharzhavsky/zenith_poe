import { useCallback, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import WhyZenith from "./components/WhyZenith";
import Team from "./components/Team";
import Phases from "./components/Phases";
import Location from "./components/Location";
import ProductLine from "./components/ProductLine";
import GanttChart from "./components/GanttChart";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import type { Phase } from "./data/tasks";

export default function App() {
  const [highlightedPhase, setHighlightedPhase] = useState<Phase | null>(null);

  const focusPhase = useCallback((phase: Phase) => {
    setHighlightedPhase(phase);
    const el = document.getElementById("timeline");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="bg-bg text-ink min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Hairline />
        <WhyZenith />
        <Hairline />
        <Team />
        <Hairline />
        <Phases onFocusPhase={focusPhase} />
        <Hairline />
        <Location />
        <Hairline />
        <ProductLine />
        <Hairline />
        <GanttChart
          highlightedPhase={highlightedPhase}
          onClearHighlight={() => setHighlightedPhase(null)}
        />
        <Hairline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Hairline() {
  return (
    <div className="mx-auto max-w-content px-6 md:px-12">
      <div className="hairline" />
    </div>
  );
}
