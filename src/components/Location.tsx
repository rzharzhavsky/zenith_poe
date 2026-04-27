import Section from "./Section";

export default function Location() {
  return (
    <Section
      id="location"
      eyebrow="Location"
      title="31 Lake Rd, Congers, NY."
      lead="A storefront on Lake Road in Congers. Used to be a huge resutrant, big enough to have lots of traffic."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[480px] border border-line/60 overflow-hidden bg-surface">
          <iframe
            title="31 Lake Rd, Congers, NY"
            src="https://maps.google.com/maps?q=31+Lake+Rd+Congers+NY+10920&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="absolute inset-0 w-full h-full"
            style={{ filter: "grayscale(1) contrast(1.05) brightness(0.78) hue-rotate(190deg) saturate(0.9)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute inset-0 pointer-events-none ring-1 ring-champagne/10" />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-12">
          <div>
            <div className="text-[10px] uppercase tracking-smallcaps text-muted">
              Address
            </div>
            <div className="mt-3 font-display font-light text-3xl md:text-4xl tracking-tightest leading-[1.15]">
              31 Lake Rd
              <br />
              Congers, NY 10920
            </div>
            <a
              href="https://maps.google.com/?q=31+Lake+Rd+Congers+NY+10920"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-8 text-champagne text-[11px] uppercase tracking-smallcaps hover:text-ink transition-colors"
            >
              Open in Google Maps
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
