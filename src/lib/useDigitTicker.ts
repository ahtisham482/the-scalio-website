import { useEffect, useState } from "react";

/**
 * Count-up ticker for numeric strings like "1,442%" or "611%".
 *
 * When `active` becomes true, animates `display` from 0 → target over `duration` ms
 * with ease-out-expo. Formats with locale commas. Preserves trailing "%" if present.
 *
 * Non-numeric input (e.g. "New Launch") is passed through unchanged with
 * `isNumeric: false` so callers can render it without ticker styling.
 *
 * Used by Case Studies "Weight Transfer" — the growth pill crescendo.
 */
export function useDigitTicker(
  target: string,
  duration: number = 800,
  active: boolean = true,
): { display: string; isNumeric: boolean } {
  const numericMatch = target.match(/^([\d,]+)%?$/);
  const isNumeric = numericMatch !== null;
  const targetNumber = isNumeric
    ? parseInt(numericMatch[1].replace(/,/g, ""), 10)
    : 0;
  const hasPercent = target.includes("%");

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isNumeric) return;
    if (!active) {
      setCurrent(0);
      return;
    }

    const startTime = performance.now();
    let rafId = 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-expo: slow start, fast finish — feels like the number is "earned"
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(Math.round(targetNumber * eased));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, duration, active, isNumeric, targetNumber]);

  if (!isNumeric) {
    return { display: target, isNumeric: false };
  }
  return {
    display: current.toLocaleString() + (hasPercent ? "%" : ""),
    isNumeric: true,
  };
}
