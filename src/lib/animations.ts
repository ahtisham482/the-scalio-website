// ─── THE SCALIO ANIMATION SYSTEM ───
// Single source of truth for all motion values.
// Every component imports from here — no local definitions.

export const ease = [0.16, 1, 0.3, 1] as const;

// ─── THE MASTER CLOCK ───
// Every animation duration on the site is a multiple of BASE_UNIT_MS.
// Creates subconscious rhythm across sections — visitors feel the tempo
// even when they can't name it. See docs/MAGNETIC_SCROLL_BRIEF.md §Cohesion Architecture §4.
//
//   0.5× (200ms) → micro-interactions, hover responses, instant feedback
//   1× (400ms)   → standard entrances, transitions, state changes
//   2× (800ms)   → section-level reveals, choreographed sequences
//   3× (1200ms)  → signature moments, hero entrance
//   5× (2000ms)  → maximum animation budget (hero sequence only)
//
// New animation durations MUST be multiples of BASE_UNIT_MS. Off-grid values
// are a deliberate system-level decision, never per-section convenience.
export const BASE_UNIT_MS = 400;
export const MS_HALF = 200; // 0.5×
export const MS_BASE = 400; // 1×
export const MS_DOUBLE = 800; // 2×
export const MS_TRIPLE = 1200; // 3×
export const MS_MAX = 2000; // 5×

// Pattern 1: Standard Entrance (70% of all animations)
// Duration: MS_DOUBLE (800ms) — on Master Clock grid (2×)
export const standardEntrance = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease },
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
// Duration: MS_DOUBLE (800ms) — on Master Clock grid (2×)
export const sectionStagger = (index: number) => ({
  ...standardEntrance,
  transition: { duration: 0.8, delay: index * STAGGER_DELAY, ease },
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
// Phase 1 cohesion pass (2026-04-15): dialed down from 2°/6px to fix the
// rhythm violation where Services (Level 5) was adjacent to Case Studies
// (Level 5). Services is now the calmer verse before Case Studies' climax.
export const PEER_LEAN_ANGLE = 1; // degrees — max angle a peer card rotates toward the focused one
export const FOCUS_ELEVATION = 3; // px — how far the focused card lifts
export const PEER_DIM_OPACITY = 0.82; // opacity of non-focused peer cards
export const RADIAL_WAVE_STAGGER = 0.12; // seconds per unit distance-from-center for entrance

// ─── LEVEL 4: Breaking Through (Hero Section) ───
// 4-phase sequence: atmospheric resistance (chromatic aberration + noise) →
// break-through snap → headline arrives from z-axis depth → supporting
// elements arrive simultaneously from varied directions.
// See docs/briefs/hero.md for full concept.
export const HERO_PRE_CHAOS_MS = 400; // duration of atmospheric resistance phase
export const HERO_HEADLINE_ARRIVAL_MS = 800; // z-axis travel duration (ms)
export const HERO_HEADLINE_START_SCALE = 1.15; // arrival starts "larger" for forward-travel feeling
export const HERO_HEADLINE_START_Z = -200; // px — z-offset for 3D arrival
export const HERO_HEADLINE_START_BLUR = 8; // px — blur at arrival start, decays to 0
export const HERO_SUPPORTING_DELAY_MS = 1000; // all supporting elements arrive simultaneously
export const HERO_ABERRATION_PX = 3; // chromatic aberration RGB offset during pre-chaos
export const HERO_TRUST_BADGE_OFFSETS = {
  left: { x: -20, y: -8 },
  center: { y: 20 },
  right: { x: 20, y: -8 },
} as const;

// ─── LEVEL 4: The Invitation (CTA Section) ───
// Signature moment: page narrows toward the form (scroll-linked glow
// expansion + ceiling gradient), form opens (radial pill bloom + perimeter
// trace), form listens (inhale/exhale on any field focus).
// See docs/briefs/cta.md for full concept.
export const CTA_GLOW_OPACITY_MIN = 0.03;
export const CTA_GLOW_OPACITY_MAX = 0.15;
export const CTA_GLOW_SIZE_MIN = { w: 700, h: 500 } as const;
export const CTA_GLOW_SIZE_MAX = { w: 900, h: 700 } as const;
export const CTA_CEILING_OPACITY_MAX = 0.35;
export const CTA_PILL_BLOOM_STAGGER = 0.08; // seconds per unit of distance from center pill
export const CTA_FORM_INHALE_SCALE = 1.002;

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
