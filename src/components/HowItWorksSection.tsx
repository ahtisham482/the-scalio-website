import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ClipboardCheck, Crosshair, Rocket, TrendingUp } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    icon: ClipboardCheck,
    number: "01",
    title: "Free Account Audit",
    description:
      "We analyze your listings, PPC campaigns, keyword gaps, and competitor landscape. Within 48 hours, you receive a detailed report showing exactly where you're leaving money on the table — with specific revenue projections for each opportunity. No cost, no obligation.",
    accent: "265 85% 65%",
  },
  {
    icon: Crosshair,
    number: "02",
    title: "90-Day Growth Blueprint",
    description:
      "Based on the audit, your dedicated strategist builds a custom 90-day plan with monthly milestones. We map out keyword architecture, PPC campaign structure, listing optimizations, and A+ content strategy — all with projected ROI so you know what to expect before we start.",
    accent: "310 70% 60%",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Execute & Iterate Weekly",
    description:
      "Your team executes the plan across every lever — optimized listings go live, PPC campaigns launch, and we iterate based on real data every week. You get a weekly report + a 30-minute strategy call so you're never in the dark. Most clients see ranking improvements within 30 days.",
    accent: "42 80% 60%",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Scale What Works",
    description:
      "Once we establish profitable campaigns and strong organic rank, we reinvest into scaling — expanding to new keywords, launching additional SKUs, entering international markets, and growing your brand beyond Amazon. This is where the real compounding happens.",
    accent: "265 85% 65%",
  },
];

const StepCard = ({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative flex gap-5 md:gap-8"
    >
      {/* Timeline connector (vertical line + dot) */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border border-border/60 transition-colors duration-500 group-hover:border-primary/30"
          style={{ background: `hsl(${step.accent} / 0.08)` }}
        >
          <Icon
            className="w-5 h-5 md:w-6 md:h-6"
            style={{ color: `hsl(${step.accent})` }}
          />
        </div>
        {index < steps.length - 1 && (
          <div className="w-px flex-1 min-h-[40px] bg-gradient-to-b from-border/60 to-transparent mt-3" />
        )}
      </div>

      {/* Content */}
      <div className="pb-12 md:pb-16">
        <span
          className="text-[10px] font-mono tracking-[0.25em] uppercase mb-2 block"
          style={{ color: `hsl(${step.accent})` }}
        >
          Step {step.number}
        </span>
        <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-2">
          {step.title}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed max-w-md">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-24 md:py-36 px-6"
      aria-labelledby="how-it-works-heading"
    >
      {/* Background orb */}
      <div className="absolute top-1/4 left-[5%] w-[350px] h-[350px] bg-accent/[0.03] orb animate-float-slow pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-primary block mb-4">
            How It Works
          </span>
          <h2
            id="how-it-works-heading"
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] mb-6"
          >
            From audit to{" "}
            <span className="text-gradient-primary italic font-medium">
              empire
            </span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            A proven four-step process that turns underperforming listings into
            category leaders.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-xl mx-auto">
          {/* Animated progress line (desktop only) */}
          <motion.div
            className="absolute left-6 md:left-7 top-0 w-px bg-gradient-to-b from-primary/40 via-accent/30 to-primary/40 origin-top hidden md:block"
            style={{ height: lineHeight }}
          />

          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
