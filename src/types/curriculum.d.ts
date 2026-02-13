/**
 * Curriculum Type Definitions
 * ===========================
 * Type definitions for curriculum and lesson data structures.
 * 
 * @module src/types/curriculum
 * @version 1.0.0 (Phase 5)
 */

/**
 * Audio entry in curriculum
 */
export interface AudioEntry {
  /** Audio file path or ID */
  file?: string;
  /** Correct transcript */
  transcript_correct?: string;
  /** Wrong/error transcript (for error detection) */
  wrong?: string;
  /** Whether this is a correct sentence */
  is_correct?: boolean | string;
  /** Error type in Uzbek */
  error_type_uz?: string;
  /** Speaker voice profile */
  voice?: string;
}

/**
 * Dialogue turn in a conversation
 */
export interface DialogueTurn {
  /** Speaker name */
  speaker: string;
  /** English text */
  text?: string;
  /** English text (alternative key) */
  text_en?: string;
  /** Uzbek text */
  text_uz?: string;
  /** Audio ID for this turn */
  audio_id?: string;
}

/**
 * Dialogue structure
 */
export interface Dialogue {
  /** Dialogue ID */
  id?: string;
  /** Context in Uzbek */
  context_uz?: string;
  /** Context in English */
  context_en?: string;
  /** Dialogue turns */
  turns: DialogueTurn[];
}

/**
 * Lesson definition
 */
export interface Lesson {
  /** Lesson ID (e.g., "U01_L01") */
  lesson_id: string;
  /** Unit ID (e.g., "U01") */
  unit_id: string;
  /** Lesson title in English */
  title_en: string;
  /** Lesson title in Uzbek */
  title_uz?: string;
  /** Communicative function in English */
  function_en: string;
  /** Communicative function in Uzbek */
  function_uz: string;
  /** Semantic category in English */
  semantic_category_en: string;
  /** Semantic category in Uzbek */
  semantic_category_uz: string;
  /** Vocabulary IDs for this lesson */
  vocab_ids: string[];
  /** Audio entry IDs */
  audio_ids?: string[];
  /** Whether this is an integration lesson */
  is_integration_lesson?: boolean;
  /** Integration content (if integration lesson) */
  integration_content?: IntegrationContent;
  /** Additional dynamic properties */
  [key: string]: any;
}

/**
 * Integration lesson content
 */
export interface IntegrationContent {
  /** Dialogue tile content */
  tile_a_dialogue?: Record<string, Dialogue>;
}

/**
 * Full curriculum structure
 */
export interface Curriculum {
  /** Unit ID */
  unit_id: string;
  /** Legacy units map (legacy structure) */
  units?: Record<string, any>;
  /** All lessons */
  lessons: Record<string, Lesson>;
  /** Vocabulary definitions */
  vocab: Record<string, import('./vocab').VocabItem>;
  /** Audio entries */
  audio: Record<string, AudioEntry>;
}
