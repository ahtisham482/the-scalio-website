import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.16, 1, 0.3, 1];

export function useHeroSequence() {
  const eyebrow = useAnimation();
  const headline = useAnimation();
  const subheadline = useAnimation();
  const trustBadges = useAnimation();
  const cta = useAnimation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      // Instant — no motion
      eyebrow.set({ opacity: 1, y: 0 });
      headline.set({ opacity: 1, clipPath: "inset(0% 0 0 0)" });
      subheadline.set({ opacity: 1, y: 0 });
      trustBadges.set({ opacity: 1, y: 0 });
      cta.set({ opacity: 1, y: 0, scale: 1 });
      setReady(true);
      return;
    }

    const run = async () => {
      // t=0ms: Eyebrow fades in
      eyebrow.start({ opacity: 1, y: 0, transition: { duration: 0.5, ease } });

      // t=150ms: Headline reveals via clip-path mask
      await new Promise((r) => setTimeout(r, 150));
      headline.start({
        opacity: 1,
        clipPath: "inset(0% 0 0 0)",
        transition: { duration: 0.8, ease },
      });

      // t=500ms: Subheadline slides in
      await new Promise((r) => setTimeout(r, 350));
      subheadline.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease },
      });

      // t=700ms: Trust badges arrive
      await new Promise((r) => setTimeout(r, 200));
      trustBadges.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease },
      });

      // t=800ms: CTA button with spring overshoot
      await new Promise((r) => setTimeout(r, 100));
      cta.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          opacity: { duration: 0.4, ease },
          y: { duration: 0.5, ease },
          scale: { type: "spring", damping: 12, stiffness: 200 },
        },
      });

      setReady(true);
    };

    run();
  }, [eyebrow, headline, subheadline, trustBadges, cta]);

  return {
    eyebrow,
    headline,
    subheadline,
    trustBadges,
    cta,
    ready,
    // Initial states — set these on the elements
    initial: {
      eyebrow: { opacity: 0, y: 20 },
      headline: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
      subheadline: { opacity: 0, y: 24 },
      trustBadges: { opacity: 0, y: 24 },
      cta: { opacity: 0, y: 24, scale: 0.92 },
    },
  };
}
