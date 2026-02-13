# PEDAGOGICAL FIX PLAN — A1 English Learning App
## Comprehensive Remediation & Enhancement Blueprint

**Created:** February 13, 2026  
**Aligned With:** Master_Document.md (February 9, 2026 — all Constraints 1-6, Rules R/D/E, Mission Flow, Contrastive Turns, RULE E11, G1-G4)  
**Design Principles:**  
1. **Master Document alignment is non-negotiable** — every fix maps to a specific Constraint, Rule, or Guideline  
2. **Mobile-first architecture** — all solutions must work on phone (touch-native, no hover-dependent UX)  
3. **Horizontal scalability** — A2/B1/B2 level expansion without architectural rewrites  
4. **Hands-on-only learning** — zero passive reading screens; every screen demands student action  
5. **Guided autonomy** — the app imposes a sequenced path but grants the *feeling* of choice through micro-decisions  
6. **Dopamine-competitive gamification** — XP, streaks, badges, and progression loops that rival Duolingo  

---

## TABLE OF CONTENTS

1. [Philosophy: Alignment with Master Document](#1-philosophy-alignment-with-master-document)
2. [Phase 1: Scoring & Feedback System (CRITICAL)](#phase-1-scoring--feedback-system-critical)
3. [Phase 2: Mission Flow — The 3×2 Successive Mastery Cycle](#phase-2-mission-flow--the-3×2-successive-mastery-cycle)
4. [Phase 3: Vocab Card 4+2 Act Enforcement](#phase-3-vocab-card-42-act-enforcement)
5. [Phase 4: Dialogue Tile — G1/G2/G3/G4 Overhaul](#phase-4-dialogue-tile--g1g2g3g4-overhaul)
6. [Phase 4b: Data & Content Architecture Fixes](#phase-4b-data--content-architecture-fixes)
7. [Phase 4c: Cognitive Load & UX Fixes](#phase-4c-cognitive-load--ux-fixes)
8. [Phase 5: Gamification Engine (Dopamine Loop)](#phase-5-gamification-engine-dopamine-loop)
9. [Phase 6: Hands-On Activity Mandate](#phase-6-hands-on-activity-mandate)
10. [Phase 7: Accessibility, i18n, Mobile-Ready](#phase-7-accessibility-i18n-mobile-ready)
11. [Phase 8: Scalability Architecture (A2/B1/B2)](#phase-8-scalability-architecture-a2b1b2)
12. [Implementation Priority Matrix](#implementation-priority-matrix)
13. [Risk Register](#risk-register)

---

## 1. PHILOSOPHY: ALIGNMENT WITH MASTER DOCUMENT

### Core Hierarchy of Authority (from Master_Document.md)

```
1. NON-NEGOTIABLE CONSTRAINTS (1-6) ← Always win
2. Grammar Accuracy                ← Never use un-taught grammar
3. Vocabulary Coverage             ← 100% core vocab must appear
4. Natural Language Quality        ← Dialogues must sound human
5. Creative Freedom                ← Flexibility in HOW
```

### Master Document Rules Referenced in This Plan

| Rule | Name | Relevance |
|------|------|-----------|
| **CONSTRAINT 5** | Vocab Card 4+2 Act Structure | Enforces 6-slide mandatory flow |
| **MISSION FLOW** | 3×2 Successive Mastery Cycle | Defines Intro→Vocab→Dialogue progression |
| **RULE E11** | Syntactic Mirroring (Mirror Mode) | Three-state sentence display (UZ/Mirror/EN) |
| **CONTRASTIVE TURNS** | Grammar Gap Solution | Discovery Popup after every dialogue |
| **G1** | Vanishing Script Toggle | Full/Faded/Blind dialogue modes |
| **G2** | Thinking Pressure | 800ms vanish + 2s deadline (Stage 3.1 only) |
| **G3** | Grammar Input Flood | Dotted underline implicit noticing |
| **G4** | Dialogue Mastery State | Mastered lines → English-only view |
| **RULE E1** | Polarity/Friction Pattern | Wrong-assumption Uzbek question technique |
| **CONSTRAINT 2** | Anchor = Dialogue Sentence | Cards must use exact dialogue sentences |

### Middle-Ground Resolution: Where Audit Conflicts with Master Doc

| Audit Finding | Master Doc Position | Resolution |
|---|---|---|
| **B3**: Thinking Pressure has no adaptive difficulty | **G2**: Fixed 800ms/2000ms values are psycholinguistically calibrated | **KEEP G2 exact values** (800ms/2000ms) but ADD adaptive *scope* — begin with 3 lines, expand to full dialogue as performance improves. The timers themselves remain fixed per Master Doc. |
| **B4**: Thinking Pressure is passive | **G2**: "student to initiate production" + "RESPONSE_DEADLINE forces proceduralization" | **ADD production action** — student must tap/speak the vanished word within the 2s deadline. This aligns with G2's stated goal of "production enforcement". |
| **D2**: Only 4 tiles (missing warm-up, writing, review) | **MISSION FLOW**: Defines Dialogue 1 → 1.1 → Contrastive Turn as the mandatory structure | **EMBED missing phases INTO existing tiles** — Intro tile becomes Warm-Up + Objectives; Done tile becomes Review + Reflection. Add "Writing Challenge" as opt-in bonus within Done tile. This follows Mission Flow without adding tiles. |
| **I1**: Sandwich Technique incomplete | **MISSION FLOW**: Explicit L1→Mirror→L2 progression with card popup unlocking English | **ENFORCE full Sandwich** — Dialogue starts in UZ state (not EN), student clicks target words to trigger 4+2 cards, completing cards progressively unlocks EN. This IS the intended design; fix the implementation to match. |
| **C4**: Personalization stage never implemented | **CONSTRAINT 5**: Personalization slide is MANDATORY | **IMPLEMENT renderPersonalizationStage()** with flexibleCheck (Regex) per Master Doc spec: Uzbek prompt → open-ended personal response → validate target tokens used. |
| **B5**: Mastery click has no verification | **G4**: "mastered_lines tracked via mastery_key" | **GATE mastery behind production check** — student must type/reproduce the line's key phrase before it gets the green ✅ mastery badge. Aligns with G4 "confirming fluency". |
| **D3**: No lesson-to-lesson gating | **MISSION FLOW RULE A**: mandatory sequential progression | **GATE lessons behind prior completion** — lesson selector shows all lessons but locks unfinished ones. Teacher mode bypasses. Aligns with "illusion of choice" (see everything, unlock sequentially). |
| **H1/H2**: Toolbar overload + no progressive disclosure | **G1-G4**: All features are OBLIGATORY but implementer has discretion on HOW | **PROGRESSIVE REVEAL** — features are present in code but hidden until the student reaches a milestone. This respects G1-G4 being obligatory while preventing cognitive overload on day one. |

---

## PHASE 1: SCORING & FEEDBACK SYSTEM (CRITICAL)

**Audit Issues Addressed:** A1, A2, A3, A4  
**Master Doc Alignment:** Scoring drives XP (session.xp), level progression (session.level), and badge eligibility — all referenced in AppState schema.

### Problem Summary
The app has two disconnected scoring systems: `scoring.js` (module-scoped vars) and `AppState.session.score` (centralized state). Neither receives actual score data from any tile. The Done tile reads from `window.sessionScore` which is never written. Result: **0/0 always shown**.

### Fix Plan

#### 1.1 — Unify Scoring Into AppState (Single Source of Truth)

**Principle:** Every point earned anywhere in the app flows through `AppState.session.score`.

**Action:** Refactor `scoring.js` to read/write from `AppState.session` instead of its own module-scoped variables. The module becomes a *facade* over AppState, not a parallel state.

```
BEFORE:
  scoring.js → own sessionScore variable
  done-tile.js → reads window.sessionScore (stale/undefined)
  dialogue-tile.js → writes nothing
  vocab-card-renderer.js → writes nothing

AFTER:
  scoring.js → reads/writes AppState.session.score
  done-tile.js → reads AppState.session.score
  All tiles → call scoring.js API to award points
  All score changes → trigger StateActions observer → UI updates
```

**Files to modify:**
- `src/features/scoring.js` — replace `sessionScore`, `sessionMaxScore`, `tileScores` with AppState getters/setters
- `src/tiles/done-tile.js` — replace `window.sessionScore || 0` with `AppState.session.score` (via StateActions import)
- `src/state/app-state.js` — ensure `session.score`, `session.maxScore`, `session.tileScores` are included (already present)

#### 1.2 — Wire Scoring Into Every Interactive Moment

**Principle:** Every student action that the app can evaluate MUST award or deduct points. Per Master Doc, the app tracks performance to drive XP and badges.

**Scoring Events to Wire:**

| Tile/Feature | Event | Points | Max Possible | Master Doc Justification |
|---|---|---|---|---|
| **Vocab Card — Concept Check** (Act 2) | Correct answer on first try | +10 | 10 per card | CONSTRAINT 5: concept_check is mandatory slide |
| **Vocab Card — Discovery** | Correct "Why this form?" MCQ | +5 | 5 per card | CONSTRAINT 5: Discovery is mandatory |
| **Vocab Card — Drill** (Act 3) | Each correct jumble/exercise | +8 | 8 per card | CONSTRAINT 5: drill_list is mandatory |
| **Vocab Card — Production** (Act 4) | Correct production on first try | +15 | 15 per card | CONSTRAINT 5: production + trap detection is key |
| **Vocab Card — Personalization** | Uses target tokens (regex check) | +10 | 10 per card | CONSTRAINT 5: personalization mandatory |
| **Dialogue — Comprehension Check** | Correct MCQ answer | +10 | 10 per dialogue | Mission Flow: production enforcement |
| **Dialogue — Contrastive Turn Discovery** | Completes the discovery popup exercise | +10 | 10 per dialogue | Master Doc: MANDATORY after every dialogue |
| **Dialogue — Re-practice Cloze** | Per correct gap | +3 | 3 × gap count | Testing Effect (research-backed) |
| **Dialogue — Thinking Pressure (G2)** | Successful production within 2s | +5 | 5 × line count | G2: "production enforcement" |
| **Dialogue — Line Mastery (G4)** | Reproduced line correctly | +8 | 8 × line count | G4: mastery confirmation |

**Files to modify:**
- `src/features/vocab-card-renderer.js` — add `awardPoints()` + `addMaxScore()` calls in each stage's success handler
- `src/tiles/dialogue-tile.js` — add scoring calls in comprehension check, contrastive turn, re-practice, thinking pressure, and mastery handlers
- `src/features/scoring.js` — ensure `addMaxScore()` is called at tile entry to set ceiling

#### 1.3 — Fix Done Tile Rating Labels

**Action:** Fix the copy-paste bug where 90% and 75% both show "Excellent".

```
90%+ → "Excellent" (uz: 'done.ratingExcellent')
75%+ → "Great Job" (uz: 'done.ratingGreat') ← NEW i18n key
60%+ → "Good Effort" (uz: 'done.ratingOkay')
<60% → "Keep Practicing" (uz: 'done.ratingRetry')
```

**Files to modify:**
- `src/tiles/done-tile.js` — fix the 75% bracket to use new key
- `src/core/i18n.js` — add `done.ratingGreat` key for all 6 locales

#### 1.4 — Conditional Celebration

**Principle:** Confetti and "complete" sound should scale with performance.

| Score Range | Celebration |
|---|---|
| 90%+ | 50 confetti + triumphant sound + "🌟 Excellent!" banner |
| 75%+ | 30 confetti + success sound + "Great Job!" banner |
| 60%+ | 15 confetti + gentle sound + "Good Effort!" banner |
| <60% | No confetti + neutral sound + "Keep Practicing" + highlight retry button |

**File to modify:** `src/tiles/done-tile.js`

---

## PHASE 2: MISSION FLOW — THE 3×2 SUCCESSIVE MASTERY CYCLE

**Audit Issues Addressed:** D1, D2, D3, D4, D5, I1, I2  
**Master Doc Alignment:** Mission Flow Model (MANDATORY), RULE A (mandatory progression), RULE B (cognitive load management)

### Problem Summary
The app has 4 bare tiles (Intro→Vocab→Dialogue→Done) but doesn't implement the Master Doc's 3×2 Successive Mastery Cycle. The Intro tile is a dead metadata screen. The Sandwich Technique is partially implemented but doesn't enforce the L1→Mirror→L2 progression. There are no learning objectives, no warm-up, no writing output, and no review.

### Fix Plan

#### 2.1 — Transform Intro Tile Into "Mission Briefing" (Warm-Up + Objectives)

**Current state:** Shows lesson title + "Start" button only.  
**Target state:** Interactive warm-up that activates prior knowledge and states objectives.

**New Intro Tile Structure:**

```
┌──────────────────────────────────────────────┐
│  🎯 MISSION BRIEFING                          │
│                                                │
│  Mission: [Unit Title]                         │
│  Stage: [1: Affirmative / 2: Negative / ...]  │
│                                                │
│  📖 What you'll learn:                         │
│  • [Target grammar in simple terms]            │
│  • [3-4 key vocabulary previews]               │
│                                                │
│  🔄 Quick Check (Warm-Up):                     │
│  Complete this from last lesson:               │
│  [Interactive micro-exercise: 1-2 fill gaps    │
│   using recycled vocab from prior lesson]      │
│                                                │
│  [▶ START MISSION] ← only unlocks after        │
│                       warm-up answered          │
└──────────────────────────────────────────────┘
```

**Hands-On Requirement:** The "Start Mission" button is GATED behind completing the warm-up micro-exercise. This ensures no passive screens exist.

**Warm-Up Exercise Design:**
- Pull 2-3 recycled vocabulary items from the previous lesson (per CONSTRAINT 4's recycling principle)
- Present a 1-sentence gap-fill using those items
- Correct answer → award 5 XP → unlock Start button
- Wrong answer → show reminder + allow retry (no penalty, just learning)
- For L01 of U01 (no prior lesson): skip warm-up, show a fun "Welcome" animation with a simple "tap your name" personalization moment

**Mobile Consideration:** The warm-up must be a single-screen tap interaction (no typing on first screen — use word bank or MCQ to avoid keyboard on cold start).

**Scalability:** When scaling to A2/B1, the warm-up pulls from a broader recycled pool and may include listening comprehension micro-tasks.

**Files to modify:**
- `src/tiles/intro-tile.js` — major rewrite: add warm-up exercise, learning objectives, mission stage indicator
- Add new data property to curriculum: `lesson.warmup_items[]` — array of recycled vocab IDs for warm-up exercise
- `src/core/curriculum-loader.js` — auto-generate `warmup_items` from prior lesson's target vocab

#### 2.1b — Gate Lesson-to-Lesson Progression (D3)

**Problem:** `navigation.js` allows `setCurrentLesson()` to jump to any lesson directly with no prerequisite check. The lesson selector lets students freely access any lesson or unit without completing prior ones. `isLessonCompleted()` exists but is never checked before allowing selection. The 3×2 Successive Mastery Cycle requires sequential completion (Stage 1 → Stage 2 → Stage 3), but the app enforces no ordering.

**Fix:**

1. **Gate lesson access** — Before `setCurrentLesson(lessonId)`, check `isLessonCompleted(previousLessonId)`. Disable (grey out + 🔒) locked lessons in the lesson selector.
2. **Gate stage progression** — Within a unit's 3-stage mission, enforce Stage 1 → Stage 2 → Stage 3 ordering by gating each stage behind prior stage completion.
3. **Teacher mode bypass** — Teacher mode bypasses all gates (already has `devBypassGates` flag).
4. **Illusion of choice** — Student sees ALL lessons in the selector but locked ones show a preview tooltip ("Complete [previous lesson] to unlock!"). This maintains visibility of the journey while enforcing the path.

**Files to modify:**
- `src/core/navigation.js` — add prerequisite check before `setCurrentLesson()`
- `src/core/curriculum-loader.js` — add `isLessonUnlocked(lessonId)` helper
- Lesson selector UI — grey out + 🔒 locked lessons

#### 2.2 — Enforce Sandwich Flow in Vocab Tile (L1 → Mirror → L2 Progression)

**Master Doc Reference:** RULE E11 (Syntactic Mirroring), Mission Flow (Dialogue 1 = Production Enforcement)

**Current state:** Vocab tile shows dialogue lines in English (EN first), vocab cards open as standalone exercises.  
**Target state:** Full Sandwich implementation per Master Doc:

```
STEP 1: Student sees dialogue in UZBEK (Natural UZ state)
STEP 2: Student clicks target English words (visible in Mirror state) → triggers 4+2 Card popup
STEP 3: Completing all 6 card slides → word becomes "mastered" → dialogue line transitions to full EN
STEP 4: After ALL target words mastered → dialogue is fully English → Sandwich complete
STEP 5: Proceed to Dialogue tile for Linguistic Pressure pass (Dialogue X.1)
```

**Implementation Changes:**

1. **Default dialogue state = UZ** (not EN as currently implemented)
   - All dialogue bubbles start showing `text_uz` content
   - Target English words are dimmed/blurred placeholders in UZ text
   - Tapping a placeholder → opens 4+2 card

2. **Progressive EN unlock per word** (per Master Doc's card popup → word mastered → English appears)
   - Each completed vocab card makes its corresponding English word visible in the dialogue
   - Visual: word "fades in" with a subtle glow animation when card is completed

3. **Mirror state as intermediate bridge**
   - Before a word is mastered: UZ only
   - After card Act 1 (Presentation): Mirror state becomes available for that line
   - After full card completion: EN state unlocked for that word

4. **Full dialogue EN = Sandwich completion gate**
   - The "Next → Dialogue Practice" button becomes active only when the dialogue shows 100% EN
   - This IS the vocab completion gating — but framed as "unlocking the full English dialogue" rather than "you haven't finished cards yet"
   - Student FEELS they are uncovering a dialogue, not being blocked

**Illusion of Choice Implementation:**
- Student can tap ANY word in ANY order (feels like choice)
- But the app subtly highlights the RECOMMENDED next word with a gentle pulse animation
- Words are ordered by cognitive scaffolding (simple→complex) in the pulse queue
- The student thinks they're exploring; the app is guiding them through a pedagogical sequence

**Files to modify:**
- `src/tiles/vocab-tile.js` — rewrite `renderDialogueFirstSection()` to start in UZ state with progressive EN unlock
- `src/features/vocab-card-renderer.js` — after `markVocabComplete()`, dispatch event to unlock the word in the dialogue view
- `src/utils/mirror-toggle.js` — support per-word state management (not just per-line)

#### 2.3 — Implement Mission Stage Awareness

**Current state:** The app doesn't know if the current lesson is Stage 1 (Affirmative), Stage 2 (Negative), or Stage 3 (Interrogative).  
**Target state:** The app reads mission metadata to enforce stage-specific behavior.

**New Mission Metadata (aligned with Master Doc schema):**

```javascript
// Added to curriculum data per lesson
lesson.mission = {
  stage: 1,                    // 1=Affirmative, 2=Negative, 3=Interrogative
  form: "affirmative",         // "affirmative" | "negative" | "interrogative"
  mirror_mode: true,           // false for Stage 3 (Master Doc: DISABLED)
  mastery_peak: false,         // true for Stage 3.1 (100% English, no scaffolding)
};
```

**Stage-Specific Behaviors:**

| Stage | Mirror Mode | Vanishing Script | Thinking Pressure | Contrastive Turn |
|---|---|---|---|---|
| Stage 1 (Affirmative) | ✅ Available (UZ/Mirror/EN) | ✅ Full/Faded/Blind | ❌ Not yet | ✅ After dialogue |
| Stage 2 (Negative) | ✅ Available | ✅ Full/Faded/Blind | ❌ Not yet | ✅ After dialogue |
| Stage 3 (Interrogative) | ❌ DISABLED (Master Doc: forced internal mapping) | ✅ Full/Faded/Blind | ✅ G2 active (800ms/2s) | ✅ After dialogue |
| Stage 3.1 (Mastery Peak) | ❌ DISABLED | ❌ Only Blind mode | ✅ G2 active | ❌ Already done |

**Files to modify:**
- `src/core/curriculum-loader.js` — parse/generate `lesson.mission` from lesson position within unit
- `src/tiles/dialogue-tile.js` — read `lesson.mission` to conditionally disable mirror mode in Stage 3
- `src/utils/mirror-toggle.js` — accept `disabled` prop to grey out Mirror button
- Add mission stage badge to lesson selector UI

#### 2.4 — Transform Done Tile Into "Mission Debrief" (Review + Reflection + Next Steps)

**Current state:** Score display (broken) + confetti + Next/Restart buttons.  
**Target state:** Interactive review that reinforces learning and generates a sense of accomplishment.

**New Done Tile Structure:**

```
┌──────────────────────────────────────────────┐
│  🏆 MISSION COMPLETE                          │
│                                                │
│  ⭐ Score: 85/100 (85%) — Great Job!           │
│  💎 XP Earned: +75                             │
│  🔥 Streak: Day 3                              │
│  🏅 New Badge: "Grammar Detective"             │
│                                                │
│  📊 What You Learned:                          │
│  ✅ "wake up" — I wake up at seven  [PLAY 🔊]  │
│  ✅ "get dressed" — She gets dressed [PLAY 🔊] │
│  ⚠️ "clean teeth" — 1 mistake        [RETRY]   │
│                                                │
│  🧠 Quick Review (1 question):                 │
│  [Interactive: reproduce 1 sentence from       │
│   the lesson — tests production memory]        │
│                                                │
│  🎯 Writing Challenge (BONUS +20 XP):          │
│  [Write 1 sentence using today's grammar       │
│   about YOUR life — flexibleCheck validates]    │
│                                                │
│  [🔄 Restart]  [➡️ Next Lesson]                 │
└──────────────────────────────────────────────┘
```

**Hands-On Elements:**
1. **Quick Review micro-exercise** — single production task (type or arrange a sentence from the lesson). GATED before Next Lesson button unlocks. This ensures the student proves retention before moving on.
2. **Writing Challenge (BONUS)** — opt-in personal sentence using today's grammar. Awards +20 XP. Uses `flexibleCheck` (Regex) per CONSTRAINT 5's Personalization spec. Aligns with "illusion of choice" — student CAN skip but the XP incentive makes it irresistible.
3. **Mistake Log** — shows words where errors occurred with a "Retry" shortcut that reopens just that card. This is spaced-repetition-lite: errors get immediate re-exposure.

**Mobile Consideration:** Done tile is scrollable. Score section visible without scroll; review and writing challenge unfold below.

**Files to modify:**
- `src/tiles/done-tile.js` — major rewrite: add review exercise, mistake log, writing challenge, conditional celebration
- `src/features/scoring.js` — expose `getMistakes()` API to track wrong answers per vocab item during session
- `src/state/app-state.js` — add `session.mistakes[]` array to track error items

---

## PHASE 3: VOCAB CARD 4+2 ACT ENFORCEMENT

**Audit Issues Addressed:** C1, C2, C3, C4, C5, C6, C7  
**Master Doc Alignment:** CONSTRAINT 5 (6-slide mandatory structure), RULE E1 (Polarity/Friction), RULE E5 (Exercise Types)

### Problem Summary
The 6-stage vocab card flow is freely navigable (skippable), has no completion gating, the Personalization stage is unimplemented, error feedback is minimal, and production matching is too strict. Students can "complete" cards in 3 seconds without learning anything.

### Fix Plan

#### 3.1 — Gate Each Stage Behind Completion of Previous Stage

**Master Doc Justification:** CONSTRAINT 5 defines a mandatory 6-slide structure with specific purpose per slide. The order is pedagogically intentional: Presentation → Concept Check → Discovery → Drill → Production → Personalization. Skipping any stage breaks the learning sequence.

**Implementation:**

```
Stage Gating Logic:
┌─────────────────────────────────────────────┐
│ Presentation (Act 1)  → Always accessible    │
│ Concept Check (Act 2) → Locked until         │
│                          Presentation viewed  │
│                          for ≥ 3 seconds      │
│ Discovery              → Locked until         │
│                          Concept Check        │
│                          answered correctly    │
│ Drill (Act 3)          → Locked until         │
│                          Discovery answered   │
│ Production (Act 4)     → Locked until         │
│                          Drill completed      │
│ Personalization        → Locked until         │
│                          Production correct    │
│ Complete Button        → Only on              │
│                          Personalization       │
│                          stage, after check    │
└─────────────────────────────────────────────┘
```

**UX Design (Illusion of Choice):**
- Stage dots at the top show ALL 6 stages with icons
- Locked stages show a subtle 🔒 + greyed out dot
- Current stage pulses gently
- Completed stages show ✅ with green fill
- Student can navigate BACKWARDS freely (review completed stages)
- Student can ONLY go forward by completing the current stage
- Arrow keys: ← always works (back), → only works if current stage is completed

**Mobile Touch:** Swipe left = go back. Swipe right = attempt to advance (triggers exercise if incomplete). No accidental skipping.

**Files to modify:**
- `src/features/vocab-card-renderer.js` — add `stageCompleted[]` boolean array, gate `goToNextStage()` behind completion check

#### 3.2 — Implement renderPersonalizationStage()

**Master Doc Spec (CONSTRAINT 5):**
> "Personalization Slide: Provides an Uzbek prompt for an open-ended personal response (e.g., 'Sumkangizda nima bor?' / 'What is in your bag?'). Uses flexibleCheck (Regex) to validate that target tokens are used in the response."

**Implementation:**

```
┌──────────────────────────────────────────────┐
│  🎯 PERSONALIZATION                           │
│                                                │
│  Uzbek Prompt:                                 │
│  "Oilangizda kimlar bor?"                      │
│  (Who is in your family?)                      │
│                                                │
│  ✍️ Write your OWN answer in English:           │
│  ┌──────────────────────────────────┐          │
│  │ I have a brother and a sister.  │          │
│  └──────────────────────────────────┘          │
│                                                │
│  [Check My Answer]                             │
│                                                │
│  ✅ Great! You used "have" correctly!           │
│  💡 Bonus: Try adding "My brother is..."        │
└──────────────────────────────────────────────┘
```

**flexibleCheck Implementation:**
```javascript
function flexibleCheck(userAnswer, targetTokens, grammarPattern) {
  const normalized = userAnswer.toLowerCase().trim();
  // Check 1: Does the answer contain the target tokens?
  const tokensUsed = targetTokens.filter(t => normalized.includes(t.toLowerCase()));
  const allTokensUsed = tokensUsed.length >= Math.ceil(targetTokens.length * 0.5); // At least 50% of target tokens
  // Check 2: Does the answer match the grammar pattern? (regex)
  const grammarMatch = grammarPattern ? grammarPattern.test(normalized) : true;
  // Check 3: Minimum length (not just one word)
  const minLength = normalized.split(/\s+/).length >= 3;
  
  return { pass: allTokensUsed && grammarMatch && minLength, tokensUsed, tokensUsed };
}
```

**Data Schema Addition (per card in vocab_cards_uXX.js):**
```javascript
personalization: {
  prompt: "Oilangizda kimlar bor?",     // Uzbek prompt
  prompt_en: "Who is in your family?",   // English fallback
  target_tokens: ["have", "has"],        // Must appear in response
  grammar_pattern: /\b(i|he|she|we|they)\s+(have|has)\b/i,  // Regex validation
  example_response: "I have two brothers and one sister.",
  bonus_prompt: "Now add a sentence using 'is': My brother is..."  // Extension
}
```

**Files to modify:**
- `src/features/vocab-card-renderer.js` — implement `renderPersonalizationStage()` function
- `src/types/vocab_slide.d.ts` — add `VocabPersonalizationSlide` type
- All `vocab_cards_uXX_4act.js` files — add `personalization` data to each card

#### 3.3 — Rich Error Feedback in Production Stage

**Current state:** Wrong answer shows "Not quite. Here's the answer."  
**Target state:** Contrastive feedback that teaches from the error.

**Implementation:**

```
WRONG ANSWER SCENARIO:
Student types: "She wake up at seven"
Expected:      "She wakes up at seven"

FEEDBACK:
┌──────────────────────────────────────────────────────┐
│  ❌ Almost! Look at the difference:                    │
│                                                        │
│  You wrote: She wake up at seven                       │
│  Correct:   She wakes up at seven                      │
│                    ^^^^^                                │
│               (3rd person needs -s!)                    │
│                                                        │
│  📖 Remember: He/She/It → verb + s                     │
│  (Grammar Table reference from Act 1)                  │
│                                                        │
│  [Try Again] ← answer field cleared, user retries      │
└──────────────────────────────────────────────────────┘
```

**Error Detection Logic:**
1. Run Levenshtein diff between user answer and correct answer
2. Identify the specific morphological change (suffix, word swap, word order)
3. Map the error to a known grammar pattern tag (from RULE E4: `missing_third_person_s`, `wrong_tense`, etc.)
4. Display the contrasting forms using the Master Doc's contrastive color scheme (🔵 blue = user's form, 🔴 red = correct form)
5. Link to the grammar table already present in Act 1 (Presentation)

**Retry Mechanism:**
- First wrong answer → full explanation + "Try Again" button
- Second wrong answer → show correct answer + "Next Stage" button
- Track errors in `session.mistakes[]` for Done tile Mistake Log

**Files to modify:**
- `src/features/vocab-card-renderer.js` — rewrite production check handler
- `src/core/helpers.js` — add `diffWords()` function that returns morphological difference
- Add error-to-grammar mapping table

#### 3.4 — Trap Detection with Teaching Moment

**Master Doc Reference:** RULE E5 Type 2 (TRAP exercise) — "Error Identification & Correction"

**Current state:** Trap triggers → "Check your answer carefully" (no explanation).  
**Target state:** Trap becomes a mini-lesson:

```
TRAP TRIGGERED:
Student types: "Men ishga boraman" (Uzbek word order in English input)

FEEDBACK:
┌──────────────────────────────────────────────┐
│  ⚠️ TRAP DETECTED!                            │
│                                                │
│  Your brain used Uzbek word order!             │
│  This is normal — let's fix it:                │
│                                                │
│  🇺🇿 UZ order: Men ishga boraman              │
│  🪞 Mirror:    I [ishga] go                    │
│  🇬🇧 EN order: I go to work                    │
│                                                │
│  In English, the VERB comes before             │
│  the PLACE. Try again!                         │
│                                                │
│  [Try Again] ← input cleared for retry         │
└──────────────────────────────────────────────┘
```

**The trap becomes a RULE E11 teaching moment** — showing the UZ→Mirror→EN progression inline, exactly as the Master Doc defines syntactic mirroring. This reinforces the student's understanding of word order transfer.

**Data Schema Enhancement:**
```javascript
trap: {
  trigger: "boraman",
  message_uz: "Miyangiz o'zbek tartibini ishlatdi!",  // Your brain used Uzbek order!
  explanation: {
    uz_order: "Men ishga boraman",
    mirror: "I [ishga] go",
    en_order: "I go to work",
    rule: "In English, VERB comes before PLACE"
  }
}
```

**Files to modify:**
- `src/features/vocab-card-renderer.js` — enhance trap feedback renderer
- Vocab card data files — enrich trap data with `explanation` object

#### 3.5 — Fuzzy Matching in Production

**Current state:** Exact match only (after lowercase + punctuation strip).  
**Target state:** Use `helpers.js`'s `fuzzyCompare()` which already exists but is never called.

**Tolerance Tiers:**
| Input Type | Tolerance | Example |
|---|---|---|
| Exact match | 1.0 | "She wakes up" ✅ |
| Minor typo (1 char) | 0.9 | "She wakes uo" ✅ (show note: "Watch spelling: up*") |
| Contraction variant | Alias | "I'm" = "I am" ✅ |
| British spelling | Alias | "colour" = "color" ✅ |
| Major difference | <0.9 | "She go" ❌ (trigger error feedback) |

**Files to modify:**
- `src/features/vocab-card-renderer.js` — replace exact match check with `fuzzyCompare()` from `helpers.js`
- Add contraction/spelling alias map

---

## PHASE 4: DIALOGUE TILE — G1/G2/G3/G4 OVERHAUL

**Audit Issues Addressed:** B1, B2, B3, B4, B5, B6, B7, B8, B9, B10  
**Master Doc Alignment:** Guidelines G1-G4, Mission Flow (Dialogue X.1), Contrastive Turn mechanism

### Fix Plan

#### 4.1 — Fix Speaker Identity (B1, B2)

**Problem:** Speaker alignment uses `idx % 2` instead of actual speaker name. Avatars are hardcoded gendered emojis.

**Fix:**
```javascript
// BEFORE (broken):
const isLeft = idx % 2 === 0;
avatar.textContent = isLeft ? "👨" : "👩";

// AFTER (correct — matches vocab-tile.js sandwich approach):
const speakerSet = new Set();
// ... build speaker set from dialogue.turns
const speakerList = [...speakerSet];
const speakerIndex = speakerList.indexOf(turn.speaker);
const isLeft = speakerIndex % 2 === 0;

// Dynamic avatar from speaker initial (gender-neutral):
avatar.textContent = (turn.speaker || '?').charAt(0).toUpperCase();
avatar.className = `dialogue-avatar ${isLeft ? 'speaker-a' : 'speaker-b'}`;
```

**Mobile Consideration:** Avatar circles must be ≥40px touch targets.

**Files to modify:** `src/tiles/dialogue-tile.js` — replace `idx % 2` with speaker-map approach (already used in vocab-tile.js sandwich sections)

#### 4.2 — Make Thinking Pressure (G2) Require Production

**Master Doc Reference:** G2 says "student to initiate production" and "RESPONSE_DEADLINE forces proceduralization".

**Current state:** Passive — text vanishes, timer runs, text reappears. Student does nothing.  
**Target state:** Student must reproduce a key word/phrase from the vanished line within the 2s window.

**New G2 Flow:**

```
1. Audio plays → line visible for 800ms
2. Line vanishes (opacity: 0, blur: 4px)
3. KEY WORD appears as gap: "I _____ at seven"
4. Word bank (3 choices) appears: [wake up] [get up] [go to]
5. 2.0s timer bar depletes
6. Student taps correct word → ✅ +5 XP, line reveals
7. Timer expires OR wrong word → line reveals, no penalty, subtle shake
8. Next line...
```

**Why Word Bank Instead of Typing:** On mobile, bringing up a keyboard for each of 8-10 lines during a timed exercise creates terrible UX — the keyboard animation eats into the 2s window. A 3-option word bank is tap-friendly and maintains time pressure.

**Adaptive Scope (not adaptive timing — timers stay 800ms/2000ms per Master Doc):**
- First try: gap is the EASIEST word (function words like "at", "the")
- Second try (if student replays): gap is a CONTENT word
- Third try: gap is the TARGET grammar form (the morphological change)

**Files to modify:** `src/tiles/dialogue-tile.js` — rewrite `startThinkingPressure()` to include word-bank tap exercise

#### 4.3 — Gate Line Mastery (G4) Behind Reproduction

**Current state:** Click any line → instant mastery badge.  
**Target state:** Student must reproduce the line's English text to earn mastery.

**New G4 Flow:**

```
Student clicks a dialogue line in practice mode:
┌──────────────────────────────────────────────┐
│  🎯 Master this line!                          │
│                                                │
│  [Uzbek text shown as hint]                    │
│  "Men soat yettida uyg'onaman"                 │
│                                                │
│  Type the English:                             │
│  ┌──────────────────────────────────┐          │
│  │ I wake up at seven              │          │
│  └──────────────────────────────────┘          │
│                                                │
│  [Check] ← fuzzy match (0.85 tolerance)        │
│                                                │
│  OR: [Arrange words]:                          │
│  [seven] [wake up] [I] [at]                    │
│  → Student arranges → checks                   │
└──────────────────────────────────────────────┘
```

**Mobile Consideration:** Offer BOTH input methods — typing AND word arrangement (jumble). Student chooses (illusion of choice). On phone, word arrangement is finger-friendly; typing is fallback.

**Files to modify:** `src/tiles/dialogue-tile.js` — wrap mastery click handler in a mini-exercise overlay

#### 4.4 — Make Contrastive Turn Discovery Interactive

**Master Doc Reference:** "Contrastive Turn Discovery Popup MANDATORY after every dialogue"

**Current state:** Discovery popup shows blue/red forms → student reads them → closes. Passive.  
**Target state:** Discovery popup becomes interactive — student must demonstrate they noticed the pattern.

**New Discovery Popup Flow:**

```
STEP 1 (Current — keep): Show blue vs red highlights
  🔵 "Do you have a book?"
  🔴 "No, I have three books."

STEP 2 (NEW — add): Quick check question
  "What changed? Tap the correct answer:"
  [A] "book" → "books" (added -s)     ← correct
  [B] "Do" → "No" (question → answer)
  [C] "a" → "three" (number changed)

STEP 3 (NEW — add): Production attempt
  "Now YOU make the change:"
  "Do you have a pen?" → ?
  Student types: "No, I have three pens."  ← checked with fuzzy match
  
  +10 XP awarded on success!
```

**This transforms the popup from a passive reading exercise into a 3-step Noticing → Recognition → Production sequence** (aligned with Master Doc's implicit grammar teaching philosophy — learning through discovery, not explicit rules).

**Files to modify:**
- `src/tiles/dialogue-tile.js` — extend `showDiscoveryPopup()` with MCQ step and production step
- Contrastive turn data — add `quiz` and `production_prompt` fields

#### 4.5 — Fix Re-Practice Cloze System (B6, B7, B8)

**Problems:**
1. Distractors are hardcoded generic -ing words
2. Gap selection is random, not pedagogical
3. Stages regenerate randomly, not progressively harder

**Fixes:**

**A. Smart Distractors:**
```javascript
// Generate distractors from the lesson's own vocabulary + known confusable items
function generateDistractors(lesson, correctWords) {
  const pool = [];
  // Add words from THIS lesson that aren't in gaps (same semantic field)
  lesson.vocab_ids.forEach(id => {
    const card = findCard(id);
    if (card?.en && !correctWords.includes(card.en.toLowerCase())) {
      pool.push(card.en);
    }
  });
  // Add grammar confusables (same form class)
  // e.g., if correct is "wakes", add "wake", "waking", "woke"
  correctWords.forEach(word => {
    pool.push(...getGrammarConfusables(word));
  });
  // Return 3-5 unique distractors
  return shuffleArray(pool).slice(0, Math.min(5, pool.length));
}
```

**B. Pedagogical Gap Targeting:**
```javascript
// Instead of random gaps, target IN THIS ORDER:
// 1. Target grammar forms (from lesson.grammar_focus)
// 2. Target vocabulary (from lesson.vocab_ids)
// 3. Content words (nouns, verbs — never articles/prepositions for Stage 1)
function selectGaps(words, stage, grammarFocus) {
  // Stage 1: Only gap grammar focus words (1-2 per turn)
  if (stage === 1) return findGrammarFocusWords(words, grammarFocus, 2);
  // Stage 2: Gap grammar + target vocabulary (3-4 per turn)
  if (stage === 2) return findGrammarAndVocabWords(words, grammarFocus, 4);
  // Stage 3: Gap everything except function words (hard)
  return findAllContentWords(words, 6);
}
```

**C. Deterministic Stage Progression:**
- Stage 1 seed → fixed set of "easy" gaps (grammar focus words)
- Stage 2 seed → SAME gaps as Stage 1 PLUS additional vocabulary gaps
- Stage 3 seed → SAME gaps as Stage 2 PLUS remaining content words
- This ensures true progressive difficulty: Stage 3 includes everything from Stage 1+2 plus more

**Files to modify:** `src/tiles/dialogue-tile.js` — rewrite `renderDialogueRepractice()` gap selection and distractor generation

#### 4.6 — Fix Hardcoded Uzbek Toggle Text (B10)

**Problem:** Toggle button uses hardcoded Uzbek strings instead of i18n keys.  
**Fix:** Replace with `uz('dialogue.hideTranslation')` and `uz('dialogue.showTranslation')`.

**Files to modify:**
- `src/tiles/dialogue-tile.js` — replace hardcoded strings
- `src/core/i18n.js` — add missing keys (`dialogue.hideTranslation`, `dialogue.showTranslation`)

---

## PHASE 4b: DATA & CONTENT ARCHITECTURE FIXES

**Audit Issues Addressed:** G1, G2, G3, G4, G5  
**Master Doc Alignment:** CONSTRAINT 5 (data quality), CONSTRAINT 4 (recycling metadata), all Rules requiring accurate data

### Problem Summary
The `DATA_TEMPLATE_SCHEMA.js` is a 686-line reference document that is never validated at runtime. Vocab card data files have duplicate drill examples, dialogues below minimum line counts, Arabic fields undocumented in the schema, and inconsistent `target[]`/`recycled[]` annotations.

#### 4b.1 — Runtime Schema Validation (G1)

**Problem:** `DATA_TEMPLATE_SCHEMA.js` is never imported, parsed, or validated against at load time. Missing required fields, wrong types, or extra undocumented properties silently pass through until they cause runtime crashes.

**Fix:** Create a `validateUnitData(unitData)` function that runs on curriculum load:
- Validate all required top-level keys exist
- Verify every card has exactly 6 slides in correct phase order (Presentation → Concept Check → Discovery → Drill → Production → Personalization)
- Check `dialogue_ref` points to a real dialogue line
- Check `recycling.mandatory` has entries for all prior units
- Run in dev mode → log warnings; in production → log to error tracking

**Files to create/modify:**
- Create `src/utils/schema-validator.js` — validation logic
- `src/core/curriculum-loader.js` — call validator on `loadUnit()`

#### 4b.2 — Fix Duplicate Drill Examples (G2)

**Problem:** Multiple cards have identical sentences for anchor and example 2 in the drill list. This defeats the drill's purpose of exposing target words in varied contexts (CONSTRAINT 5, Act 3).

**Fix:** Audit all 10 unit data files for drill_list duplicates. Enforce uniqueness: all `en_examples` in a drill list must have distinct English sentences. Add a validation rule to the schema validator that flags duplicate `en` strings within the same card's `en_examples[]`.

**Files to modify:** All `vocab_cards_uXX_4act.js` files, `src/utils/schema-validator.js`

#### 4b.3 — Expand Short Dialogues to Minimum (G3)

**Problem:** Schema specifies 8-12 lines per dialogue (RULE D1), but actual dialogues have as few as 4 lines. Short dialogues reduce recycling opportunity (CONSTRAINT 4) and make G1/G3 features less effective.

**Fix:** Expand all dialogues to the 8-line minimum. Added lines must incorporate recycled vocabulary and extend conversational context naturally. Each added line requires `speaker`, `line`, `line_uz`, `target[]`, `recycled[]`, `mastery_key`, and `audio_id`. Add validation rule flagging dialogues under 8 lines.

**Files to modify:** All `vocab_cards_uXX_4act.js` files (dialogue sections), `src/utils/schema-validator.js`

#### 4b.4 — Document Arabic Fields in Schema (G4)

**Problem:** Data files include extensive Arabic localization fields (`ar_context`, `ar_mirror_answer`, `ar_instruction`, `ar_success_msg`, `ar_fail_msg`, `ar_syntax_scaffold`, `ar_label`, `line_ar`) that are completely absent from `DATA_TEMPLATE_SCHEMA.js`. Arabic support is bolted on ad-hoc with no contract — some cards have Arabic fields, others may not.

**Fix:** Add all `ar_` fields to `DATA_TEMPLATE_SCHEMA.js` as documented optional properties. For every `uz_` field, add a parallel `ar_` field. Add a validation mode that checks Arabic field completeness across all cards. Decide on language support policy: is Arabic first-class (required) or optional (validated separately)?

**Files to modify:** `DATA_TEMPLATE_SCHEMA.js`, `src/utils/schema-validator.js`

#### 4b.5 — Fix Target/Recycled Annotation Gaps (G5)

**Problem:** Dialogue lines have `target[]` and `recycled[]` arrays but they're inconsistently populated. Some lines have empty `target: []` despite containing vocabulary words introduced in the lesson. This undermines the recycling analyzer and CONSTRAINT 4 ratio calculations.

**Fix:** Audit all dialogue lines across all 10 units and fill in `target[]` with every new-in-this-unit word. Fill `recycled[]` with every word from a prior unit. Consider creating a script to auto-detect target/recycled words by cross-referencing `mission.target_vocab` and prior units' vocab lists against dialogue text.

**Files to modify:** All `vocab_cards_uXX_4act.js` files, `recycling_analyzer.py` (add annotation completeness check)

---

## PHASE 4c: COGNITIVE LOAD & UX FIXES

**Audit Issues Addressed:** H1, H2, H3  
**Master Doc Alignment:** User experience must not overwhelm A1 absolute beginners while maintaining all required features

### Problem Summary
The dialogue tile renders 9+ controls simultaneously (3 toolbars), all features are exposed from lesson 1, and the vocab card modal is too dense for mobile screens.

#### 4c.1 — Collapse Toolbar Overload (H1)

**Problem:** The dialogue tile renders three separate toolbar rows above the dialogue: (1) Mode selector (3 buttons), (2) Language toggle (3 buttons), (3) Vanishing Script toggle (3 buttons) — totaling 9 interactive controls plus Play All. On mobile, this dominates the viewport, pushes dialogue below the fold, and creates decision paralysis.

**Fix:**
- Keep ONLY the Language toggle (UZ/Mirror/EN) visible by default — it's the primary learning toggle
- Collapse Mode selector and Vanishing Script into a single ⚙️ settings gear icon that opens a slide-out panel
- On mobile, use bottom-sheet UI for the settings panel to maximize viewport for dialogue content
- Remove Vanishing Script toggle from the main UI for Stage 1-2; only show starting Stage 3

**Files to modify:**
- `src/tiles/dialogue-tile.js` — refactor toolbar rendering
- Create `src/components/dialogue-settings-panel.js` — slide-out settings component

#### 4c.2 — Progressive Feature Disclosure (H2)

**Problem:** Every pedagogical feature (Mirror Mode, Vanishing Script, Grammar Flood, Mastery badges, Contrastive Turn discovery, audio controls, mode toggles) is exposed simultaneously from Unit 01 Lesson 01. A1 beginners must learn 6+ UI concepts on top of learning English. No mechanism introduces features gradually.

**Fix:** Implement a feature-reveal system tied to progression:

| Unlock Point | Features Available |
|---|---|
| **U01 L01** | Language toggle (UZ → EN) only. No Mirror, no Vanishing, no Grammar Flood. |
| **U01 L02** | + Mirror Mode (with one-time tooltip: "Try Mirror mode!") |
| **U02** | + Vanishing Script (Full/Faded only; Blind unlocked at U03) |
| **U03** | + Grammar Flood highlighting (with explanation tooltip) |
| **U04+** | All features available, preferences remembered |

Track feature-unlock state in `AppState.progress.unlockedFeatures[]`. Gate feature rendering behind this check. Each first-time feature gets a brief (3-second) coach-mark overlay explaining what it does.

**Files to modify:**
- `src/state/app-state.js` — add `progress.unlockedFeatures[]`
- `src/tiles/dialogue-tile.js` — conditional feature rendering based on unlock state
- Create `src/components/feature-coach-mark.js` — tooltip/coach-mark component

#### 4c.3 — Mobile-Optimized Vocab Card Modal (H3)

**Problem:** The vocab card modal packs header (word + translation + POS tags), 6-icon stage progress bar, stage label, full stage content (trilingual text + exercises + feedback), and navigation footer — all in a fixed overlay. On mobile (≤400px), this forces scrolling within the modal, clips text, and leaves minimal visual breathing room.

**Fix:**
1. Replace the 6-icon progress bar with a minimal "2 of 6" text counter + thin progress line (stage names shown only when tapped)
2. Increase vertical padding between content blocks to ≥16px gaps
3. For trilingual stages (Uzbek + Arabic + English), use tabbed/accordion view instead of vertical stacking
4. Make stage content area scrollable independently from header/footer
5. On screens ≤400px, use full-screen modal instead of centered overlay to maximize space

**Files to modify:**
- `src/features/vocab-card-renderer.js` — modal layout refactor
- CSS files — add mobile breakpoint styles (≤400px)

---

## PHASE 5: GAMIFICATION ENGINE (DOPAMINE LOOP)

**Audit Issues Addressed:** E1, E2, E3, E4, A4  
**Design Constraint:** Must compete with Duolingo's engagement loop.

### The Dopamine Architecture

Research basis: Duolingo's success relies on 4 psychological hooks (Nir Eyal's "Hooked" model):
1. **Trigger** (external → internal): Notifications → habit
2. **Action** (low friction): Tap to start, <30s to first reward
3. **Variable Reward** (unpredictable): XP, gems, streaks, leaderboards
4. **Investment** (stored value): Streak, level, badges, progress

### Fix Plan

#### 5.1 — Persistent XP Bar (Always Visible)

**Current state:** XP is awarded but never shown.  
**Target state:** A slim XP progress bar sits at the TOP of every tile (like Duolingo's green bar).

```
┌──────────────────────────────────────────────┐
│  [💎 1,250 XP]  [📊 Level 5]  [🔥 3 days]     │
│  ████████████████░░░░░░  250/500 to Level 6   │
├──────────────────────────────────────────────┤
│                                                │
│  (tile content below)                          │
```

**Level Formula:** Level N requires `N × 100` XP.
- Level 1: 0-100 XP
- Level 2: 100-200 XP
- Level 5: 400-500 XP
- Level 10: 900-1000 XP

**Level-Up Animation:** Full-screen confetti burst + "LEVEL UP! 🎉" + badge unlock notification.

**Files to create/modify:**
- Create `src/components/xp-bar.js` — persistent XP bar component
- `src/core/navigation.js` — inject XP bar into every tile render
- `src/state/app-state.js` — add `session.xpToNextLevel` computed value

#### 5.2 — Streak System with Visual Fire

**Current state:** `updateStreak()` exists but streak is invisible.  
**Target state:** Streak counter with "fire" animation, visible on every screen.

**Streak Rules:**
- Count increments when student completes at least 1 lesson in a calendar day
- 3-day streak: 🔥 Small flame icon
- 7-day streak: 🔥🔥 Medium flame + "Nice streak!" toast
- 14-day streak: 🔥🔥🔥 Large flame + "Unstoppable!" badge
- 30-day streak: 🏆 Gold flame + permanent badge

**Streak Protection (Duolingo-inspired):**
- If student misses 1 day: "Streak Freeze" option — costs 50 XP to save streak
- This creates emotional investment in the streak (sunk cost effect)

**Mobile Notification (future):** Push notification at student's usual practice time: "Your 🔥 streak is at risk!"

**Files to create/modify:**
- Create `src/components/streak-display.js`
- `src/tiles/done-tile.js` — show streak update animation after lesson

#### 5.3 — Badge Catalog with Visual Pop

**Current state:** Badge check runs silently in try-catch, results invisible.  
**Target state:** Badge pop-up notifications with collection display.

**Badge Categories (Aligned with Master Doc Progression):**

| Badge | Trigger | Icon | XP Bonus |
|---|---|---|---|
| First Steps | Complete U01_L01 | 🌱 | +50 |
| Grammar Detective | Score 90%+ on a contrastive turn discovery | 🔍 | +25 |
| Vocabulary Champion | Complete all vocab cards in a lesson without errors | 📚 | +50 |
| Mirror Master | Master 10 lines via Mirror Mode | 🪟 | +30 |
| Pressure Proof | Complete Thinking Pressure (G2) 100% | ⏱️ | +40 |
| Writing Star | Complete 5 personalization responses | ✍️ | +35 |
| Speed Demon | Complete a lesson in under 10 minutes | ⚡ | +25 |
| Perfect Streak | 7-day streak | 🔥 | +100 |
| Sandwich Master | Unlock a full dialogue from UZ→EN via vocab cards | 🥪 | +75 |
| Unit Conqueror | Complete all lessons in a unit | 🏰 | +200 |

**Badge Pop-Up Design:**
```
┌──────────────────────────────┐
│    🏅 NEW BADGE EARNED!       │
│                                │
│    [🔍 Grammar Detective]     │
│                                │
│    "You noticed the grammar   │
│     pattern on your first     │
│     try! Sharp eyes!"         │
│                                │
│    +25 XP Bonus               │
│                                │
│    [🎉 Awesome!]              │
└──────────────────────────────┘
```

**Files to create/modify:**
- `src/core/badge-catalog.js` — expand badge definitions
- `src/components/badge-notification.js` — create pop-up component
- `src/tiles/done-tile.js` — trigger badge checks after scoring is wired

#### 5.4 — Micro-Rewards Per Exercise (Variable Reward Psychology)

**Principle:** Every correct answer triggers a tiny dopamine hit — a +XP animation that flies from the answer to the XP bar.

**Implementation:**
```javascript
// After every correct exercise answer:
function triggerMicroReward(points, element) {
  // 1. Show "+5 XP" flying text from the answer element to the XP bar
  animatePointsFly(element, document.getElementById('xp-bar'), points);
  // 2. XP bar pulses green briefly
  document.getElementById('xp-bar').classList.add('xp-pulse');
  // 3. Small haptic vibration (mobile)
  if (navigator.vibrate) navigator.vibrate(50);
  // 4. Satisfying "ding" sound
  playSound('micro-reward');
}
```

**Variable Rewards (unpredictability):**
- Occasionally (10% chance) a correct answer triggers a BONUS: "🌟 DOUBLE XP! +10 instead of +5"
- This is random and rare, creating the "slot machine" effect that keeps students engaged
- The 10% rate prevents expectation while maintaining excitement

**Files to create:**
- `src/components/micro-reward.js` — flying XP animation + sound
- `src/utils/audio.js` — add micro-reward sound asset reference

---

## PHASE 6: HANDS-ON ACTIVITY MANDATE

**Audit Issues Addressed:** I3, I4, I5, D1 (no passive screens)  
**Core Rule:** Every screen in student mode MUST require at least ONE interaction before the student can proceed.

### 6.1 — Passive Screen Audit & Conversion

Every screen currently in the app, checked against the hands-on mandate:

| Screen | Current State | Passive? | Fix |
|---|---|---|---|
| Intro Tile | Title + Start button | ✅ Passive | Add warm-up exercise (Phase 2.1) |
| Vocab Card — Presentation | Flip card (tap to see back) | ⚠️ Semi-passive | **Keep** — flip IS an action. Add 3s minimum view time before Next. |
| Vocab Card — Concept Check | Sort/MCQ exercise | ❌ Active | No change needed |
| Vocab Card — Discovery | MCQ about grammar form | ❌ Active | No change needed (once implemented) |
| Vocab Card — Drill | Jumble/Scratch exercise | ❌ Active | No change needed |
| Vocab Card — Production | Type answer + trap check | ❌ Active | No change needed |
| Vocab Card — Personalization | Write personal sentence | ❌ Active | No change needed (once implemented) |
| Dialogue — Initial view | Read dialogue | ✅ Passive | **Fix:** Gate "Continue" behind comprehension check |
| Dialogue — Thinking Pressure | Watch text vanish | ✅ Passive | **Fix:** Add word-bank tap (Phase 4.2) |
| Dialogue — Contrastive Turn | Read blue/red popup | ✅ Passive | **Fix:** Add MCQ + production (Phase 4.4) |
| Dialogue — Re-practice | Fill cloze gaps | ❌ Active | No change needed |
| Done Tile | Read score | ✅ Passive | **Fix:** Add review exercise + writing challenge (Phase 2.4) |

**Result after Phase 6:** Zero passive screens in the entire student flow.

### 6.2 — Comprehension Gate After Dialogue Reading

**Current Issue (I3):** The dialogue can be read and skipped without proving comprehension.

**Fix:** The dialogue tile's "Continue →" button is GATED behind answering the `comprehension_check` MCQ that already exists in the dialogue data. If no comprehension_check exists in the data, auto-generate a simple one:

```javascript
function autoGenerateComprehensionCheck(dialogue) {
  // Pick a random turn and ask "What did [speaker] say about [topic]?"
  const turn = dialogue.turns[Math.floor(Math.random() * dialogue.turns.length)];
  return {
    question_uz: `${turn.speaker} nima dedi?`,
    question_en: `What did ${turn.speaker} say?`,
    options: [turn.text, generateDistractor1(dialogue), generateDistractor2(dialogue)],
    correct_index: 0
  };
}
```

**Files to modify:** `src/tiles/dialogue-tile.js` — gate navigation behind comprehension_check

### 6.3 — Listening Micro-Task (Address I3: No Receptive Skills)

**Add optional "Listen & Tap" exercise** within the dialogue tile:
- After reading the dialogue, a "🎧 Listen Challenge" button appears
- One random dialogue line plays audio
- Student sees 3 text options and taps the one they heard
- +5 XP on correct, no penalty on wrong

This is a lightweight listening comprehension task that doesn't require new data — it reuses existing dialogue audio and text.

**Files to modify:**
- `src/tiles/dialogue-tile.js` — add `renderListenChallenge()` function after dialogue section

---

## PHASE 7: ACCESSIBILITY, i18n, MOBILE-READY

**Audit Issues Addressed:** F1, F2, F3, F4, F5, H4, B2, B10

### 7.1 — Keyboard & Screen Reader Accessibility

**Vocab Cards:** Add `role="button"`, `tabindex="0"`, and `Enter`/`Space` key handlers to all `.vocab-card` divs.

**Dialogue Bubbles:** Add `aria-label` with speaker name + line text to each turn.

**Modal Focus Trap:** When vocab card modal opens, trap focus inside it. Restore focus on close.

**Files to modify:**
- `src/tiles/vocab-tile.js` — add ARIA attributes to vocab cards
- `src/tiles/dialogue-tile.js` — add ARIA to dialogue turns
- `src/features/vocab-card-renderer.js` — add focus trap to modal

### 7.2 — RTL Support Preparation

**For Arabic locale:** Add `dir="rtl"` to the root container when locale is `ar`. Use CSS logical properties (`margin-inline-start` instead of `margin-left`) wherever possible.

**Phase this in:** Not critical for MVP, but lay the CSS groundwork now.

**Files to modify:**
- `src/core/i18n.js` — add `getDirection()` function returning `'rtl'` for Arabic
- Create `src/styles/rtl-overrides.css` — logical property overrides

### 7.3 — Rename `uz()` to `t()` (Translation Function)

**Current issue (F1):** Function is called `uz()` but returns text in whatever the active locale is.

**Fix:** Rename to `t()` (standard i18n convention). Keep `uz()` as a deprecated alias for backward compatibility during transition.

```javascript
// In i18n.js:
export function t(key, params) { /* ... existing logic ... */ }
export const uz = t; // Deprecated alias — TODO: migrate all call sites
```

**Files to modify:** `src/core/i18n.js` — add `t` export, mark `uz` as alias

### 7.4 — Speaker Color Accessibility (F5)

**Problem:** Speakers differentiated only by color (purple vs teal).

**Fix:** Add redundant cues:
- Speaker A: Left-aligned + blue gradient + "A" avatar badge
- Speaker B: Right-aligned + green gradient + "B" avatar badge
- Add subtle pattern: Speaker A bubbles have left border accent; Speaker B have right border accent

**Files to modify:** `src/tiles/dialogue-tile.js` — add CSS patterns + avatar initials (Phase 4.1 handles this)

### 7.5 — External CSS Migration (H4)

**Problem:** dialogue-tile.js and re-practice CSS injected at runtime via `createElement('style')`.

**Fix:** Move all injected CSS to `src/styles/dialogue.css` and `src/styles/repractice.css`. Import via `<link>` in HTML or bundle.

**Files to create:**
- `src/styles/dialogue.css`
- `src/styles/repractice.css`

**Files to modify:** `src/tiles/dialogue-tile.js` — remove `injectDialogueCSS()` and `injectRepracticeCSS()` functions

---

## PHASE 8: SCALABILITY ARCHITECTURE (A2/B1/B2)

**Design Constraint:** All fixes in Phases 1-7 must work when the app scales beyond A1.

### 8.1 — CEFR Level Registry

```javascript
// src/core/cefr-registry.js (NEW)
export const CEFR_LEVELS = {
  A1: {
    id: 'A1',
    label: 'Beginner',
    units: ['U01', 'U01_5', 'U02', 'U03', 'U04', 'U05', 'U06', 'U07', 'U08', 'U09', 'U10'],
    scalability_levels: [1, 2, 3, 4, 5, 6],  // All Master Doc levels
    max_adverbials: { 'U01-U04': 1, 'U05-U07': 2, 'U08-U10': 3 },
    mission_flow: '3x2_successive_mastery',
    thinking_pressure: { vanish_ms: 800, deadline_ms: 2000 },
  },
  A2: {
    id: 'A2',
    label: 'Elementary',
    units: [], // TBD
    scalability_levels: [1, 2, 3, 4, 5, 6, 7, 8], // Extended levels
    max_adverbials: { default: 3 },
    mission_flow: '3x2_successive_mastery', // Same model, harder content
    thinking_pressure: { vanish_ms: 600, deadline_ms: 1800 }, // Slightly faster
  },
  B1: {
    id: 'B1',
    label: 'Intermediate',
    units: [],
    scalability_levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    max_adverbials: { default: 4 },
    mission_flow: '4x2_extended_mastery', // Add conditional & passive voice stages
    thinking_pressure: { vanish_ms: 500, deadline_ms: 1500 },
  },
  B2: {
    id: 'B2',
    label: 'Upper Intermediate',
    units: [],
    scalability_levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    max_adverbials: { default: 5 },
    mission_flow: '5x2_full_mastery', // Add subjunctive & reported speech stages
    thinking_pressure: { vanish_ms: 400, deadline_ms: 1200 },
  }
};
```

### 8.2 — Level-Aware Components

All components that currently hardcode A1 assumptions must read from the CEFR registry:

| Component | A1 Assumption | Scalable Version |
|---|---|---|
| Thinking Pressure timers | Hardcoded 800/2000 | Read from `CEFR_LEVELS[currentLevel].thinking_pressure` |
| Grammar flood patterns | Hardcoded present continuous patterns | Read from `unit.grammar_focus` dynamically |
| Re-practice gap count | Fixed 15%/35%/all | Read from `CEFR_LEVELS[currentLevel].gap_ratios` |
| Vocab card count limit | Hardcoded 8 per lesson | Read from `CEFR_LEVELS[currentLevel].max_cards_per_lesson` |

### 8.3 — Phone App Architecture Pre-Planning

**Target:** The web app will be wrapped in a native shell (Capacitor/React Native WebView) for iOS/Android.

**Design decisions to make NOW that prevent phone app pain later:**

| Decision | Web-First Approach | Phone-Ready Approach |
|---|---|---|
| **State persistence** | localStorage | localStorage (works in WebView) + optional cloud sync API endpoint |
| **Audio playback** | HTML5 Audio | HTML5 Audio (works in WebView) + Capacitor Audio plugin for background |
| **Haptic feedback** | `navigator.vibrate()` | Works on Android WebView; iOS needs Capacitor Haptics plugin |
| **Push notifications** | N/A | Design notification triggers NOW (streak at risk, daily reminder); implement native later |
| **Offline support** | None | Service Worker + cache vocab card data + audio files. Design NOW. |
| **Touch targets** | Minimum 44×44px (Apple HIG) | Already enforced if we follow this rule |
| **Viewport** | `<meta name="viewport">` with `user-scalable=no` | Prevent zoom on input focus |
| **Keyboard avoidance** | CSS `padding-bottom` when keyboard visible | Use `visualViewport` API to detect keyboard |

**Files to create (preparation — not functional yet):**
- `src/utils/platform.js` — feature detection (touch, vibration, notification support)
- `src/utils/offline-cache.js` — service worker registration stub

### 8.4 — Data Format Forward Compatibility

All vocab card data files (`vocab_cards_uXX_4act.js`) must include a `cefr_level` property so A2/B1/B2 content can coexist:

```javascript
// Current:
const VOCAB_CARDS_U01 = { unit_id: "U01", ... }

// Future-proof:
const VOCAB_CARDS_U01 = { unit_id: "U01", cefr_level: "A1", ... }
```

This is a non-breaking addition — existing code ignores unknown properties.

---

## IMPLEMENTATION PRIORITY MATRIX

### Priority 1: CRITICAL (Fixes that make the app functional)
| # | Phase | Task | Effort | Impact |
|---|---|---|---|---|
| 1 | 1.1 | Unify scoring into AppState | Medium | **Score actually works** |
| 2 | 1.2 | Wire scoring into every exercise | High | **XP/badges become real** |
| 3 | 1.3 | Fix done-tile rating labels | Tiny | **Correct feedback text** |
| 4 | 3.1 | Gate vocab card stages | Medium | **Students can't skip learning** |
| 5 | 3.2 | Implement Personalization stage | Medium | **CONSTRAINT 5 compliance** |

### Priority 2: HIGH (Core pedagogical fixes)
| # | Phase | Task | Effort | Impact |
|---|---|---|---|---|
| 6 | 2.2 | Enforce Sandwich Flow (UZ→Mirror→EN) | High | **Mission Flow compliance** |
| 7 | 4.1 | Fix speaker identity | Small | **Correct dialogue UX** |
| 8 | 4.2 | Make Thinking Pressure require production | Medium | **G2 becomes real exercise** |
| 9 | 4.3 | Gate mastery behind reproduction | Medium | **G4 becomes meaningful** |
| 10 | 4.4 | Interactive contrastive turn discovery | Medium | **Contrastive Turns compliance** |
| 11 | 5.1 | Persistent XP bar | Medium | **Gamification visible** |
| 12 | 3.3 | Rich error feedback in production | Medium | **Real teaching from mistakes** |

### Priority 2b: HIGH (Data & UX foundations)
| # | Phase | Task | Effort | Impact |
|---|---|---|---|---|
| 12b | 2.1b | Gate lesson-to-lesson progression (D3) | Medium | **Enforce sequential mastery** |
| 12c | 4b.1 | Runtime schema validation (G1) | Medium | **Prevent silent data bugs** |
| 12d | 4c.1 | Collapse toolbar overload (H1) | Medium | **Usable mobile UX** |
| 12e | 4c.2 | Progressive feature disclosure (H2) | Medium | **Beginner-friendly onboarding** |

### Priority 3: MEDIUM (Enhancement & engagement)
| # | Phase | Task | Effort | Impact |
|---|---|---|---|---|
| 13 | 2.1 | Intro tile → Mission Briefing | Medium | **No passive screens** |
| 14 | 2.4 | Done tile → Mission Debrief | High | **Review + reflection** |
| 15 | 2.3 | Mission stage awareness | Medium | **Stage-specific behavior** |
| 16 | 5.2 | Streak system with visual fire | Small | **Daily retention** |
| 17 | 5.3 | Badge catalog expansion | Medium | **Achievement motivation** |
| 18 | 5.4 | Micro-rewards per exercise | Small | **Dopamine per action** |
| 19 | 4.5 | Fix re-practice cloze system | Medium | **Pedagogically sound cloze** |
| 20 | 3.4 | Trap detection teaching moments | Medium | **L1 transfer learning** |
| 21 | 3.5 | Fuzzy matching in production | Small | **Fair answer evaluation** |
| 22 | 6.2 | Comprehension gate after dialogue | Small | **No passive reading** |
| 22b | 4b.2 | Fix duplicate drill examples (G2) | Small | **Data quality** |
| 22c | 4b.3 | Expand short dialogues to minimum (G3) | High | **RULE D1 compliance** |
| 22d | 4b.4 | Document Arabic fields in schema (G4) | Small | **Schema completeness** |
| 22e | 4c.3 | Mobile-optimized vocab card modal (H3) | Medium | **Mobile UX** |

### Priority 4: LOW (Polish, accessibility, future-proofing)
| # | Phase | Task | Effort | Impact |
|---|---|---|---|---|
| 23 | 1.4 | Conditional celebration | Tiny | **Appropriate feedback** |
| 24 | 6.3 | Listen & Tap micro-task | Small | **Receptive skills** |
| 25 | 4.6 | Fix hardcoded Uzbek text | Tiny | **i18n compliance** |
| 26 | 7.1 | Keyboard & screen reader a11y | Medium | **Accessibility** |
| 27 | 7.2 | RTL support preparation | Small | **Arabic locale prep** |
| 28 | 7.3 | Rename `uz()` → `t()` | Small | **Code clarity** |
| 29 | 7.4 | Speaker color accessibility | Small | **Colorblind support** |
| 30 | 7.5 | External CSS migration | Medium | **Maintainability** |
| 30b | 4b.5 | Fix target/recycled annotation gaps (G5) | Medium | **Recycling accuracy** |
| 31 | 8.1 | CEFR level registry | Small | **A2/B1/B2 prep** |
| 32 | 8.2 | Level-aware components | Medium | **Scalable architecture** |
| 33 | 8.3 | Phone app architecture prep | Small | **Mobile app prep** |
| 34 | 8.4 | Data format forward compatibility | Tiny | **Future data format** |

---

## RISK REGISTER

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| **Scoring unification breaks existing saved progress** | Medium | High | Write migration function that converts any `window.sessionScore` data to AppState format; run on app boot |
| **Vocab card gating frustrates users who want to explore** | Medium | Medium | Allow teacher mode to bypass gates; add "skip" option after 3 failed attempts (with XP penalty) |
| **Personalization flexibleCheck is too strict/lenient** | High | Medium | Start with lenient regex (any target token counts); tune based on user testing data |
| **Thinking Pressure word bank makes G2 too easy** | Medium | Low | Increase distractor quality (grammar confusables, not random words); add "hard mode" with typing |
| **Mobile keyboard covers input fields** | High | High | Use `visualViewport` API to scroll input into view; avoid fixed-position elements below keyboard |
| **A2 content requires new exercise types not yet built** | Low | High | All exercise components are modular (jumble, trap, scratch, production, personalization). New types can extend the same renderer pattern. |
| **Streak system creates anxiety (Duolingo criticism)** | Medium | Medium | Make streak freeze cheap (50 XP, not real money) and allow "practice mode" that doesn't affect streak |
| **Dual state systems (AppState + localStorage) drift** | Medium | High | Phase 1.1 establishes AppState as single source. All localStorage reads go through AppState helpers. |
| **Schema validation blocks app load on bad data** | Medium | High | Validation runs in dev mode only by default; production mode logs warnings but doesn’t block. Add a `--strict` flag for CI. |
| **Progressive feature disclosure confuses returning users** | Low | Medium | Feature unlock state persists in localStorage. Returning users keep their unlocked features. Add "Unlock All" button in teacher settings. |
| **Expanding short dialogues breaks existing audio files** | Medium | Medium | New dialogue lines need new audio recordings. Phase this: add lines to data immediately (enables text practice), queue audio recording session, flag lines without audio as "text only" in the interim. |

---

## APPENDIX A: MASTER DOCUMENT RULE COMPLIANCE VERIFICATION

This table verifies that every Master Document rule is addressed by this plan:

| Master Doc Rule | Status in Current App | This Plan's Fix | Phase |
|---|---|---|---|
| CONSTRAINT 1 (100% vocab) | ✅ Data-level (not app issue) | N/A | — |
| CONSTRAINT 2 (Anchor = dialogue) | ✅ Data-level (not app issue) | N/A | — |
| CONSTRAINT 3 (Grammar +/-/?) | ✅ Data-level (not app issue) | N/A | — |
| CONSTRAINT 4 (Recycling) | ⚠️ Warm-up could use recycled items | Intro tile warm-up uses recycled vocab | 2.1 |
| CONSTRAINT 5 (4+2 structure) | ❌ Stage 5 (Personalization) missing, stages skippable | Implement Personalization + gate stages | 3.1, 3.2 |
| CONSTRAINT 6 (Max 8 cards) | ✅ Enforced in data | N/A | — |
| MISSION FLOW (3×2 Cycle) | ❌ Not implemented | Full Sandwich enforcement + mission stage awareness | 2.2, 2.3 |
| CONTRASTIVE TURNS | ⚠️ Passive (read-only popup) | Interactive discovery + production | 4.4 |
| RULE E11 (Mirror Mode) | ⚠️ Partially implemented | Full UZ→Mirror→EN progression enforcement | 2.2 |
| G1 (Vanishing Script) | ✅ Implemented | Minor: persist user preference | — |
| G2 (Thinking Pressure) | ❌ Passive (no production) | Word-bank tap exercise within 2s deadline | 4.2 |
| G3 (Grammar Input Flood) | ✅ Implemented | No change | — |
| G4 (Mastery State) | ❌ Unverified click-to-master | Gate behind reproduction check | 4.3 |

### Data & Content Architecture (Category G)

| Audit Issue | Status in Current App | This Plan's Fix | Phase |
|---|---|---|---|
| G1 (No runtime schema validation) | ❌ Schema never enforced | Create `schema-validator.js`, run on load | 4b.1 |
| G2 (Duplicate drill examples) | ❌ Duplicates in drill_list | Audit + enforce uniqueness | 4b.2 |
| G3 (Dialogues below minimum) | ❌ 4-line dialogues (min is 8) | Expand to 8-line minimum | 4b.3 |
| G4 (Arabic fields undocumented) | ❌ `ar_` fields in data but not schema | Add to `DATA_TEMPLATE_SCHEMA.js` | 4b.4 |
| G5 (Inconsistent target/recycled) | ❌ Empty target[] on vocab lines | Fill annotations across all units | 4b.5 |

### Cognitive Load & UX (Category H)

| Audit Issue | Status in Current App | This Plan's Fix | Phase |
|---|---|---|---|
| H1 (Toolbar overload) | ❌ 9 buttons in 3 toolbar rows | Collapse into ⚙️ settings panel | 4c.1 |
| H2 (No progressive disclosure) | ❌ All features from Lesson 1 | Feature-reveal tied to progression | 4c.2 |
| H3 (Modal density on mobile) | ❌ Cramped 6-stage modal | Mobile-optimized layout + full-screen | 4c.3 |
| H4 (Inline CSS injection) | ⚠️ Runtime `createElement('style')` | Extract to external CSS files | 7.5 |

### Flow & Progression (D3)

| Audit Issue | Status in Current App | This Plan's Fix | Phase |
|---|---|---|---|
| D3 (No lesson gating) | ❌ Any lesson freely accessible | Gate behind prior-lesson completion | 2.1b |

---

## APPENDIX B: FILE MODIFICATION INDEX

Complete list of files that will be modified or created, organized by phase:

### Modified Files
| File | Phases | Scope |
|---|---|---|
| `src/features/scoring.js` | 1.1, 1.2, 2.4 | Unify with AppState, expose mistake tracking |
| `src/tiles/done-tile.js` | 1.1, 1.3, 1.4, 2.4, 5.2, 5.3 | Major rewrite: scoring, review, debrief |
| `src/features/vocab-card-renderer.js` | 1.2, 3.1, 3.2, 3.3, 3.4, 3.5, 4c.3, 7.1 | Stage gating, personalization, error feedback, fuzzy match, mobile modal |
| `src/tiles/dialogue-tile.js` | 1.2, 4.1-4.6, 4c.1, 4c.2, 6.2, 6.3, 7.1, 7.5 | Speaker fix, G2/G4 production, contrastive, cloze, toolbar collapse, progressive disclosure, a11y, CSS |
| `src/tiles/vocab-tile.js` | 2.2, 7.1 | Sandwich enforcement, ARIA attributes |
| `src/tiles/intro-tile.js` | 2.1 | Major rewrite: warm-up, objectives, mission briefing |
| `src/core/curriculum-loader.js` | 2.1, 2.1b, 2.3, 4b.1 | Generate warm-up items, lesson gating, parse mission metadata, schema validation |
| `src/state/app-state.js` | 1.1, 2.4, 4c.2, 5.1 | Add mistakes[], xpToNextLevel, unlockedFeatures[] |
| `src/core/i18n.js` | 1.3, 4.6, 7.3 | New keys, rename uz→t |
| `src/core/helpers.js` | 3.3 | Add diffWords() function |
| `src/utils/mirror-toggle.js` | 2.2, 2.3 | Per-word state, disabled prop |
| `src/core/badge-catalog.js` | 5.3 | Expand badge definitions |
| `src/types/vocab_slide.d.ts` | 3.2 | Add VocabPersonalizationSlide type |
| `src/core/navigation.js` | 2.1b | Add prerequisite check before lesson selection |
| `DATA_TEMPLATE_SCHEMA.js` | 4b.4 | Add Arabic field documentation |
| `recycling_analyzer.py` | 4b.5 | Add annotation completeness check |
| All `vocab_cards_uXX_4act.js` | 4b.2, 4b.3, 4b.5 | Data quality fixes (drill dupes, short dialogues, annotations) |

### New Files
| File | Phase | Purpose |
|---|---|---|
| `src/components/xp-bar.js` | 5.1 | Persistent XP progress bar |
| `src/components/streak-display.js` | 5.2 | Streak counter with fire animation |
| `src/components/badge-notification.js` | 5.3 | Badge pop-up notification |
| `src/components/micro-reward.js` | 5.4 | Flying XP animation |
| `src/core/cefr-registry.js` | 8.1 | CEFR level configuration |
| `src/utils/platform.js` | 8.3 | Platform/feature detection |
| `src/utils/offline-cache.js` | 8.3 | Service worker stub |
| `src/styles/dialogue.css` | 7.5 | Extracted dialogue CSS |
| `src/styles/repractice.css` | 7.5 | Extracted re-practice CSS |
| `src/styles/rtl-overrides.css` | 7.2 | RTL layout overrides |
| `src/utils/schema-validator.js` | 4b.1 | Runtime data validation |
| `src/components/dialogue-settings-panel.js` | 4c.1 | Collapsed settings panel |
| `src/components/feature-coach-mark.js` | 4c.2 | Feature onboarding tooltips |

---

## APPENDIX C: ESTIMATED EFFORT & SEQUENCING

```
Total Estimated Effort: ~160-200 hours of implementation

Phase 1 (Scoring):              ~15 hours  ← Do FIRST (everything depends on this)
Phase 3 (Vocab Card):           ~25 hours  ← Do SECOND (most student time is here)
Phase 4b (Data Architecture):   ~15 hours  ← Do THIRD (data quality before features)
Phase 4c (Cognitive Load/UX):   ~12 hours  ← Do FOURTH (UX foundation)
Phase 5 (Gamification):         ~20 hours  ← Do FIFTH (makes everything feel rewarding)
Phase 4 (Dialogue):             ~25 hours  ← Do SIXTH (refinement of existing features)
Phase 2 (Mission Flow):         ~20 hours  ← Do SEVENTH (structural changes to tile flow)
Phase 6 (Hands-On):             ~10 hours  ← Do EIGHTH (gating additions)
Phase 7 (A11y/i18n):            ~10 hours  ← Do NINTH (polish)
Phase 8 (Scalability):          ~5 hours   ← Do LAST (prep work, no user-facing changes)

Recommended Sprint Cadence:
Sprint 1 (Week 1-2):  Phase 1 + Phase 3 (Priority 1: Critical)
Sprint 2 (Week 3-4):  Phase 4b + Phase 4c + Phase 5 (Priority 2: High, Data + UX + Gamification)
Sprint 3 (Week 5-6):  Phase 4 + Phase 2 (Priority 2-3: Dialogue + Mission Flow)
Sprint 4 (Week 7-8):  Phase 6 + Phase 7 + Phase 8 (Priority 3-4: Medium/Low)
```

---

**END OF PLAN**

**Document Version:** 1.1.0 — Audit-verified: all 45 issues covered (A1-A4, B1-B10, C1-C7, D1-D5, E1-E4, F1-F5, G1-G5, H1-H4, I1-I5)  
**Next Step:** Review this plan, then begin implementation starting with Phase 1 (Scoring).
