import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Section from "./Section";
import { theme } from "../theme";

// TODO(user): plug in the real startup + operating figures once the financial model is finalized.
const costItems = [
  { label: "Building purchase", value: 200_000, note: "{{BUILDING_PURCHASE}}" },
  { label: "Renovation & build-out", value: 65_000, note: "{{RENOVATION_COST}}" },
  { label: "Furniture & equipment", value: 28_000, note: "{{FURNITURE_COST}}" },
  { label: "Product line COGS (initial)", value: 18_000, note: "{{PRODUCT_COGS}}" },
  { label: "Licenses, permits, legal", value: 6_500, note: "{{PERMIT_COST}}" },
  { label: "Monthly operating (first 6 mo)", value: 42_000, note: "{{MONTHLY_OPERATING}}" },
];

const STARTUP_TOTAL = costItems.reduce((s, i) => s + i.value, 0);
const MAX_COST = Math.max(...costItems.map((i) => i.value));

// TODO(user): replace placeholder monthly revenue figures with Lucas's projections.
// {{MONTH_1_REVENUE}} .. {{MONTH_12_REVENUE}} — current values are ramp-curve placeholders.
const profitCurve = [
  { month: "M1",  revenue: 14000, costs: 22000 },
  { month: "M2",  revenue: 19000, costs: 22000 },
  { month: "M3",  revenue: 26000, costs: 22500 },
  { month: "M4",  revenue: 31000, costs: 23000 },
  { month: "M5",  revenue: 37000, costs: 23500 },
  { month: "M6",  revenue: 42000, costs: 24000 },
  { month: "M7",  revenue: 46000, costs: 24500 },
  { month: "M8",  revenue: 50000, costs: 25000 },
  { month: "M9",  revenue: 54000, costs: 25500 },
  { month: "M10", revenue: 58000, costs: 26000 },
  { month: "M11", revenue: 62000, costs: 26500 },
  { month: "M12", revenue: 68000, costs: 27000 },
].map((p) => ({ ...p, profit: p.revenue - p.costs }));

const fmtUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function CostProfit() {
  return (
    <Section
      id="cost"
      eyebrow="Cost & Profit"
      title="The numbers, drawn honestly."
      lead="Placeholders you can see, not hide — every figure below is labeled so the finance team can plug in real numbers without hunting."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Cost breakdown */}
        <div className="lg:col-span-6">
          <div className="flex items-baseline justify-between mb-10 gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-smallcaps text-muted">
                Startup & Early Ops
              </div>
              <h3 className="font-display font-light text-3xl md:text-4xl tracking-tightest mt-3">
                Where the money goes.
              </h3>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-[10px] uppercase tracking-smallcaps text-muted">
                Total
              </div>
              <div className="font-display font-light text-3xl md:text-4xl tracking-tightest text-champagne mt-2">
                {fmtUSD(STARTUP_TOTAL)}
              </div>
            </div>
          </div>

          <ul className="border-t border-line/60">
            {costItems.map((item) => {
              const pct = (item.value / MAX_COST) * 100;
              return (
                <li
                  key={item.label}
                  className="py-6 border-b border-line/60"
                >
                  <div className="flex justify-between items-baseline mb-3 gap-4">
                    <span className="text-inkSoft text-[15px] truncate">{item.label}</span>
                    <span className="font-display font-light text-lg md:text-xl text-ink">
                      {fmtUSD(item.value)}
                    </span>
                  </div>
                  <div className="h-[2px] bg-line/80 relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-champagne/80"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 text-xs text-muted leading-relaxed">
            Placeholders throughout — see{" "}
            <code className="text-champagne bg-elev/60 px-1.5 py-0.5">{`{{TOKENS}}`}</code>{" "}
            in <code className="text-champagne bg-elev/60 px-1.5 py-0.5">src/components/CostProfit.tsx</code>.
          </p>
        </div>

        {/* Profit curve */}
        <div className="lg:col-span-6">
          <div className="flex items-baseline justify-between mb-10 gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-smallcaps text-muted">
                12-Month Projection
              </div>
              <h3 className="font-display font-light text-3xl md:text-4xl tracking-tightest mt-3">
                The runway, visualized.
              </h3>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-[10px] uppercase tracking-smallcaps text-muted">
                Month 12 Net
              </div>
              <div className="font-display font-light text-3xl md:text-4xl tracking-tightest text-champagne mt-2">
                {fmtUSD(profitCurve[profitCurve.length - 1].profit)}
              </div>
            </div>
          </div>

          <div className="h-[380px] w-full bg-surface/40 border border-line/60 p-4 md:p-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={profitCurve} margin={{ top: 16, right: 16, bottom: 8, left: 0 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.champagne} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={theme.champagne} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.steel} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={theme.steel} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={theme.line} strokeDasharray="2 4" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke={theme.muted}
                  tickLine={false}
                  axisLine={{ stroke: theme.line }}
                  fontSize={10}
                  letterSpacing={2}
                />
                <YAxis
                  stroke={theme.muted}
                  tickLine={false}
                  axisLine={false}
                  fontSize={10}
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                  width={48}
                />
                <Tooltip
                  cursor={{ stroke: theme.champagne, strokeWidth: 1, strokeDasharray: "3 3" }}
                  contentStyle={{
                    background: theme.elev,
                    border: `1px solid ${theme.champagne}66`,
                    borderRadius: 0,
                    fontSize: 12,
                    color: theme.ink,
                  }}
                  labelStyle={{
                    color: theme.ink,
                    fontFamily: "Cormorant Garamond, serif",
                    letterSpacing: "-0.02em",
                  }}
                  formatter={(v, name) => [fmtUSD(Number(v)), String(name)]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={theme.champagne}
                  strokeWidth={1.75}
                  fill="url(#revenueFill)"
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke={theme.steel}
                  strokeWidth={1.75}
                  fill="url(#profitFill)"
                  name="Net Profit"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-8 mt-5 text-[11px] uppercase tracking-smallcaps text-muted">
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-[2px] bg-champagne" />
              Revenue
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-[2px] bg-steel" />
              Net Profit
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
