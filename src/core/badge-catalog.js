/**
 * Badge Catalog Module
 * =====================
 * Defines all earnable badges with criteria, icons, and translations.
 *
 * Research backing:
 * - Gamification: badges as progress markers (SDT competence need)
 * - Ryan & Deci (2000): autonomy, competence, relatedness
 *
 * Badge categories:
 * - Milestone (lesson/unit completion)
 * - Performance (score-based)
 * - Streak (consecutive days)
 * - Mastery (specific skill achievements)
 *
 * @module src/core/badge-catalog
 * @version 1.0.0
 */

import { uz, en } from './i18n.js';

// ============================
// BADGE DEFINITIONS
// ============================

/**
 * @typedef {Object} BadgeDefinition
 * @property {string} id - Unique badge identifier
 * @property {string} icon - Emoji or icon
 * @property {string} nameUz - Uzbek display name
 * @property {string} nameEn - English display name
 * @property {string} descUz - Uzbek description
 * @property {string} descEn - English description
 * @property {string} category - Badge category
 * @property {'bronze'|'silver'|'gold'|'diamond'} tier - Visual tier
 * @property {function} check - Predicate to check if badge should be awarded
 */

/** @type {BadgeDefinition[]} */
export const BADGE_CATALOG = [
  // ── Milestone Badges ──
  {
    id: 'first_lesson',
    icon: '🌱',
    nameUz: 'Birinchi qadam',
    nameEn: 'First Step',
    descUz: 'Birinchi darsni yakunladingiz!',
    descEn: 'Completed your first lesson!',
    category: 'milestone',
    tier: 'bronze',
    check: (state) => (state.completedLessons?.size || 0) >= 1,
  },
  {
    id: 'five_lessons',
    icon: '📖',
    nameUz: 'O\'quvchi',
    nameEn: 'Student',
    descUz: '5 ta darsni yakunladingiz',
    descEn: 'Completed 5 lessons',
    category: 'milestone',
    tier: 'bronze',
    check: (state) => (state.completedLessons?.size || 0) >= 5,
  },
  {
    id: 'ten_lessons',
    icon: '🎓',
    nameUz: 'Bilimdon',
    nameEn: 'Scholar',
    descUz: '10 ta darsni yakunladingiz',
    descEn: 'Completed 10 lessons',
    category: 'milestone',
    tier: 'silver',
    check: (state) => (state.completedLessons?.size || 0) >= 10,
  },
  {
    id: 'twenty_lessons',
    icon: '🏅',
    nameUz: 'O\'zlashtiruvchi',
    nameEn: 'Achiever',
    descUz: '20 ta darsni yakunladingiz',
    descEn: 'Completed 20 lessons',
    category: 'milestone',
    tier: 'gold',
    check: (state) => (state.completedLessons?.size || 0) >= 20,
  },
  {
    id: 'first_unit',
    icon: '🏁',
    nameUz: 'Bo\'lim g\'olibi',
    nameEn: 'Unit Champion',
    descUz: 'Birinchi bo\'limni yakunladingiz!',
    descEn: 'Completed your first unit!',
    category: 'milestone',
    tier: 'silver',
    check: (state) => (state.completedUnits?.size || 0) >= 1,
  },
  {
    id: 'three_units',
    icon: '🌟',
    nameUz: 'Yulduz o\'quvchi',
    nameEn: 'Star Student',
    descUz: '3 ta bo\'limni yakunladingiz',
    descEn: 'Completed 3 units',
    category: 'milestone',
    tier: 'gold',
    check: (state) => (state.completedUnits?.size || 0) >= 3,
  },

  // ── Performance Badges ──
  {
    id: 'perfect_score',
    icon: '💯',
    nameUz: 'Mukammal natija',
    nameEn: 'Perfect Score',
    descUz: 'Darsda 100% to\'g\'ri javob',
    descEn: '100% correct in a lesson',
    category: 'performance',
    tier: 'gold',
    check: (state) => state.lastScorePct >= 100,
  },
  {
    id: 'high_scorer',
    icon: '⭐',
    nameUz: 'Yuqori natija',
    nameEn: 'High Scorer',
    descUz: 'Darsda 90% dan yuqori natija',
    descEn: 'Scored above 90% in a lesson',
    category: 'performance',
    tier: 'silver',
    check: (state) => state.lastScorePct >= 90,
  },
  {
    id: 'consistent',
    icon: '📊',
    nameUz: 'Barqaror',
    nameEn: 'Consistent',
    descUz: 'Ketma-ket 3 darsda 80% dan yuqori',
    descEn: 'Above 80% in 3 consecutive lessons',
    category: 'performance',
    tier: 'silver',
    check: (state) => (state.consecutiveHighScores || 0) >= 3,
  },

  // ── Streak Badges ──
  {
    id: 'streak_3',
    icon: '🔥',
    nameUz: '3 kunlik ketma-ketlik',
    nameEn: '3-Day Streak',
    descUz: '3 kun ketma-ket o\'rgandingiz',
    descEn: 'Studied 3 days in a row',
    category: 'streak',
    tier: 'bronze',
    check: (state) => (state.streak || 0) >= 3,
  },
  {
    id: 'streak_7',
    icon: '💪',
    nameUz: 'Haftalik champion',
    nameEn: 'Weekly Champion',
    descUz: '7 kun ketma-ket o\'rgandingiz',
    descEn: 'Studied 7 days in a row',
    category: 'streak',
    tier: 'silver',
    check: (state) => (state.streak || 0) >= 7,
  },
  {
    id: 'streak_14',
    icon: '🏆',
    nameUz: 'Ikki haftalik legendasi',
    nameEn: 'Two-Week Legend',
    descUz: '14 kun ketma-ket o\'rgandingiz',
    descEn: 'Studied 14 days in a row',
    category: 'streak',
    tier: 'gold',
    check: (state) => (state.streak || 0) >= 14,
  },
  {
    id: 'streak_30',
    icon: '💎',
    nameUz: 'Oylik g\'olib',
    nameEn: 'Monthly Master',
    descUz: '30 kun ketma-ket o\'rgandingiz',
    descEn: 'Studied 30 days in a row',
    category: 'streak',
    tier: 'diamond',
    check: (state) => (state.streak || 0) >= 30,
  },

  // ── Mastery Badges ──
  {
    id: 'vocab_master_10',
    icon: '📝',
    nameUz: '10 ta so\'z o\'zlashtirildi',
    nameEn: '10 Words Mastered',
    descUz: '10 ta lug\'at so\'zini o\'zlashtirdingiz',
    descEn: 'Mastered 10 vocabulary words',
    category: 'mastery',
    tier: 'bronze',
    check: (state) => Object.keys(state.vocabCompletion || {}).length >= 10,
  },
  {
    id: 'vocab_master_50',
    icon: '📚',
    nameUz: '50 ta so\'z o\'zlashtirildi',
    nameEn: '50 Words Mastered',
    descUz: '50 ta lug\'at so\'zini o\'zlashtirdingiz',
    descEn: 'Mastered 50 vocabulary words',
    category: 'mastery',
    tier: 'silver',
    check: (state) => Object.keys(state.vocabCompletion || {}).length >= 50,
  },
  {
    id: 'dialogue_master',
    icon: '🗣️',
    nameUz: 'Suhbat ustasi',
    nameEn: 'Dialogue Master',
    descUz: '5 ta suhbatni blind rejimda o\'tkazdi',
    descEn: 'Completed 5 dialogues in blind mode',
    category: 'mastery',
    tier: 'gold',
    check: (state) => (state.blindDialogues || 0) >= 5,
  },
  {
    id: 'level_5',
    icon: '🎖️',
    nameUz: '5-darajaga yetdi',
    nameEn: 'Reached Level 5',
    descUz: 'XP daraja 5 ga yetdi',
    descEn: 'Reached XP Level 5',
    category: 'mastery',
    tier: 'gold',
    check: (state) => (state.level || 1) >= 5,
  },
];

// ============================
// BADGE CHECK ENGINE
// ============================

/**
 * Check all badges against current state.
 * Returns newly earned badges only.
 * @param {Object} state - Current state snapshot
 * @param {string[]} alreadyEarned - Array of badge IDs already earned
 * @returns {BadgeDefinition[]} Newly earned badges
 */
export function checkBadges(state, alreadyEarned = []) {
  const earned = new Set(alreadyEarned);
  const newBadges = [];

  for (const badge of BADGE_CATALOG) {
    if (earned.has(badge.id)) continue;
    try {
      if (badge.check(state)) {
        newBadges.push(badge);
      }
    } catch (e) {
      // Skip broken badge check
    }
  }

  return newBadges;
}

/**
 * Get badge definition by ID
 * @param {string} badgeId - Badge identifier
 * @returns {BadgeDefinition|null}
 */
export function getBadge(badgeId) {
  return BADGE_CATALOG.find(b => b.id === badgeId) || null;
}

/**
 * Get badges by category
 * @param {string} category - Badge category
 * @returns {BadgeDefinition[]}
 */
export function getBadgesByCategory(category) {
  return BADGE_CATALOG.filter(b => b.category === category);
}

/**
 * Get tier CSS class
 * @param {'bronze'|'silver'|'gold'|'diamond'} tier
 * @returns {string} CSS class
 */
export function getTierClass(tier) {
  return `badge-tier-${tier}`;
}

// ============================
// BADGE NOTIFICATION UI
// ============================

let notifCSSInjected = false;
function injectNotifCSS() {
  if (notifCSSInjected) return;
  notifCSSInjected = true;

  const style = document.createElement('style');
  style.textContent = `
    .badge-notification {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10000;
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      border-radius: 16px;
      padding: 16px 20px;
      box-shadow: 0 8px 32px rgba(245,158,11,0.4);
      display: flex;
      align-items: center;
      gap: 12px;
      animation: badgeSlideDown 0.5s ease-out forwards, badgeSlideUp 0.5s ease-in 3.5s forwards;
      max-width: 360px;
      width: max-content;
    }
    /* When teacher mode is active, push badge notification below panel */
    body.teacher-mode-active .badge-notification {
      top: 70px;
    }
    .badge-notification .badge-notif-icon {
      font-size: 2.5rem;
      animation: badgeBounce 0.6s ease 0.3s;
    }
    .badge-notification .badge-notif-text {
      flex: 1;
    }
    .badge-notification .badge-notif-title {
      font-weight: 700;
      font-size: 0.9rem;
      color: #78350f;
    }
    .badge-notification .badge-notif-name {
      font-size: 1rem;
      font-weight: 600;
      color: #451a03;
    }
    .badge-notification .badge-notif-desc {
      font-size: 0.8rem;
      color: #92400e;
      margin-top: 2px;
    }
    @keyframes badgeSlideDown {
      from { transform: translateX(-50%) translateY(-120%); opacity: 0; }
      to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    @keyframes badgeSlideUp {
      from { transform: translateX(-50%) translateY(0); opacity: 1; }
      to { transform: translateX(-50%) translateY(-120%); opacity: 0; }
    }
    @keyframes badgeBounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.3); }
    }

    /* Badge tier colors */
    .badge-tier-bronze { border: 2px solid #cd7f32; }
    .badge-tier-silver { border: 2px solid #c0c0c0; }
    .badge-tier-gold { border: 2px solid #ffd700; }
    .badge-tier-diamond { border: 2px solid #b9f2ff; background: linear-gradient(135deg, #e0f7ff 0%, #b9f2ff 100%); }
  `;
  document.head.appendChild(style);
}

/**
 * Show a badge notification popup
 * @param {BadgeDefinition} badge - Badge that was earned
 */
export function showBadgeNotification(badge) {
  injectNotifCSS();

  const notif = document.createElement('div');
  notif.className = `badge-notification badge-tier-${badge.tier}`;
  notif.innerHTML = `
    <div class="badge-notif-icon">${badge.icon}</div>
    <div class="badge-notif-text">
      <div class="badge-notif-title">🏆 Nishon olindi!</div>
      <div class="badge-notif-name">${badge.nameUz}</div>
      <div class="badge-notif-desc">${badge.descUz}</div>
    </div>
  `;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 4500);
}

// ============================
// BACKWARD COMPATIBILITY
// ============================
if (typeof window !== 'undefined') {
  window.BadgeCatalog = { BADGE_CATALOG, checkBadges, getBadge, showBadgeNotification };
}
