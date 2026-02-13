/**
 * i18n — Internationalization Hub
 * ==================================
 * Central entry point for all translations.
 *
 * Architecture:
 *   src/i18n/
 *     index.js          ← You are here (loader + API)
 *     locales/
 *       uz.js           ← Uzbek  (source language)
 *       en.js           ← English
 *       ar.js           ← Arabic
 *       zh.js           ← Chinese  (placeholder)
 *       id.js           ← Indonesian (placeholder)
 *       ru.js           ← Russian   (placeholder)
 *
 * Usage:
 *   import { t, en, uz, uzEl, uzify, uzBtn } from '../i18n/index.js';
 *   button.textContent = t('buttons.next');  // Language-aware
 *
 * The translation pipeline (tools/) can:
 *   1. Extract UZ strings from vocab_cards → JSON
 *   2. Translate JSON → target language via API
 *   3. Inject translated fields back into vocab JS files
 *   4. Generate / update locale files in src/i18n/locales/
 *
 * @module src/i18n
 * @version 2.0.0
 */

import { getCurrentLanguage } from '../utils/language.js';

// ── Import locale dictionaries ──
import UZ from './locales/uz.js';
import EN from './locales/en.js';
import AR from './locales/ar.js';
import ZH from './locales/zh.js';
import ID from './locales/id.js';
import RU from './locales/ru.js';

// ============================
// LOCALE REGISTRY
// ============================

/**
 * Map of language codes → dictionaries.
 * To add a new language:
 *   1. Create src/i18n/locales/<code>.js
 *   2. Import it above
 *   3. Register it here
 *   4. Add it to LANGUAGES in src/utils/language.js
 */
const LOCALES = {
  uz: UZ,
  en: EN,
  ar: AR,
  zh: ZH,
  id: ID,
  ru: RU,
};

/**
 * Get the dictionary for a given language code.
 * @param {string} lang - Language code (e.g. 'uz', 'ar')
 * @returns {Record<string, string>}
 */
export function getLocale(lang) {
  return LOCALES[lang] || UZ;
}

/**
 * Get all registered locale codes.
 * @returns {string[]}
 */
export function getAvailableLocales() {
  return Object.keys(LOCALES);
}

/**
 * Check translation coverage for a locale vs the source (UZ).
 * Useful for the translation pipeline to know what's missing.
 * @param {string} lang - Language code
 * @returns {{ total: number, translated: number, missing: string[] }}
 */
export function getLocaleCoverage(lang) {
  const sourceKeys = Object.keys(UZ);
  const dict = LOCALES[lang] || {};
  const missing = sourceKeys.filter(k => !(k in dict));
  return {
    total: sourceKeys.length,
    translated: sourceKeys.length - missing.length,
    missing,
  };
}

// ============================
// INTERPOLATION ENGINE
// ============================

/**
 * Replace {placeholder} tokens in a string.
 * @param {string} text - Template string
 * @param {Record<string, string|number>} params - Values to interpolate
 * @returns {string}
 */
function interpolate(text, params) {
  if (!params) return text;
  for (const [k, v] of Object.entries(params)) {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
  }
  return text;
}

// ============================
// PUBLIC API
// ============================

/**
 * Primary translation function — language-aware.
 * Resolves the current user language, looks up the key, falls back to UZ.
 * This is the NEW canonical name; `uz()` is an alias for backward compat.
 *
 * @param {string} key - Dot-separated key (e.g. 'buttons.next')
 * @param {Record<string, string|number>} [params] - Interpolation values
 * @returns {string} Localized string, or key if missing everywhere
 */
export function t(key, params) {
  const lang = getCurrentLanguage();
  const dict = LOCALES[lang] || UZ;

  let text = dict[key];

  // Fallback chain: target dict → UZ → return raw key
  if (text === undefined && lang !== 'uz') {
    text = UZ[key];
  }

  if (text === undefined) {
    console.warn(`[i18n] Missing key for ${lang}: "${key}"`);
    return key;
  }

  return interpolate(text, params);
}

/**
 * Backward-compatible alias for t().
 * Named 'uz' because legacy code calls uz('buttons.next').
 * Despite the name, it is LANGUAGE-AWARE (picks AR/ZH/etc. based on user setting).
 */
export function uz(key, params) {
  return t(key, params);
}

/**
 * Get English translation string (always English, ignores user language).
 * @param {string} key - Dot-separated key
 * @param {Record<string, string|number>} [params] - Interpolation values
 * @returns {string}
 */
export function en(key, params) {
  let text = EN[key];
  if (text === undefined) {
    console.warn(`[i18n] Missing EN key: "${key}"`);
    return key;
  }
  return interpolate(text, params);
}

/**
 * Create a bilingual element — text in user's language with English data-translation.
 * @param {string} tag - HTML tag name
 * @param {string} key - i18n key
 * @param {Record<string, string|number>} [params] - Interpolation
 * @returns {HTMLElement}
 */
export function uzEl(tag, key, params) {
  const el = document.createElement(tag);
  el.textContent = t(key, params);
  el.classList.add('tl-uz');
  el.dataset.translation = en(key, params);
  return el;
}

/**
 * Set an existing element to bilingual text.
 * @param {HTMLElement} el - Target element
 * @param {string} key - i18n key
 * @param {Record<string, string|number>} [params] - Interpolation
 * @returns {HTMLElement} The same element for chaining
 */
export function uzify(el, key, params) {
  el.textContent = t(key, params);
  el.classList.add('tl-uz');
  el.dataset.translation = en(key, params);
  return el;
}

/**
 * Create a bilingual button.
 * @param {string} key - i18n key
 * @param {Function} onClick - Click handler
 * @param {Record<string, string|number>} [params] - Interpolation
 * @returns {HTMLButtonElement}
 */
export function uzBtn(key, onClick, params) {
  const btn = document.createElement('button');
  btn.className = 'tile-btn primary tl-uz';
  btn.textContent = t(key, params);
  btn.dataset.translation = en(key, params);
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
}

// ============================
// BACKWARD COMPATIBILITY
// ============================

if (typeof window !== 'undefined') {
  window.getUz = uz;
  window.getEn = en;
  window.i18n = { t, uz, en, uzEl, uzify, uzBtn, UZ, EN, AR, LOCALES };
}

// Re-export dictionaries for direct access when needed
export { UZ, EN, AR, ZH, ID, RU, LOCALES };
