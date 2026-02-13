/**
 * Internationalization (i18n) Module â€” SHIM
 * ============================================
 * This file is a backward-compatibility re-export.
 * All dictionaries and logic now live in src/i18n/.
 *
 * Usage remains unchanged:
 *   import { uz, en } from '../core/i18n.js';   // â† still works
 *   import { t }      from '../i18n/index.js';   // â† new canonical
 *
 * @module src/core/i18n
 * @version 2.0.0 â€” Refactored to re-export from src/i18n/
 */

// Re-export everything from the new i18n hub
export {
  t,
  uz,
  en,
  uzEl,
  uzify,
  uzBtn,
  UZ,
  EN,
  AR,
  ZH,
  ID,
  RU,
  LOCALES,
  getLocale,
  getAvailableLocales,
  getLocaleCoverage,
} from '../i18n/index.js';

