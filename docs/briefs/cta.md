# CTA Section — Signature Moment Brief & Concept

**Status**: ✅ IMPLEMENTED (preview branch: `cta-invitation`) — awaiting live review before merge to master
**Section**: CTA (headline + 5 audit-includes pills + urgency + form + money-back guarantee + email alternative)
**Created**: 2026-04-15
**Implemented**: 2026-04-15 · Concept: **The Invitation**

## Implementation Summary

Shipped on branch `cta-invitation`. 4 files touched:

- **NEW** `src/lib/useFormAttention.ts` — focus-capture hook. Tracks whether any descendant form control has focus; filters out tab-between-fields (doesn't exhale during rapid tabbing)
- **MODIFIED** `src/lib/animations.ts` — added Invitation constants: `CTA_GLOW_OPACITY_MIN/MAX`, `CTA_GLOW_SIZE_MIN/MAX`, `CTA_CEILING_OPACITY_MAX`, `CTA_PILL_BLOOM_STAGGER`, `CTA_FORM_INHALE_SCALE`
- **MODIFIED** `src/index.css` — added `.cta-form-wrapper::before` perimeter-trace pseudo-element (conic-gradient + @property --cta-trace-angle for animation). Gated by `.cta-form-trace-active` class so it only fires when form enters view
- **MODIFIED** `src/components/CTASection.tsx` — full refactor with three gestures: narrowing (scroll-linked glow expansion + ceiling), opening (headline settle + radial pill bloom + perimeter trace), listening (inhale/exhale on focus)

**Behaviors live on preview**:

NARROWING (scroll-linked, ambient):

1. Primary orb opacity amplified 0.03 → 0.15 (was 0.03 → 0.09)
2. Primary orb size expands 700×500 → 900×700 as you scroll in
3. Top 20% of section gains a subtle ceiling gradient (opacity 0 → 0.35, black/40 → transparent)

OPENING (entrance choreography): 4. Eyebrow + headline "settle" with scale keyframes (0.98 → 1.01 → 1.0 over 750ms) 5. 5 audit-includes pills bloom **radially from center pill** (Competitor Mapping first, then its neighbors, outermost last) with spring physics 6. Form container enters with opacity + y, then CSS perimeter trace (conic-gradient segment sweeps counterclockwise around border over 1.4s with 400ms start-delay)

LISTENING (interaction): 7. Form wrapper listens to `onFocusCapture`/`onBlurCapture` — any field focus triggers `focused = true` 8. When focused: container scale 1.0 → 1.002 (spring), box-shadow deepens to primary/30 + primary/18 layered glow 9. On blur: exhales back to neutral 10. Tab between fields does NOT exhale (relatedTarget containment check)

Reduced motion: instant final state, glow locked at mid, no trace, no inhale.
Mobile: glow caps at smaller max size, trace still active but less prominent, inhale preserved.

Build passed in 12.20s (852.85KB JS, 85.93KB CSS — within budget).

---

---

## BRIEF

```
SECTION: CTA

CURRENT STATE
Scroll-linked gravity approach (Level 3): form scales 0.97 → 1, background
primary orb opacity 0.03 → 0.09. Section header fades up, 5 audit-includes
pills appear, form slides up, guarantee + email alternative below. All use
standard fade-in-up language. Gravity is present but subtle — visitors
don't register it.

PURPOSE
The visitor must transition from "considering" to "taking action." By the
time they leave this section, their finger should be reaching for the first
form field.

EMOTION TARGET
Arrival

PHYSICAL METAPHOR
"Like the final few steps of a long walk — pace slows, the destination
widens to fill your view, and the door opens just as you reach for the
handle."

THE MEMORY
"6 hours later, the visitor tells a friend: 'There was this part at the end
where the whole page just... narrowed toward the form. Like everything else
became background and this one form opened up to me. And when I tapped the
first field, I could tell the page was paying attention. I filled it out
without thinking — which normally I don't do.'"

PROTECT
- Headline, subheadline, all copy
- 5 audit-includes items
- Urgency + assurance lines
- ContactForm component (cannot touch form internals)
- Money-back guarantee card
- Email alternative contact
- Current section structure

REINVENT
- Entrance choreography
- Gravity intensity (Level 3 too subtle)
- Form "breathing" state
- First-field-focus moment
- Audit-pills reveal
- Background atmosphere

REFERENCE
linear.app signup — form with presence, not pulse.
stripe.com/atlas onboarding — form as conversation.

FORBIDDEN
- Standard fade-in-up stagger
- Scroll-linked scale only (Level 3 — must go deeper)
- Form field border shimmer on focus
- Floating particles / confetti
- Modal/dialog-style reveal
- Heavy gradient mesh
- Urgency pulse on CTAs (feels manipulative)

RISK TOLERANCE
MEDIUM. Conversion-critical. Distinctive but never in-the-way. Best Level 4
here is something the visitor FEELS but can't quite point at.

BUDGET
0.8s entrance. Scroll-linked continuous. Form interactions <150ms.
Animation must never delay form completion.
```

---

## DELIVERABLE (10-item concept document)

### 1. EMOTION TARGET

**Arrival**

### 2. PHYSICAL METAPHOR

"Like the final few steps of a long walk — pace slows, the destination widens to fill your view, and the door opens just as you reach for the handle."

### 3. THREE CONCEPTS (ranked by memorability)

---

#### 🥇 CONCEPT #1 — "The Invitation" ⭐ RECOMMENDED

Three separable gestures working in concert:

**1. NARROWING (scroll-linked, ambient)** — The primary orb behind the form grows: opacity 0.03 → 0.15 (was 0.09) AND size 700×500 → 900×700 as you scroll in. The glow physically expands to fill the section, pulling attention toward the form. A subtle gradient also darkens the top 15% of the section area — a soft "ceiling" that gives the form visual primacy without heavy vignetting.

**2. OPENING (entrance choreography)** — Header doesn't fade-up; it "settles" with a tiny scale overshoot (0.98 → 1.01 → 1.0 over 700ms) like a note being set on a table. The 5 audit-includes pills don't stagger left-to-right — they **bloom radially from the center pill** outward (Competitor Mapping is index 2 of 5 = center; its neighbors come next; outermost last). The form container enters with a **width-expand** (96% → 100% over 800ms) + a subtle **perimeter highlight trace** — a soft primary-colored gradient segment sweeps counterclockwise around the form's border once (1s), marking it as "active" without being loud.

**3. LISTENING (interaction)** — The form container listens to `onFocusCapture` / `onBlurCapture` events from any child field. When any field is focused: container **inhales** — shadow deepens (primary/25 instead of default), scale nudges 1.0 → 1.002, border glows primary/20. On blur: exhales back. The whole form feels alive to the visitor's attention — "the page is listening."

**Why it's novel**: The radial-from-center pill bloom is unseen on agency CTAs. The perimeter-trace entrance is a one-shot gesture that elevates the form without the ubiquitous "glowing border pulse." The inhale/exhale is subtle but creates a palpable sense that the form is a space, not a lifeless rectangle. Three gestures, three different mechanisms (scroll / entrance / interaction) = compositional richness.

**Technical feasibility**: MEDIUM. Scroll-linked glow uses existing useScroll/useTransform amplified. Radial bloom requires center-distance math per pill. Perimeter trace: CSS conic-gradient + mask + one-shot animation. Inhale/exhale: focus-capture on wrapper + Framer Motion animate. No WebGL. All within existing stack.

**Risk profile**: **MEDIUM** — each piece is restrained individually. Main calibration risk: the perimeter trace needs to be TASTEFUL (not "video game UI"). If too bright or too fast = tacky. Subtle + counterclockwise keeps it elegant.

---

#### 🥈 CONCEPT #2 — "The Focal Shift"

**Depth-through-blur rather than glow amplification.** As the visitor scrolls into CTA, sections ABOVE get a very subtle backdrop-filter: blur(2px) + brightness(0.95). The effect is almost imperceptible but creates "looking through a window" depth — CTA becomes the only fully-focused plane.

**Entrance**: Tight decisive timing — all elements arrive within 0.3s with minor offsets. No stagger flashiness. Feels like "everything lands together" — the CTA is a full beat, not a cascade.

**Form treatment**: The container uses an animated gradient border (slow liquid rotation, 12s per cycle, subtle primary/accent at 0.25 opacity) — marking the form as the "active" element continuously but without demanding attention.

**Listening**: On any field focus, the gradient rotation speeds up 2× and opacity lifts 0.25 → 0.5. Feels like the form "wakes up" as you engage.

**Why it's novel**: Background-of-other-sections blur is rare — usually blur is applied to overlays, not to adjacent content. Creates depth without parallax.

**Technical feasibility**: MEDIUM-HIGH. backdrop-filter on sibling sections requires careful DOM structure. Animated gradient border is CSS but performance-sensitive.

**Risk profile**: **MEDIUM-HIGH** — animated gradient borders can feel "techy" or "video-gamey" if not extremely subtle. Blur on other sections could be misread as "broken" by non-design-literate visitors.

---

#### 🥉 CONCEPT #3 — "The Table Sits Down"

**Physical-object metaphor — every element behaves like a tangible object being placed.**

**Entrance**: Headline has an underline that draws outward from center as the headline text appears (structural, not decorative). Pills don't fade — they **land with impact** (brief scale overshoot 0.9 → 1.02 → 1.0). Form **arrives with a paper-setting gesture** — drops from slightly above, settles with a subtle overshoot wobble (like a book hitting the table). Guarantee card follows similarly.

**Gravity**: Keep Level 3 scroll-linked glow unchanged. Rely on entrance drama for impact.

**Listening**: On focus, a single soft primary **echo/ripple** emanates from the focused field area (sub-perceptual scale-out ring fading over 600ms). The page "heard you."

**Why it's novel**: Impact-based entrance (landing, settling, wobbling) conveys weight and decision. Rare on B2B sites.

**Technical feasibility**: MEDIUM. Impact motion = spring with specific damping/stiffness combo. Ripple on focus = detectable via event bubbling + CSS animation.

**Risk profile**: **MEDIUM-HIGH** — physical metaphors require precise calibration or they feel amateurish. A "wobble" that isn't perfectly tuned reads as broken CSS. The ripple on focus is cute but easily too literal.

---

### 4. RECOMMENDATION

**Concept #1 "The Invitation."**

It delivers the three-part memory sentence most directly: narrowing (scroll-linked glow expansion + ceiling darken), opening (radial pill bloom + perimeter trace + width-expand), listening (form inhale on focus). Each gesture uses a different mechanism, so they layer without colliding. Concept #2's section-blur is elegant but risks being misread as a bug by non-design-literate visitors. Concept #3's physical metaphors require pixel-perfect calibration that's high-risk for a conversion section. The Invitation lands at 80% execution — because its three gestures reinforce each other, even if one is slightly off, the others carry the moment.

### 5. IMPLEMENTATION PLAN (The Invitation)

**File map**:

| File                            | Status   | Role                                                                                                                                                    |
| ------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/CTASection.tsx` | MODIFIED | Amplified glow, radial pill bloom, perimeter trace, inhale/exhale on form wrapper                                                                       |
| `src/lib/animations.ts`         | MODIFIED | Add CTA "Invitation" constants                                                                                                                          |
| `src/lib/useFormAttention.ts`   | **NEW**  | Tiny hook: tracks whether any descendant input is focused via capture events; returns `{ focused, onFocusCapture, onBlurCapture }` for the form wrapper |

**New animation constants**:

```ts
// ─── LEVEL 4: The Invitation (CTA Section) ───
export const CTA_GLOW_OPACITY_MIN = 0.03;
export const CTA_GLOW_OPACITY_MAX = 0.15;
export const CTA_GLOW_SIZE_MIN = { w: 700, h: 500 };
export const CTA_GLOW_SIZE_MAX = { w: 900, h: 700 };
export const CTA_PILL_BLOOM_STAGGER = 0.08; // seconds per unit of distance from center pill
export const CTA_FORM_INHALE_SCALE = 1.002;
export const CTA_PERIMETER_TRACE_MS = 1000; // one-shot counterclockwise trace duration
```

**Techniques**:

- **Glow amplification**: replace existing `useTransform(scrollYProgress, [0, 0.7], [0.03, 0.09])` with `[0, 0.7], [CTA_GLOW_OPACITY_MIN, CTA_GLOW_OPACITY_MAX]`. Add width/height `useTransform` for size expansion. Both applied to the same orb div.
- **Ceiling gradient**: absolute positioned div at top of section, `background: linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)`, height `15%`, opacity 0 → 0.8 scroll-linked.
- **Headline settle**: Framer Motion `animate={{ scale: [0.98, 1.01, 1] }}` with `duration: 0.7, times: [0, 0.7, 1]` on first viewport entry.
- **Radial pill bloom**: map pill index to distance from center (index 2 = distance 0, index 1/3 = 1, index 0/4 = 2). Delay = `distance * CTA_PILL_BLOOM_STAGGER`. Applied via individual `transition.delay` per pill.
- **Perimeter trace**: CSS conic-gradient + mask technique. A pseudo-element on form wrapper with `mask-image: conic-gradient(from 0deg, black 0deg, transparent 30deg, transparent 360deg)`; rotate the mask 360° counterclockwise once via CSS animation. One-shot on mount.
- **Form inhale/exhale**: `useFormAttention()` hook returns `{focused}`. Applied to motion div wrapping ContactForm. When focused: `animate={{ scale: 1.002 }}` + `style={{ boxShadow: "0 0 80px -12px hsl(var(--primary) / 0.25)" }}`. SPRING_GENTLE transition.

**Integration with existing**:

- **PRESERVES**: Level 3 scroll-linked gravity (amplified, not replaced). Existing `whileInView` fallbacks remain for instant states.
- **REPLACES**: Generic fade-in stagger on header + pills (now radial bloom). Static form entrance (now width-expand + perimeter trace).
- **ADDS**: Focus-driven inhale/exhale. Top ceiling gradient.

### 6. MOBILE RE-CONCEPTION

**Same emotion, touch-native expression.**

- Glow expansion preserved but smaller max (700×500 → 800×600 instead of 900×700). Mobile viewport doesn't need as much.
- Ceiling gradient preserved.
- Headline settle preserved.
- Radial pill bloom preserved — but on mobile the pills wrap to 2-3 rows, so the "center" becomes the FIRST row's middle pill. Still works conceptually.
- Perimeter trace: DISABLED on mobile (too much for a small form). Replaced with a simpler one-shot fade-in of an inner border highlight.
- Inhale/exhale: PRESERVED. Touch users tap fields too — same effect applies. This is the most important listening gesture.

### 7. REDUCED MOTION EXPERIENCE

- All entrance animations disabled. Elements render at final state on mount.
- Glow locked at mid-point (opacity 0.09, size 800×600). Static, no scroll-link.
- No perimeter trace.
- No headline settle.
- No inhale/exhale on focus — form stays visually static.
- Form fully functional. Keyboard navigation unchanged. Focus ring from `:focus-visible` renders normally.

**Why it still feels premium**: The CTA is a conversion section — the copy, form layout, guarantee card, and typography do the work. The restraint IS respect for the visitor's preference. Nothing feels missing.

### 8. FAILURE MODES

| #   | Failure                                                              | How to detect                                                 | How to revert                                                                    |
| --- | -------------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 1   | Perimeter trace feels "video-gamey"                                  | Ask: does it evoke a premium agency or a tech product launch? | Reduce trace opacity 0.25 → 0.15; or disable trace, keep width-expand only       |
| 2   | Glow expansion too aggressive — section feels "hot"                  | If the form becomes hard to read through the backdrop         | Cap max opacity 0.15 → 0.10; preserve size expansion                             |
| 3   | Pill bloom looks random/confused                                     | Visitors don't register "radial" pattern                      | Fall back to standard sequential stagger; perimeter trace still lands the moment |
| 4   | Inhale scale (1.002) imperceptible / not felt                        | Users don't sense listening                                   | Bump scale to 1.004; keep shadow + border as the dominant signal                 |
| 5   | Form inhale feels "clingy" on keyboard nav (fast tab between fields) | If rapid tabbing produces visible jitter                      | Add debounce: only inhale if focused >100ms; exhale has 200ms hold               |
| 6   | Ceiling gradient misread as broken                                   | If the top 15% darkening is jarring                           | Reduce opacity max 0.8 → 0.4; or disable ceiling, keep only glow expansion       |

### 9. THE MEMORY TEST

> **"There was this part at the end where the whole page just... narrowed toward the form. Like everything else became background and this one form opened up to me. And when I tapped the first field, I could tell the page was paying attention. I filled it out without thinking — which normally I don't do."**

**Passes the test because**: The visitor recalls THREE specific moments: (1) narrowing (the glow expansion + ceiling), (2) opening (the form's entrance gestures), (3) listening (the inhale on focus). Three separate memories, all tied to the conversion act. The "I filled it out without thinking" is the conversion win — the section reduced friction rather than performing. ✅

### 10. CODE

⏳ **PENDING CONCEPT APPROVAL.**

---

## NEXT STEP

User decision required:

- ✅ Approve **The Invitation** → I implement on preview branch (ETA ~4–5 hrs)
- 🌊 Go blur-depth → switch to **The Focal Shift**
- 🪑 Go physical → switch to **The Table Sits Down**
- ✏️ Edit the BRIEF
- 🚫 Reject all three
