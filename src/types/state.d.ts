/**
 * Application State Type Definitions
 * ===================================
 * Type definitions for application state and actions.
 * 
 * @module src/types/state
 * @version 1.0.0 (Phase 5)
 */

import type { Curriculum } from './curriculum';
import type { VocabUnit } from './vocab';

/**
 * Tile state constants
 */
export type TileState = 
  | 'intro'
  | 'vocab'
  | 'dialogue'
  | 'pattern'
  | 'function'
  | 'controlled'
  | 'writing'
  | 'listen_write'
  | 'mistake'
  | 'done'
  | 'unit_error_detection'
  | 'grand_tile';

/**
 * Integration lesson state
 */
export type IntegrationState = 
  | 'dialogue'
  | 'dialogue_uz'
  | 'transformation'
  | 'listen_write'
  | null;

/**
 * Navigation state
 */
export interface NavigationState {
  /** Current unit ID */
  unitId: string;
  /** Current lesson ID */
  lessonId: string;
  /** Current tile state */
  tile: TileState;
  /** Controlled practice stage index */
  controlledStage: number;
  /** Integration lesson state */
  integrationState: IntegrationState;
  /** Integration progress tracking */
  integrationProgress: IntegrationProgress;
  /** Gate flags for tile transition gating */
  gates: {
    lastMasterPassed: boolean;
    lastWritingPassed: boolean;
    lastListenWritePassed: boolean;
  };
}

/**
 * Integration progress
 */
export interface IntegrationProgress {
  /** Whether dialogue question was answered */
  dialogueAnswered: boolean;
  /** Number of transformations passed */
  transformationsPassed: number;
  /** Total transformations in exercise */
  totalTransformations: number;
}

/**
 * Progress state
 */
export interface ProgressState {
  /** Completed lesson IDs */
  completedLessons: Set<string>;
  /** Completed unit IDs */
  completedUnits: Set<string>;
  /** Vocab completion status */
  vocabCompletion: Record<string, boolean>;
  /** POS games shown per lesson */
  posGamesShown: Record<string, boolean>;
  /** Pre-read completion by lessonId_stageName */
  preReadProgress: Record<string, boolean>;
  /** Token usage tracking */
  usageTracker: Record<string, UsageData>;
}

/**
 * Usage tracking data for a token
 */
export interface UsageData {
  /** Times seen */
  seen: number;
  /** Total attempts */
  attempts: number;
  /** Correct answers */
  correct: number;
  /** Incorrect answers */
  incorrect: number;
  /** Recent incorrect timestamps */
  incorrect_recent: number[];
  /** Current status */
  status: 'New' | 'Training' | 'Weak' | 'Stable';
}

/**
 * Session state
 */
export interface SessionState {
  /** Current session score */
  score: number;
  /** Maximum possible score */
  maxScore: number;
  /** Scores by tile */
  tileScores: Record<string, number>;
  /** Session start time */
  startTime: number | null;
  /** Last activity timestamp */
  lastActivity: number | null;
}

/**
 * Application modes
 */
export interface ModesState {
  /** Teacher mode enabled */
  teacher: boolean;
  /** Debug mode enabled */
  debug: boolean;
  /** Dev gate bypass enabled */
  devBypassGates: boolean;
}

/**
 * Data state (cached curriculum/vocab)
 */
export interface DataState {
  /** Active curriculum */
  curriculum: Curriculum | null;
  /** Cached vocab by unit */
  vocabCache: Record<string, VocabUnit>;
  /** Available units */
  availableUnits: string[];
}

/**
 * Complete application state
 */
export interface AppStateShape {
  /** Navigation state */
  navigation: NavigationState;
  /** Progress state */
  progress: ProgressState;
  /** Session state */
  session: SessionState;
  /** Mode flags */
  modes: ModesState;
  /** Data cache */
  data: DataState;
}

/**
 * State observer callback
 */
export type StateObserver = (
  path: string,
  newValue: unknown,
  oldValue: unknown
) => void;

/**
 * State actions interface
 */
export interface StateActions {
  setTile(tile: TileState): void;
  setLesson(lessonId: string): void;
  setUnit(unitId: string): void;
  setControlledStage(stage: number): void;
  completeVocab(vocabId: string): void;
  completeLesson(lessonId: string): void;
  completeUnit(unitId: string): void;
  awardPoints(points: number, tileName?: string): void;
  addMaxScore(points: number): void;
  resetSessionScore(): void;
  toggleTeacherMode(force?: boolean): void;
  toggleDevBypass(force?: boolean): void;
  setCurriculum(curriculum: Curriculum): void;
  persistState(): void;
  hydrateState(): boolean;
  resetState(): void;
  resetIntegrationState(): void;
  setGate(gate: 'lastMasterPassed' | 'lastWritingPassed' | 'lastListenWritePassed', value: boolean): void;
  getGate(gate: 'lastMasterPassed' | 'lastWritingPassed' | 'lastListenWritePassed'): boolean;
  subscribe(callback: StateObserver): () => void;
  // POS Game progress
  markPOSGameShown(lessonId: string): void;
  isPOSGameShown(lessonId: string): boolean;
  // Pre-read progress
  markPreReadComplete(lessonId: string, stageName: string): void;
  isPreReadComplete(lessonId: string, stageName: string): boolean;
}
