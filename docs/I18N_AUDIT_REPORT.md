# i18n Audit & Extraction Report

**Date:** Session completed  
**Scope:** Full deep audit of i18n refactoring + hardcoded string extraction

---

## 1. Extraction Verification (Original 285 Keys)

| Locale | Keys | Status | Notes |
|--------|------|--------|-------|
| UZ | 285 | ✅ PERFECT MATCH | Key-by-key identical to pre-refactor `src/core/i18n.js` |
| EN | 285 | ✅ PERFECT MATCH | Key-by-key identical to pre-refactor `src/core/i18n.js` |
| AR | 285 | ✅ Expanded correctly | From 9-key stub → 285 keys. 5 button values fixed to imperative form |

### AR Button Fixes Applied
| Key | Old (wrong) | New (imperative) |
|-----|-------------|-------------------|
| `buttons.back` | رجوع | عودة |
| `buttons.close` | يغلق | إغلاق |
| `buttons.continue` | استمرار | استمر |
| `buttons.retry` | إعادة المحاولة | أعد المحاولة |
| `buttons.start` | يبدأ | ابدأ |

---

## 2. Infrastructure Verification

| Component | Status | Notes |
|-----------|--------|-------|
| `src/core/i18n.js` (shim) | ✅ Clean | 35-line re-export, zero leftover dictionaries |
| `src/i18n/index.js` (hub) | ✅ Complete | All imports, exports, functions, `window.getUz/getEn/i18n` backward compat |
| Cross-locale key consistency | ✅ | All 3 locales have identical key sets (now 440 each) |

---

## 3. Broken Import Fixes (P0)

| File | Issue | Fix |
|------|-------|-----|
| `src/tiles/unit-error-tile.js` | Used `window.getUz`/`window.getEn` with no import | Added `import { uz as getUz, en as getEn }` |
| `src/tiles/grand-tile.js` | Same as above | Same fix |
| `src/tiles/transformation-tile.js` | Zero i18n imports | Added `import { uz, en }` |
| `src/tiles/done-tile.js` | Redundant `window.getUz` wrapper alongside imported `uz` | Removed wrapper |
| `src/tiles/function-tile.js` | Pointless `getUz(path) { return uz(path); }` wrappers | Changed to `import { uz as getUz, en as getEn }` alias |

---

## 4. New i18n Keys Added (155 Keys)

Total keys: 285 original + 155 new = **440 keys per locale**

### Key Namespaces Added

| Namespace | Keys | Description |
|-----------|------|-------------|
| `nav.*` (extended) | +2 | `backWriting`, `backListenWrite` nav keys |\n| `controlled.*` | 9 | Gate messages, feedback, stage instructions |
| `done.*` | 9 | Score ratings, next lesson/unit, gate messages |
| `writing.*` | 8 | Gate messages, feedback, retry prompts |
| `listenWrite.*` | 7 | Instructions, feedback, gate messages |
| `function.*` | 14 | Labels, drag feedback, instructions, gates |
| `unitError.*` | 8 | Title, instructions, options, feedback, gates |
| `mistake.*` | 4 | Labels, gate messages, fallback text |
| `pattern.*` | 14 | Instructions, discovery feedback, tips, steps, listen/slow buttons |
| `grand.*` | 9 | Title, instructions, feedback, gates |
| `intro.*` | 4 | Labels, fallback text |
| `transformation.*` | 8 | Labels, placeholder, feedback |
| `vocabTile.*` | 3 | Progress labels, instructions |
| `dialogue.*` | 5 | Mode-specific instructions |
| `dialoguePractice.*` | 3 | UZ translation labels |
| `missionBriefing.*` | 10 | Preparation game UI |
| `xpDisplay.*` | 4 | Level display, level-up modal |
| `activityCard.*` | 21 | Tile labels & descriptions (10 types + start button) |
| `instructionBanner.*` | 3 | Banner label, audio button, audio title |
| `grammarPpp.*` | 3 | CCQ hint, correct/wrong feedback |
| `uiBuilders.*` | 2 | Gate alert messages |
| `helpers.*` | 4 | Grammar feedback strings |
| `app.*` | 1 | Reset confirm dialog |
| `uiRedesign.*` | 1 | Instruction panel title |

---

## 5. Source Files Modified (~150 String Replacements)

### Tiles (14 files)
- `controlled-tile.js` — 9 strings → `uz('controlled.*')`
- `done-tile.js` — 9 strings → `uz('done.*')`
- `writing-tile.js` — 7 strings → `uz('writing.*')`
- `listen-write-tile.js` — 7 strings → `uz('listenWrite.*')`
- `function-tile.js` — 17 strings → `getUz('function.*')`
- `unit-error-tile.js` — 8 strings → `getUz('unitError.*')`
- `mistake-tile.js` — 6 strings → `uz('mistake.*')`
- `grand-tile.js` — 10 strings → `getUz('grand.*')`
- `transformation-tile.js` — 8 strings → `uz('transformation.*')`
- `pattern-tile.js` — 10 strings → `uz('pattern.*')`
- `intro-tile.js` — 6 strings → `uz('intro.*')`
- `vocab-tile.js` — 3 strings → `uz('vocabTile.*')`
- `dialogue-tile.js` — 5 strings → `uz('dialogue.*')`
- `dialogue-practice-tile.js` — 3 strings → `uz('dialoguePractice.*')`

### Components (4 files, imports added)
- `mission-briefing.js` — 10 strings → `uz('missionBriefing.*')` + import added
- `xp-display.js` — 4 strings → `uz('xpDisplay.*')` + import added
- `activity-context-card.js` — 21 strings → `uz('activityCard.*')` + import added
- `instruction-banner.js` — 3 strings → `uz('instructionBanner.*')` + import added

### Core, Features & Games (6 files)
- `ui-builders.js` — 2 strings → `uz('uiBuilders.*')` + import added
- `helpers.js` — 4 strings → `uz('helpers.*')` + import added
- `app-main.js` — 1 string → `uz('app.*')` + import added
- `ui-redesign.js` — 1 string → `uz('uiRedesign.*')` + import added
- `vocab-card-renderer.js` — 2 strings (already had import)
- `grammar-ppp.js` — 3 strings → `uz('grammarPpp.*')` + import added

---

## 6. Remaining Work (Structured Data — Phase 2)

These files have **bilingual data structures** (`nameUz`/`nameEn`, `uz`/`en` fields) that require a different approach than simple i18n key extraction. They need AR/additional language fields added to their data objects.

### `src/core/badge-catalog.js` (~34 strings)
- Has `nameUz`, `nameEn`, `descUz`, `descEn` fields per badge
- **Recommended action:** Add `nameAr`, `descAr` fields for each badge
- Already imports `{ uz, en }` from i18n

### `src/games/grammar-ppp.js` (~40 strings)
- Has complex phase/step structures with `titleUz`, `subtitleUz`, `contentUz` fields
- Has CCQ questions with Uzbek text and option arrays
- ~~Has numerous inline feedback strings~~ **Inline feedback extracted (3 keys)**
- **Remaining:** Add AR fields to the data structures (9 LOW severity data fields)

### `src/games/pos-speed-game.js` (~12 strings)
- Has `STRINGS` constant with `{en: '...', uz: '...'}` pattern
- **Recommended action:** Add `ar: '...'` fields to each string entry

### `src/core/uz-instructions.js`
- `TILE_INSTRUCTIONS` object with structured bilingual wizard data
- **Recommended action:** Add AR instruction variants

---

## 7. Verification Commands

```bash
# Count keys in each locale
grep -c "^\s*'" src/i18n/locales/uz.js  # Should be 440
grep -c "^\s*'" src/i18n/locales/en.js  # Should be 440
grep -c "^\s*'" src/i18n/locales/ar.js  # Should be 440

# Run the audit tool
python tools/audit_i18n.py

# Run the hardcoded string scanner
python tools/scan_hardcoded_strings.py --verify --report console --suggest-keys
# Expected: 440/440/440 keys, 0 HIGH, 0 MEDIUM, 24 LOW (data fields)
```
