/**
 * Classroom Mode Module
 * ======================
 * Teacher-paced classroom controls: pace, auto-advance, projector mode,
 * pair work toggle, and read-aloud for tile instructions.
 *
 * Integrates with the teacher panel as an expandable section.
 *
 * @module src/core/classroom-mode
 * @version 1.0.0
 */

import { uz, en } from './i18n.js';

// ============================
// CLASSROOM STATE
// ============================

const classroomState = {
  enabled: false,
  pace: 'normal',     // 'slow' | 'normal' | 'fast'
  autoAdvance: false,
  pairWorkVisible: true,
  projectorMode: false,
  readAloudEnabled: true,
};

let classroomPanelEl = null;
let classroomCSSInjected = false;

// Pace multipliers for transition timing
const PACE_MULTIPLIERS = {
  slow: 1.8,
  normal: 1.0,
  fast: 0.6,
};

// ============================
// INITIALIZATION
// ============================

/**
 * Initialize classroom mode controls.
 * Call after teacher panel is initialized.
 */
export function initClassroomMode() {
  injectClassroomCSS();
  // Load saved state
  try {
    const saved = localStorage.getItem('classroom_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(classroomState, parsed);
    }
  } catch (e) { /* ignore */ }

  // Expose for other modules
  window.classroomMode = {
    getState: () => ({ ...classroomState }),
    getPaceMultiplier: () => PACE_MULTIPLIERS[classroomState.pace] || 1.0,
    isProjectorMode: () => classroomState.projectorMode,
    isPairWorkVisible: () => classroomState.pairWorkVisible,
    isAutoAdvance: () => classroomState.autoAdvance,
  };
}

function saveClassroomState() {
  try {
    localStorage.setItem('classroom_state', JSON.stringify(classroomState));
  } catch (e) { /* ignore */ }
}

// ============================
// CSS INJECTION
// ============================

function injectClassroomCSS() {
  if (classroomCSSInjected) return;
  classroomCSSInjected = true;
  const style = document.createElement('style');
  style.textContent = `
    .classroom-section {
      margin: 0;
      padding: 10px 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
      background: rgba(0,0,0,0.15);
      max-height: 200px;
      overflow-y: auto;
    }
    .classroom-section-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: #a5b4fc;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .classroom-section-title:hover { color: #c7d2fe; }
    .classroom-section-title .arrow {
      transition: transform 0.2s;
      font-size: 0.7rem;
    }
    .classroom-section-title .arrow.open { transform: rotate(90deg); }
    .classroom-body { display: none; }
    .classroom-body.open { display: block; }
    .classroom-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      gap: 8px;
    }
    .classroom-label {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.8);
      flex: 1;
    }
    .classroom-toggle {
      position: relative;
      width: 40px;
      height: 22px;
      background: rgba(255,255,255,0.15);
      border-radius: 11px;
      cursor: pointer;
      transition: background 0.2s;
      flex-shrink: 0;
    }
    .classroom-toggle.on { background: #6366f1; }
    .classroom-toggle::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 18px;
      height: 18px;
      background: white;
      border-radius: 50%;
      transition: left 0.2s;
    }
    .classroom-toggle.on::after { left: 20px; }
    .classroom-pace-btns {
      display: flex;
      gap: 4px;
    }
    .classroom-pace-btn {
      padding: 3px 10px;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 6px;
      background: transparent;
      color: rgba(255,255,255,0.7);
      font-size: 0.7rem;
      cursor: pointer;
      transition: all 0.15s;
    }
    .classroom-pace-btn:hover { background: rgba(255,255,255,0.1); }
    .classroom-pace-btn.active {
      background: #6366f1;
      border-color: #6366f1;
      color: white;
      font-weight: 600;
    }
    .classroom-read-btn {
      padding: 6px 12px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 0.75rem;
      cursor: pointer;
      width: 100%;
      margin-top: 6px;
      font-weight: 600;
      transition: opacity 0.2s;
    }
    .classroom-read-btn:hover { opacity: 0.85; }

    /* Projector mode — larger fonts, higher contrast */
    body.projector-mode .tile-container {
      font-size: 1.15em;
    }
    body.projector-mode h2 {
      font-size: 1.8rem !important;
    }
    body.projector-mode .instruction-banner {
      font-size: 1.1em;
    }
    body.projector-mode .tile-btn {
      font-size: 1.1em;
      padding: 16px 28px;
    }
  `;
  document.head.appendChild(style);
}

// ============================
// BUILD CLASSROOM UI
// ============================

/**
 * Build and inject the classroom mode section into the teacher panel.
 * @param {HTMLElement} teacherPanel - The teacher panel container
 */
export function buildClassroomSection(teacherPanel) {
  if (!teacherPanel) return;

  // Remove existing if re-building
  const existing = teacherPanel.querySelector('.classroom-section');
  if (existing) existing.remove();

  const section = document.createElement('div');
  section.className = 'classroom-section';

  // Title (collapsible)
  const title = document.createElement('div');
  title.className = 'classroom-section-title';
  title.innerHTML = `<span class="arrow ${classroomState.enabled ? 'open' : ''}">▶</span> ${uz('classroom.title')}`;
  section.appendChild(title);

  // Body (collapsible)
  const body = document.createElement('div');
  body.className = `classroom-body ${classroomState.enabled ? 'open' : ''}`;

  // -- Pace Control --
  const paceRow = document.createElement('div');
  paceRow.className = 'classroom-row';
  paceRow.innerHTML = `<span class="classroom-label">${uz('classroom.paceControl')}</span>`;
  const paceBtns = document.createElement('div');
  paceBtns.className = 'classroom-pace-btns';
  ['slow', 'normal', 'fast'].forEach(pace => {
    const btn = document.createElement('button');
    btn.className = `classroom-pace-btn ${classroomState.pace === pace ? 'active' : ''}`;
    const paceLabels = { slow: '🐢', normal: '🚶', fast: '🏃' };
    btn.textContent = paceLabels[pace];
    btn.title = pace;
    btn.addEventListener('click', () => {
      classroomState.pace = pace;
      paceBtns.querySelectorAll('.classroom-pace-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      saveClassroomState();
    });
    paceBtns.appendChild(btn);
  });
  paceRow.appendChild(paceBtns);
  body.appendChild(paceRow);

  // -- Auto Advance Toggle --
  body.appendChild(createToggleRow(uz('classroom.autoAdvance'), classroomState.autoAdvance, (on) => {
    classroomState.autoAdvance = on;
    saveClassroomState();
  }));

  // -- Pair Work Toggle --
  body.appendChild(createToggleRow(uz('pairWork.title'), classroomState.pairWorkVisible, (on) => {
    classroomState.pairWorkVisible = on;
    saveClassroomState();
    // Show/hide pair work banners
    document.querySelectorAll('.pair-work-banner').forEach(el => {
      /** @type {HTMLElement} */ (el).style.display = on ? '' : 'none';
    });
  }));

  // -- Projector Mode Toggle --
  body.appendChild(createToggleRow(uz('classroom.showOnScreen'), classroomState.projectorMode, (on) => {
    classroomState.projectorMode = on;
    document.body.classList.toggle('projector-mode', on);
    saveClassroomState();
  }));

  // -- Read Aloud Button --
  const readBtn = document.createElement('button');
  readBtn.className = 'classroom-read-btn';
  readBtn.textContent = '🔊 ' + uz('classroom.readAloud');
  readBtn.addEventListener('click', () => {
    // Find the current instruction banner text and read it
    const banner = document.querySelector('.instruction-banner .instruction-text');
    if (banner && banner.textContent && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(banner.textContent);
      u.lang = 'uz-UZ';
      u.rate = classroomState.pace === 'slow' ? 0.7 : classroomState.pace === 'fast' ? 1.1 : 0.9;
      window.speechSynthesis.speak(u);
    }
  });
  body.appendChild(readBtn);

  section.appendChild(body);

  // Toggle visibility on title click
  title.addEventListener('click', () => {
    classroomState.enabled = !classroomState.enabled;
    body.classList.toggle('open', classroomState.enabled);
    title.querySelector('.arrow').classList.toggle('open', classroomState.enabled);
    saveClassroomState();
  });

  teacherPanel.appendChild(section);
  classroomPanelEl = section;

  // Apply projector mode if saved
  if (classroomState.projectorMode) {
    document.body.classList.add('projector-mode');
  }
}

// ============================
// HELPERS
// ============================

function createToggleRow(label, initialState, onChange) {
  const row = document.createElement('div');
  row.className = 'classroom-row';

  const labelEl = document.createElement('span');
  labelEl.className = 'classroom-label';
  labelEl.textContent = label;
  row.appendChild(labelEl);

  const toggle = document.createElement('div');
  toggle.className = `classroom-toggle ${initialState ? 'on' : ''}`;
  toggle.addEventListener('click', () => {
    const isOn = toggle.classList.toggle('on');
    onChange(isOn);
  });
  row.appendChild(toggle);

  return row;
}

// ============================
// EXPORTS
// ============================

export function getClassroomState() {
  return { ...classroomState };
}

export function getPaceMultiplier() {
  return PACE_MULTIPLIERS[classroomState.pace] || 1.0;
}
