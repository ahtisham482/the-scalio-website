# Case Studies Section — Signature Moment Brief & Concept

**Status**: ✅ IMPLEMENTED (preview branch: `case-studies-weight-transfer`) — awaiting live review before merge to master
**Section**: Case Studies (3 cards: PeakFit / Lumiere / Alpine; each with problem, intervention, Before/After grid, growth pill)
**Created**: 2026-04-15
**Implemented**: 2026-04-15 · Concept: **Weight Transfer**

## Implementation Summary

Shipped on branch `case-studies-weight-transfer`. 3 files touched:

- **NEW** `src/lib/useDigitTicker.ts` — count-up hook (parses numeric strings like "1,442%", animates 0 → target with ease-out-expo, formats with locale commas, passes through non-numeric values like "New Launch")
- **MODIFIED** `src/lib/animations.ts` — added Level 4 Weight Transfer constants: `WEIGHT_TIRED_OPACITY/SCALE/SATURATE`, `AFTER_LIFT_Y/ENTER_SCALE`, `GROWTH_TICKER_MS`, `CASE_CARD_STAGES` (timeline map)
- **MODIFIED** `src/components/CaseStudiesSection.tsx` — refactored CaseCard with multi-stage entrance; `useInView` drives two gate states (`afterArrived`, `growthActive`) that trigger Before-to-sink and Growth-crescendo at scripted moments; Before column uses variants (hidden → entered → sunk)

**Behaviors live on preview**:

1. Staged entrance per card: header → intervention → Before → After → (Before sinks) → Growth crescendo
2. Before column: desaturated (`filter: saturate(0.55)`) + subtle downward shadow = "heavy, tired"
3. After column: enters from above (`y: -6`, `scale: 0.95` → 1), primary-glow from top = "arrives alive"
4. Weight transfer: at t=1.25s, Before sinks (opacity 1 → 0.55, scale 1 → 0.97) as After lands
5. Growth pill: spring entrance (`damping: 14`) + digit ticker (0 → 1,442 over 800ms with ease-out-expo) + glow pulse 900ms after ticker completes
6. "New Launch" (Lumiere) handled: passes through ticker unchanged, just fades in
7. Reduced motion → immediate final state for all elements (Before already sunk, Growth shows final value, no animation)
8. Per-card stagger: cards start 120ms apart (index × 0.12)

Build passed in 13.01s (850KB JS, 83.78KB CSS — within budget).

---

---

## BRIEF

```
SECTION: Case Studies

CURRENT STATE
Three case study cards in a responsive grid. Each has a header (case #,
problem badge, headline, category+timeline), spring-bounce growth pill,
intervention paragraph, and a 2-column Before/After metric grid (Revenue,
ACoS, Rank). Standard stagger entrance, basic hover lift + shadow glow.
Reads as "good agency case studies" — numbers are real and impressive, but
the motion treats them like text. The transformation — which is the whole
point — has no physical weight.

PURPOSE
The visitor must feel "these results are auditable, substantive, and exactly
what I'd want for my brand" — the transformation must land as visceral proof,
not as copy to skim.

EMOTION TARGET
Awe

PHYSICAL METAPHOR
"This section should feel like evidence being placed on a judge's bench —
each case study landing with physical weight, and when the before/after
numbers meet, the visitor should feel a small silent 'holy shit'."

THE MEMORY
"6 hours later, the visitor tells a friend: 'There was this part where each
case study's numbers didn't just change — the BEFORE numbers felt heavy and
tired, and the AFTER numbers arrived fully formed and glowing. And the growth
percent — like 1,442% — it didn't just pop in, it BUILT UP. You could feel it
getting bigger. Like watching a score being tallied.'"

PROTECT
- All 3 case studies and their metrics (REAL and auditable)
- Section headline and subtitle
- Before/After grid structure (scannable side-by-side)
- Per-study accent colors (blue/indigo/gold)
- Card CTA links
- Problem badge + category + timeline labels

REINVENT
- Card entrance stagger (Level 1)
- Metric pill behavior (static)
- Growth pill arrival (basic spring-bounce)
- Hover state (basic shadow + lift)
- Scroll journey through the 3 cards (currently equivalent)

REFERENCE
stripe.com/pricing — numbers as objects with weight.
Apple keynotes — before/after dim+light where the difference becomes physical.

FORBIDDEN
- Linear count-up (every SaaS site)
- Number flipping / slot-machine
- Fade-in-up stagger (Level 1)
- Hover-scale / standard lift (existing)
- Before→After slider
- Card flip
- Graph animations / bar chart growing
- Lottie sequences

RISK TOLERANCE
HIGH. Case Studies without a signature = lost conversion. 15/85 acceptable.
Numbers must remain auditable-looking.

BUDGET
2.0s total per card. Metric reveal within 1.0s. Growth pill earns 400–600ms
of build-up drama.
```

---

## DELIVERABLE (10-item concept document)

### 1. EMOTION TARGET

**Awe**

### 2. PHYSICAL METAPHOR

"This section should feel like evidence being placed on a judge's bench — each case study landing with physical weight, and when the before/after numbers meet, the visitor should feel a small silent 'holy shit'."

### 3. THREE CONCEPTS (ranked by memorability)

---

#### 🥇 CONCEPT #1 — "Weight Transfer" ⭐ RECOMMENDED

**The experience**: Per card, as it enters viewport, a choreographed sequence unfolds. Header + intervention settle first (context established — like the judge opening the file). Then the **Before** column lifts into place: muted, desaturated, sitting slightly low with a faint shadow BELOW suggesting downward pressure — it looks tired. A half-second later, the **After** column arrives from slightly above: full-color primary glow, scaling up from 0.95, with a soft light bleed from above — it arrives alive. At the exact moment After lands, the Before column subtly **sinks** (opacity drops to 0.55, scale to 0.97) — deprecated. Finally, the **Growth pill** begins its crescendo: digits tick up with ease-out-expo acceleration (e.g., "1,442%" counts up over 800ms), crescendos to a barely-perceptible overshoot, then snaps into place with a soft primary glow pulse. The visitor feels the numbers getting BIGGER, not just appearing.

**Why it's novel**: Three distinct motion identities for three narrative elements (Before = gravity-affected, After = buoyant, Growth = crescendo tally). Unlike most "numbers animate in" patterns, the Before column has a DIFFERENT physical feel than After — they don't just differ in value, they differ in how they exist on screen. The weight transfer between them (Before sinks as After arrives) is the signature gesture.

**Technical feasibility**: MEDIUM. Multi-stage entrance per card with useInView triggers. Digit ticker for growth pill (inline helper or lightweight custom hook). All Framer Motion + CSS filters (saturate). No Canvas/WebGL needed.

**Risk profile**: **MEDIUM** — each motion identity is straightforward individually; the art is in calibration (how "tired" should Before feel? How "alive" should After feel? Too much = theatrical). Sweet spot is subtle, not dramatic.

---

#### 🥈 CONCEPT #2 — "Forensic Scan"

**The experience**: Each card has an "investigation" aesthetic. When a card enters viewport, a subtle 2px glowing scan line sweeps from top to bottom over ~900ms. Elements don't appear until the scan line reaches them: header ignites as scan passes, intervention emerges letter-by-letter (very subtle, like a document being transcribed), Before row appears in a "diagnostic" tone (grayscale, monospace-heavy), After row appears in a "confirmed" tone with a quick pulse-check ping (like a heart monitor blip), and Growth % crystallizes at the bottom from a particle blur — disparate pieces assembling into the final digits. Feels like the card is being analyzed in real time, and Growth is the final readout.

**Why it's novel**: Scan-line reveal + particle crystallization for growth % is completely unseen on agency sites. Closest reference is sci-fi HUD interfaces. Borrowing the aesthetic without the genre is the creative move.

**Technical feasibility**: MEDIUM-HIGH. Scan line: CSS or SVG animation. Letter-by-letter: Framer Motion variants. Particle crystallization: needs either Canvas or clever SVG filter (displacement + turbulence). Complex.

**Risk profile**: **HIGH** — the "scanner" aesthetic risks clashing with the Scalio brand (premium agency, not sci-fi product). Would need heavy restraint to stay on-brand. If execution slides toward "tech-y" or "cool for cool's sake," it undermines the trust signal.

---

#### 🥉 CONCEPT #3 — "Escalating Tally"

**The experience**: Cards don't arrive independently — they arrive as a SEQUENCE of escalating revelations. Card 1 enters viewport and plays a slow, deliberate 3-second choreography (Before → After → Growth). When Card 1's growth locks in, a subtle line-accent draws across the bottom (underlining the testimony). Card 2 enters 300ms later and plays the same sequence but 30% faster (2.2s) — the pace tightens. Card 3 plays at 1.5s — crescendo pace. Additionally, the growth pill's visual weight (size, glow intensity) scales subtly with magnitude — Card 3's "611%" might have a smaller presence than Card 1's "1,442%." When all 3 are complete, a shared horizon line glows across all cards simultaneously (a "collective proof" moment). The visitor reads the section as a building case — each card bigger, faster to prove, forming an undeniable pattern.

**Why it's novel**: Cross-card architectural concept. Most case study grids are "three independent items." This makes them a cumulative argument. The visitor remembers the FEELING of the pattern building, not just the individual numbers.

**Technical feasibility**: MEDIUM. Sequencing via IntersectionObserver coordination. Primarily uses existing Framer Motion patterns; the complexity is the orchestration, not any single technique.

**Risk profile**: **MEDIUM** — if timing is slightly off, the crescendo feels accidental rather than deliberate. Also: forcing users to wait for sequential reveals might frustrate fast scrollers. Needs careful viewport-entry handling.

---

### 4. RECOMMENDATION

**Concept #1 "Weight Transfer."**

It delivers the memory sentence most directly: Before feels tired (desaturated, sinking), After arrives alive (glowing, lifting), Growth builds up (digit tally with crescendo). Concept #2 has a higher ceiling but real brand-clash risk — "forensic scanner" could undermine the premium-agency trust signal we're building elsewhere. Concept #3 is architecturally bold but asks more of the visitor (waiting for sequential reveals) which is friction in a conversion moment. Weight Transfer earns the Level 4 label through compositional richness (three distinct motion identities) rather than through a single flashy effect — which is exactly what "subtract until it hurts" produces.

### 5. IMPLEMENTATION PLAN (Weight Transfer)

**File map**:

| File                                    | Status   | Role                                                                                                                                    |
| --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/CaseStudiesSection.tsx` | MODIFIED | Refactor CaseCard to use multi-stage entrance with useInView; add digit-ticker for growth; weight-transfer sequence for Before/After    |
| `src/lib/animations.ts`                 | MODIFIED | Add Level 4 Case Studies constants                                                                                                      |
| `src/lib/useDigitTicker.ts`             | **NEW**  | Tiny hook: `useDigitTicker(target, duration)` returns interpolated number. Handles comma formatting + "New Launch" string pass-through. |

**New animation constants**:

```ts
// ─── LEVEL 4: Weight Transfer (Case Studies) ───
export const WEIGHT_TIRED_OPACITY = 0.55; // Before column after After arrives
export const WEIGHT_TIRED_SATURATE = 0.4; // Before column color desaturation
export const AFTER_LIFT_Y = -6; // After column enters from this offset
export const GROWTH_TICKER_MS = 800; // digit count-up duration
export const CASE_CARD_STAGES = {
  header: { delay: 0.2, duration: 0.5 },
  intervention: { delay: 0.4, duration: 0.5 },
  before: { delay: 0.6, duration: 0.5 },
  after: { delay: 1.2, duration: 0.5 }, // arrives 600ms after Before
  growth: { delay: 1.5, duration: 0.8 }, // starts 300ms after After
} as const;
```

**Techniques**:

- **Staged entrance** via multiple motion components each with its own `delay` within a card. Orchestrated by the card's `useInView` hook.
- **Before "tired" state**: CSS `filter: saturate(0.55)` + slight `y: +2` + soft shadow below. When After arrives, Before animates `opacity: 1 → 0.55, scale: 1 → 0.97` via Framer Motion.
- **After "alive" state**: enters from `y: -6, scale: 0.95, opacity: 0` → settles to `y: 0, scale: 1, opacity: 1` with `SPRING_LIQUID`. Subtle primary-tinted glow via box-shadow above.
- **Digit ticker** (growth pill): parses numeric value from growth string (`"1,442%"` → `1442`). Uses `requestAnimationFrame` to interpolate with `easeOutExpo`. Formatted with `.toLocaleString()` for commas. Handles `"New Launch"` as a pass-through (no ticker — just fade-in with emphasis).
- **Growth pill crescendo**: scale 0.85 → 1.02 → 1.0 with spring; digit tick in parallel; ends with a 400ms glow pulse via box-shadow.

**Integration with existing**:

- **REPLACES**: Current simple `initial/whileInView` entrance on CaseCard
- **PRESERVES**: Grid layout, per-study accent colors, hover border/shadow, card CTA link
- **ADDS**: Multi-stage entrance, weight-transfer animation, digit ticker for growth

### 6. MOBILE RE-CONCEPTION

**Same emotion, faster pacing.**

On mobile, the 3 cards stack vertically and the visitor scrolls through them one at a time. The Weight Transfer sequence still plays per card, but compressed to 1.4s total (30% faster) so scrollers don't feel stuck.

Specific adjustments:

- Before → After gap reduced from 600ms → 400ms
- Growth ticker duration: 800ms → 600ms
- No hover state (no cursor)
- Intervention text reveal simplified — single fade instead of staged (mobile readers scan faster)

**Why this is a sibling design, not a fallback**: The emotion (awe at transformation) is preserved. The timing is adapted to mobile attention patterns. A mobile user gets the same "holy shit" moment in less time.

### 7. REDUCED MOTION EXPERIENCE

- All cards appear at final state on viewport entry (no stagger, no multi-stage)
- Before/After columns retain their **static visual weight differentiation** (Before desaturated via `filter: saturate(0.55)`, After at full color with subtle primary tint)
- Growth pill shows final number only — no ticker
- No glow animations, no weight transfer

**Why it still feels premium**: The color + typographic hierarchy carries the narrative. Before/After are visually distinct states even without motion. The visitor sees a professionally typeset report — the restraint IS the aesthetic.

### 8. FAILURE MODES

| #   | Failure                                                                          | How to detect                                                         | How to revert                                                                         |
| --- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1   | Before "tired" state reads as broken, not deprecated                             | Show a peer without context — do they think it looks "off"?           | Reduce desaturation 0.55 → 0.75; reduce scale compression to 0 (no compression)       |
| 2   | Digit ticker feels like slot machine (too flashy)                                | If visitor's eye tracks the ticker instead of landing on final number | Shorten duration 800ms → 500ms; remove overshoot                                      |
| 3   | After arrival too theatrical (scale + glow + lift too much)                      | Visitor notices the animation more than the value                     | Remove scale (0.95 → 1.0), keep only y-lift and opacity                               |
| 4   | Multi-stage entrance feels slow — visitor scrolls past before sequence completes | Track scroll velocity on case studies section                         | Compress all timings 30%; start entrance at 300px from viewport top (earlier trigger) |
| 5   | Performance regression — 3 cards × 5 staged elements × animated properties       | Chrome DevTools Performance panel                                     | Reduce staged elements (merge stages 1+2); verify GPU acceleration on all transforms  |
| 6   | "New Launch" case study (Lumiere) feels wrong with ticker                        | Special case — no numeric growth value                                | Already handled: pass-through with fade-in only                                       |

### 9. THE MEMORY TEST

> **"There was this Amazon agency site where each case study's numbers loaded differently — the BEFORE numbers felt heavy and tired, like they were giving up, and the AFTER numbers arrived fully formed and glowing, like they'd been waiting to come in. And the growth percent didn't just pop up — it BUILT, like a score being tallied. I still remember the "1,442%" climbing up."**

**Passes the test because**: The visitor recalls THREE distinct details (Before tired, After alive, Growth building) in their own words — meaning they noticed three separate creative gestures, not one effect. The specific number "1,442%" anchoring in memory = the digit ticker worked as intended (numbers became objects, not text). ✅

### 10. CODE

⏳ **PENDING CONCEPT APPROVAL.** Not producing implementation until user approves Weight Transfer (or picks alternative).

---

## NEXT STEP

User decision required:

- ✅ Approve **Weight Transfer** → I implement on preview branch (ETA 5–7 hrs focused work)
- 🔬 Go experimental → switch to **Forensic Scan** (accept brand-clash risk)
- 🏗️ Go architectural → switch to **Escalating Tally** (cross-card crescendo)
- ✏️ Edit the BRIEF → tweak memory sentence, forbidden list, or risk tolerance
- 🚫 Reject all three → re-brief or move to different section
