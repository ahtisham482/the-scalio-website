import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { stats } from "@/data/stats";
import { SectionBridge } from "@/components/SectionBridge";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const AnimatedCounter = ({
  value,
  suffix,
  prefix,
}: {
  value: number;
  suffix: string;
  prefix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setCount(value);
      return;
    }

    // Phase 1: Count up to target value
    let start = 0;
    const duration = 1000;
    const stepTime = Math.max(Math.floor(duration / value), 16);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) {
        clearInterval(timer);
        // Phase 2: Spring overshoot — shoot to 115%, bounce back
        const overshoot = Math.round(value * 1.15);
        const springDuration = 600;
        const startTime = performance.now();
        const spring = (t: number) => {
          const omega = 18;
          const zeta = 0.35;
          return (
            1 -
            Math.exp(-zeta * omega * t) *
              Math.cos(omega * Math.sqrt(1 - zeta * zeta) * t)
          );
        };
        const animate = (now: number) => {
          const elapsed = (now - startTime) / springDuration;
          if (elapsed >= 1) {
            setCount(value);
            return;
          }
          const progress = spring(elapsed);
          const current = overshoot - (overshoot - value) * progress;
          setCount(Math.round(current));
          requestAnimationFrame(animate);
        };
        setCount(overshoot);
        requestAnimationFrame(animate);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative py-20 lg:py-28 px-6 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="absolute top-0 left-0 right-0 line-accent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="mb-12"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-primary font-mono">
            8 Years &middot; 200+ Brands &middot; $50M+ Revenue
          </span>
          <h2
            id="about-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 leading-[1.05]"
          >
            Why 200+ Amazon Sellers{" "}
            <span className="italic text-gradient-primary font-medium">
              Trust Us
            </span>
          </h2>
        </motion.div>

        {/* Stats bar — ABOVE body text, first visual after heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden mb-14"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-card p-8 lg:p-10 flex flex-col items-center text-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <span className="text-4xl md:text-5xl font-display font-bold text-foreground relative z-10">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </span>
              <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground font-mono mt-3 relative z-10">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Body — empathy-first narrative */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: easeOutExpo }}
          className="max-w-3xl"
        >
          <p className="text-muted-foreground font-body text-base leading-[1.9] font-light max-w-lg mb-5">
            You&apos;ve been burned before. An agency that promised the world,
            delivered a monthly PDF, and blamed &ldquo;the algorithm.&rdquo;
            Junior VAs managing your account between 30 others. Dashboards that
            hid more than they revealed.
          </p>
          <p className="text-muted-foreground font-body text-base leading-[1.9] font-light max-w-lg mb-5">
            We built The Scalio because we were tired of it too. As Amazon
            sellers ourselves, we knew agencies could be better — senior
            strategists managing a maximum of 5 accounts. Weekly calls, not
            monthly reports. Outcomes, not excuses.
          </p>
          <p className="text-foreground/80 font-body text-base leading-[1.9] font-medium max-w-lg">
            That approach has worked for 200+ brands across 14 Amazon
            categories, generated over $50M in revenue, and kept 97% of our
            clients year after year. Not because of lock-in contracts — because
            of results.
          </p>
        </motion.div>

        {/* Phase 1 Cohesion: PROPEL handoff → How It Works (Question-Answer) */}
        <SectionBridge label="How we do it" targetId="how-it-works" />
      </div>
    </section>
  );
};

export default AboutSection;
