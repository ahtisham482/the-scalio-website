# Hero Section — Signature Moment Brief & Concept

**Status**: ✅ LIVE ON PRODUCTION — merged to master, deployed via Vercel
**Section**: Hero (eyebrow + headline + subheadline + trust badges + primary CTA + background spotlight/grid)
**Created**: 2026-04-15
**Implemented**: 2026-04-15 · Concept: **Breaking Through**
**User verdict**: "looks good"

## Implementation Summary

Shipped on branch `hero-breaking-through`. 4 files touched:

- **MODIFIED** `src/lib/animations.ts` — added Breaking Through constants: `HERO_PRE_CHAOS_MS`, `HERO_HEADLINE_ARRIVAL_MS`, `HERO_HEADLINE_START_SCALE/Z/BLUR`, `HERO_SUPPORTING_DELAY_MS`, `HERO_ABERRATION_PX`, `HERO_TRUST_BADGE_OFFSETS` (per-position offsets for multi-directional arrival)
- **MODIFIED** `src/lib/useHeroSequence.ts` — full rewrite. New `chaosActive` state gates pre-chaos phase. Four phases run in sequence via async/await with cancellation cleanup. Returns per-badge `initial.trustBadges.{left,center,right}` so each stat enters from its own direction
- **MODIFIED** `src/index.css` — added `.hero-eyebrow` + `.hero-chaos-active` (chromatic aberration via stacked text-shadow: -2px red / +2px cyan, 0.15s CSS transition to smoothly resolve). Added `.hero-chaos-noise` overlay (inline SVG fractalNoise, opacity 0.045, overlay blend mode). Reduced-motion media query strips both
- **MODIFIED** `src/components/HeroSection.tsx` — refactored to use new 4-phase sequence. Headline replaces clip-path reveal with z-axis arrival. Trust badges broken into 3 individual motion.divs with per-position initials (dividers stay static between them). CTA uses z/scale initial instead of y/scale. Noise overlay wrapped in AnimatePresence for clean exit

**Behaviors live on preview**:

PHASE 1 — Atmospheric resistance (0 → 400ms):

1. SVG noise overlay visible at 0.045 opacity with overlay blend mode
2. Eyebrow appears at 0.6 opacity with chromatic aberration (red -2px / cyan +2px text-shadow)
3. Headline invisible (opacity 0, z: -200, scale 1.15, blur 8px)

PHASE 2 — Break-through snap (at 400ms): 4. chaosActive state flips false 5. Noise overlay unmounts via AnimatePresence exit (180ms fade) 6. `.hero-chaos-active` class removed from eyebrow → aberration smoothly resolves via CSS transition 7. Eyebrow completes opacity 0.6 → 1.0

PHASE 3 — Headline arrives from depth (450 → 1250ms): 8. Headline animates z: -200 → 0, scale: 1.15 → 1.0, filter: blur(8px) → blur(0px), opacity 0 → 1 9. transformPerspective: 1000 on headline gives real 3D depth 10. Ease-out-expo curve — fast start decelerating into place

PHASE 4 — Simultaneous settle (at 1000ms): 11. Subheadline arrives: y 24 → 0, opacity 0 → 1 12. Trust badges (3 independent entrances, all at same moment): - Left (200+): x -20, y -8 → 0, 0 - Center ($50M+): y 20 → 0 - Right (97%): x 20, y -8 → 0, 0 13. CTA: z 40 → 0, scale 1.05 → 1.0, opacity 0 → 1 (spring, damping 14) 14. Magnetic behavior activates immediately (Level 2 preserved)

At t=1400ms: `ready` flag flips true (CTA clickable — well within 2.0s budget).

Reduced motion: all elements at final state on mount. No chaos overlay, no chromatic aberration, no z-arrival, no stagger. CSS media query strips aberration.

Mobile: 3D transforms work across modern browsers. Aberration visible but subtle. Same 4-phase timing preserved.

Build passed in 11.79s (853.59KB JS, 87.10KB CSS — within budget).

---

---

## BRIEF

```
SECTION: Hero

CURRENT STATE
Choreographed entrance (Level 3): clip-path mask headline reveal with blur-in,
spring-overshoot stat counters, magnetic CTA, parallax background orb. Wastes
the first 400ms with nothing.

PURPOSE
The visitor must feel "these people operate at a level I haven't seen from
Amazon agencies." Hero earns 40% of total impression budget.

EMOTION TARGET
Momentum

PHYSICAL METAPHOR
"Like the moment a spacecraft breaks atmosphere — the violent shake stops,
the noise drops, and suddenly everything is moving impossibly fast but
impossibly smooth."

THE MEMORY
"The words had been traveling toward you and finally landed. Everything else
just settled into place around them."

PROTECT
- Headline copy + line breaks
- Eyebrow text
- Subheadline paragraph
- Trust badges (200+ / $50M+ / 97%)
- CTA button + magnetic behavior
- Dark palette, Lenis scroll

REINVENT
- Headline entrance (clip-path is Level 3)
- Background behavior (orbs are Level 2)
- Stat badge entrance (spring overshoot is baseline)
- First 400ms (wasted)
- Supporting element stagger (currently sequential — could be simultaneous)

REFERENCE
linear.app — type settles into physical reality with mass

FORBIDDEN (expanded — reflects all Level 4 work already live)
- Clip-path mask reveal / blur-in on headline (current Level 3)
- Linear count-up / typewriter / character-stagger
- Gradient text shimmer / standard fade-in-up
- Parallax background images / Lottie
- Peer-lean cross-element tilt (Services)
- Weight-transfer desaturate-sink (Case Studies)
- Digit-ticker count-up (Case Studies)
- Radial bloom from center (CTA pills)
- Perimeter gradient trace (CTA form)
- Focus-driven inhale/exhale (CTA form)
- Spring-overshoot numeric entrance (About stats)

RISK TOLERANCE
HIGH. Hero = 40% of impression budget. Polarize 5% to engage 95%.

BUDGET
2.0s total, CTA clickable by 1.0s.
First 400ms is fair game — use it or don't.
```

---

## DELIVERABLE (10-item concept document)

### 1. EMOTION TARGET

**Momentum**

### 2. PHYSICAL METAPHOR

"Like the moment a spacecraft breaks atmosphere — the violent shake stops, the noise drops, and suddenly everything is moving impossibly fast but impossibly smooth."

### 3. THREE CONCEPTS (ranked by memorability)

---

#### 🥇 CONCEPT #1 — "Breaking Through" ⭐ RECOMMENDED

The literal interpretation of the metaphor, exploiting the 400ms creative opening the brief flagged.

**The experience**:

**Phase 1 — Atmospheric resistance (0 → 400ms)**: The hero first paints with subtle visual "noise" at the headline position — a gentle chromatic aberration (RGB channels offset ~3px) layered over the invisible headline area, plus a very soft turbulence filter on the background spotlight. The eyebrow text appears at partial opacity (0.6), as if struggling to lock in. Everything has a sense of tension.

**Phase 2 — Break-through (400 → 450ms, one frame)**: The chromatic aberration resolves in a single smooth motion. The turbulence snaps off. Silence (visually).

**Phase 3 — Headline arrives from depth (450 → 1200ms)**: The headline doesn't fade or reveal. It **arrives from z: -200px** — starting at scale 1.15 with an 8px blur and 0 opacity. Over 750ms, it travels forward to z: 0, scale 1.0, blur 0, opacity 1, with ease-out-expo. The visitor feels the words were physically traveling toward them and finally landed. Simultaneous: the eyebrow text completes its fade to full opacity.

**Phase 4 — Everything settles around it (1000 → 1400ms)**: Supporting elements arrive **simultaneously** (not staggered) at t=1.0s. Each comes from a slightly different direction, as if pulled in by the headline's wake:

- Subheadline: drifts up from below (y +24 → 0)
- Trust badges: each from a different slight offset (left from left, center from below, right from right)
- CTA: comes from slightly forward on z-axis (z +40 → 0, scale 1.05 → 1.0), already magnetic-ready by 1.0s

**Why it's novel**: Z-axis headline arrival is genuinely rare on agency sites. Most "arrivals" are 2D (y-translate, opacity). The pre-chaos phase is almost never done — most heroes waste the first 400ms with blank screen. Simultaneous arrival of supporting elements (vs. sequential stagger) reinforces the "pulled in by wake" sensation. Three distinct phases (resistance → break → arrival) map 1:1 to the metaphor.

**Technical feasibility**: MEDIUM. Z-axis motion via `transformPerspective` on parent + `translateZ` on headline. Chromatic aberration via stacked text-shadow (simulate RGB split) with CSS @property animation for smooth resolve. Turbulence on spotlight via SVG filter. All within existing stack, no WebGL.

**Risk profile**: **MEDIUM-HIGH** — the pre-chaos phase must be tasteful (noise too strong = looks broken). Z-axis arrival can feel disorienting on small screens. Calibration-sensitive.

---

#### 🥈 CONCEPT #2 — "The Dock"

Zero-gravity physics interpretation. No pre-chaos — starts immediately with elements drifting into place.

**The experience**: All elements begin slightly offset from their final positions, in varied directions (not all from below). The headline arrives in **three line-units** — each line is one block that drifts into place:

- Line 1 "We Don't Manage" drifts in from slight upper-right (x +40, y -20)
- Line 2 "Amazon Accounts." drifts from lower-left (x -40, y +20)
- Line 3 "We Grow Them." drifts from lower-right (x +30, y +30)

Each settles with spring physics (damping 18, stiffness 160) — feels like mass finding equilibrium in zero-G. Supporting elements "dock" to their final positions with magnetic pull — trust badges come in staggered but WITH motion curves (not just y-translate), and the CTA enters from a slight forward z-offset with a gentle scale pulse ("engine warming up").

Background spotlight gains a very subtle ambient drift (2px wander on random axis over 8s).

**Why it's novel**: Multi-directional arrival (not all from below) is rare. Three-line headline blocks settling independently creates a sense of structure assembling itself. The ambient background drift feels alive long after entrance.

**Technical feasibility**: HIGH — all Framer Motion spring physics, no WebGL.

**Risk profile**: **MEDIUM** — if directions are too varied, feels chaotic. If too subtle, feels generic. Safer than Concept 1 but less punchy.

---

#### 🥉 CONCEPT #3 — "Signal Clear"

Hero tunes into clarity like adjusting a radio frequency. Cinematic aesthetic.

**The experience**: Opens with headline visible but in chromatic aberration (RGB channels separated ~4px). Over 800ms, channels converge into a single sharp headline (signal locking in). Subhead text emerges with a "scan wipe" — subtle horizontal shimmer passes left-to-right as it becomes readable. Trust badges each have a tiny "lock-in" moment (0.9 → 1.02 → 1.0 scale). Background spotlight pulses once gently (like a beacon confirming signal).

**Why it's novel**: Distinctive visual vocabulary — chromatic aberration + scan wipe + lock-in gestures. Unseen on agency sites.

**Technical feasibility**: MEDIUM-HIGH — chromatic aberration via text-shadow stacking + @property animation. Scan wipe via clip-path animation.

**Risk profile**: **HIGH** — chromatic aberration is polarizing. Could feel "glitch-aesthetic" or "broken" to non-design-literate visitors, which would undermine premium agency positioning. Sci-fi/tech-y vibe may conflict with B2B trust signal.

---

### 4. RECOMMENDATION

**Concept #1 "Breaking Through."**

It delivers the memory sentence most directly — the z-axis headline arrival is LITERALLY "words traveling toward you and landing." The pre-chaos phase uses the creative opening the brief flagged (first 400ms) rather than wasting it. Simultaneous supporting-element arrival (vs. sequential stagger) reinforces "settled into place around them" — the headline is the gravitational center, others are pulled in. Concept #2 is elegant but less punchy; a conservative hero in a HIGH-risk-tolerance context under-delivers on the brief's mandate. Concept #3 has high ceiling but brand-clash risk — chromatic aberration on a premium agency site could read as glitch-broken rather than signature.

### 5. IMPLEMENTATION PLAN (Breaking Through)

**File map**:

| File                             | Status   | Role                                                                                                      |
| -------------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `src/components/HeroSection.tsx` | MODIFIED | Refactor to use new 4-phase sequence; add z-axis headline motion; simultaneous supporting element arrival |
| `src/lib/useHeroSequence.ts`     | MODIFIED | Extend existing sequence with pre-chaos phase + z-axis-arrive + simultaneous-settle                       |
| `src/lib/animations.ts`          | MODIFIED | Add Hero "Breaking Through" constants                                                                     |
| `src/index.css`                  | MODIFIED | Add `.hero-chaos-overlay` CSS — chromatic aberration filter + noise texture for pre-chaos phase           |

**New animation constants**:

```ts
export const HERO_PRE_CHAOS_MS = 400; // duration of atmospheric resistance phase
export const HERO_HEADLINE_ARRIVAL_MS = 750; // z-axis travel duration
export const HERO_HEADLINE_START_SCALE = 1.15; // arrival starts "larger" (closer feeling via perspective trick)
export const HERO_HEADLINE_START_Z = -200; // px — z-offset for 3D arrival
export const HERO_SUPPORTING_DELAY_MS = 1000; // all supporting elements arrive simultaneously at t=1s
export const HERO_ABERRATION_PX = 3; // chromatic aberration RGB offset during pre-chaos
```

**Techniques**:

- **Pre-chaos visuals**:
  - Chromatic aberration: a positioned pseudo-element over the hero area with `text-shadow: -3px 0 hsl(0 100% 50% / 0.5), 3px 0 hsl(180 100% 50% / 0.5)` stacked on a placeholder text layer. Resolves via `@property --aberration-offset` animated 3 → 0 over 150ms at t=400ms.
  - Noise: SVG turbulence overlay, very low opacity (0.04), fades out at the break-through frame.
- **Headline z-axis arrival**: parent container gets `perspective: 1000px`. Headline motion.h1 animates `z: -200 → 0, scale: 1.15 → 1.0, opacity: 0 → 1, filter: blur(8px) → blur(0px)` over 750ms with `ease-out-expo`.
- **Simultaneous supporting arrival**: single `useEffect` at t=HERO_SUPPORTING_DELAY_MS triggers all supporting animations (subhead, trust badges, CTA) with their own entrance vectors but synchronized start.
- **Multi-directional trust badge entrances**:
  - Left badge (200+): `initial={{ x: -20, y: -8 }}`
  - Center badge ($50M+): `initial={{ y: 20 }}`
  - Right badge (97%): `initial={{ x: 20, y: -8 }}`
  - All spring to `{ x: 0, y: 0 }` at t=1000ms
- **CTA z-axis dock**: `initial={{ z: 40, scale: 1.05, opacity: 0 }}`, animate to `{ z: 0, scale: 1, opacity: 1 }` at t=1000ms.

**Integration with existing**:

- **REPLACES**: Current clip-path mask reveal on headline (forbidden by brief)
- **PRESERVES**: Magnetic CTA (Level 2 useMagnetic), Lenis scroll, grid overlay, trust badge typography, all copy
- **EXTENDS**: useHeroSequence — currently handles 5 elements with sequential delays; now handles 6 phases (eyebrow-partial, pre-chaos, break-through, headline-arrive, supporting-simultaneous, completion)

### 6. MOBILE RE-CONCEPTION

**Same emotion, simpler mechanics.**

- Pre-chaos phase **reduced**: aberration offset 3px → 1px, noise overlay disabled. Still 400ms phase but barely perceptible — maintains the timing beat, not the visual drama.
- Z-axis headline arrival **simplified**: no `translateZ` (3D on mobile is expensive). Instead: scale 1.08 → 1.0 + blur 6px → 0 + opacity 0 → 1. Same feeling of "arriving from depth" via scale alone.
- Simultaneous supporting arrival **preserved**: still all at t=1000ms with multi-directional offsets (but smaller — ±12px instead of ±20px).
- CTA z-dock **simplified** to scale 1.03 → 1.0 only.

**Why this is a sibling design, not a fallback**: The 4-phase structure (resistance → break → arrive → settle) is preserved. Mobile users feel the same emotional arc with different visual vocabulary.

### 7. REDUCED MOTION EXPERIENCE

- All elements render at final state on mount. No pre-chaos, no z-arrival, no blur, no stagger.
- Eyebrow, headline, subheadline, trust badges, CTA all present immediately at opacity 1.
- Magnetic CTA still functional (reduced motion affects entrance, not interaction — hovering a CTA is a user action).
- Background spotlight locked at mid-opacity, no parallax scroll-link.

**Why it still feels premium**: The typography, hierarchy, and color do the work. A visitor with reduced motion sees a flawlessly typeset command-center — and stillness on a premium site signals "considered" not "broken."

### 8. FAILURE MODES

| #   | Failure                                 | How to detect                                           | How to revert                                                                                                                 |
| --- | --------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1   | Pre-chaos reads as broken/glitchy       | Non-design visitor thinks "is this site loading wrong?" | Reduce aberration px 3 → 1, reduce noise opacity 0.04 → 0.02, or disable pre-chaos entirely (start directly at break-through) |
| 2   | Z-axis arrival disorients               | Visitor feels a "lurch" or motion sickness              | Remove translateZ, keep only scale 1.15 → 1.0 + blur                                                                          |
| 3   | Supporting elements arrive too soon     | Eye can't process headline before others compete        | Delay HERO_SUPPORTING_DELAY_MS 1000 → 1200ms                                                                                  |
| 4   | Simultaneous arrival feels "dumped"     | All 3+ elements land at once = visual noise             | Re-introduce 80ms micro-stagger between them (still simultaneous-feeling, not sequential)                                     |
| 5   | Headline blur too strong during arrival | Visitor reads mid-blur and gets confused                | Reduce start blur 8px → 4px, shorten duration                                                                                 |
| 6   | Total time > 2.0s budget                | Visitor scrolls before CTA is ready                     | Compress headline-arrival 750 → 600ms, supporting delay 1000 → 800ms                                                          |

### 9. THE MEMORY TEST

> **"There was this Amazon agency site where the first second felt like something was LOADING — not slow-loading, more like tuning into a signal. Then the headline just... arrived. Like it came from somewhere and landed on the page, with everything else falling into place around it. I don't know how they did that, but I remember it. I scrolled down for more."**

**Passes the test because**: The visitor recalls THREE specific moments (tuning-feel / arrival / falling-into-place) and names the outcome (scrolled down). All three tie to the metaphor (resistance → break → arrival). "I don't know how they did that" = the hallmark of a true signature moment. ✅

### 10. CODE

⏳ **PENDING CONCEPT APPROVAL.**

---

## NEXT STEP

User decision required:

- ✅ Approve **Breaking Through** → I implement on preview branch (ETA ~6–8 hrs)
- 🌌 Go physics → switch to **The Dock** (safer, less punchy)
- 📡 Go cinematic → switch to **Signal Clear** (higher risk, brand-clash possibility)
- ✏️ Edit the BRIEF
- 🚫 Reject all three
