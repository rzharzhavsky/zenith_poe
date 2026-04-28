import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  id: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
  full?: boolean;
}

export default function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = "",
  full = false,
}: Props) {
  return (
    <section
      id={id}
      className={`${
        full ? "" : "py-28 md:py-44"
      } mx-auto max-w-content px-6 md:px-12 ${className}`}
    >
      {(eyebrow || title || lead) && (
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16 md:mb-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
        >
          <div className="md:col-span-4 flex md:justify-start items-start">
            {eyebrow && (
              <span className="text-champagne text-[10px] uppercase tracking-smallcaps">
                {eyebrow}
              </span>
            )}
          </div>
          <div className="md:col-span-8 md:col-start-5">
            {title && (
              <h2 className="font-display font-light text-4xl md:text-6xl lg:text-[5rem] tracking-tightest leading-[1.02] text-ink max-w-3xl">
                {title}
              </h2>
            )}
            {lead && (
              <p className="mt-8 text-inkSoft/80 text-lg leading-relaxed max-w-2xl">
                {lead}
              </p>
            )}
          </div>
        </motion.header>
      )}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
