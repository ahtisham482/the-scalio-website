import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface SectionBridgeProps {
  /** Short label describing what's coming (e.g., "How we do it") */
  label: string;
  /** Anchor id of the target section (e.g., "how-it-works") */
  targetId: string;
}

/**
 * A PROPEL element placed at the bottom of a section.
 *
 * Part of Phase 1 Cohesion (2026-04-15). The audit found that the site's
 * weakest attribute was PROPEL — sections released the visitor without
 * pulling them toward the next. This component creates a subtle, clickable
 * downward cue that both signals "there's more" and offers a fast path.
 *
 * Design:
 * - Small pulsing chevron in a rounded border
 * - Short "NEXT:" style label above (mono, uppercase, letter-spaced)
 * - Clickable anchor — smooth-scrolls to target section (Lenis handles it)
 * - Primary color on hover, muted by default
 * - Respects prefers-reduced-motion (pulse disabled, still present)
 * - Hidden on mobile menu open? No — always visible
 *
 * Usage: place near the end of a section, AFTER the section's own CTA if any.
 */
export const SectionBridge = ({ label, targetId }: SectionBridgeProps) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <motion.a
      href={`#${targetId}`}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group mt-16 md:mt-20 mb-2 flex flex-col items-center gap-3 text-muted-foreground/50 hover:text-primary transition-colors duration-300"
      aria-label={`Continue to ${label}`}
    >
      <span className="text-[10px] font-mono tracking-[0.25em] uppercase">
        Next &middot; {label}
      </span>
      <motion.div
        animate={reducedMotion ? {} : { y: [0, 4, 0] }}
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="w-9 h-9 rounded-full border border-current flex items-center justify-center transition-[border-color,background] duration-300 group-hover:border-primary/60 group-hover:bg-primary/5"
      >
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </motion.a>
  );
};

export default SectionBridge;
