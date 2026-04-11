import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const SplitText = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <span className="inline-flex flex-wrap">
    {text.split(" ").map((word, i) => (
      <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
        <motion.span
          initial={{ y: "110%", rotateX: -80 }}
          animate={{ y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.05, ease: easeOutExpo }}
          className="inline-block"
          style={{ transformOrigin: "bottom" }}
        >
          {word}
        </motion.span>
      </span>
    ))}
  </span>
);

const FloatingOrb = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 2, delay, ease: easeOutExpo }}
    className={`absolute orb ${className}`}
  />
);

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const [mousePos, setMousePos] = useState({ x: "50%", y: "50%" });
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: `${e.clientX - rect.left}px`,
      y: `${e.clientY - rect.top}px`,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Spotlight cursor effect */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-60"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x} ${mousePos.y}, hsl(var(--color-accent-glow) / 0.07), transparent 60%)`,
        }}
      />

      {/* Floating orbs */}
      <FloatingOrb className="top-[10%] left-[15%] w-[500px] h-[500px] bg-primary/[0.06] animate-float-slow" delay={0.5} />
      <FloatingOrb className="bottom-[5%] right-[10%] w-[400px] h-[400px] bg-accent/[0.05] animate-breathe" delay={0.8} />
      <FloatingOrb className="top-[60%] left-[60%] w-[300px] h-[300px] bg-primary/[0.04] animate-float" delay={1.2} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial fade at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

      {/* Noise overlay */}
      <div className="noise absolute inset-0 pointer-events-none" />

      {/* Decorative corner elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-8 left-8 w-16 h-16 border-l border-t border-primary/20 hidden lg:block"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2.1, duration: 1 }}
        className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-primary/20 hidden lg:block"
      />

      <motion.div style={{ y, opacity, scale }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOutExpo }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass glass-border text-[11px] text-muted-foreground tracking-[0.2em] uppercase font-mono">
            <span className="relative w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-primary block" />
            </span>
            Full-Service Amazon FBA Agency
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-[clamp(3rem,8vw,7rem)] font-display font-bold leading-[0.92] tracking-tight mb-4">
          <SplitText text="Scale Your" delay={0.4} />
        </h1>
        <h1 className="text-[clamp(3rem,8vw,7rem)] font-display font-bold leading-[0.92] tracking-tight mb-12">
          <SplitText text="Amazon" delay={0.55} />{" "}
          <span className="overflow-hidden inline-block">
            <motion.span
              initial={{ y: "110%", rotateX: -80 }}
              animate={{ y: 0, rotateX: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: easeOutExpo }}
              className="inline-block text-gradient-primary italic font-medium"
              style={{ transformOrigin: "bottom" }}
            >
              Empire
            </motion.span>
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.9, ease: easeOutExpo }}
          className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto mb-14 font-body font-light leading-[1.8] tracking-wide"
        >
          We launch, optimize, and scale Amazon FBA brands — from product research
          to 7-figure revenue. End-to-end, done for you.
        </motion.p>

        {/* CTA Group */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: easeOutExpo }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-full transition-all duration-500 hover:shadow-[0_0_60px_-8px_hsl(265_85%_65%/0.6)] hover:scale-[1.04] overflow-hidden"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            <span className="relative z-10 flex items-center gap-2">
              Book a Free Audit
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center px-8 py-4 glass glass-border text-foreground font-body font-medium text-sm tracking-wide rounded-full transition-all duration-500 hover:border-primary/25 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.15)]"
          >
            Our Services
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-16 flex items-center justify-center gap-6 text-[11px] text-muted-foreground/50 font-mono tracking-wider uppercase"
        >
          <span>200+ Brands</span>
          <span className="w-1 h-1 rounded-full bg-primary/40" />
          <span>$50M+ Revenue</span>
          <span className="w-1 h-1 rounded-full bg-primary/40" />
          <span>97% Retention</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 hidden sm:flex"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-mono">Scroll</span>
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
