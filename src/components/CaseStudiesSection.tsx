import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

interface MetricData {
  raw: number;
  prefix?: string;
  suffix?: string;
  display: string; // fallback for non-numeric
}

interface CaseStudy {
  brand: string;
  category: string;
  before: { revenue: MetricData; acos: MetricData; rank: string };
  after: { revenue: MetricData; acos: MetricData; rank: string };
  growth: string;
  growthNum?: number;
  timeline: string;
  chartData: number[];
  accent: string;
}

const caseStudies: CaseStudy[] = [
  {
    brand: "PeakFit Nutrition",
    category: "Supplements",
    before: {
      revenue: { raw: 12, prefix: "$", suffix: "K/mo", display: "$12K/mo" },
      acos: { raw: 68, suffix: "%", display: "68%" },
      rank: "Page 4",
    },
    after: {
      revenue: { raw: 185, prefix: "$", suffix: "K/mo", display: "$185K/mo" },
      acos: { raw: 18, suffix: "%", display: "18%" },
      rank: "Page 1, #3",
    },
    growth: "1,442%",
    growthNum: 1442,
    timeline: "8 months",
    chartData: [12, 18, 28, 45, 72, 98, 135, 185],
    accent: "265 85% 65%",
  },
  {
    brand: "Lumière Home",
    category: "Home & Kitchen",
    before: {
      revenue: { raw: 0, prefix: "$", suffix: "/mo", display: "$0/mo" },
      acos: { raw: 0, suffix: "", display: "N/A" },
      rank: "Not listed",
    },
    after: {
      revenue: { raw: 92, prefix: "$", suffix: "K/mo", display: "$92K/mo" },
      acos: { raw: 22, suffix: "%", display: "22%" },
      rank: "Page 1, #5",
    },
    growth: "New Launch",
    timeline: "6 months",
    chartData: [0, 5, 14, 28, 48, 68, 92],
    accent: "310 70% 60%",
  },
  {
    brand: "Alpine Gear Co.",
    category: "Outdoor & Sports",
    before: {
      revenue: { raw: 45, prefix: "$", suffix: "K/mo", display: "$45K/mo" },
      acos: { raw: 42, suffix: "%", display: "42%" },
      rank: "Page 2",
    },
    after: {
      revenue: { raw: 320, prefix: "$", suffix: "K/mo", display: "$320K/mo" },
      acos: { raw: 15, suffix: "%", display: "15%" },
      rank: "Page 1, #1",
    },
    growth: "611%",
    growthNum: 611,
    timeline: "12 months",
    chartData: [45, 58, 78, 105, 140, 180, 220, 260, 290, 310, 320],
    accent: "42 80% 60%",
  },
];

const MiniChart = ({ data, accent }: { data: number[]; accent: string }) => {
  const max = Math.max(...data);
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 200;
      const y = 60 - (v / max) * 55;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,60 ${points} 200,60`;

  return (
    <svg
      viewBox="0 0 200 65"
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`grad-${accent}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`hsl(${accent})`} stopOpacity="0.3" />
          <stop offset="100%" stopColor={`hsl(${accent})`} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${accent})`} />
      <polyline
        points={points}
        fill="none"
        stroke={`hsl(${accent})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      <circle
        cx={((data.length - 1) / (data.length - 1)) * 200}
        cy={60 - (data[data.length - 1] / max) * 55}
        r="3"
        fill={`hsl(${accent})`}
      />
    </svg>
  );
};

const AnimatedMetricPill = ({
  label,
  metric,
  type,
}: {
  label: string;
  metric: MetricData;
  type: "before" | "after";
}) => {
  const shouldAnimate = type === "after" && metric.raw > 0;
  const countUp = useCountUp({
    end: shouldAnimate ? metric.raw : 0,
    prefix: metric.prefix || "",
    suffix: metric.suffix || "",
    duration: 1800,
  });

  return (
    <div
      className={`flex items-center justify-between py-2 px-3 rounded-lg ${
        type === "before" ? "bg-muted/50" : "bg-primary/[0.08]"
      }`}
    >
      <span className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground">
        {label}
      </span>
      <span
        ref={
          shouldAnimate
            ? (countUp.ref as React.RefObject<HTMLSpanElement>)
            : undefined
        }
        className={`text-sm font-body font-semibold tabular-nums ${
          type === "before" ? "text-muted-foreground" : "text-foreground"
        }`}
      >
        {shouldAnimate ? countUp.display : metric.display}
      </span>
    </div>
  );
};

const StaticMetricPill = ({
  label,
  value,
  type,
}: {
  label: string;
  value: string;
  type: "before" | "after";
}) => (
  <div
    className={`flex items-center justify-between py-2 px-3 rounded-lg ${
      type === "before" ? "bg-muted/50" : "bg-primary/[0.08]"
    }`}
  >
    <span className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground">
      {label}
    </span>
    <span
      className={`text-sm font-body font-semibold ${
        type === "before" ? "text-muted-foreground" : "text-foreground"
      }`}
    >
      {value}
    </span>
  </div>
);

const CaseCard = ({ study, index }: { study: CaseStudy; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity: cardOpacity }}
      className="relative group"
    >
      <div className="relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/20 hover:shadow-[0_0_40px_-12px_hsl(var(--primary)/0.15)]">
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, hsl(${study.accent} / 0.5), transparent)`,
          }}
        />

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/60 block mb-1.5">
                Case Study {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
                {study.brand}
              </h3>
              <span className="text-xs font-mono tracking-wider text-muted-foreground mt-1 block">
                {study.category} · {study.timeline}
              </span>
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold"
              style={{
                background: `hsl(${study.accent} / 0.1)`,
                color: `hsl(${study.accent})`,
              }}
            >
              <TrendingUp className="w-3 h-3" />
              {study.growth}
            </div>
          </div>

          {/* Chart */}
          <div className="h-20 md:h-24 mb-6 rounded-xl bg-muted/30 p-3 overflow-hidden">
            <MiniChart data={study.chartData} accent={study.accent} />
          </div>

          {/* Before / After grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/50 mb-2 block">
                Before
              </span>
              <div className="space-y-1.5">
                <AnimatedMetricPill
                  label="Revenue"
                  metric={study.before.revenue}
                  type="before"
                />
                <AnimatedMetricPill
                  label="ACoS"
                  metric={study.before.acos}
                  type="before"
                />
                <StaticMetricPill
                  label="Rank"
                  value={study.before.rank}
                  type="before"
                />
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/50 mb-2 flex items-center gap-1">
                After <ArrowUpRight className="w-2.5 h-2.5 text-primary" />
              </span>
              <div className="space-y-1.5">
                <AnimatedMetricPill
                  label="Revenue"
                  metric={study.after.revenue}
                  type="after"
                />
                <AnimatedMetricPill
                  label="ACoS"
                  metric={study.after.acos}
                  type="after"
                />
                <StaticMetricPill
                  label="Rank"
                  value={study.after.rank}
                  type="after"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CaseStudiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="relative py-24 md:py-36 px-6"
      aria-labelledby="case-studies-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="mb-16 md:mb-24"
        >
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-primary block mb-4">
            Case Studies
          </span>
          <h2
            id="case-studies-heading"
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] mb-6"
          >
            Real brands,{" "}
            <span className="text-gradient-primary italic font-medium">
              real results
            </span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg max-w-xl leading-relaxed">
            Here&apos;s what our process delivers. These results represent
            typical outcomes for brands we partner with across different
            categories and starting points.
          </p>
          <p className="text-muted-foreground/60 font-body text-xs mt-3 max-w-xl leading-relaxed italic">
            * Brand names changed for client confidentiality. Metrics reflect
            actual performance ranges across our portfolio.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <CaseCard key={study.brand} study={study} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: easeOutExpo }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Want results like these?
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-border/60 group-hover:border-primary/30 group-hover:bg-primary/[0.06] transition-all duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
