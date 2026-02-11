/**
 * Global Type Declarations
 * ========================
 * Extends Window interface with app-specific globals.
 * 
 * @module src/types/global
 * @version 1.0.0 (Phase 5)
 */

import type { Curriculum, Lesson, VocabItem, Pattern, AudioEntry } from './curriculum';
import type { VocabUnit } from './vocab';
import type { AppStateShape, StateActions, TileState, IntegrationProgress } from './state';

declare global {
  interface Window {
    // ============================
    // State Objects
    // ============================
    
    /** Centralized application state */
    AppState: AppStateShape;
    
    /** State actions for mutations */
    StateActions: StateActions;
    
    /** Legacy GameState object */
    GameState: {
      unitId: string;
      lessonId: string;
      tile: string;
      controlledStage: number;
      score: number;
      maxScore: number;
      completedLessons: Set<string>;
      completedUnits: Set<string>;
      save(): void;
      load(): boolean;
      reset(): void;
    };
    
    /** Session state (legacy) */
    SessionState: {
      currentLessonId: string;
      currentState: string;
      currentUnitId: string;
      lastMasterPassed: boolean;
      lastWritingPassed: boolean;
      lastListenWritePassed: boolean;
      controlledStageIndex: number;
      integrationState: string | null;
      integrationProgress: IntegrationProgress;
      completedLessons: Set<string>;
      completedUnits: Set<string>;
      resetIntegrationState(): void;
      mergeMissingKeys(keys: string[]): void;
    };
    
    /** Score state (legacy) */
    ScoreState: {
      sessionScore: number;
      sessionMaxScore: number;
      tileScores: Record<string, number>;
      reset(): void;
      awardPoints(points: number, reason?: string, tileName?: string): void;
      addMaxScore(points: number): void;
    };
    
    // ============================
    // DOM References & Legacy Caches
    // ============================
    
    /** Cached tile container */
    tileContainer?: HTMLElement | null;
    
    /** Currently loaded lesson object */
    currentLesson?: Lesson | null;
    
    /** Legacy completion tracking */
    completedLessons?: Set<string>;
    completedUnits?: Set<string>;
    availableUnits?: string[];
    
    /** Session evaluation flags */
    lastMasterPassed?: boolean;
    lastWritingPassed?: boolean;
    lastListenWritePassed?: boolean;
    listenWritePassed?: boolean;
    
    /** Controlled practice helpers */
    controlledStageIndex?: number;
    __LAST_PATTERN_SENTENCES__?: string[];
    __LAST_CONTROLLED_SENTENCES__?: string[];
    _skipGapHard?: boolean;
    showAnswers?: () => void;
    
    // ============================
    // Curriculum & Data
    // ============================
    
    /** Active curriculum for current unit */
    ACTIVE_CURRICULUM: Curriculum | null;
    
    /** Current unit ID */
    CURRENT_UNIT_ID: string;
    
    /** UI configuration map */
    UI_CONFIG?: {
      SUPPORTED_UNITS?: string[];
      UNIT_META?: Record<string, any>;
      TILE_NAMES?: Record<string, string>;
    };
    
    /** Vocab cards by unit */
    VOCAB_CARDS_U01?: VocabUnit;
    VOCAB_CARDS_U01_5?: VocabUnit;
    VOCAB_CARDS_U02?: VocabUnit;
    VOCAB_CARDS_U03?: VocabUnit;
    VOCAB_CARDS_U04?: VocabUnit;
    VOCAB_CARDS_U05?: VocabUnit;
    VOCAB_CARDS_U06?: VocabUnit;
    VOCAB_CARDS_U07?: VocabUnit;
    VOCAB_CARDS_U08?: VocabUnit;
    VOCAB_CARDS_U09?: VocabUnit;
    VOCAB_CARDS_U10?: VocabUnit;
    
    /** Curriculum by unit */
    CURRICULUM_U01?: Curriculum;
    CURRICULUM_U02?: Curriculum;
    CURRICULUM_U03?: Curriculum;
    CURRICULUM_U04?: Curriculum;
    CURRICULUM_U05?: Curriculum;
    CURRICULUM_U06?: Curriculum;
    CURRICULUM_U07?: Curriculum;
    CURRICULUM_U08?: Curriculum;
    CURRICULUM_U09?: Curriculum;
    CURRICULUM_U10?: Curriculum;
    
    // ============================
    // Mode Flags
    // ============================
    
    /** Teacher mode bypass */
    TEACHER_MODE: boolean;
    TeacherMode?: Record<string, any>;
    
    /** Dev bypass gates */
    DEV_BYPASS_GATES: boolean;
    
    /** Development audit mode */
    __DEV_AUDIT__: boolean;
    
    /** Function tile debugging */
    __FUNCTION_DEBUG__?: boolean;
    
    // ============================
    // Functions
    // ============================
    
    /** Set current tile state */
    setState(state: TileState): void;
    
    /** Get current lesson */
    getCurrentLesson(): Lesson | null;
    
    /** Get vocab by ID */
    getVocab(id: string): VocabItem | null;
    
    /** Get pattern by ID */
    getPattern(id: string): Pattern | null;
    
    /** Get audio entry */
    getAudioEntry(id: string): AudioEntry | null;
    
    /** Render current tile */
    render(): void;
    
    /** Bilingual string helpers */
    getUz(path: string): string;
    getEn(path: string): string;
    
    /** Text normalization */
    normalizeText(text: string): string;
    
    /** Play exercise audio */
    playExerciseAudio(audioSpec: AudioEntry, profile?: string): Promise<{ success: boolean }>;
    
    /** Award points */
    awardPoints(points: number, reason?: string, tileName?: string): void;
    
    /** Add to max score */
    addMaxScore(points: number): void;
    
    /** Controlled completion snapshot */
    getCompletionState?: () => Record<string, unknown>;
    
    // ============================
    // Integration State
    // ============================
    
    /** Integration lesson state */
    integrationState: string | null;
    
    /** Integration progress */
    integrationProgress: IntegrationProgress;
    
    /** Current lesson ID (legacy) */
    currentLessonId: string;
    
    /** Current state (legacy) */
    currentState: string;
    
    // ============================
    // Audio System
    // ============================
    
    /** Dialogue audio player */
    dialogueAudioPlayer?: {
      currentButton: HTMLButtonElement | null;
      play(path: string, button: HTMLButtonElement): Promise<void>;
      toggle(): void;
      stop?(): void;
    };
    speakText?: (text: string, langOrOptions?: string | Record<string, any>) => void;
    
    /** Tile registry (backward compat bridge) */
    TileRegistry?: {
      register: (...args: any[]) => void;
      registerSimple: (...args: any[]) => void;
      mount: (...args: any[]) => any;
      unmount: () => void;
      has: (name: string) => boolean;
      list: () => string[];
    };

    /** Mission & grammar helpers (set by curriculum loader / vocab data) */
    getMissionStageForLesson?: (lessonId: string) => any;
    getGrammarFocus?: () => string;
    getContrastiveTurnsForLesson?: (lessonId: string) => any[];

    /** Dialogue tile render (backward compat bridge) */
    renderLessonDialogueTile?: (...args: any[]) => any;

    /** Vocab gap system */
    vocabGapSystem?: {
      process(): void;
      initialize?(data: any): Promise<void>;
    };
    
    /** Vocab card modal functions (window bridge for onclick handlers only) */
    closeVocabModal?: () => void;
    markVocabComplete?: (vocabId: string) => void;
    goToNextStage?: () => void;
    goToPrevStage?: () => void;
    flipPracticeCard?: (cardId: string) => void;
    removeJumbleChunk?: (index: number) => void;
    
    // ============================
    // Button Components & UI Utils
    // ============================
    
    /** Button component utilities */
    ButtonComponents?: Record<string, any>;
    TileUtils?: Record<string, any>;
    
    /** Timing utilities */
    TimingUtils?: Record<string, any>;
    
    /** Audio utilities */
    AudioUtils?: Record<string, any>;
    
    /** Touch handler */
    touchHandler?: Record<string, any>;
    TouchHandler?: Record<string, any>;
    
    // ============================
    // Game Systems
    // ============================
    
    /** POS Speed Game utilities */
    mapPosToCategory?: (word: string) => string;
    getCategoryForWord?: (word: string) => string;
    POSSpeedGame?: Record<string, any>;
    refreshVocabGrid?: () => void;
    
      /** Grammar PPP helpers */
      GrammarPPP?: Record<string, any>;
    
    // ============================
    // Data Loader
    // ============================
    
    /** Data loader utilities */
    DataLoader: {
      loadVocabForUnit(unitId: string): Promise<VocabUnit | null>;
      loadCurriculumForUnit(unitId: string): Promise<Curriculum | null>;
      isVocabLoaded(unitId: string): boolean;
      isCurriculumLoaded(unitId: string): boolean;
      getVocabSync(unitId: string): VocabUnit | null;
      preloadNextUnit(currentUnitId: string): void;
      cacheFromGlobals(): void;
      clearCache(): void;
    };

    // ============================
    // Legacy Utilities
    // ============================

    DOMUtils?: Record<string, any>;
    StorageUtils?: Record<string, any>;
    ScoringSystem?: Record<string, any>;
    ModuleLoader?: Record<string, any>;
    LOAD_MODULES_DYNAMICALLY?: boolean;
    
    // ============================
    // Usage Tracker
    // ============================
    
    /** Token usage tracker */
    UsageTracker: {
      data: Record<string, unknown>;
      track(token: string, wasCorrect: boolean): void;
      getStrength(token: string): string;
      save(): void;
      load(): void;
    };
    
    /** Legacy usage tracker reference */
    usageTracker: Record<string, unknown>;
    
    // ============================
    // Translation Data
    // ============================
    
    /** Translation lookup table */
    TRANSLATION_DATA: Record<string, string>;
    
    // ============================
    // Core Module Functions (src/core/*)
    // ============================
    
    /** Lessonpack adapter */
    adaptLessonPackToLegacyCurriculum?: (pack: any) => Curriculum;
    
    /** Curriculum loader functions */
    setActiveUnit?: (unitId: string) => Promise<boolean>;
    detectAvailableUnits?: () => Promise<string[]>;
    getCurrentUnitId?: () => string;
    getUnitDisplayName?: (unitId: string) => string;
    getMissingKeys?: () => string[];
    mergeMissingKeys?: (keys: string[]) => void;
    initCurriculumLoader?: () => void;
    
    /** Navigation functions */
    getCurrentState?: () => string;
    getCurrentLessonId?: () => string;
    initNavigation?: () => void;
    setCurrentLesson?: (lessonId: string) => void;
    clearTileContainer?: () => void;
    getSessionScore?: () => { score: number; maxScore: number };
    resetSessionScore?: () => void;
    markLessonCompleted?: (lessonId: string) => void;
    markUnitCompleted?: (unitId: string) => void;
    isLessonCompleted?: (lessonId: string) => boolean;
    isUnitCompleted?: (unitId: string) => boolean;
    getCompletedLessons?: () => Set<string>;
    getCompletedUnits?: () => Set<string>;
    getControlledStageIndex?: () => number;
    setControlledStageIndex?: (index: number) => void;
    setIntegrationState?: (state: string | null) => void;
    resetIntegrationState?: () => void;
    setAvailableUnits?: (units: string[]) => void;
    getAvailableUnits?: () => string[];
    isGateOpen?: (gate: string) => boolean;
    passGate?: (gate: string) => void;
    setControlledStage?: (stage: number) => void;
    getControlledStage?: () => number;
    
    /** Teacher mode functions */
    initTeacherMode?: () => void;
    toggleTeacherMode?: () => void;
    setTeacherMode?: (enabled: boolean) => void;
    getTeacherMode?: () => boolean;
    goToTile?: (tileName: string) => void;
    goToLesson?: (lessonId: string) => void;
    goToUnit?: (unitId: string) => Promise<string | void>;
    showTiles?: () => void;
    showLessons?: () => void;
    showUnits?: () => void;
    updateTeacherPanelUI?: () => void;
    
    /** Helper functions */
    _pickGapEasy?: () => any;
    _pickGapHard?: () => any;
    _makeReorder?: (sentence: string) => any;
    _makeConstruction?: (sentence: string, distractors?: string[]) => any;
    evaluateTextAnswer?: (userAnswer: string, target: string, options?: any) => any;
    evaluateMultipleChoice?: (selected: any, correct: any) => any;
    evaluateReorder?: (userOrder: string[], correctOrder: string[]) => any;
    evaluateGapFill?: (userAnswer: string, correctAnswer: string) => any;
    evaluateMasterOutput?: (submission: any, answer: any) => any;
    compareAnswers?: (userAnswer: string, correctAnswer: string) => boolean;
    fuzzyCompare?: (userAnswer: string, correctAnswer: string, tolerance?: number) => boolean;
    detectCommonErrors?: (userAnswer: string, correctAnswer: string) => string[];
    shuffle?: <T>(array: T[]) => T[];
    pickRandom?: <T>(array: T[], n?: number) => T[];
    pickOne?: <T>(array: T[]) => T | null;
    
    /** App Main */
    initApp?: () => Promise<void>;
    reset?: () => void;
    showLoading?: () => void;
    hideLoading?: () => void;
    AppMain?: any;
    LoadingSpinner?: {
      createLoadingOverlay(): { show(): void; hide(): void };
    };
    
    /** Lazy loaders */
    lazyLoadTiles?: () => Promise<any[]>;
    lazyLoadVocabUnit?: (unitNum: number) => Promise<any>;
    lazyLoadAudit?: () => Promise<any>;
  }
}

export {};
