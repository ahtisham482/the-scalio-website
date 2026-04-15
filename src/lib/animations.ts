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

// ─── LEVEL 4: Stage Lighting (Services Section) ───
// Signature moment: cards in a grid that notice each other. When one is
// focused, peers tilt toward it (peer-lean), dim slightly, and defer
// attention. See docs/briefs/services.md for full concept.
export const SPRING_LIQUID = { damping: 20, stiffness: 180, mass: 1 } as const;
export const PEER_LEAN_ANGLE = 2; // degrees — max angle a peer card rotates toward the focused one
export const FOCUS_ELEVATION = 6; // px — how far the focused card lifts
export const PEER_DIM_OPACITY = 0.82; // opacity of non-focused peer cards
export const RADIAL_WAVE_STAGGER = 0.12; // seconds per unit distance-from-center for entrance

// ─── LEVEL 4: Weight Transfer (Case Studies) ───
// Signature moment: Before numbers feel heavy/tired, After numbers arrive
// buoyant/alive, Growth % digits tick up in a crescendo.
// See docs/briefs/case-studies.md for full concept.
export const WEIGHT_TIRED_OPACITY = 0.55; // Before column opacity after After arrives
export const WEIGHT_TIRED_SCALE = 0.97; // Before column scale after After arrives
export const WEIGHT_TIRED_SATURATE = 0.55; // Before column CSS filter saturate() (static)
export const AFTER_LIFT_Y = -6; // px — After column enters from this offset
export const AFTER_ENTER_SCALE = 0.95; // After column enters at this scale
export const GROWTH_TICKER_MS = 800; // digit count-up duration
// Per-card entrance timeline (seconds, added on top of base stagger index * 0.12)
export const CASE_CARD_STAGES = {
  header: 0.2,
  intervention: 0.4,
  before: 0.6,
  after: 1.2, // 600ms after Before — the "weight transfer" moment
  beforeSink: 1.25, // Before sinks at almost the same instant After arrives
  growth: 1.5, // Growth pill crescendo starts 300ms after After lands
} as const;
