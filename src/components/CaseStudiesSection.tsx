import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

interface CaseStudy {
  brand: string;
  headline: string;
  category: string;
  problem: string;
  intervention: string;
  before: { revenue: string; acos: string; rank: string };
  after: { revenue: string; acos: string; rank: string };
  growth: string;
  timeline: string;
  accent: string;
  link: string;
  linkText: string;
}

const caseStudies: CaseStudy[] = [
  {
    brand: "PeakFit Nutrition",
    headline: "Supplements Brand: 68% → 18% ACoS in 8 Months",
    category: "Supplements",
    problem: "Bleeding Ad Spend",
    intervention:
      "Restructured 12 campaigns, rebuilt all 5 listings with A+ Content, launched brand defense and competitor conquest targeting.",
    before: { revenue: "$12K/mo", acos: "68%", rank: "Page 4" },
    after: { revenue: "$185K/mo", acos: "18%", rank: "Page 1, #3" },
    growth: "1,442%",
    timeline: "8 months",
    accent: "265 85% 65%",
    link: "/services/ppc",
    linkText: "See how we fix high ACoS →",
  },
  {
    brand: "Lumiere Home",
    headline: "Home Brand: $0 to $92K/mo in 6 Months",
    category: "Home & Kitchen",
    problem: "First-Time Amazon Launch",
    intervention:
      "Full launch strategy: product positioning, keyword architecture, launch PPC campaigns, and review generation from day one.",
    before: { revenue: "$0/mo", acos: "N/A", rank: "Not listed" },
    after: { revenue: "$92K/mo", acos: "22%", rank: "Page 1, #5" },
    growth: "New Launch",
    timeline: "6 months",
    accent: "310 70% 60%",
    link: "/services/product-launch",
    linkText: "Planning a launch? See our process →",
  },
  {
    brand: "Alpine Gear Co.",
    headline: "Outdoor Brand: $45K → $320K/mo in 12 Months",
    category: "Outdoor & Sports",
    problem: "Scaling Plateau",
    intervention:
      "Rebuilt PPC from scratch, optimized 47 listings, expanded into 3 new sub-categories with targeted campaigns.",
    before: { revenue: "$45K/mo", acos: "42%", rank: "Page 2" },
    after: { revenue: "$320K/mo", acos: "15%", rank: "Page 1, #1" },
    growth: "611%",
    timeline: "12 months",
    accent: "42 80% 60%",
    link: "/services/brand-growth",
    linkText: "Stuck at a plateau? Let's break through →",
  },
];

const MetricPill = ({
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
      className={`text-sm font-body font-semibold tabular-nums ${
        type === "before" ? "text-muted-foreground" : "text-foreground"
      }`}
    >
      {value}
    </span>
  </div>
);

const CaseCard = ({ study, index }: { study: CaseStudy; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: easeOutExpo }}
      className="relative group"
    >
      <a href={study.link} className="block">
        <div className="relative rounded-2xl border border-border/60 bg-card/80 overflow-hidden transition-all duration-500 hover:border-primary/20 hover:shadow-[0_0_40px_-12px_hsl(var(--primary)/0.15)] hover:-translate-y-1">
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, hsl(${study.accent} / 0.5), transparent)`,
            }}
          />

          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60">
                    Case Study {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full"
                    style={{
                      background: `hsl(${study.accent} / 0.1)`,
                      color: `hsl(${study.accent})`,
                    }}
                  >
                    {study.problem}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold text-foreground">
                  {study.headline}
                </h3>
                <span className="text-xs font-mono tracking-wider text-muted-foreground mt-1 block">
                  {study.category} · {study.timeline}
                </span>
              </div>
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 200,
                  delay: index * 0.12 + 0.3,
                }}
              >
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold shrink-0"
                  style={{
                    background: `hsl(${study.accent} / 0.1)`,
                    color: `hsl(${study.accent})`,
                  }}
                >
                  <TrendingUp className="w-3 h-3" />
                  {study.growth}
                </div>
              </motion.div>
            </div>

            {/* Intervention — what Scalio actually DID */}
            <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5 border-l-2 border-primary/20 pl-3">
              {study.intervention}
            </p>

            {/* Before / After grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/50 mb-2 block">
                  Before
                </span>
                <div className="space-y-1.5">
                  <MetricPill
                    label="Revenue"
                    value={study.before.revenue}
                    type="before"
                  />
                  <MetricPill
                    label="ACoS"
                    value={study.before.acos}
                    type="before"
                  />
                  <MetricPill
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
                  <MetricPill
                    label="Revenue"
                    value={study.after.revenue}
                    type="after"
                  />
                  <MetricPill
                    label="ACoS"
                    value={study.after.acos}
                    type="after"
                  />
                  <MetricPill
                    label="Rank"
                    value={study.after.rank}
                    type="after"
                  />
                </div>
              </div>
            </div>

            {/* Card CTA */}
            <span className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-primary/70 group-hover:text-primary transition-colors duration-300">
              {study.linkText}
              <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

const CaseStudiesSection = () => {
  return (
    <section
      id="case-studies"
      className="relative py-24 md:py-36 px-6"
      aria-labelledby="case-studies-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
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
            3 Brands. 3 Problems.{" "}
            <span className="text-gradient-primary italic font-medium">
              3 Transformations.
            </span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg max-w-xl leading-relaxed">
            Client names anonymized at their request. All metrics are real and
            auditable.
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: easeOutExpo }}
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
