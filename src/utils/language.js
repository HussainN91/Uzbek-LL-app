/**
 * Language Utilities
 * ==================
 * Manages native language selection and text localization.
 * 
 * @module src/utils/language
 */

export const LANGUAGES = {
  UZ: 'uz', // Uzbek (Default)
  EN: 'en', // English
  AR: 'ar', // Arabic
  RU: 'ru', // Russian
  ID: 'id', // Indonesian
  ZH: 'zh', // Chinese
};

export const LANGUAGE_META = {
  [LANGUAGES.UZ]: { label: "O'zbekcha", dir: 'ltr', flag: '🇺🇿' },
  [LANGUAGES.EN]: { label: "English", dir: 'ltr', flag: '🇬🇧' },
  [LANGUAGES.AR]: { label: "العربية", dir: 'rtl', flag: '🇸🇦' },
  [LANGUAGES.RU]: { label: "Русский", dir: 'ltr', flag: '🇷🇺' },
  [LANGUAGES.ID]: { label: "Bahasa Indonesia", dir: 'ltr', flag: '🇮🇩' },
  [LANGUAGES.ZH]: { label: "中文", dir: 'ltr', flag: '🇨🇳' },
};

const STORAGE_KEY = 'app_native_language';

/**
 * Get the current native language code
 * @returns {string} Language code (e.g., 'uz', 'ar')
 */
export function getCurrentLanguage() {
  return localStorage.getItem(STORAGE_KEY) || LANGUAGES.UZ;
}

/**
 * Check if a language has been selected by the user
 * @returns {boolean}
 */
export function hasLanguageSelection() {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

/**
 * Set the native language
 * @param {string} langCode 
 */
export function setLanguage(langCode) {
  if (!Object.values(LANGUAGES).includes(langCode)) {
    console.warn(`Invalid language code: ${langCode}. Defaulting to UZ.`);
    langCode = LANGUAGES.UZ;
  }
  localStorage.setItem(STORAGE_KEY, langCode);
  applyLanguageDirection(langCode);
  // Reload might be needed to refresh content, but we try to be dynamic
}

/**
 * Apply RTL/LTR direction based on language
 * @param {string} [langCode] 
 */
export function applyLanguageDirection(langCode) {
  const lang = langCode || getCurrentLanguage();
  const dir = LANGUAGE_META[lang]?.dir || 'ltr';
  document.body.dir = dir;
  document.documentElement.lang = lang;
  
  if (dir === 'rtl') {
    document.body.classList.add('lang-rtl');
  } else {
    document.body.classList.remove('lang-rtl');
  }
}

/**
 * Get localized string from an object
 * Supports various schema patterns (suffix, prefix, nested).
 * 
 * @param {Object} obj - The data object (e.g., card item)
 * @param {string} keyBase - The base key (e.g., 'line', 'context', 'text')
 * @returns {string} Localized text
 */
export function getText(obj, keyBase) {
  if (!obj) return '';
  
  const lang = getCurrentLanguage();
  
  // 1. Try Suffix (Standard): key_ar, line_ar
  if (obj[`${keyBase}_${lang}`] !== undefined) return obj[`${keyBase}_${lang}`];
  
  // 2. Try Prefix (Legacy/Alternative): ar_key, ar_context
  if (obj[`${lang}_${keyBase}`] !== undefined) return obj[`${lang}_${keyBase}`];

  // 3. Try Direct Language Key (for simple word objects like { en:..., uz:..., ar:... })
  // usage: getText(item, 'text') -> looks for item.ar
  if (keyBase === 'text' && obj[lang] !== undefined) return obj[lang];

  // 4. Try Nested: key: { ar: "..." }
  if (obj[keyBase] && typeof obj[keyBase] === 'object' && obj[keyBase][lang] !== undefined) {
    return obj[keyBase][lang];
  }

  // --- FALLBACKS (Uzbek is primary content) ---
  
  // Fallback to Suffix Uzbek
  if (obj[`${keyBase}_uz`]) return obj[`${keyBase}_uz`];
  
  // Fallback to Prefix Uzbek (uz_context, uz_mirror_answer)
  if (obj[`uz_${keyBase}`]) return obj[`uz_${keyBase}`];
  
  // Fallback to 'uz' (for text)
  if (keyBase === 'text' && obj.uz) return obj.uz;

  // Final Fallback: The keyBase itself might be the English string or property
  if (typeof obj[keyBase] === 'string') return obj[keyBase];

  return '';
}

/**
 * Helper to get the "Translation" of a word item.
 * Currently items have { en: "hello", uz: "salom" }
 * @param {Object} item 
 */
export function getTranslation(item) {
    return getText(item, 'text'); // specific logic handled in getText logic 3 & 4
}
