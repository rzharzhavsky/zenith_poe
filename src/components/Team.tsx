import { motion } from "framer-motion";
import Section from "./Section";
import { team } from "../data/team";

export default function Team() {
  return (
    <Section
      id="team"
      eyebrow="The Team"
      title="Three founders. One plan."
      lead="A media lead, a CFO, and a project manager."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line/60 border border-line/60">
        {team.map((f, i) => (
          <motion.article
            key={f.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            className="bg-bg p-10 md:p-12 hover:bg-surface/60 transition-colors duration-500 flex flex-col"
          >
            <div
              className="flex items-center justify-center w-24 h-24 rounded-full border border-champagne/50 text-champagne font-display text-3xl tracking-tightest mb-12"
              aria-hidden
            >
              {f.initials}
            </div>
            <p className="text-champagne text-[10px] uppercase tracking-smallcaps mb-3">
              {f.role}
            </p>
            <h3 className="font-display font-light text-3xl md:text-4xl tracking-tightest leading-[1.1]">
              {f.name}
            </h3>
            <p className="text-inkSoft/75 leading-[1.7] mt-6 text-[15px]">
              {f.bio}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
