import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [gravityEnabled, setGravityEnabled] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setGravityEnabled(!isMobile && !prefersReduced);
  }, []);

  // Level 3: Scroll-linked gravity effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const formScale = useTransform(
    scrollYProgress,
    [0, 0.6],
    gravityEnabled ? [0.97, 1] : [1, 1],
  );
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.7],
    gravityEnabled ? [0.03, 0.09] : [0.06, 0.06],
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 lg:py-28 px-6 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="absolute top-0 left-0 right-0 line-accent" />

      {/* Background mesh — Level 3: scroll-linked intensity */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-primary blur-[180px]"
        />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-accent/[0.04] blur-[140px]" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
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
          <p className="text-muted-foreground font-body text-base mb-6 font-light max-w-lg mx-auto leading-relaxed">
            Fill out the form below. A senior strategist will review your
            account and email you a personalized audit within 24 hours — whether
            you work with us or not.
          </p>

          {/* What the audit includes */}
          <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60 mb-3">
            Your free audit includes:
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {[
              "Listing Analysis",
              "PPC Review",
              "Competitor Mapping",
              "Revenue Projections",
              "Custom Roadmap",
            ].map((item) => (
              <span
                key={item}
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
              </span>
            ))}
          </div>

          {/* Urgency */}
          <p className="text-primary/70 font-mono text-xs mb-8 tracking-wider">
            We take on 5 new clients per month to ensure quality. Limited spots
            available.
          </p>

          <p className="text-muted-foreground/50 font-body text-xs mb-10 font-light">
            No commitment required. No credit card. Just a conversation.
          </p>
        </motion.div>

        {/* Level 3: Form scales subtly as section enters viewport */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
          style={{ scale: formScale }}
          className="glass glass-border rounded-2xl p-8 md:p-10"
        >
          <ContactForm />
        </motion.div>

        {/* Money-back guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: easeOutExpo }}
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

        {/* CT1 — Alternative contact path */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
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
