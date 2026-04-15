import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useParallax } from "@/lib/useParallax";
import { useMagnetic } from "@/lib/useMagnetic";
import { useHeroSequence } from "@/lib/useHeroSequence";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const { ref: spotlightRef, y: spotlightY } = useParallax({ range: [0, -25] });

  const {
    ref: ctaRef,
    x: ctaX,
    y: ctaY,
    handleMouseMove: ctaMouseMove,
    handleMouseLeave: ctaMouseLeave,
  } = useMagnetic({ radius: 80, strength: 0.25, damping: 20, stiffness: 300 });

  // Level 3: Choreographed entrance sequence
  const seq = useHeroSequence();

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Spotlight with parallax depth */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none z-[1] opacity-40"
      >
        <motion.div
          style={{ y: spotlightY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.04] blur-[120px]"
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Eyebrow — choreographed entrance */}
        <motion.div
          initial={seq.initial.eyebrow}
          animate={seq.eyebrow}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass glass-border text-[11px] text-muted-foreground tracking-[0.2em] uppercase font-mono">
            <span className="relative w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-primary block" />
            </span>
            200+ Amazon Brands Scaled &middot; 97% Stay
          </span>
        </motion.div>

        {/* Headline — Level 3 clip-path mask reveal */}
        <motion.h1
          initial={seq.initial.headline}
          animate={seq.headline}
          className="text-[clamp(2.5rem,7vw,5.5rem)] font-display font-bold leading-[0.95] tracking-tight mb-6"
        >
          We Don&apos;t Manage
          <br />
          Amazon Accounts.
          <br />
          <span className="text-gradient-primary italic font-medium">
            We Grow Them.
          </span>
        </motion.h1>

        {/* Subheadline — sequenced entrance */}
        <motion.p
          initial={seq.initial.subheadline}
          animate={seq.subheadline}
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 font-body font-light leading-[1.8] tracking-wide"
        >
          Every month without optimized PPC is revenue you won&apos;t recover.
          We handle your ads, listings, and supply chain — with a dedicated
          strategist who reports to you weekly. Not a VA. Not a dashboard. A
          partner who owns the outcome.
        </motion.p>

        {/* Trust badges — sequenced entrance */}
        <motion.div
          initial={seq.initial.trustBadges}
          animate={seq.trustBadges}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-10"
        >
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-2xl md:text-3xl font-display font-bold text-foreground">
              200+
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-mono">
              Brands Scaled
            </span>
          </div>
          <div className="w-px h-8 bg-border hidden sm:block" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-2xl md:text-3xl font-display font-bold text-foreground">
              $50M+
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-mono">
              Revenue Generated
            </span>
          </div>
          <div className="w-px h-8 bg-border hidden sm:block" />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-2xl md:text-3xl font-display font-bold text-foreground">
              97%
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-mono">
              Client Retention
            </span>
          </div>
        </motion.div>

        {/* CTA — Level 3 spring scale entrance + Level 2 magnetic */}
        <motion.div
          initial={seq.initial.cta}
          animate={seq.cta}
          className="flex flex-col items-center gap-3"
        >
          <a
            href="#contact"
            ref={ctaRef}
            onMouseMove={ctaMouseMove}
            onMouseLeave={ctaMouseLeave}
            className="cta-pulse group relative inline-flex items-center justify-center px-10 py-5 bg-primary text-primary-foreground font-body font-semibold text-base tracking-wide rounded-full transition-all duration-500 hover:shadow-[0_0_60px_-8px_hsl(217_91%_60%/0.6)] hover:scale-[1.04] overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            <motion.span
              style={{ x: ctaX, y: ctaY }}
              className="relative z-10 flex items-center gap-2"
            >
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
            </motion.span>
          </a>
          <span className="text-[11px] text-muted-foreground/50 font-body">
            Free 30-min call. No commitment. Keep the roadmap either way.
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
