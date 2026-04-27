import { FlaskConical, HeartHandshake, Scissors } from "lucide-react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import Section from "./Section";

interface Pillar {
  icon: LucideIcon;
  title: string;
  copy: string;
}

const pillars: Pillar[] = [
  {
    icon: Scissors,
    title: "High-Quality Hair Care",
    copy: "Precision cuts, classic finishes, and a chair you want to sit in for the hour it takes to do it right.",
  },
  {
    icon: FlaskConical,
    title: "Specially Formulated Products",
    copy: "Our own proprietary haircare line designed in the shop, tested with real dermatologists.",
  },
  {
    icon: HeartHandshake,
    title: "Extraordinary Customer Service",
    copy: "Hospitality is the product. We know what you want before you even walk in.",
  },
];

export default function WhyZenith() {
  return (
    <Section
      id="why"
      eyebrow="Why Zenith"
      title="Four things we refuse to get wrong."
      lead="Every decision: the chair, the shampoo, the room's temperature. If we don't like it, we cut it(pun intended)."
    >
      <ol className="divide-y divide-line/60 border-y border-line/60">
        {pillars.map((p, i) => (
          <motion.li
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 group"
          >
            <div className="md:col-span-1 flex items-start">
              <span className="font-display text-champagne text-xl">
                0{i + 1}
              </span>
            </div>
            <div className="md:col-span-1 flex items-start">
              <p.icon
                size={26}
                strokeWidth={1.1}
                className="text-champagne transition-transform duration-500 group-hover:-translate-y-1"
              />
            </div>
            <div className="md:col-span-5">
              <h3 className="font-display font-light text-2xl md:text-3xl lg:text-4xl tracking-tightest leading-[1.1]">
                {p.title}
              </h3>
            </div>
            <div className="md:col-span-5">
              <p className="text-inkSoft/80 leading-[1.7] text-[15px] md:text-base max-w-md">
                {p.copy}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
