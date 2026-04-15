import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { useFormAttention } from "@/lib/useFormAttention";
import {
  CTA_GLOW_OPACITY_MIN,
  CTA_GLOW_OPACITY_MAX,
  CTA_GLOW_SIZE_MIN,
  CTA_GLOW_SIZE_MAX,
  CTA_CEILING_OPACITY_MAX,
  CTA_PILL_BLOOM_STAGGER,
  CTA_FORM_INHALE_SCALE,
  springGentle,
} from "@/lib/animations";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const auditIncludes = [
  "Listing Analysis",
  "PPC Review",
  "Competitor Mapping", // center pill — radial bloom starts here
  "Revenue Projections",
  "Custom Roadmap",
];

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const [gravityEnabled, setGravityEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Level 4: focus-capture on the form wrapper drives inhale/exhale
  const { focused, onFocusCapture, onBlurCapture } = useFormAttention();

  // useInView on the form container gates the one-shot perimeter trace
  const formInView = useInView(formContainerRef, {
    once: true,
    margin: "-80px",
  });

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setGravityEnabled(!isMobile && !reduced);
    setReducedMotion(reduced);
  }, []);

  // Scroll-linked "narrowing" — amplified from Level 3
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Existing Level 3 form scroll-scale (preserved)
  const formScale = useTransform(
    scrollYProgress,
    [0, 0.6],
    gravityEnabled ? [0.97, 1] : [1, 1],
  );

  // Level 4: orb opacity + size BOTH animate, amplified from Level 3
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.7],
    gravityEnabled
      ? [CTA_GLOW_OPACITY_MIN, CTA_GLOW_OPACITY_MAX]
      : [0.06, 0.06],
  );
  const glowWidth = useTransform(
    scrollYProgress,
    [0, 0.7],
    gravityEnabled
      ? [CTA_GLOW_SIZE_MIN.w, CTA_GLOW_SIZE_MAX.w]
      : [CTA_GLOW_SIZE_MIN.w, CTA_GLOW_SIZE_MIN.w],
  );
  const glowHeight = useTransform(
    scrollYProgress,
    [0, 0.7],
    gravityEnabled
      ? [CTA_GLOW_SIZE_MIN.h, CTA_GLOW_SIZE_MAX.h]
      : [CTA_GLOW_SIZE_MIN.h, CTA_GLOW_SIZE_MIN.h],
  );

  // Level 4: subtle "ceiling" gradient at top of section — darkens as you scroll in
  const ceilingOpacity = useTransform(
    scrollYProgress,
    [0, 0.6],
    gravityEnabled ? [0, CTA_CEILING_OPACITY_MAX] : [0, 0],
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 lg:py-28 px-6 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="absolute top-0 left-0 right-0 line-accent" />

      {/* Level 4: Ceiling gradient — gives the form visual primacy */}
      <motion.div
        style={{ opacity: ceilingOpacity }}
        className="absolute top-0 left-0 right-0 h-[20%] pointer-events-none bg-gradient-to-b from-black/40 to-transparent"
        aria-hidden
      />

      {/* Background orbs — Level 4: primary glow expands in size AND opacity */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{
            opacity: glowOpacity,
            width: glowWidth,
            height: glowHeight,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary blur-[180px]"
        />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-accent/[0.04] blur-[140px]" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Phase 1 Cohesion: early-reveal margin ("400px") triggers the
            "settle" sequence while the visitor is still in FAQ — creates a
            Reveal handoff. SectionBridge at the end of FAQ points here. */}
        {/* Eyebrow + headline — "settles" with tiny scale overshoot */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
          whileInView={{
            opacity: 1,
            scale: reducedMotion ? 1 : [0.98, 1.01, 1],
          }}
          viewport={{ once: true, margin: "400px" }}
          transition={{
            opacity: { duration: 0.6, ease: easeOutExpo },
            scale: {
              duration: 0.75,
              times: [0, 0.65, 1],
              ease: easeOutExpo,
            },
          }}
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-primary font-mono">
            Get started
          </span>
          <h2
            id="cta-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 mb-6 leading-[1.05]"
          >
            Your free PPC audit is{" "}
            <span className="italic text-gradient-primary font-medium">
              one form away
            </span>
          </h2>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ delay: 0.25, duration: 0.5, ease: easeOutExpo }}
          className="text-muted-foreground font-body text-base mb-6 font-light max-w-lg mx-auto leading-relaxed"
        >
          Fill out the form below. A senior strategist will review your account
          and email you a personalized audit within 24 hours — whether you work
          with us or not.
        </motion.p>

        {/* Pills heading */}
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ delay: 0.35, duration: 0.4, ease: easeOutExpo }}
          className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60 mb-3"
        >
          Your free audit includes:
        </motion.p>

        {/* 5 pills — Level 4: RADIAL BLOOM from center pill (index 2) outward */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {auditIncludes.map((item, i) => {
            const centerIdx = Math.floor((auditIncludes.length - 1) / 2); // 2
            const distance = Math.abs(i - centerIdx);
            const bloomDelay = 0.45 + distance * CTA_PILL_BLOOM_STAGGER;
            return (
              <motion.span
                key={item}
                initial={
                  reducedMotion ? false : { opacity: 0, scale: 0.85, y: 4 }
                }
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "200px" }}
                transition={{
                  delay: bloomDelay,
                  type: "spring",
                  ...springGentle,
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[11px] font-mono tracking-wider text-primary/80"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {item}
              </motion.span>
            );
          })}
        </div>

        {/* Urgency */}
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ delay: 0.7, duration: 0.4, ease: easeOutExpo }}
          className="text-primary/70 font-mono text-xs mb-8 tracking-wider"
        >
          We take on 5 new clients per month to ensure quality. Limited spots
          available.
        </motion.p>

        {/* Assurance */}
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ delay: 0.8, duration: 0.4, ease: easeOutExpo }}
          className="text-muted-foreground/50 font-body text-xs mb-10 font-light"
        >
          No commitment required. No credit card. Just a conversation.
        </motion.p>

        {/*
          FORM — Level 4: The Invitation composition.
          Outer motion.div: scroll-linked gravity (preserves Level 3 formScale).
          Inner motion.div: viewport entrance + focus-driven inhale/exhale.
          CSS ::before on .cta-form-wrapper: one-shot perimeter trace (gated
            by .cta-form-trace-active class added when form enters view).
        */}
        <motion.div style={{ scale: formScale, transformOrigin: "center" }}>
          <motion.div
            ref={formContainerRef}
            onFocusCapture={onFocusCapture}
            onBlurCapture={onBlurCapture}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={
              !reducedMotion && focused
                ? { scale: CTA_FORM_INHALE_SCALE }
                : { scale: 1 }
            }
            transition={{
              opacity: { duration: 0.6, delay: 0.55, ease: easeOutExpo },
              y: { duration: 0.8, delay: 0.55, ease: easeOutExpo },
              scale: { type: "spring", ...springGentle },
            }}
            style={{
              // Focus-driven shadow (CSS transition handles smoothness)
              boxShadow: focused
                ? "0 0 80px -12px hsl(var(--primary) / 0.3), 0 0 40px -16px hsl(var(--primary) / 0.18)"
                : "none",
              transition: "box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className={`glass glass-border rounded-2xl p-8 md:p-10 cta-form-wrapper ${
              formInView && !reducedMotion ? "cta-form-trace-active" : ""
            } ${focused ? "cta-form-focused" : ""}`}
          >
            <ContactForm />
          </motion.div>
        </motion.div>

        {/* Money-back guarantee */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9, ease: easeOutExpo }}
          className="mt-8 flex items-center justify-center gap-3 py-4 px-6 rounded-xl border border-primary/10 bg-primary/[0.03] max-w-md mx-auto"
        >
          <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
          <div className="text-left">
            <p className="text-sm font-body font-semibold text-foreground">
              30-Day Money-Back Guarantee
            </p>
            <p className="text-[11px] text-muted-foreground font-body leading-relaxed">
              Not satisfied in the first 30 days? We&apos;ll refund 100% of your
              fees. No questions asked.
            </p>
          </div>
        </motion.div>

        {/* Email alternative */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.0, ease: easeOutExpo }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground/50 font-body text-xs mb-2">
            Prefer to talk directly?
          </p>
          <a
            href="mailto:hello@thescalio.com"
            className="text-sm font-body text-primary hover:underline"
          >
            hello@thescalio.com
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
