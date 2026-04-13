import { useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface ParallaxConfig {
  range?: [number, number];
}

export function useParallax(config: ParallaxConfig = {}) {
  const { range = [-25, 25] } = config;
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setEnabled(!isMobile && !prefersReduced);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], enabled ? range : [0, 0]);

  return { ref, y };
}
