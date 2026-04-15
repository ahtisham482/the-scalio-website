import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Users,
  ArrowUpRight,
  Phone,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { services } from "@/data/services";
import {
  CardFocusProvider,
  useCardFocus,
  computePeerLean,
  distanceFromCenter,
  type CardPosition,
} from "@/lib/useCardFocus";
import {
  SPRING_LIQUID,
  PEER_LEAN_ANGLE,
  FOCUS_ELEVATION,
  PEER_DIM_OPACITY,
  RADIAL_WAVE_STAGGER,
} from "@/lib/animations";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// Grid layout constants — must match the CSS grid (lg:grid-cols-3 with 6 cards = 3×2)
const TOTAL_COLS = 3;
const TOTAL_ROWS = 2;

/** Returns true when the device has a fine pointer (mouse/trackpad, not touch) */
function useHasFinePointer(): boolean {
  const [hasFine, setHasFine] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    setHasFine(mql.matches);
    const handler = (e: MediaQueryListEvent) => setHasFine(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return hasFine;
}

/** Returns true when prefers-reduced-motion is set — used to gate all motion */
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return reduced;
}

type Service = (typeof services)[number];
type Role = "focused" | "peer" | "idle";

// ─── ServiceCard ───
// Each card subscribes to CardFocusContext and computes its role:
//   focused = this card is the one being hovered (cursor tilt + spotlight glow + lift)
//   peer    = another card is focused (this card leans toward it + dims)
//   idle    = nothing is focused (ambient breathing)
const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const Icon = service.icon;
  const hasFinePointer = useHasFinePointer();
  const reducedMotion = useReducedMotion();
  const { focusedSlug, setFocused, registerCard, getPosition } = useCardFocus();

  // Grid position (row, col) — used for peer-lean math and radial entrance
  const pos: CardPosition = {
    col: index % TOTAL_COLS,
    row: Math.floor(index / TOTAL_COLS),
  };

  // Register this card's grid position so peer cards can compute their lean angle
  useEffect(() => {
    registerCard(service.slug, pos);
  }, [service.slug, pos.col, pos.row, registerCard]);

  const role: Role =
    focusedSlug === null
      ? "idle"
      : focusedSlug === service.slug
        ? "focused"
        : "peer";

  // Local cursor-driven tilt — only used while this card is focused
  const [cursorTilt, setCursorTilt] = useState({ rx: 0, ry: 0, ox: 0, oy: 0 });

  const handleMouseEnter = useCallback(() => {
    if (!hasFinePointer || reducedMotion) return;
    setFocused(service.slug);
  }, [hasFinePointer, reducedMotion, service.slug, setFocused]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hasFinePointer || reducedMotion) return;
      if (focusedSlug !== service.slug) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setCursorTilt({ rx: -y * 6, ry: x * 6, ox: x, oy: y });
    },
    [hasFinePointer, reducedMotion, focusedSlug, service.slug],
  );

  // Compute target rotation based on role
  // - focused: cursor-driven 3D tilt (Level 2 preserved)
  // - peer: static lean toward focused card's grid position
  // - idle: no rotation (breathing handles motion)
  let targetRotateX = 0;
  let targetRotateY = 0;

  if (!reducedMotion && hasFinePointer) {
    if (role === "focused") {
      targetRotateX = cursorTilt.rx;
      targetRotateY = cursorTilt.ry;
    } else if (role === "peer") {
      const focusedPos = focusedSlug ? getPosition(focusedSlug) : null;
      if (focusedPos) {
        const lean = computePeerLean(pos, focusedPos, PEER_LEAN_ANGLE);
        targetRotateX = lean.rotateX;
        targetRotateY = lean.rotateY;
      }
    }
  }

  // Radial entrance: cards near grid center appear first
  const centerDist = distanceFromCenter(pos, TOTAL_COLS, TOTAL_ROWS);
  const entranceDelay = centerDist * RADIAL_WAVE_STAGGER;

  // Internal parallax intensity falls off by role
  // (focused sees full parallax, peer sees a trace, idle sees none)
  const parallaxIntensity = role === "focused" ? 1 : role === "peer" ? 0.3 : 0;

  // Ambient breathing — only runs in idle state on fine-pointer, motion-enabled devices
  // Sub-perceptual: 0.3% scale shift over 6s, phase-offset per card so they don't sync
  const shouldBreathe = role === "idle" && hasFinePointer && !reducedMotion;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{
        duration: 0.7,
        delay: entranceDelay,
        ease: easeOutExpo,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      className="relative"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        animate={{
          rotateX: targetRotateX,
          rotateY: targetRotateY,
          y: role === "focused" ? -FOCUS_ELEVATION : 0,
          opacity: role === "peer" ? PEER_DIM_OPACITY : 1,
          scale: shouldBreathe ? [1, 1.003, 1] : 1,
        }}
        transition={{
          rotateX: { type: "spring", ...SPRING_LIQUID },
          rotateY: { type: "spring", ...SPRING_LIQUID },
          y: { type: "spring", ...SPRING_LIQUID },
          opacity: { duration: 0.4, ease: easeOutExpo },
          scale: shouldBreathe
            ? {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 1.5,
              }
            : { type: "spring", ...SPRING_LIQUID },
        }}
        style={{
          transformStyle: "preserve-3d",
          boxShadow:
            role === "focused"
              ? "0 20px 60px -12px hsl(var(--primary) / 0.25), 0 0 40px -8px hsl(var(--primary) / 0.15)"
              : "none",
          transition: "box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className={`relative overflow-hidden p-7 lg:p-9 rounded-2xl bg-card border flex flex-col transition-colors duration-500 ${
          role === "focused" ? "border-primary/30" : "border-border"
        }`}
      >
        {/* Focused-state spotlight — radial gradient from top-center */}
        <motion.div
          animate={{ opacity: role === "focused" ? 1 : 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.08), transparent 60%)",
          }}
        />

        <div className="relative z-10 flex flex-col flex-1">
          {/* Icon — parallax floats by role intensity */}
          <motion.div
            animate={{
              x: -cursorTilt.ox * 8 * parallaxIntensity,
              y: -cursorTilt.oy * 8 * parallaxIntensity,
              backgroundColor:
                role === "focused"
                  ? "hsl(var(--primary) / 0.1)"
                  : "hsl(var(--secondary))",
            }}
            transition={{
              x: { type: "spring", ...SPRING_LIQUID },
              y: { type: "spring", ...SPRING_LIQUID },
              backgroundColor: { duration: 0.4 },
            }}
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
            style={{
              boxShadow:
                role === "focused"
                  ? "0 0 20px -4px hsl(var(--primary) / 0.3)"
                  : "none",
              transition: "box-shadow 0.4s ease",
            }}
          >
            <motion.div
              animate={{
                rotate: role === "focused" ? 15 : 0,
                scale: role === "focused" ? 1.1 : 1,
              }}
              transition={{ type: "spring", ...SPRING_LIQUID }}
            >
              <Icon className="w-5 h-5 text-primary" />
            </motion.div>
          </motion.div>

          {/* Title — subtle parallax */}
          <motion.h3
            animate={{
              x: -cursorTilt.ox * 2 * parallaxIntensity,
              y: -cursorTilt.oy * 2 * parallaxIntensity,
            }}
            transition={{ type: "spring", ...SPRING_LIQUID }}
            className="text-lg font-display font-semibold text-foreground mb-1.5"
          >
            <a
              href={`/services/${service.slug}`}
              className="hover:text-primary transition-colors duration-300"
            >
              {service.title}
            </a>
          </motion.h3>

          {/* Hook */}
          <p className="text-sm italic text-primary/80 font-body mb-4">
            {service.hook}
          </p>

          {/* Deliverables checklist */}
          <div className="mb-5 flex-1">
            <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60 block mb-2.5">
              What&apos;s included
            </span>
            <ul className="space-y-1.5">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground font-body font-light leading-relaxed"
                >
                  <Check className="w-3.5 h-3.5 text-primary/60 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Best for */}
          <div className="flex items-start gap-2 py-3 border-t border-border/40 mb-3">
            <Users className="w-3.5 h-3.5 text-muted-foreground/50 mt-0.5 shrink-0" />
            <span className="text-[11px] text-muted-foreground/70 font-body leading-relaxed">
              <span className="font-medium text-muted-foreground">
                Best for:
              </span>{" "}
              {service.bestFor}
            </span>
          </div>

          {/* Case study link */}
          {service.caseStudyLink && (
            <a
              href={service.caseStudyLink}
              className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-primary/70 hover:text-primary transition-colors duration-300 group/link"
            >
              {service.caseStudyTeaser || "See results"}
              <ArrowUpRight className="w-3 h-3 shrink-0 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          )}
        </div>

        {/* Corner accent — only on focused */}
        <motion.div
          animate={{ opacity: role === "focused" ? 1 : 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="absolute top-4 right-4 w-8 h-8 pointer-events-none"
        >
          <div className="absolute top-0 right-0 w-4 h-px bg-primary/40" />
          <div className="absolute top-0 right-0 h-4 w-px bg-primary/40" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ─── ServicesGrid (inside CardFocusProvider) ───
// Extracted so it can call useCardFocus() for the grid-level onMouseLeave reset
const ServicesGrid = () => {
  const { setFocused } = useCardFocus();

  return (
    <div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
      style={{ perspective: 1000 }}
      onMouseLeave={() => setFocused(null)}
    >
      {services.map((service, i) => (
        <ServiceCard key={service.slug} service={service} index={i} />
      ))}
    </div>
  );
};

// ─── ServicesSection (main) ───
const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative py-20 lg:py-28 px-6"
      aria-labelledby="services-heading"
    >
      <div className="absolute top-0 left-0 right-0 line-accent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-[11px] tracking-[0.2em] uppercase text-primary font-mono">
              Services
            </span>
            <h2
              id="services-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 leading-[1.05]"
            >
              Find your{" "}
              <span className="italic text-gradient-primary font-medium">
                growth lever
              </span>
            </h2>
          </div>
          <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-sm font-light">
            Every Amazon seller has a different bottleneck. Find yours below —
            then let us fix it.
          </p>
        </motion.div>

        {/* Bento Grid — Level 4: Stage Lighting (cards aware of each other) */}
        <CardFocusProvider>
          <ServicesGrid />
        </CardFocusProvider>

        {/* Team composition note */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
          className="mt-12 max-w-3xl mx-auto rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm p-6 md:p-8 text-center"
        >
          <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-primary mb-4">
            Your dedicated team
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-4">
            {[
              "Account Strategist",
              "PPC Specialist",
              "Copywriter",
              "Graphic Designer",
            ].map((role) => (
              <span
                key={role}
                className="flex items-center gap-1.5 text-sm font-body text-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                {role}
              </span>
            ))}
          </div>
          <div className="w-full h-px bg-border/40 my-5" />

          <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-primary mb-4">
            How we stay connected
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Phone,
                title: "Weekly Calls",
                desc: "30-min strategy call every week with your account lead",
              },
              {
                icon: MessageSquare,
                title: "Slack Channel",
                desc: "Dedicated channel with your team — responses within hours",
              },
              {
                icon: BarChart3,
                title: "Live Dashboard",
                desc: "Real-time KPIs: revenue, ACoS, rank, and conversion data",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background/50 border border-border/30"
                >
                  <Icon className="w-5 h-5 text-primary/70" />
                  <span className="text-sm font-body font-semibold text-foreground">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-body text-center leading-relaxed">
                    {item.desc}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground/60 font-body italic mt-5">
            Full transparency is non-negotiable for us.
          </p>
        </motion.div>

        {/* Mid-page CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-full transition-all duration-500 hover:shadow-[0_0_40px_-8px_hsl(217_91%_60%/0.5)] hover:scale-[1.03]"
          >
            Get a Free Growth Audit
          </a>
          <p className="text-muted-foreground/50 font-body text-xs mt-3">
            No commitment. Results in 48 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
