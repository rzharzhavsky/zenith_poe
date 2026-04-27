import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden"
    >
      {/* Flat backdrop */}
      <div className="absolute inset-0 bg-bg" />

      {/* Thin accent rule down the right edge */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 right-8 md:right-12 w-px bg-champagne/35"
      />

      <div className="grain" aria-hidden />

      <div className="relative z-10 mx-auto max-w-content px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-9 md:col-start-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="w-10 h-px bg-champagne/70" />
            <span className="text-champagne text-[10px] uppercase tracking-smallcaps">
              A Salon Proposal · 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="font-display font-light text-[clamp(4.5rem,17vw,15rem)] leading-[0.88] tracking-tightest text-ink"
          >
            Zenith.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
            className="mt-10 md:mt-12 font-display italic text-2xl md:text-3xl lg:text-4xl text-inkSoft max-w-2xl leading-[1.2]"
          >
            A modern salon. Quality over anything.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
            className="mt-12 md:mt-16 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10"
          >
            <a
              href="#phases"
              className="inline-flex items-center justify-center px-7 py-4 bg-champagne text-bg text-[11px] uppercase tracking-smallcaps font-medium hover:bg-ink transition-colors duration-300"
            >
              See the Plan
            </a>
            <a
              href="#timeline"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-smallcaps text-inkSoft hover:text-champagne transition-colors"
            >
              <span className="w-6 h-px bg-champagne/60" />
              Jump to the Gantt
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 md:mt-24 text-muted text-[10px] uppercase tracking-smallcaps"
          >
            Berkowitz · Zheng · Zharzhavsky
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#why"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted hover:text-champagne transition-colors"
        aria-label="Scroll"
      >
        <span className="text-[10px] uppercase tracking-smallcaps">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
