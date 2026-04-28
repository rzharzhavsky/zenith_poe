import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-content px-6 md:px-12 py-32 md:py-48"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16"
      >
        <div className="md:col-span-7">
          <div className="mb-8">
            <span className="text-champagne text-[10px] uppercase tracking-smallcaps">
              Further Questions
            </span>
          </div>
          <h2 className="font-display font-light text-6xl md:text-8xl lg:text-[9rem] tracking-tightest leading-[0.95]">
            Let's talk
            <br />
            about Zenith.
          </h2>
        </div>

        <div className="md:col-span-5 flex flex-col gap-4">
          <a
            href="mailto:ronz@s.ccsd.edu"
            className="group flex items-start gap-5 p-7 md:p-8 border border-line/60 hover:border-champagne/60 hover:bg-surface/60 transition-all"
          >
            <Mail
              size={22}
              strokeWidth={1.1}
              className="text-champagne mt-1 group-hover:-translate-y-0.5 transition-transform"
            />
            <div>
              <div className="text-[10px] uppercase tracking-smallcaps text-muted">
                Email
              </div>
              <div className="font-display font-light text-2xl md:text-3xl tracking-tightest mt-1.5">
                ronz@s.ccsd.edu
              </div>
            </div>
          </a>

          <a
            href="https://maps.google.com/?q=31+Lake+Rd+Congers+NY+10920"
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-5 p-7 md:p-8 border border-line/60 hover:border-champagne/60 hover:bg-surface/60 transition-all"
          >
            <MapPin
              size={22}
              strokeWidth={1.1}
              className="text-champagne mt-1 group-hover:-translate-y-0.5 transition-transform"
            />
            <div>
              <div className="text-[10px] uppercase tracking-smallcaps text-muted">
                Visit
              </div>
              <div className="font-display font-light text-2xl md:text-3xl tracking-tightest mt-1.5">
                31 Lake Rd, Congers NY
              </div>
            </div>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
