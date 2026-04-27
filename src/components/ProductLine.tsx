import { motion } from "framer-motion";
import Section from "./Section";
import { products } from "../data/products";
import type { Product } from "../data/products";
import { theme } from "../theme";

export default function ProductLine() {
  return (
    <Section
      id="products"
      eyebrow="The Product Line"
      title="Four pieces(for now)."
      lead="Mixed in house, only to the highest standard."
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
            className="group relative bg-surface/60 border border-line/60 hover:border-champagne/50 hover:-translate-y-1 transition-all duration-500 p-7 md:p-10 flex flex-col"
          >
            <div className="h-[260px] md:h-[300px] flex items-end justify-center mb-8">
              <ProductSVG shape={p.shape} accent={p.accent} />
            </div>
            <div className="text-[10px] uppercase tracking-smallcaps text-champagne">
              Zenith Co.
            </div>
            <h3 className="font-display font-light text-2xl md:text-3xl tracking-tightest mt-3 leading-[1.1]">
              {p.name}
            </h3>
            <p className="text-inkSoft/75 text-sm mt-5 leading-[1.65]">
              {p.tagline}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function ProductSVG({ shape, accent }: { shape: Product["shape"]; accent: string }) {
  const stroke = theme.inkSoft;
  const bg = theme.bg;
  const inner = theme.elev;

  if (shape === "bottle") {
    return (
      <svg viewBox="0 0 120 240" className="h-full w-auto" aria-hidden>
        <rect x="48" y="10" width="24" height="26" fill={bg} stroke={stroke} strokeWidth="0.9" />
        <path
          d="M40 36 H80 L84 52 H36 Z"
          fill={bg}
          stroke={stroke}
          strokeWidth="0.9"
        />
        <rect x="28" y="52" width="64" height="178" rx="4" fill={inner} stroke={stroke} strokeWidth="0.9" />
        <rect x="36" y="110" width="48" height="68" fill={bg} stroke={accent} strokeWidth="0.7" />
        <line x1="44" y1="128" x2="76" y2="128" stroke={accent} strokeWidth="0.7" />
        <text x="60" y="150" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="14" fill={accent}>
          ZENITH
        </text>
        <text x="60" y="166" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="5.5" letterSpacing="2.5" fill={theme.muted}>
          CO.
        </text>
      </svg>
    );
  }

  if (shape === "tube") {
    return (
      <svg viewBox="0 0 120 240" className="h-full w-auto" aria-hidden>
        <rect x="52" y="12" width="16" height="8" fill={bg} stroke={stroke} strokeWidth="0.9" />
        <path
          d="M34 22 L86 22 L80 42 L40 42 Z"
          fill={bg}
          stroke={stroke}
          strokeWidth="0.9"
        />
        <rect x="30" y="42" width="60" height="190" rx="8" fill={inner} stroke={stroke} strokeWidth="0.9" />
        <line x1="34" y1="70" x2="86" y2="70" stroke={accent} strokeWidth="0.7" />
        <text x="60" y="130" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="16" fill={accent}>
          ZENITH
        </text>
      </svg>
    );
  }

  if (shape === "spray") {
    return (
      <svg viewBox="0 0 120 240" className="h-full w-auto" aria-hidden>
        <rect x="50" y="6" width="20" height="18" fill={bg} stroke={stroke} strokeWidth="0.9" />
        <rect x="44" y="24" width="32" height="10" fill={bg} stroke={stroke} strokeWidth="0.9" />
        <path d="M30 34 L90 34 L86 52 L34 52 Z" fill={bg} stroke={stroke} strokeWidth="0.9" />
        <rect x="24" y="52" width="72" height="180" fill={inner} stroke={stroke} strokeWidth="0.9" />
        <line x1="30" y1="76" x2="90" y2="76" stroke={accent} strokeWidth="0.7" />
        <text x="60" y="140" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="14" fill={accent}>
          ZENITH
        </text>
        <text x="60" y="158" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="5" letterSpacing="2.5" fill={theme.muted}>
          SEA SALT
        </text>
      </svg>
    );
  }

  // jar
  return (
    <svg viewBox="0 0 160 200" className="h-full w-auto" aria-hidden>
      <rect x="20" y="18" width="120" height="26" fill={bg} stroke={stroke} strokeWidth="0.9" />
      <rect x="14" y="44" width="132" height="144" rx="6" fill={inner} stroke={stroke} strokeWidth="0.9" />
      <circle cx="80" cy="115" r="40" fill="none" stroke={accent} strokeWidth="0.7" />
      <text x="80" y="118" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="20" fill={accent}>
        ZENITH
      </text>
      <text x="80" y="136" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" letterSpacing="3" fill={theme.muted}>
        TEXTURE
      </text>
    </svg>
  );
}
