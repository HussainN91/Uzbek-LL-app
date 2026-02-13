// @ts-nocheck
/**
 * UI REDESIGN IMPLEMENTATION — ES Module (V2.0)
 * ═══════════════════════════════════════════════════════════════
 * Transforms the existing app structure into the professional focus-based layout.
 * Called by app-main.js after init — no polling or setTimeout chains needed.
 * 
 * @module src/features/ui-redesign
 * @version 2.0.0 - Mainlined as ES module
 */

'use strict';

import { uz, en } from '../core/i18n.js';

  const w = /** @type {any} */ (window);
  let _sidebarUnitsCache = null;

  // ═══════════════════════════════════════════════════════════════════════════════
  // LAYOUT RESTRUCTURING
  // ═══════════════════════════════════════════════════════════════════════════════

  function restructureLayout() {
    try {
      const app = document.getElementById('app');
      if (!app) {
        console.warn('❌ #app not found');
        return;
      }

      // Save existing elements
      const existingTopBar = document.querySelector('.top-bar');
      const existingTileContainer = document.getElementById('tile-container');
      const existingSelectors = document.querySelector('.selector-bar');
      const existingTeacherPanel = document.getElementById('teacher-panel') || document.querySelector('.teacher-control-panel');

      if (window.__DEV_AUDIT__) console.log('📦 Found elements:', {
        topBar: !!existingTopBar,
        tileContainer: !!existingTileContainer,
        selectors: !!existingSelectors,
        teacherPanel: !!existingTeacherPanel
      });

      // Create flexbox structure
      const newStructure = document.createElement('div');
      newStructure.id = 'redesign-wrapper';

    newStructure.innerHTML = `
      <aside class="sidebar">
        <button class="sidebar-toggle" type="button" aria-label="Toggle sidebar">
          ☰
        </button>
        <div class="sidebar-header">
          <div class="app-logo">
            <span class="app-logo-icon">🇺🇿</span>
            <span>${uz('uiRedesign.learnEnglish')}</span>
          </div>
        </div>
        <nav class="sidebar-nav" id="sidebar-nav"></nav>
      </aside>
      
      <div class="workspace">
        <div class="top-bar-container"></div>
        <div class="workspace-inner">
          <div id="workspace-content"></div>
        </div>
      </div>
    `;

    // Move existing elements
    const topBarContainer = newStructure.querySelector('.top-bar-container');
    const workspaceContent = newStructure.querySelector('#workspace-content');

    if (existingTopBar) {
      topBarContainer.appendChild(existingTopBar);
    }

    if (existingTeacherPanel) {
      topBarContainer.insertBefore(existingTeacherPanel, topBarContainer.firstChild);
    }

    if (existingTileContainer) {
      workspaceContent.appendChild(existingTileContainer);
    }

    // Preserve selector bar (hidden) for core engine logic
    if (existingSelectors instanceof HTMLElement) {
      existingSelectors.style.display = 'none';
      workspaceContent.appendChild(existingSelectors);
    }

    // Replace app content
    app.innerHTML = '';
    app.appendChild(newStructure);

    // Add sidebar toggle functionality
    const sidebar = newStructure.querySelector('.sidebar');
    const toggleBtn = newStructure.querySelector('.sidebar-toggle');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        const willCollapse = !sidebar.classList.contains('collapsed');
        sidebar.classList.toggle('collapsed');
        toggleBtn.textContent = willCollapse ? '▶' : '◀';
      });
      // Set initial icon based on state
      toggleBtn.textContent = sidebar.classList.contains('collapsed') ? '▶' : '◀';
    }

    // Layout restructured with flexbox
    
    } catch (err) {
      console.error('❌ restructureLayout failed:', err);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // SIDEBAR NAVIGATION
  // ═══════════════════════════════════════════════════════════════════════════════

  function buildSidebarNavigation() {
    const sidebarNav = document.getElementById('sidebar-nav');
    if (!sidebarNav) return;

    // Get units from window state
    const units = getAvailableUnits();
    const currentUnit = w.CURRENT_UNIT_ID || units[0] || 'U01';
    const currentLesson = w.currentLessonId || 'U01_L01';
    const unitSelectorButtons = getSelectorButtons('unit-selector');

    sidebarNav.innerHTML = '';

    units.forEach((unitId, idx) => {
      const unitNum = unitId.replace('U', '');
      const isActive = unitId === currentUnit;

      const unitItem = document.createElement('div');
      unitItem.className = `unit-item ${isActive ? '' : 'collapsed'}`;
      
      const unitBtn = document.createElement('button');
      unitBtn.className = `unit-btn ${isActive ? 'active' : ''}`;
      unitBtn.setAttribute('type', 'button');
      const isUnlocked = isUnitUnlocked(unitId, units);
      if (!isUnlocked && !isActive) {
        unitBtn.classList.add('locked');
        unitBtn.setAttribute('aria-disabled', 'true');
      }

      const unitLabel = unitSelectorButtons[idx]?.textContent?.trim() || uz('uiRedesign.unitBreadcrumb').replace('{num}', parseInt(unitNum));

      unitBtn.innerHTML = `
        <span class="unit-icon">${getUnitIcon(unitNum)}</span>
        <span class="unit-title">${unitLabel}</span>
        <span class="unit-chevron">▼</span>
        ${createProgressRing(unitId)}
      `;

      // Add lesson drawer (visible when expanded)
      const lessonDrawer = createLessonDrawer(unitId, currentLesson, units);
      if (isActive) {
        lessonDrawer.classList.add('expanded');
      }

      unitBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        const target = e.target;
        if (target instanceof HTMLElement && target.classList.contains('unit-chevron')) {
          unitItem.classList.toggle('collapsed');
          if (unitItem.classList.contains('collapsed')) {
            lessonDrawer.classList.remove('expanded');
          } else {
            lessonDrawer.classList.add('expanded');
          }
          return;
        }

        if (!isUnlocked && !isActive) {
          const lockedBtn = unitSelectorButtons[idx];
          if (lockedBtn) lockedBtn.click();
          else alert(uz('uiRedesign.completePrevUnit'));
          return;
        }
        
        // Expand and switch to this unit
        unitItem.classList.remove('collapsed');
        lessonDrawer.classList.add('expanded');
        if (unitSelectorButtons[idx]) {
          unitSelectorButtons[idx].click();
          // Wait for curriculum to load + lesson buttons to be created, then rebuild drawer
          setTimeout(() => {
            const newDrawer = createLessonDrawer(unitId, currentLesson, units);
            newDrawer.classList.add('expanded');
            lessonDrawer.replaceWith(newDrawer);
          }, 400);
        } else if (typeof w.setActiveUnit === 'function') {
          const maybePromise = w.setActiveUnit(unitId);
          if (maybePromise && typeof maybePromise.then === 'function') {
            maybePromise.then(() => {
              const newDrawer = createLessonDrawer(unitId, currentLesson, units);
              newDrawer.classList.add('expanded');
              lessonDrawer.replaceWith(newDrawer);
            });
          }
        } else {
          w.CURRENT_UNIT_ID = unitId;
          if (typeof w.buildLessonSelectorUI === 'function') {
            w.buildLessonSelectorUI();
          }
          setTimeout(() => {
            const newDrawer = createLessonDrawer(unitId, currentLesson, units);
            newDrawer.classList.add('expanded');
            lessonDrawer.replaceWith(newDrawer);
          }, 150);
        }
      });

      unitItem.appendChild(unitBtn);
      unitItem.appendChild(lessonDrawer);

      sidebarNav.appendChild(unitItem);
    });

    // Sidebar navigation built
  }

  function getUnitIcon(unitNum) {
    const icons = {
      '01': '👤', '02': '🏠', '03': '🍽️', '04': '🛍️',
      '05': '🎓', '06': '💼', '07': '🌍', '08': '🏥',
      '09': '🎭', '10': '📱'
    };
    return icons[unitNum] || '📚';
  }

  function createProgressRing(unitId) {
    const progress = calculateUnitProgress(unitId);
    const circumference = 2 * Math.PI * 10;
    const offset = circumference - (progress / 100) * circumference;

    return `
      <div class="unit-progress-ring">
        <svg width="28" height="28" viewBox="0 0 24 24">
          <circle class="ring-bg" cx="12" cy="12" r="10"></circle>
          <circle class="ring-fill" cx="12" cy="12" r="10"
                  stroke-dasharray="${circumference}"
                  stroke-dashoffset="${offset}"></circle>
        </svg>
      </div>
    `;
  }

  function calculateUnitProgress(unitId) {
    // Simple progress calculation - can be enhanced
    if (w.GameState && w.GameState.completedLessons) {
      const completed = Object.keys(w.GameState.completedLessons)
        .filter(k => k.startsWith(unitId)).length;
      const total = 3; // Assume 3 lessons per unit
      return Math.round((completed / total) * 100);
    }
    return 0;
  }

  function createLessonDrawer(unitId, currentLesson, units) {
    const drawer = document.createElement('div');
    drawer.className = 'lesson-drawer';

    // Only show lessons for active unit
    const currentUnit = w.CURRENT_UNIT_ID || units[0] || 'U01';
    if (unitId !== currentUnit) {
      const empty = document.createElement('div');
      empty.className = 'lesson-empty';
      empty.textContent = uz('uiRedesign.selectUnit');
      drawer.appendChild(empty);
      return drawer;
    }

    const lessonButtons = getSelectorButtons('lesson-selector');
    if (window.__DEV_AUDIT__) console.log(`📚 Creating lesson drawer for ${unitId}. Found ${lessonButtons.length} lesson buttons`);
    
    if (!lessonButtons.length) {
      const empty = document.createElement('div');
      empty.className = 'lesson-empty';
      empty.textContent = uz('uiRedesign.lessonsAfterUnit');
      drawer.appendChild(empty);
      return drawer;
    }

    lessonButtons.forEach((sourceBtn, index) => {
      const lessonLabel = sourceBtn.textContent?.trim() || uz('uiRedesign.lessonBreadcrumb').replace('{num}', index + 1);
      const isLocked = sourceBtn.style.cursor === 'not-allowed' || sourceBtn.title.includes('Oldin Lesson');
      const isActive = sourceBtn.classList.contains('active');

      const lessonBtn = document.createElement('button');
      lessonBtn.className = `lesson-btn ${isActive ? 'active' : ''}`;
      lessonBtn.setAttribute('type', 'button');
      lessonBtn.innerHTML = `
        <span class="lesson-number">L${index + 1}</span>
        <span class="lesson-title">${lessonLabel}</span>
      `;

      if (isLocked && !isActive) {
        lessonBtn.classList.add('locked');
        lessonBtn.setAttribute('aria-disabled', 'true');
      }

      lessonBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Lesson clicked (debug removed for performance)
        
        if (isLocked && !isActive) {
          console.warn('Lesson is locked');
          sourceBtn.click();
          return;
        }
        
        // Trigger the core engine's lesson button
        sourceBtn.click();
        // Core lesson button clicked
      });

      drawer.appendChild(lessonBtn);
    });

    return drawer;
  }

  function getAvailableUnits() {
    if (Array.isArray(_sidebarUnitsCache) && _sidebarUnitsCache.length > 0) {
      return _sidebarUnitsCache;
    }

    if (Array.isArray(w.availableUnits) && w.availableUnits.length > 0) {
      _sidebarUnitsCache = w.availableUnits.slice();
      return _sidebarUnitsCache;
    }

    if (w.UI_CONFIG && Array.isArray(w.UI_CONFIG.SUPPORTED_UNITS)) {
      _sidebarUnitsCache = w.UI_CONFIG.SUPPORTED_UNITS.slice();
      return _sidebarUnitsCache;
    }
    if (w.UI_CONFIG && w.UI_CONFIG.UNIT_META) {
      _sidebarUnitsCache = Object.keys(w.UI_CONFIG.UNIT_META);
      return _sidebarUnitsCache;
    }
    return ['U01', 'U02', 'U03'];
  }

  function getSelectorButtons(selectorId) {
    const el = document.getElementById(selectorId);
    if (!el) return [];
    return Array.from(el.querySelectorAll('button'));
  }

  function isUnitUnlocked(unitId, units) {
    if (w.TEACHER_MODE || w.DEV_BYPASS_GATES) return true;
    const idx = units.indexOf(unitId);
    if (idx <= 0) return true;
    const prevUnitId = units[idx - 1];
    const completed = w.completedUnits || w.GameState?.completedUnits;
    return completed && typeof completed.has === 'function' ? completed.has(prevUnitId) : false;
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // PROGRESS BAR ENHANCEMENT
  // ═══════════════════════════════════════════════════════════════════════════════

  function enhanceProgressBar() {
    const tileContainer = document.getElementById('tile-container');
    if (!tileContainer) return;

    // Remove old progress dots if they exist
    const oldProgress = tileContainer.querySelector('.progress-container');
    if (oldProgress) {
      oldProgress.remove();
    }

    const totalSteps = 4;
    const currentStep = Number(w.currentStep) || 1;

    // Idempotent: update existing bar segments instead of re-inserting (avoids observer loop)
    let progressBar = tileContainer.querySelector('.progress-bar-segments');
    if (progressBar) {
      const segments = progressBar.querySelectorAll('.progress-segment');
      segments.forEach((seg, i) => {
        seg.classList.remove('completed', 'active');
        if (i < currentStep - 1) seg.classList.add('completed');
        else if (i === currentStep - 1) seg.classList.add('active');
      });
      return;
    }

    progressBar = document.createElement('div');
    progressBar.className = 'progress-bar-segments';

    for (let i = 0; i < totalSteps; i++) {
      const segment = document.createElement('div');
      segment.className = 'progress-segment';
      if (i < currentStep - 1) segment.classList.add('completed');
      else if (i === currentStep - 1) segment.classList.add('active');
      progressBar.appendChild(segment);
    }

    tileContainer.insertBefore(progressBar, tileContainer.firstChild);
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // TOP BAR ENHANCEMENTS
  // ═══════════════════════════════════════════════════════════════════════════════

  function enhanceTopBar() {
    const topBar = document.querySelector('.top-bar');
    if (!topBar) return;

    const currentUnit = w.CURRENT_UNIT_ID || 'U01';
    const currentLesson = w.currentLessonId || 'U01_L01';
    const unitNum = parseInt(currentUnit.replace('U', ''));
    const lessonNum = currentLesson.split('_L')[1] || '01';

    // Build left side with breadcrumbs
    let topBarLeft = topBar.querySelector('.top-bar-left');
    if (!topBarLeft) {
      topBarLeft = document.createElement('div');
      topBarLeft.className = 'top-bar-left';
      topBar.insertBefore(topBarLeft, topBar.firstChild);
    }

    topBarLeft.innerHTML = `
      <div class="breadcrumbs">
        <span class="breadcrumb-item">${uz('uiRedesign.unitBreadcrumb').replace('{num}', unitNum)}</span>
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-current">${uz('uiRedesign.lessonBreadcrumb').replace('{num}', parseInt(lessonNum))}</span>
      </div>
    `;

    // Build right side with status cluster, preserving existing buttons
    let topBarRight = topBar.querySelector('.top-bar-right');
    if (!topBarRight) {
      topBarRight = document.createElement('div');
      topBarRight.className = 'top-bar-right';
      topBar.appendChild(topBarRight);
    }

    const totalScore = getScoreFromDom();
    const existingButtons = Array.from(topBarRight.querySelectorAll('button'));

    topBarRight.innerHTML = '';
    const statusCluster = document.createElement('div');
    statusCluster.className = 'status-cluster';
    statusCluster.innerHTML = `<span class="status-score">🌟 ${totalScore}</span>`;
    topBarRight.appendChild(statusCluster);

    if (existingButtons.length > 0) {
      existingButtons.forEach(btn => topBarRight.appendChild(btn));
    } else {
      const settingsBtn = document.createElement('button');
      settingsBtn.className = 'icon-btn';
      settingsBtn.type = 'button';
      settingsBtn.textContent = '⚙️';
      settingsBtn.onclick = () => w.toggleSettings && w.toggleSettings();
      topBarRight.appendChild(settingsBtn);
    }
  }

  function getScoreFromDom() {
    const scoreNode = document.getElementById('sessionScoreDisplay');
    if (!scoreNode) return 0;
    const text = scoreNode.textContent || '';
    const match = text.match(/\d+/);
    return match ? Number(match[0]) : 0;
  }

  // ═══════════════════════════════════════════════════════════════════════════════

  function wrapInstructionText() {
    const tileContainer = document.getElementById('tile-container');
    if (!tileContainer) return;

    // Find Uzbek instruction text (typically has .tl-uz class and contains "Funksiya")
    const uzElements = tileContainer.querySelectorAll('.tl-uz');
    
    uzElements.forEach(el => {
      const text = el.textContent;
      // Only wrap standalone instruction text, not interactive elements
      if (text.includes('Funksiya') || text.includes('funksiya')) {
        // Don't wrap if already in callout
        if (el.closest('.instruction-callout')) return;
        // Don't wrap draggable items, drop zones, or buttons
        if (el.closest('.draggable-item')) return;
        if (el.closest('.drop-zone')) return;
        if (el.closest('.subtask-container')) return;
        if (el.closest('button')) return;
        if (el.classList.contains('draggable-item')) return;

        const callout = document.createElement('div');
        callout.className = 'instruction-callout';
        
        const title = document.createElement('div');
        title.className = 'instruction-callout-title';
        title.textContent = uz('uiRedesign.instructionTitle');
        
        const content = document.createElement('div');
        content.innerHTML = el.innerHTML;
        
        callout.appendChild(title);
        callout.appendChild(content);
        
        // Replace original element
        el.parentNode.replaceChild(callout, el);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // BUTTON ENHANCEMENT
  // ═══════════════════════════════════════════════════════════════════════════════

  function enhanceButtons() {
    const tileContainer = document.getElementById('tile-container');
    if (!tileContainer) return;

    // Find all buttons in tile container
    const buttons = Array.from(tileContainer.querySelectorAll('button'));
    
    let primaryBtn = null;
    let backBtn = null;
    const secondaryBtns = [];
    
    buttons.forEach(btn => {
      const text = btn.textContent.toLowerCase();
      
      // Skip buttons in top bar
      if (btn.closest('.top-bar')) return;
      
      // Primary actions
      if (text.includes('next') || text.includes('continue') || 
          text.includes('davom') || text.includes('check') || 
          text.includes('tekshir') || text.includes('submit')) {
        
        if (!btn.className.includes('btn-primary')) {
          btn.classList.add('btn-primary');
        }
        primaryBtn = btn;
      }
      // Back button
      else if (text.includes('back') || text.includes('orqaga')) {
        if (!btn.className.includes('btn-back')) {
          btn.classList.add('btn-back');
        }
        backBtn = btn;
      }
      // Secondary actions
      else if (text.includes('skip')) {
        if (!btn.className.includes('btn-secondary')) {
          btn.classList.add('btn-secondary');
        }
        secondaryBtns.push(btn);
      }
    });

    // Create action footer if we have buttons
    if (primaryBtn || buttons.length > 0) {
      // Remove old containers
      const oldContainers = tileContainer.querySelectorAll('.btn-container, .action-footer');
      oldContainers.forEach(c => {
        if (c.parentNode === tileContainer) {
          const btns = Array.from(c.querySelectorAll('button'));
          btns.forEach(b => tileContainer.appendChild(b));
          c.remove();
        }
      });

      // Create action footer
      const actionFooter = document.createElement('div');
      actionFooter.className = 'action-footer';

      if (backBtn) {
        actionFooter.appendChild(backBtn);
      } else {
        actionFooter.appendChild(document.createElement('div'));
      }

      // Add primary button on the right
      if (primaryBtn) actionFooter.appendChild(primaryBtn);
      secondaryBtns.forEach(btn => actionFooter.appendChild(btn));

      tileContainer.appendChild(actionFooter);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // CONTENT TRANSITIONS
  // ═══════════════════════════════════════════════════════════════════════════════

  function addContentTransitions() {
    const tileContainer = document.getElementById('tile-container');
    if (!tileContainer) return;

    // Add transition class when content loads
    tileContainer.classList.add('content-slide-in');

    // Remove class after animation
    setTimeout(() => {
      tileContainer.classList.remove('content-slide-in');
    }, 500);
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // STEP METADATA
  // ═══════════════════════════════════════════════════════════════════════════════

  function addStepMetadata() {
    const tileContainer = document.getElementById('tile-container');
    if (!tileContainer) return;

    const totalSteps = 4;
    const currentStep = Number(w.currentStep) || 1;

    // Idempotent: update existing step-meta instead of adding duplicates (avoids observer loop)
    const existing = tileContainer.querySelector('.step-meta');
    const indicator = existing?.querySelector('.step-indicator');
    if (indicator) {
      indicator.textContent = uz('uiRedesign.stepIndicator').replace('{current}', currentStep).replace('{total}', totalSteps);
      return;
    }

    const stepMeta = document.createElement('div');
    stepMeta.className = 'step-meta';
    const stepText = uz('uiRedesign.stepIndicator').replace('{current}', currentStep).replace('{total}', totalSteps);
    stepMeta.innerHTML = `
      <div class="step-indicator">${stepText}</div>
    `;

    const progressBar = tileContainer.querySelector('.progress-bar-segments');
    if (progressBar) {
      progressBar.after(stepMeta);
    } else {
      tileContainer.insertBefore(stepMeta, tileContainer.firstChild);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════════
  // MAIN EXPORTED INITIALIZER
  // ═══════════════════════════════════════════════════════════════════════════════

  /**
   * Initialize the UI redesign. Called once by app-main.js after initApp().
   * No polling — the DOM and app state are already ready when this runs.
   */
  export function initUIRedesign() {
    restructureLayout();

    // Ensure legacy lesson buttons exist for sidebar drawer
    if (typeof w.buildLessonSelectorUI === 'function') {
      const selectorEl = document.getElementById('lesson-selector');
      if (selectorEl) {
        try {
          w.buildLessonSelectorUI(selectorEl, { unitId: w.CURRENT_UNIT_ID });
        } catch (e) {
          console.warn('⚠️ buildLessonSelectorUI during redesign init failed:', e);
        }
      }
    }

    buildSidebarNavigation();
    enhanceTopBar();
    enhanceProgressBar();
    wrapInstructionText();
    enhanceButtons();
    addStepMetadata();
    addContentTransitions();

    // One deferred sidebar rebuild to pick up any data that arrived
    // after init (e.g. lazy-loaded curriculum/units) — runs once, no loop.
    requestAnimationFrame(() => {
      const hasCurriculum = !!w.ACTIVE_CURRICULUM?.lessons;
      const hasUnits = Array.isArray(w.availableUnits) && w.availableUnits.length > 0;
      if (hasCurriculum || hasUnits) {
        buildSidebarNavigation();
      }
    });

    // Observe tile-container for content changes
    observeContentChanges();
  }

  // Re-apply enhancements when content changes (single observer)
  let _contentObserverAttached = false;
  let _observerRef = null;
  let _tileContainerRef = null;
  function observeContentChanges() {
    if (_contentObserverAttached) return;
    const tileContainer = document.getElementById('tile-container');
    if (!tileContainer) return;
    _contentObserverAttached = true;
    _tileContainerRef = tileContainer;

    let _enhanceTimer = null;
    function runEnhancements() {
      if (!_tileContainerRef || !_observerRef) return;
      _observerRef.disconnect(); // Prevent our DOM changes from retriggering the observer (stops infinite loop)
      try {
        enhanceTopBar();
        enhanceProgressBar();
        wrapInstructionText();
        enhanceButtons();
        addStepMetadata();
        addContentTransitions();
      } finally {
        _observerRef.observe(_tileContainerRef, { childList: true, subtree: false });
      }
    }

    _observerRef = new MutationObserver(() => {
      if (_enhanceTimer) clearTimeout(_enhanceTimer);
      _enhanceTimer = setTimeout(() => {
        _enhanceTimer = null;
        requestAnimationFrame(runEnhancements);
      }, 350);
    });

    _observerRef.observe(tileContainer, {
      childList: true,
      subtree: false
    });
  }

  // Expose for Teacher Mode manual trigger
  w.UIRedesign = {
    init: initUIRedesign,
    rebuildSidebar: buildSidebarNavigation,
    enhanceProgressBar,
    enhanceButtons
  };
