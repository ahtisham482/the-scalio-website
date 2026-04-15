import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import {
  HERO_PRE_CHAOS_MS,
  HERO_HEADLINE_ARRIVAL_MS,
  HERO_HEADLINE_START_SCALE,
  HERO_HEADLINE_START_Z,
  HERO_HEADLINE_START_BLUR,
  HERO_SUPPORTING_DELAY_MS,
  HERO_TRUST_BADGE_OFFSETS,
} from "./animations";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Hero "Breaking Through" choreography — Level 4.
 *
 * Four phases mapped 1:1 to the spacecraft-breaking-atmosphere metaphor:
 *   1. ATMOSPHERIC RESISTANCE (0 → 400ms): chaosActive=true → chromatic
 *      aberration + noise overlay visible. Eyebrow appears at 0.6 opacity.
 *   2. BREAK-THROUGH SNAP (400ms): chaosActive flips false. Overlays fade
 *      out. Eyebrow completes to opacity 1.
 *   3. HEADLINE ARRIVAL (450 → 1250ms): z-axis motion from -200 → 0 with
 *      scale 1.15 → 1.0 + blur 8px → 0 + opacity 0 → 1. Ease-out-expo.
 *   4. SIMULTANEOUS SETTLE (1000 → 1400ms): all supporting elements arrive
 *      AT ONCE from varied directions (not sequential stagger).
 *
 * CTA clickable by t=1400ms.
 */
export function useHeroSequence() {
  const eyebrow = useAnimation();
  const headline = useAnimation();
  const subheadline = useAnimation();
  const trustBadges = useAnimation();
  const cta = useAnimation();
  const [chaosActive, setChaosActive] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      // Reduced motion: skip all choreography, set everything to final state
      setChaosActive(false);
      eyebrow.set({ opacity: 1, y: 0 });
      headline.set({
        opacity: 1,
        scale: 1,
        z: 0,
        filter: "blur(0px)",
      });
      subheadline.set({ opacity: 1, y: 0 });
      trustBadges.set({ opacity: 1, x: 0, y: 0 });
      cta.set({ opacity: 1, z: 0, scale: 1 });
      setReady(true);
      return;
    }

    let cancelled = false;
    const run = async () => {
      // ─── PHASE 1: Atmospheric resistance (0 → 400ms) ───
      // Eyebrow appears at partial opacity during chaos
      eyebrow.start({
        opacity: 0.6,
        y: 0,
        transition: { duration: 0.4, ease },
      });

      // ─── PHASE 2: Break-through snap (at 400ms) ───
      await new Promise((r) => setTimeout(r, HERO_PRE_CHAOS_MS));
      if (cancelled) return;
      setChaosActive(false);
      eyebrow.start({
        opacity: 1,
        transition: { duration: 0.3, ease },
      });

      // ─── PHASE 3: Headline arrives from depth (450 → 1250ms) ───
      // Small gap (50ms) between snap and headline arrival for "silence" beat
      await new Promise((r) => setTimeout(r, 50));
      if (cancelled) return;
      headline.start({
        opacity: 1,
        scale: 1,
        z: 0,
        filter: "blur(0px)",
        transition: {
          duration: HERO_HEADLINE_ARRIVAL_MS / 1000,
          ease,
        },
      });

      // ─── PHASE 4: Simultaneous settle (at 1000ms) ───
      // All supporting elements arrive at the SAME moment (not staggered)
      const supportingStartDelay =
        HERO_SUPPORTING_DELAY_MS - (HERO_PRE_CHAOS_MS + 50);
      await new Promise((r) => setTimeout(r, supportingStartDelay));
      if (cancelled) return;

      subheadline.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease },
      });

      // All three trust badges animate to (x:0, y:0, opacity:1) from their
      // individual initial positions (left/center/right offsets).
      trustBadges.start({
        opacity: 1,
        x: 0,
        y: 0,
        transition: { type: "spring", damping: 18, stiffness: 160 },
      });

      cta.start({
        opacity: 1,
        z: 0,
        scale: 1,
        transition: { type: "spring", damping: 14, stiffness: 180 },
      });

      await new Promise((r) => setTimeout(r, 400));
      if (cancelled) return;
      setReady(true);
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [eyebrow, headline, subheadline, trustBadges, cta]);

  return {
    eyebrow,
    headline,
    subheadline,
    trustBadges,
    cta,
    chaosActive,
    ready,
    // Initial states — apply these on the elements via `initial` prop
    initial: {
      eyebrow: { opacity: 0, y: 8 },
      headline: {
        opacity: 0,
        scale: HERO_HEADLINE_START_SCALE,
        z: HERO_HEADLINE_START_Z,
        filter: `blur(${HERO_HEADLINE_START_BLUR}px)`,
      },
      subheadline: { opacity: 0, y: 24 },
      // Trust badges share one animation target but have per-position initials
      trustBadges: {
        left: { opacity: 0, ...HERO_TRUST_BADGE_OFFSETS.left },
        center: { opacity: 0, ...HERO_TRUST_BADGE_OFFSETS.center },
        right: { opacity: 0, ...HERO_TRUST_BADGE_OFFSETS.right },
      },
      cta: { opacity: 0, z: 40, scale: 1.05 },
    },
  };
}
