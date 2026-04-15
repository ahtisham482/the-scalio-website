import { motion } from "framer-motion";
import { ClipboardCheck, Crosshair, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

interface Step {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
  accent: string;
}

const steps: Step[] = [
  {
    icon: ClipboardCheck,
    number: "01",
    title: "Day 1: Your Free Audit",
    description:
      "You book a 30-minute call. We analyze your PPC, listings, keywords, and competitors. Within 48 hours, you receive a detailed audit with exact opportunities and projected revenue impact. Free, no obligation — the audit is yours to keep either way.",
    accent: "217 91% 60%",
  },
  {
    icon: Crosshair,
    number: "02",
    title: "Week 1: Your 90-Day Roadmap",
    description:
      "Based on the audit, your dedicated strategist builds a custom 90-day plan with monthly milestones and projected ROI. You review it, ask questions, and approve before we touch anything. No surprises.",
    accent: "239 84% 67%",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Month 1–3: We Execute, You Grow",
    description:
      "Your team launches optimized campaigns, rebuilds listings, and reports to you every week. Most clients see ranking improvements in 30 days and measurable revenue growth by day 60. Once profitable, we scale into new keywords, SKUs, and markets — compounding your growth quarter over quarter.",
    accent: "42 80% 60%",
  },
];

const StepCard = ({ step, index }: { step: Step; index: number }) => {
  const Icon = step.icon;

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: easeOutExpo }}
      className="relative flex gap-5 md:gap-8"
    >
      {/* Timeline connector (vertical line + icon) */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border border-border/60"
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
          aria-hidden="true"
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
    </motion.li>
  );
};

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-36 px-6"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {/* Phase 1 Cohesion: early-reveal margin ("400px") triggers this
            header while the visitor is still in the bottom of About — creates
            a Reveal handoff. SectionBridge at the end of About points here. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "400px" }}
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
            Your growth in{" "}
            <span className="text-gradient-primary italic font-medium">
              3 simple steps
            </span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Here&apos;s exactly what happens after you book your free audit —
            and when you&apos;ll see results.
          </p>
        </motion.div>

        {/* Timeline — semantic <ol> for screen readers */}
        <ol className="relative max-w-xl mx-auto list-none p-0 m-0">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </ol>

        {/* CTA — captures the momentum from the mental rehearsal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: easeOutExpo }}
          className="text-center mt-4"
        >
          <p className="text-muted-foreground font-body text-sm mb-6">
            That&apos;s it — three steps to predictable, profitable Amazon
            growth.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-full transition-all duration-500 hover:shadow-[0_0_40px_-8px_hsl(217_91%_60%/0.5)] hover:scale-[1.03]"
          >
            Book Your Free Audit — Step 1 Takes 5 Minutes
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
