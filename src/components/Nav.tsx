import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "../hooks/useActiveSection";

const links = [
  { id: "hero", label: "Zenith" },
  { id: "why", label: "Why" },
  { id: "team", label: "Team" },
  { id: "phases", label: "Phases" },
  { id: "location", label: "Location" },
  { id: "products", label: "Products" },
  { id: "timeline", label: "Timeline" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(links.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/85 backdrop-blur-md border-b border-line/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-content px-6 md:px-12 h-20 flex items-center justify-between">
        <a
          href="#hero"
          className="font-display font-light text-2xl tracking-tightest text-ink"
          aria-label="Zenith home"
        >
          Zenith
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.slice(1, -1).map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative text-[11px] uppercase tracking-smallcaps transition-colors ${
                  isActive ? "text-champagne" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 right-0 h-px bg-champagne"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center text-[11px] uppercase tracking-smallcaps px-5 py-2.5 border border-champagne/50 text-champagne hover:bg-champagne hover:text-bg transition-colors"
        >
          Contact
        </a>

        <button
          className="md:hidden inline-flex items-center justify-center p-2 text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-20 bg-bg/96 backdrop-blur-xl"
          >
            <nav className="px-8 py-12 flex flex-col gap-7">
              {links.slice(1).map((link) => {
                const isActive = active === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={`font-display font-light text-4xl tracking-tightest ${
                      isActive ? "text-champagne" : "text-ink/80"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
