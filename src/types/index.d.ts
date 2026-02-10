/**
 * Type Definitions Index
 * ======================
 * Re-exports all type definitions for the A1 Language App.
 * 
 * @module src/types
 * @version 1.0.0 (Phase 5)
 */

// Vocabulary types
export type {
  VocabItem,
  VocabLesson,
  VocabUnit,
  VocabCard,
  VocabPresentation,
  VocabPractice,
  VocabProduction,
  VocabReproduction,
  PracticeExample,
} from './vocab';

// Curriculum types
export type {
  Curriculum,
  Lesson,
  Pattern,
  AudioEntry,
  MistakeItem,
  Dialogue,
  DialogueTurn,
  IntegrationContent,
  TransformationContent,
  Transformation,
  ListenWriteContent,
  ListenWriteItem,
  ControlledStage,
  ControlledItem,
  UnitErrorSpec,
  GrandTileSpec,
} from './curriculum';

// State types
export type {
  AppStateShape,
  NavigationState,
  ProgressState,
  SessionState,
  ModesState,
  DataState,
  TileState,
  IntegrationState,
  IntegrationProgress,
  UsageData,
  StateObserver,
  StateActions,
} from './state';
