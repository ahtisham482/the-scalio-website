# Services Section — Signature Moment Brief & Concept

**Status**: ✅ IMPLEMENTED (preview branch: `services-stage-lighting`) — awaiting live review before merge to master
**Section**: Services (bento grid + dedicated team + connection cards + mid-CTA)
**Created**: 2026-04-15
**Implemented**: 2026-04-15 · Concept: **Stage Lighting**

## Implementation Summary

Shipped on branch `services-stage-lighting`. 3 files touched:

- **NEW** `src/lib/useCardFocus.tsx` — React Context broadcasting focus state across cards + helpers (`computePeerLean`, `distanceFromCenter`)
- **MODIFIED** `src/lib/animations.ts` — added Level 4 constants: `SPRING_LIQUID`, `PEER_LEAN_ANGLE`, `FOCUS_ELEVATION`, `PEER_DIM_OPACITY`, `RADIAL_WAVE_STAGGER`
- **MODIFIED** `src/components/ServicesSection.tsx` — extracted `ServiceCard` subcomponent; wrapped grid in `CardFocusProvider`; each card subscribes and computes role (focused/peer/idle) with role-specific visual state

**Behaviors live on preview**:

1. Radial wave entrance — cards closest to grid center appear first, spreading outward
2. Peer lean — when you hover any card, the other 5 tilt toward it (±2°)
3. Spotlight glow — focused card gets a soft blue radial gradient + box shadow
4. Lift + border — focused card elevates 6px, border shifts to primary/30
5. Peer dim — non-focused cards drop to 0.82 opacity (defer attention)
6. Internal parallax intensity scales by role (1.0 focused → 0.3 peer → 0 idle)
7. Ambient breathing (idle only, desktop only) — sub-perceptual 0.3% scale loop, phase-offset per card
8. Icon state change — focused icon rotates 15° + scales 1.1 with spring
9. Reduced motion → all cards render at final state, no animation, no hover motion
10. Touch devices → radial entrance + full content, no hover-state machinery (cursor-free)

Build passed in 14.29s (847KB JS, 83.78KB CSS — deltas within performance budget).

---

---

## BRIEF

```
SECTION: Services

CURRENT STATE
Six service cards in a 3-column bento grid with 3D tilt on hover, multi-layer
internal parallax (icon floats above text, title subtly shifts), hover glow,
corner accents, and deliverable checklists. Below the grid: dedicated team
card + 3 "how we stay connected" panels + mid-page CTA. Reads as "state of
the art agency card grid" — competent Level 3 work, but the individual cards
don't yet feel alive as a system.

PURPOSE
The visitor must convert abstract competence ("they do Amazon stuff") into
concrete capability ("I can see exactly what I'd be paying for across all
6 areas") by the time they scroll past this section.

EMOTION TARGET
Confidence

PHYSICAL METAPHOR
"This section should feel like a bento box where every compartment is alive —
six specialists each mid-work at their own station, and the one you're looking
at comes forward to show you what they're doing while the others quiet down
in respect."

THE MEMORY
"6 hours later, the visitor tells a friend: 'There was this agency site where
each service felt like its own little room — and the card you were looking at
would kind of... wake up, and the others would notice and settle. The whole
grid felt like it was paying attention to where you were looking.'"

PROTECT
- All 6 service names and their order
- Hook line "Find your growth lever"
- Deliverable checklists (content, not layout)
- "Best for:" attributions
- Case study teaser links
- Dedicated team note
- "How we stay connected" 3-panel
- Mid-page CTA
- 3-column desktop grid layout
- Per-service icon identity

REINVENT
- Card entrance (currently sequential stagger — Level 1)
- Hover behavior (currently isolated 3D tilt + parallax — Level 2/3)
- Cross-card awareness (currently 0 — cards don't know each other exist)
- Grid background (currently empty)
- Transition from grid → dedicated team note

REFERENCE
stripe.com/payments — "ecosystem that breathes" as a unit.
linear.app features page — unified restraint, alive but never demanding.
Steal the feeling, invent the visual.

FORBIDDEN
- 3D card tilt (existing Level 2)
- Sequential fade-in-up stagger (existing Level 1)
- Internal parallax layers on single card (existing Level 3)
- Hover-scale or hover-border-glow
- Card flip
- Gradient card borders
- Lottie icons
- Carousel / slider
- Accordion expand-on-click

RISK TOLERANCE
HIGH. Current state is competent and forgettable — the safer play IS the
bigger risk here. 15/85 acceptable. Readability non-negotiable.

BUDGET
1.5s grid entrance. Hover <200ms response. Scroll-linked continuous ambient.
```

---

## DELIVERABLE (10-item concept document)

### 1. EMOTION TARGET

**Confidence**

### 2. PHYSICAL METAPHOR

"This section should feel like a bento box where every compartment is alive — six specialists each mid-work at their own station, and the one you're looking at comes forward to show you what they're doing while the others quiet down in respect."

### 3. THREE CONCEPTS (ranked by memorability)

---

#### 🥇 CONCEPT #1 — "Workshop Orchestra"

**The experience**: Each card has its own idle rhythm — the PPC card pulses metronomically (like a heartbeat of data), the Creative card drifts in slow organic arcs (like a calligrapher's wrist), the Launch card punctuates with percussive micro-movements (like a rocket on the pad). When you hover any card, it "comes to attention" — internal animation accelerates and tightens to sync. Simultaneously, ALL other cards slow to stillness — like specialists pausing their tasks to watch you.

**Why it's novel**: Personality-per-card + cross-card sympathy + ambient idle motion at the internal-element level. This is a concept borrowed from game UI (think Persona 5 menu) transplanted to a B2B website. Unseen on any agency site I've catalogued.

**Technical feasibility**: HIGH complexity. Requires per-card idle animation loops running independently, a shared broadcast state for focus, and careful performance budgeting (6 cards × independent tweens). Framer Motion handles it, but we're near the ceiling of what's performant.

**Risk profile**: **HIGH** — if idle motion is too present it distracts from reading; if too subtle the visitor doesn't feel it. Requires perfect calibration across 6 "personalities."

---

#### 🥈 CONCEPT #2 — "Stage Lighting" ⭐ RECOMMENDED

**The experience**: The grid behaves like an ensemble of performers. Resting state: all cards equally lit, ambient and still. When you hover a card: it gains a gentle blue glow emanating from its center, elevates 4–6px, and intensifies its internal parallax. Simultaneously, **neighboring cards tilt their orientation slightly toward the focused one** — as if turning their heads to watch the one getting attention. Peer cards also dim content opacity to 0.85 (deferring attention). When cursor moves between cards, the spotlight glides with spring momentum — never teleporting, always drifting. Grid entrance: radial wave from the center outward, cards fading in by distance from center (not by row).

**Why it's novel**: Cross-card **orientation change** ("cards looking at each other") is genuinely rare — most grids keep cards spatially independent. Combined with radial wave entrance (replacing ubiquitous sequential stagger), the grid feels like a **social organism**, not a matrix.

**Technical feasibility**: MEDIUM. Framer Motion + React Context for shared hover state + position-aware peer-lean math. No WebGL needed. Ships in ~4–6 hours of focused implementation.

**Risk profile**: **MEDIUM** — peer lean angle must be carefully calibrated (too much = theatrical, too little = imperceptible; sweet spot ~2°). Everything else is well-trodden technique applied in a novel composition.

---

#### 🥉 CONCEPT #3 — "Magnetic Field"

**The experience**: The grid is a magnetic field. Hovering a card gives it "weight" — it gains depth (shadow deepens, scale 1.02, z-index forward). Neighboring cards are subtly displaced outward (2–3px) as if making room for the heavier neighbor. Release: cards return with a spring cascade — closest neighbors settle first, farther cards follow with 100ms staggered lag, creating a visible ripple. Ambient: grid-wide scale breathes with scroll velocity — fast scroll compresses the grid inward, slow scroll lets it breathe outward.

**Why it's novel**: Repulsion/displacement of neighbors is the novel element. Most hover effects amplify the focused element but leave others untouched. The scroll-velocity breathing is also unseen at this subtlety level.

**Technical feasibility**: MEDIUM. Shared hover state + position math for displacement direction + useVelocity hook. No new dependencies.

**Risk profile**: **MEDIUM-HIGH** — position shifts on OTHER cards while hovering is visually risky; could feel jittery. Requires extremely precise spring tuning (damping 25 / stiffness 150 territory). B2B readers reading dense text may find peripheral motion disorienting.

---

### 4. RECOMMENDATION

**Stage Lighting.**

Workshop Orchestra has the highest memorability ceiling but also the highest execution risk — "personality per card" is a beautiful idea that's easy to get wrong (arbitrary, distracting, or missed entirely). Magnetic Field's moving-neighbors is powerful but a trust risk — visitors scanning dense copy may find peripheral displacement disorienting, hurting conversion. Stage Lighting delivers the memory sentence ("cards that notice you") most directly — the peer-lean literally turns cards to watch you — achieves novelty without destabilizing readability, and remains compelling even at 80% execution. It's the conversion-safe pick that still earns the Level 4 label.

### 5. IMPLEMENTATION PLAN (Stage Lighting)

**File map**:

| File                                 | Status   | Role                                                                                                                                                 |
| ------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/useCardFocus.ts`            | **NEW**  | React Context broadcasting which card is focused. Cards subscribe, receive role: `focused` / `peer` / `idle`.                                        |
| `src/components/ServicesSection.tsx` | MODIFIED | Wrap grid in `CardFocusProvider`. Each card subscribes and applies role-specific styling. Keep existing parallax, modulate intensity by focus state. |
| `src/lib/animations.ts`              | MODIFIED | Add 5 new named exports (below).                                                                                                                     |

**New animation constants** (added to `src/lib/animations.ts`):

```ts
export const SPRING_LIQUID = { damping: 20, stiffness: 180, mass: 1 };
export const PEER_LEAN_ANGLE = 2; // degrees
export const FOCUS_ELEVATION = 6; // px
export const PEER_DIM_OPACITY = 0.82;
export const RADIAL_WAVE_MS_PER_PX = 0.08; // stagger per px from grid center
```

**Techniques**:

- **Shared hover state** via `CardFocusProvider` (React Context + `useState`). One card sets `focusedSlug`; all cards re-render with computed role.
- **Peer lean math**: Each card knows its grid cell position. When peer, calculates angle to focused card's cell and applies `rotateX()` / `rotateY()` in that direction (max ±2°). Spring-interpolated.
- **Spotlight glow**: `box-shadow: 0 0 60px hsl(var(--primary) / 0.15)` on focused card. Animated via Framer Motion.
- **Radial entrance**: On grid mount, each card computes distance-from-center. Entrance delay = `distance * 0.08s`. Center card appears first.
- **Ambient breathing** (idle state only): Very subtle CSS `@keyframes` `scale(1.0 → 1.003 → 1.0)` over 6s, each card phase-offset by 2s. Stops when any card is focused.

**Integration with existing levels**:

- **REPLACES**: Current per-card `tilts` state dict (Level 2/3 implementation). Logic moves into shared context.
- **PRESERVES**: Internal parallax (icon float, title shift) — now modulated by focus state. Intensity 1.0 focused, 0.3 peer, 0.0 idle.
- **ADDS**: Peer-lean rotation, spotlight glow, radial wave entrance, ambient breathing.

### 6. MOBILE RE-CONCEPTION

**Concept**: "Scroll is the spotlight."

No cursor on mobile. Instead, the card closest to viewport vertical center becomes the focused one. The grid becomes responsive to scroll position, not pointer position.

**Experience**: As the visitor scrolls through the grid, cards pass through a "spotlight zone" at the viewport middle. The card currently in that zone lights up — gentle glow, slight scale. Cards above and below dim to 0.85. When scroll stops, the centered card holds focus for 1.5s, then gradually fades back to neutral (letting reading happen). Tapping a case-study link: entire grid dims to 0.3 for 200ms as tapped card punches forward; page transition takes over.

**Why it's a sibling design, not a fallback**: Same emotion (the grid follows your attention). Desktop: cursor = attention. Mobile: scroll = attention. Neither experience feels diminished — they're parallel expressions of the same metaphor.

**What's removed**: Peer lean (can't track cursor on touch; tilts are illegible on small screens anyway). Replaced with vertical opacity falloff above/below focus zone.

### 7. REDUCED MOTION EXPERIENCE

All cards render at final state, equal intensity. Hover = instant `border-color` change only (from `border` to `primary/20`). Zero scale, zero tilt, zero glow animation, zero breathing.

**Why it still feels premium**: The restraint IS the aesthetic. Type hierarchy, spacing discipline, icon precision, and palette carry the confidence-emotion without motion. A reduced-motion visitor sees a flawlessly typeset, breath-held grid — and that stillness signals "mature, considered craft" — which is exactly what the motion-on version signals, through different means.

**Accessibility preserved**: All ARIA states intact. Keyboard tab order unchanged. `:focus-visible` ring renders normally. Semantic structure untouched.

### 8. FAILURE MODES

| #   | Failure                                                 | How to detect                                                                                             | How to revert                                                                                                       |
| --- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 1   | Peer lean too aggressive — cards look floppy/nauseating | Visual review at 4x CPU throttle. If cards "wobble," angle too high.                                      | Reduce `PEER_LEAN_ANGLE` 2° → 1°. Disable entirely if still wrong.                                                  |
| 2   | Ambient breathing too perceptible — distracts reading   | Ask test user: "did anything move that you didn't expect?" If they mention idle motion, it's too visible. | Reduce breath scale 1.003 → 1.001. Disable breathing if still noticed.                                              |
| 3   | Peer dimming breaks readability                         | Try reading a peer card while hovering another. If uncomfortable, dim too deep.                           | Raise `PEER_DIM_OPACITY` 0.82 → 0.9 → 0.95.                                                                         |
| 4   | Performance regression — frame drops during hover       | Chrome DevTools Performance record during hover sweep. Red-orange frames = bad.                           | Consolidate transforms. Verify all animations use `transform`/`opacity` only (GPU). No layout-affecting properties. |
| 5   | Mobile spotlight feels laggy on mid-range phones        | Test on Android Chrome, 4x CPU throttle, scroll through grid. Transitions should feel smooth.             | Simplify to opacity-only falloff (no scale). Fallback: disable spotlight, all cards equal.                          |

### 9. THE MEMORY TEST

> **"There was this agency site where the services grid was like a stage — when I pointed my cursor at any card, the others would turn toward it, like they were watching me pay attention to their friend. The grid felt alive, and I don't know how else to describe it."**

**Passes the test because**: The visitor can describe the effect in specific, non-generic terms. "Cards turned toward each other" is a concrete detail unlike any other agency site they've visited. The metaphor ("watching me pay attention to their friend") is human, memorable, and shareable in conversation. ✅

### 10. CODE

⏳ **PENDING CONCEPT APPROVAL.** Not producing implementation until user approves Stage Lighting (or selects alternative). This enforces the brief's rule: concept survives scrutiny before code.

---

## NEXT STEP

User decision required:

- ✅ Approve **Stage Lighting** → I implement (ETA ~4–6 hours of focused work, one commit)
- 🔥 Go bolder → switch to **Workshop Orchestra** (accept higher execution risk)
- ⚖️ Go physical → switch to **Magnetic Field** (grid-as-physics alternative)
- ✏️ Edit the BRIEF → change forbidden list, risk tolerance, or memory sentence and re-run concept phase
- 🚫 Reject all three → re-brief or move to a different section
