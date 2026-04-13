// ─── THE SCALIO ANIMATION SYSTEM ───
// Single source of truth for all motion values.
// Every component imports from here — no local definitions.

export const ease = [0.16, 1, 0.3, 1] as const;

// Pattern 1: Standard Entrance (70% of all animations)
export const standardEntrance = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease },
};

// Pattern 3: Emphasis Entrance (hero headline, pull quotes, key metrics)
export const emphasisEntrance = {
  initial: { opacity: 0, y: 32, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease },
};

// Pattern 2: Stagger — apply to children via delay
export const STAGGER_DELAY = 0.12;

// Viewport settings
export const viewport = { once: true, amount: 0.2 } as const;
export const viewportEarly = { once: true, margin: "200px" } as const;

// Standard delays for sequential elements within a section
export const sectionStagger = (index: number) => ({
  ...standardEntrance,
  transition: { duration: 0.6, delay: index * STAGGER_DELAY, ease },
});

// ─── LEVEL 2: Spring Physics ───
export const springBounce = { damping: 12, stiffness: 200, mass: 1 };
export const springSnap = { damping: 20, stiffness: 300, mass: 0.8 };
export const springGentle = { damping: 25, stiffness: 150, mass: 1 };

// ─── LEVEL 2: Micro-animation presets ───
export const microBounceEntrance = {
  initial: { scale: 0.85, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  viewport: { once: true, amount: 0.5 },
  transition: { type: "spring" as const, ...springBounce },
};
