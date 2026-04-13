import { useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

interface MagneticConfig {
  radius?: number;
  strength?: number;
  damping?: number;
  stiffness?: number;
}

export function useMagnetic(config: MagneticConfig = {}) {
  const {
    radius = 80,
    strength = 0.25,
    damping = 20,
    stiffness = 300,
  } = config;
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping, stiffness });
  const springY = useSpring(y, { damping, stiffness });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setEnabled(!isTouch && !prefersReduced);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || !enabled) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);
      if (dist < radius) {
        const pull = (1 - dist / radius) * strength;
        x.set(distX * pull);
        y.set(distY * pull);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [enabled, radius, strength, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x: springX, y: springY, handleMouseMove, handleMouseLeave };
}
