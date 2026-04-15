# Magnetic Audit — The Scalio Site

**Date**: 2026-04-15
**Auditor**: Claude (via MAGNETIC_SCROLL_BRIEF)
**Target**: thescalio.com (master branch, commit `e2f3248`)
**Context**: Post-Level-4 signature moments (Hero Breaking Through, Services Stage Lighting, Case Studies Weight Transfer, CTA The Invitation). This audit diagnoses what's STILL missing — the connective tissue, cohesion, and site-level systems that turn a site of great sections into a legendary journey.

---

## 1. CONVICTION CURVE ANALYSIS

### Estimated trust contribution per section (current state):

| Section          | Trust ↑ | Cumulative | Notes                                                               |
| ---------------- | ------- | ---------- | ------------------------------------------------------------------- |
| Hero             | +15%    | 15%        | Breaking Through is excellent — strong hook                         |
| Logo Marquee     | +5%     | 20%        | Appropriate ambient boost                                           |
| About            | +12%    | 32%        | Empathy narrative is strong; entrance is basic                      |
| **How It Works** | **+5%** | **37%**    | 🚩 **PLATEAU** — sandwiched between strong sections but adds little |
| Services         | +10%    | 47%        | Stage Lighting delivers, but over-energized                         |
| Case Studies     | +20%    | 67%        | Biggest jump — Weight Transfer earns it                             |
| Testimonials     | +8%     | 75%        | Carousel works but feels mechanical                                 |
| Founder          | +8%     | 83%        | Pull quote blur is good; paragraphs are flat                        |
| FAQ              | +7%     | 90%        | Accordion handles objections                                        |
| CTA              | +5%     | 95%        | The Invitation tips over                                            |

**Target curve shape**: monotonically increasing, steepest in the middle (Case Studies + Testimonials), 80–90% by FAQ.
**Actual curve**: mostly healthy but with a plateau at How It Works and softer-than-ideal Testimonials → Founder climb.

### Identified leaks (gravity breaks):

1. **How It Works is a conviction plateau.** +5% trust from a section sitting between About (+12%) and Services (+10%) is too small. This is where visitors mentally check out. The section explains 3 steps but doesn't let visitors FEEL the process — so they don't compound the prior trust with "and I understand exactly how we'd work together."

2. **Every handoff is a Threshold.** 9 of 9 section boundaries use only a `line-accent` divider + spacing. Zero Overlap, Question-Answer, or Reveal handoffs. This means trust is built ADDITIVELY (each section adds its own delta), not COMPOUNDINGLY (each section multiplies the prior's trust). The difference over 10 sections is massive.

3. **Testimonials feels transactional, not relational.** Carousel + auto-advance is functional; it doesn't enhance the "listening to someone speak directly to me" feeling. Trust delta is lower than the evidence warrants.

4. **Services (energy 5) → Case Studies (energy 5) is a double-climax.** Visitors arrive at Case Studies already slightly fatigued from the Services signature. The Weight Transfer lands, but it would hit harder if Services had been a lower-intensity verse.

### Weakest handoff:

**About → How It Works** — About ends on empathy ("we built this because we were tired of agencies that failed us"). How It Works begins with "here are 3 steps." The exit state (recognized, emotionally open) does NOT match the entry condition (ready for process detail). The emotional thread drops. Visitor may read "3 steps" with the rational brain while the empathy the prior section built quietly dissipates.

---

## 2. MAGNETIC AUDIT (per section)

Scored REWARD / COMPOUND / PROPEL on 1–5:

| Section          | REWARD | COMPOUND | PROPEL | Flags                                                                                         |
| ---------------- | ------ | -------- | ------ | --------------------------------------------------------------------------------------------- |
| Hero             | 5      | 4        | **2**  | Great reward + compounds nothing (1st section is fine). Weak propel — no visual cue to "next" |
| Logo Marquee     | 3      | 3        | 3      | Appropriate rest; could propel more                                                           |
| About            | 4      | 3        | **2**  | Empathy lands; weak propel to How It Works                                                    |
| **How It Works** | **2**  | **2**    | **1**  | 🚩 **TRIPLE FAIL — dead zone candidate**                                                      |
| Services         | 5      | 4        | 4      | Excellent across the board                                                                    |
| Case Studies     | 5      | 5        | 3      | Weight Transfer compounds beautifully; propel could be stronger                               |
| Testimonials     | 3      | 4        | **2**  | Compounds case studies evidence; weak propel to Founder                                       |
| Founder          | 3      | 4        | **2**  | Compounds trust via intimacy; paragraphs are static                                           |
| FAQ              | 3      | 3        | 3      | Rest state working correctly                                                                  |
| CTA              | 5      | 5        | N/A    | Excellent close                                                                               |

### Sections flagged (any score <3):

- **Hero PROPEL (2)**: no visual cue pulling the visitor to scroll
- **About PROPEL (2)**: empathy resolves, no tease toward the next
- **How It Works REWARD/COMPOUND/PROPEL (2/2/1)**: severe — dead zone risk
- **Testimonials PROPEL (2)**: auto-advance isn't propel
- **Founder PROPEL (2)**: static text finale

### Observation:

**PROPEL is the weakest attribute across the entire site.** 6 of 10 sections score 2–3 on PROPEL. Handoffs are failing systematically, not section-by-section.

---

## 3. HANDOFF INVENTORY

| From → To                   | Current behavior                      | Type          | Quality                     |
| --------------------------- | ------------------------------------- | ------------- | --------------------------- |
| Hero → Logos                | Empty space + subtle section boundary | **Threshold** | Weak                        |
| Logos → About               | line-accent                           | **Threshold** | OK                          |
| About → How It Works        | line-accent                           | **Threshold** | 🚩 Weak — emotional drop    |
| How It Works → Services     | line-accent                           | **Threshold** | OK                          |
| Services → Case Studies     | line-accent                           | **Threshold** | 🚩 Weak — no content bridge |
| Case Studies → Testimonials | line-accent                           | **Threshold** | OK                          |
| Testimonials → Founder      | line-accent                           | **Threshold** | OK                          |
| Founder → FAQ               | line-accent                           | **Threshold** | Weak                        |
| FAQ → CTA                   | line-accent                           | **Threshold** | OK — could Reveal           |

### Key finding:

**Zero Overlap, Question-Answer, or Reveal handoffs exist on the site.** All 9 section boundaries are the same type (Threshold). This is the single biggest cohesion deficit in the audit.

### Proposed handoff upgrades (per the brief's framework):

| From → To                   | Recommended type    | Specific mechanism                                                                                                                                          |
| --------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero → Logos                | **Reveal**          | Hero's bottom 60px pre-shows the first 2 logos bleeding upward before the visitor fully scrolls out of the hero                                             |
| About → How It Works        | **Question-Answer** | About's final paragraph ends with an implicit question ("...but what does it actually look like?"). How It Works' Step 1 appears mid-viewport as the answer |
| Services → Case Studies     | **Overlap**         | Services' CTA is visible AS the first Case Study card begins entering at viewport bottom — the "proof is here" bridge                                       |
| Case Studies → Testimonials | **Overlap**         | The final growth pill's glow lingers 400ms longer; the first testimonial's photo appears faintly in the next viewport                                       |
| Founder → FAQ               | **Question-Answer** | Founder's CTA text ends with "you probably still have questions." FAQ header directly responds: "Before you decide."                                        |
| FAQ → CTA                   | **Reveal**          | Last accordion closes; CTA section's form is partially visible with a gentle primary-glow pulse already running                                             |

---

## 4. ENERGY MAP AUDIT

| Section          | Current | Recommended | Status                           |
| ---------------- | ------- | ----------- | -------------------------------- |
| Hero             | 5       | 5           | ✅                               |
| Logo Marquee     | 1–2     | 1           | ✅                               |
| About            | 2–3     | 2           | ✅ (stats overshoot appropriate) |
| **How It Works** | **2**   | **3**       | 🚩 Under-energized               |
| **Services**     | **5**   | **3**       | 🚩 **Over-energized**            |
| Case Studies     | 5       | 5           | ✅                               |
| Testimonials     | 2–3     | 2           | ✅                               |
| Founder          | 2–3     | 2           | ✅                               |
| FAQ              | 1       | 1           | ✅                               |
| CTA              | 4–5     | 4           | ✅                               |

### Violations:

1. **Services (5) → Case Studies (5) adjacent.** The brief explicitly forbids two Level-5 sections side-by-side. Creates fatigue before Case Studies lands.
2. **How It Works under-energized.** Should be a Level-3 bridge; currently Level-2 means it reads as "a pause in the action" that the visitor skims past.

### Recommended fix:

**Option A**: Dial Services down (3 or 3.5 — keep Stage Lighting but reduce intensity).
**Option B**: Upgrade How It Works to Level 3+ signature (creates rising-energy staircase 3 → 5).
**Best: do both.** Creates the breathing pattern the brief prescribes.

---

## 5. INTERACTION DENSITY MAP (5 scroll positions)

| Position                          | Ambient                                 | Reactive                | Scroll-linked                              | Verdict                              |
| --------------------------------- | --------------------------------------- | ----------------------- | ------------------------------------------ | ------------------------------------ |
| Hero (0–15%)                      | Spotlight parallax, ping-pulse on badge | Magnetic CTA, nav hover | Headline z-axis arrival, scroll-faded page | ✅ Dense                             |
| Logo Marquee (15–25%)             | Marquee perpetual scroll                | Logo hover color shift  | —                                          | ✅ OK (rest state appropriate)       |
| **About → How It Works (30–40%)** | —                                       | Hover on CTA only       | —                                          | 🚩 **DEAD ZONE**                     |
| Case Studies (55–65%)             | Card ambient                            | Card hover              | Weight Transfer entrance choreography      | ✅ Dense                             |
| **FAQ (80–90%)**                  | —                                       | Accordion expand        | —                                          | 🚩 **Rest state but bordering dead** |

### Dead zones detected:

1. **Between About and Services** (positions ~35–45%). This compounds the conviction plateau finding from #1.
2. **FAQ area** (positions ~80–90%). Appropriate as rest state, but adding even minor ambient motion would close the gap.

---

## 6. QUALITY MULTIPLIER SCORECARD

| Category                      | Score   | Key findings                                                                                                                                                                                     |
| ----------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Typography as Craft           | **3/5** | ✅ Playfair + DM Sans + JetBrains Mono pairing. ✅ Italic Electric Blue consistent. ❌ Line-length on large screens not constrained. ❌ Tabular figures not verified.                            |
| **Cursor System**             | **1/5** | ❌ No custom cursor. ❌ No context morphing. Magnetic CTAs exist (Level 2) but that's not a cursor system. **Biggest single opportunity.**                                                       |
| Copy Density                  | 4/5     | ✅ Tight, crafted, specific. "We Grow Them" is a strong hook. Minor "premium agency" filler in a few places.                                                                                     |
| Image & Visual Quality        | 3/5     | ✅ Custom testimonial portraits. ❌ Service cards are icons-only. ❌ No hero imagery (intentional, but leaves opportunity).                                                                      |
| **Loading Experience**        | **2/5** | ❌ No deliberate skeleton/first-paint choreography. ❌ 853KB JS bundle — no code splitting. ✅ Font preconnect set.                                                                              |
| First Impression Before Click | 3/5     | ✅ Custom blue "S" favicon. ❌ OG image = favicon (not a custom poster). ✅ Meta title/desc decent.                                                                                              |
| The Details Nobody Notices    | **2/5** | ❌ 404 is plain. ❌ Form success not verified. ❌ Selection color = default browser blue. ❌ No print stylesheet. ✅ Navbar has scroll progress bar (already). ✅ Announcement bar with urgency. |

### Overall average: **2.6 / 5**

Motion is well-executed; the non-motion multipliers are underinvested. The biggest gaps:

- Cursor System (1/5) — no custom cursor is a massive missed opportunity on a premium agency site
- Loading Experience (2/5) — no deliberate first-paint
- Details Nobody Notices (2/5) — several easy wins

---

## 7. COHESION DIAGNOSIS

### Shared vocabulary:

- ✅ Motion language: `easeOutExpo` + spring families defined in `animations.ts`
- ⚠️ **Master clock drift**: durations in use include 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1.0, 1.2, 1.4, 2.0. Not on a 400ms grid.
- ✅ Color palette: Electric Blue + Indigo, consistent
- ✅ Spacing system (via Tailwind): mostly consistent

### Visual threads:

- ✅ Italic Electric Blue span on section headlines (present across ALL sections)
- ✅ `line-accent` at section tops (present across ALL sections)
- ✅ Eyebrow pattern (mono, uppercase, 0.2–0.25em tracking) — consistent
- ❌ **No "traveling element"** that crosses section boundaries (e.g., a vertical line that threads through the page, or a color pulse that travels down with scroll)
- ⚠️ Metrics styling inconsistent: About stats (`text-4xl font-display`), Case Studies pills (`text-sm`), Testimonials context chip (`text-[11px]`). Same conceptual element, 3 visual treatments.

### Rhythmic pacing:

- ❌ **Services → Case Studies double-climax violates "no two Level-5 sections adjacent"** rule
- ❌ **How It Works under-energized for a bridge section**

### Master clock status:

❌ **Not established.** Animations are using arbitrary durations. Cohesion benefit would be significant if normalized.

---

## 8. PRIORITIZED INTERVENTIONS (top 5 by curve-steepening × 1/effort)

### Intervention 1: Design the 9 Handoff Moments 🔥

**Curve location**: Every section boundary (especially About→How It Works, Services→Case Studies, FAQ→CTA)
**Steepening effect**: Eliminates trust leaks at every boundary. Converts linear additive trust into compounding trust. Likely single biggest conversion lift in the audit.
**Effort**: Medium — 6–10 hours across 9 handoffs
**How it operates**: Each handoff uses a specific type (Reveal / Overlap / Question-Answer) as detailed in §3. Most require small additions (a pre-visible element from next section, a color bleed, a question-phrase in copy).

### Intervention 2: Level-4 Signature for How It Works ⭐

**Curve location**: Position ~35% (the plateau identified in §1)
**Steepening effect**: Converts a +5% dead zone into a +12–15% trust boost. Creates rising-energy staircase before Case Studies (3 → 5), making Case Studies land harder.
**Effort**: Medium-high — 6–8 hours (full SIGNATURE_MOMENT_BRIEF cycle)
**Concept seed**: "The Blueprint" — connector line between the 3 steps DRAWS in real-time as the visitor scrolls past each step. Icons "activate" with a soft pulse as each step enters viewport. The visitor watches the process unfold chronologically as they descend. Feels like they're mentally rehearsing working with the agency.

### Intervention 3: Custom Cursor System

**Curve location**: Every position (ambient "crafted" signal)
**Steepening effect**: Raises the baseline quality signal everywhere. Also activates one of the 7 quality multipliers from 1/5 to 4–5/5.
**Effort**: Medium — 4–6 hours
**Scope**: Default cursor = 8px dot with subtle trail. On links/CTAs = morphs to a filled ring. On text = becomes an I-beam. On cards = expands slightly. Hidden during keyboard input. Mobile: entirely absent (correct). Performance: compositor thread (pointer-events: none + transform only).

### Intervention 4: Establish the Master Clock

**Curve location**: Every section (cohesion)
**Steepening effect**: Creates subconscious rhythm visitors feel without naming. Compounds all other effects.
**Effort**: Low — 2–3 hours
**Scope**: Export `BASE_UNIT_MS = 400` from `animations.ts`. Audit all durations across 10 sections; round to nearest multiple (0.2s / 0.4s / 0.8s / 1.2s / 2.0s). Update constants like `CASE_CARD_STAGES` to use multiples of the base.

### Intervention 5: Dial Services Down + Match to Case Studies

**Curve location**: Position ~45–55% (Services)
**Steepening effect**: Fixes rhythm violation. Makes Case Studies (the ACTUAL peak) feel bigger.
**Effort**: Low — 1–2 hours
**Scope**: In Stage Lighting: reduce `FOCUS_ELEVATION` 6px → 3px, `PEER_LEAN_ANGLE` 2° → 1°. Keep the concept (cards notice each other) but dial visual intensity to Level 3. Case Studies is the true Level-5 peak.

### Deliberately NOT in top 5 (but valuable later):

- **Level-4 signature for Founder**: pull quote is already good. Marginal gain. Defer.
- **Level-4 signature for Testimonials**: carousel works. Minor upgrade (e.g., audio waveform on quote icon) is nice-to-have.
- **OG image custom poster**: high value for social sharing but doesn't affect on-site conviction.
- **Loading experience**: important for performance perception but doesn't affect visitors who already loaded.
- **Sound design**: high risk / medium reward on a B2B site. User decision.

---

## 9. SIGNATURE vs. REST STATE ALLOCATION

### Current:

- **Level 4 signatures (4)**: Hero, Services, Case Studies, CTA
- **Level 1–3 rest/verse (6)**: Logo Marquee, About, How It Works, Testimonials, Founder, FAQ

### Recommended after interventions:

| Section          | Current                | Recommended      | Action                       |
| ---------------- | ---------------------- | ---------------- | ---------------------------- |
| Hero             | L4 signature           | L4 signature     | Keep ✅                      |
| Logo Marquee     | L1 rest                | L1 rest          | Keep ✅                      |
| About            | L2–3 verse             | L2–3 verse       | Keep — add handoff propel    |
| **How It Works** | **L2 under-energized** | **L4 signature** | **UPGRADE** (Intervention 2) |
| **Services**     | **L5 over-energized**  | **L3–4 dialed**  | **REFINE** (Intervention 5)  |
| Case Studies     | L5 signature           | L5 signature     | Keep ✅                      |
| Testimonials     | L2 rest                | L2 rest          | Keep — handoff propel only   |
| Founder          | L2–3 verse             | L2–3 verse       | Keep — handoff propel only   |
| FAQ              | L1 rest                | L1 rest          | Keep — add minor ambient     |
| CTA              | L4 signature           | L4 signature     | Keep ✅                      |

### Net: 5 signatures (from 4). Remaining 5 sections are deliberate rest states.

The allocation now matches the brief's breathing pattern:
5 (Hero) → 1 (Logos) → 2 (About) → **4 (How It Works)** → 3–4 (Services) → 5 (Case Studies) → 2 (Testimonials) → 2 (Founder) → 1 (FAQ) → 4 (CTA)

Reads as: climax → rest → verse → **rising bridge** → verse → **new climax** → rest → verse → rest → finale.

That's a song structure — with two peaks separated by breathing room, and a staircase building toward the second peak.

---

## 10. THE EXPERIENCE PARAGRAPH (post-interventions target)

> The visitor lands. The headline breaks through from depth — Breaking Through still carries them. A line of logos flows past almost unnoticed, because the first words of About are already bleeding up from below the fold. About's empathy lands, and the final paragraph's closing phrase ("but what does it actually look like?") hasn't even finished reading before How It Works' first step appears in the next viewport — **and the connector line between the three steps is drawing itself as the visitor scrolls**, each step's icon activating with a soft pulse as it enters view. The visitor is mentally rehearsing the engagement. Services then breathes quieter than before — peer-lean dialed, glow softened — because Case Studies is about to hit harder. Weight Transfer lands, the numbers crescendo, and the last growth pill's glow lingers a half-second longer than before, pulling the visitor's eye to the faint testimonial photo already visible below. Testimonials unfolds like conversation, the carousel giving way to a scroll-paced reveal. Founder feels like a handshake. FAQ opens and closes like questions with answers. And the CTA isn't a section they arrive at — it's already been visible at the bottom of the FAQ viewport, form inhaling faintly as they scroll. The custom cursor, which has been context-aware the entire time, is already morphing toward the first field. They fill it out. They can't quite explain why they didn't even consider the other three agency tabs still open in the background.

### Test: does this sound exciting?

✅ Uses sensory verbs (breaks through, bleeding up, drawing itself, activating, breathes, hits, lingers, pulling, unfolds, inhaling, morphing)
✅ References specific gestures from existing signatures (Breaking Through, Weight Transfer, The Invitation)
✅ Mentions proposed interventions (The Blueprint, dialed Services, cursor system, handoff choreography)
✅ Has rest moments (Logos, Testimonials, Founder, FAQ) — doesn't exhaust
✅ Ends on the tell of true conversion compulsion (tabs still open, unexplained decision)

---

## 11. CODE

⏳ **NOT YET.** All 5 prioritized interventions require user approval before implementation. The brief explicitly prohibits jumping to code before the audit is reviewed.

**After approval**, implementation order (by dependency and effort):

1. **Master Clock** first (2–3 hrs) — infrastructure all other work uses
2. **Services dial-down** (1–2 hrs) — quick rhythm fix
3. **Handoff choreography** (6–10 hrs) — touches 9 section boundaries
4. **Custom cursor system** (4–6 hrs) — self-contained new system
5. **How It Works signature** (6–8 hrs) — full SIGNATURE_MOMENT_BRIEF cycle

Total estimated effort for all 5 interventions: **19–29 hours**.

**Proposed phase-able split**:

- **Phase 1** (6–9 hrs): Master Clock + Services dial-down + 3 most-critical handoffs (About→HowItWorks, Services→CaseStudies, FAQ→CTA)
- **Phase 2** (10–14 hrs): How It Works signature + remaining 6 handoffs
- **Phase 3** (4–6 hrs): Custom cursor system (standalone addition)
