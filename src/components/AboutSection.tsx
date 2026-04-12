import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: 200, suffix: "+", label: "Brands Scaled" },
  { value: 8, suffix: "+", label: "Years on Amazon" },
  { value: 50, suffix: "M+", label: "Revenue Generated", prefix: "$" },
  { value: 97, suffix: "%", label: "Client Retention" },
];

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

    let start = 0;
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / value), 16);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
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
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <span className="text-[11px] tracking-[0.2em] uppercase text-primary font-mono">
              About Us
            </span>
            <h2
              id="about-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 leading-[1.05]"
            >
              Your growth
              <br />
              <span className="italic text-gradient-primary font-medium">
                is our obsession
              </span>
            </h2>
            <div className="w-12 h-px bg-primary/40 mt-8 mb-8 shimmer-line" />
            <p className="text-muted-foreground font-body text-base leading-[1.9] font-light max-w-md">
              The Scalio is a full-service Amazon FBA agency built by sellers,
              for sellers. We&apos;ve helped over 200 brands launch, optimize,
              and scale to 7- and 8-figure revenue on Amazon&apos;s marketplace.
            </p>
            <p className="text-muted-foreground font-body text-base leading-[1.9] font-light max-w-md mt-5">
              From product research and listing optimization to PPC management
              and supply chain logistics — we handle every aspect of your Amazon
              business so you can focus on growing your brand.
            </p>
          </motion.div>

          {/* Right: Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: easeOutExpo }}
            className="grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                className="bg-card p-8 lg:p-10 flex flex-col items-center text-center group relative overflow-hidden"
              >
                {/* Hover glow */}
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
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
