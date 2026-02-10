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
 * Grammar pattern definition
 */
export interface Pattern {
  /** Pattern ID */
  id: string;
  /** Pattern name in English */
  name_en: string;
  /** Pattern name in Uzbek */
  name_uz?: string;
  /** Pattern formula (e.g., "S + am/is/are + V-ing") */
  formula?: string;
  /** Example sentences */
  examples?: string[];
  /** When to use this pattern */
  usage_en?: string;
  /** Usage in Uzbek */
  usage_uz?: string;
  /** Common mistakes */
  common_mistakes?: string[];
}

/**
 * Mistake/error item for correction exercises
 */
export interface MistakeItem {
  /** Mistake ID */
  id: string;
  /** Incorrect sentence */
  wrong: string;
  /** Correct sentence */
  correct: string;
  /** Explanation in English */
  explanation_en?: string;
  /** Explanation in Uzbek */
  explanation_uz?: string;
  /** Error type */
  error_type?: string;
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
  /** Main grammar pattern ID */
  main_pattern_id?: string;
  /** Target language patterns */
  TL_patterns?: Pattern[];
  /** Audio entry IDs */
  audio_ids?: string[];
  /** Mistake/error IDs */
  mistake_ids?: string[];
  /** Whether this is an integration lesson */
  is_integration_lesson?: boolean;
  /** Integration content (if integration lesson) */
  integration_content?: IntegrationContent;
  /** Function subtasks for function tile */
  function_subtasks?: any[];
  /** Function check items for function tile */
  function_check_items?: any[];
  /** Additional dynamic properties */
  [key: string]: any;
}

/**
 * Integration lesson content
 */
export interface IntegrationContent {
  /** Dialogue tile content */
  tile_a_dialogue?: Record<string, Dialogue>;
  /** Transformation tile content */
  tile_b_transformation?: TransformationContent;
  /** Listen-write tile content */
  tile_c_listen_write?: ListenWriteContent;
}

/**
 * Transformation exercise content
 */
export interface TransformationContent {
  /** Base sentence to transform */
  base_sentence: string;
  /** Individual transformations */
  transformations: Transformation[];
}

/**
 * Single transformation exercise
 */
export interface Transformation {
  /** Change instruction in Uzbek */
  change_uz: string;
  /** Correct transformed form */
  correct_form: string;
  /** Explanation in Uzbek */
  explanation_uz: string;
}

/**
 * Listen-write exercise content
 */
export interface ListenWriteContent {
  /** Audio items to listen and write */
  items: ListenWriteItem[];
}

/**
 * Listen-write item
 */
export interface ListenWriteItem {
  /** Audio ID */
  audio_id: string;
  /** Correct transcript */
  transcript: string;
}

/**
 * Controlled practice stage
 */
export interface ControlledStage {
  /** Stage type: GAP or REORDER */
  type: 'GAP' | 'REORDER' | 'MIXED';
  /** Stage label */
  label: string;
  /** Items for this stage */
  items: ControlledItem[];
}

/**
 * Controlled practice item
 */
export interface ControlledItem {
  /** Sentence with gap marker */
  sentence?: string;
  /** Words to reorder */
  words?: string[];
  /** Correct answer */
  answer: string;
  /** Hint text */
  hint?: string;
}

/**
 * Unit error detection spec
 */
export interface UnitErrorSpec {
  /** Prompt in Uzbek */
  prompt_uz?: string;
  /** Prompt in English */
  prompt_en?: string;
  /** Audio IDs to check */
  items: string[];
  /** Pass threshold (0-1) */
  pass_threshold?: number;
}

/**
 * Grand tile spec
 */
export interface GrandTileSpec {
  /** Instruction in Uzbek */
  uz_instruction?: string;
  /** Expected output samples */
  expected_output_samples_en?: string[];
  expected_output_sample?: string[];
  /** Required tokens */
  required_tokens?: string[];
  /** Target word count */
  target_word_count?: number;
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
  /** Grammar patterns */
  patterns: Record<string, Pattern>;
  /** Audio entries */
  audio: Record<string, AudioEntry>;
  /** Mistake items */
  mistakes?: Record<string, MistakeItem>;
  /** Unit error detection spec */
  unit_error_detection?: UnitErrorSpec;
  /** Grand tile spec */
  grand_tile?: GrandTileSpec;
}
