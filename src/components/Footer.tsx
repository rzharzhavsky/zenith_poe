export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line/60">
      <div className="mx-auto max-w-content px-6 md:px-12 py-10 md:py-14 flex flex-col md:flex-row md:items-center justify-between gap-6 text-[11px] uppercase tracking-smallcaps">
        <div className="text-muted">
          © {year} Zenith Salon · Berkowitz · Zheng · Zharzhavsky
        </div>
        <div className="flex gap-8 text-muted">
          <a href="#hero" className="hover:text-ink transition-colors">
            Top
          </a>
          <a href="#timeline" className="hover:text-ink transition-colors">
            Gantt
          </a>
          <a
            href="mailto:Zenith@gmail.com"
            className="hover:text-champagne transition-colors"
          >
            Zenith@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
