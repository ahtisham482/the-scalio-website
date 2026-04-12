import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const SplitText = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <span className="inline-flex flex-wrap">
    {text.split(" ").map((word, i) => (
      <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
        <motion.span
          initial={{ y: "110%", rotateX: -80 }}
          animate={{ y: 0, rotateX: 0 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.05,
            ease: easeOutExpo,
          }}
          className="inline-block"
          style={{ transformOrigin: "bottom" }}
        >
          {word}
        </motion.span>
      </span>
    ))}
  </span>
);

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Clean subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent pointer-events-none" />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOutExpo }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border bg-card text-[11px] text-muted-foreground tracking-[0.2em] uppercase font-mono">
            <span className="relative w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-primary block" />
            </span>
            Full-Service Amazon FBA Agency
          </span>
        </motion.div>

        {/* Headline — single semantic h1 */}
        <h1 className="text-[clamp(3rem,8vw,7rem)] font-display font-bold leading-[0.92] tracking-tight mb-12">
          <span className="block mb-4">
            <SplitText text="Scale Your" delay={0.4} />
          </span>
          <span className="block">
            <SplitText text="Amazon" delay={0.55} />{" "}
            <span className="overflow-hidden inline-block">
              <motion.span
                initial={{ y: "110%", rotateX: -80 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 0.9, delay: 0.65, ease: easeOutExpo }}
                className="inline-block text-primary italic font-medium"
                style={{ transformOrigin: "bottom" }}
              >
                Empire
              </motion.span>
            </span>
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: easeOutExpo }}
          className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto mb-14 font-body font-light leading-[1.8] tracking-wide"
        >
          We launch, optimize, and scale Amazon FBA brands — from product
          research to 7-figure revenue. End-to-end, done for you.
        </motion.p>

        {/* CTA Group */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: easeOutExpo }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-primary text-primary-foreground font-body font-semibold text-base tracking-wide rounded-full transition-all duration-500 hover:shadow-lg hover:scale-[1.03] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book a Free Audit
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center text-muted-foreground font-body font-medium text-sm tracking-wide transition-all duration-300 hover:text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary/60"
          >
            View Our Services
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: easeOutExpo }}
          className="mt-14 flex flex-wrap items-center justify-center gap-8 md:gap-10"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl md:text-3xl font-display font-bold text-foreground">
              200+
            </span>
            <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground font-mono">
              Brands Scaled
            </span>
          </div>
          <div className="w-px h-10 bg-border hidden sm:block" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl md:text-3xl font-display font-bold text-foreground">
              $50M+
            </span>
            <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground font-mono">
              Revenue Generated
            </span>
          </div>
          <div className="w-px h-10 bg-border hidden sm:block" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl md:text-3xl font-display font-bold text-foreground">
              97%
            </span>
            <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground font-mono">
              Client Retention
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 hidden sm:flex"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-mono">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-muted-foreground/20 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
