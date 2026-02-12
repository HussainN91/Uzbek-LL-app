/**
 * class-profile.js - Teacher Class Profile Panel
 * ================================================
 * Full-featured class management dashboard visible ONLY in Teacher Mode.
 * 
 * Features:
 *  - Student roster with manual add/edit/delete
 *  - Auto-tracked progress per student (lesson completion, scores, XP)
 *  - Manual teacher notes per student
 *  - Class-wide analytics (averages, completion rates)
 *  - Auto-save to localStorage with debounce
 *  - Beautiful dark glassmorphism panel (teacher mode aesthetic)
 * 
 * @module src/components/class-profile
 * @version 1.0.0
 */

import { AppState, subscribe } from '../state/app-state.js';
import {
  getActiveCurriculum,
  getCurrentUnitId,
  getUnitDisplayName,
  getFriendlyLessonName,
  getUnitLessonIds
} from '../core/curriculum-loader.js';
import { getAvailableUnits } from '../core/navigation.js';
import { getLocal, setLocal } from '../utils/storage.js';

// ============================================================================
// CONSTANTS
// ============================================================================

const STORAGE_KEY = 'classProfile_v1';
const AUTOSAVE_DEBOUNCE_MS = 1500;
const MAX_STUDENTS = 60;

const ATTENDANCE_STATUS = /** @type {const} */ ({
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  EXCUSED: 'excused',
});

const PROFICIENCY_LEVELS = ['Not Assessed', 'Beginner', 'Elementary', 'Pre-Intermediate'];

// ============================================================================
// CLASS DATA MODEL
// ============================================================================

/**
 * @typedef {Object} StudentRecord
 * @property {string} id - UUID
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} [nickname]
 * @property {number} [age]
 * @property {string} [gender] - 'M' | 'F' | ''
 * @property {string} proficiency - From PROFICIENCY_LEVELS
 * @property {string} notes - Teacher notes (freeform)
 * @property {number} xp - Tracked XP
 * @property {number} level - Tracked level
 * @property {number} streak - Current streak
 * @property {Object<string, boolean>} completedLessons - lessonId → true
 * @property {Object<string, number>} lessonScores - lessonId → score%
 * @property {Object<string, boolean>} completedUnits - unitId → true
 * @property {Object<string, string>} attendance - date(ISO) → status
 * @property {string} createdAt - ISO timestamp
 * @property {string} updatedAt - ISO timestamp
 */

/**
 * @typedef {Object} ClassData
 * @property {string} className
 * @property {string} teacherName
 * @property {string} academicYear
 * @property {string} notes
 * @property {StudentRecord[]} students
 * @property {string} createdAt
 * @property {string} updatedAt
 */

// ============================================================================
// STATE
// ============================================================================

/** @type {ClassData} */
let classData = null;
let panelEl = null;
let isOpen = false;
let activeStudentId = null;
let activeTab = 'roster'; // 'roster' | 'analytics' | 'settings'
let saveTimer = null;
let lastSaveTime = 0;
let _subscribed = false;

// ============================================================================
// PERSISTENCE
// ============================================================================

function generateId() {
  return 'stu_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
}

function loadClassData() {
  const saved = getLocal(STORAGE_KEY, null);
  if (saved && saved.students) {
    classData = saved;
    // Ensure arrays/objects exist on old records
    classData.students.forEach(s => {
      s.firstName = s.firstName || 'Unknown';
      s.lastName = s.lastName || '';
      s.nickname = s.nickname || '';
      s.notes = s.notes || '';
      s.completedLessons = s.completedLessons || {};
      s.lessonScores = s.lessonScores || {};
      s.completedUnits = s.completedUnits || {};
      s.attendance = s.attendance || {};
      s.xp = s.xp ?? 0;
      s.level = s.level ?? 1;
      s.streak = s.streak ?? 0;
    });
  } else {
    classData = createDefaultClassData();
  }
  return classData;
}

function createDefaultClassData() {
  return {
    className: '',
    teacherName: '',
    academicYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
    notes: '',
    students: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function saveClassData() {
  if (!classData) return;
  classData.updatedAt = new Date().toISOString();
  setLocal(STORAGE_KEY, classData);
  lastSaveTime = Date.now();
}

function debouncedSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveClassData();
    showSaveIndicator();
  }, AUTOSAVE_DEBOUNCE_MS);
}

function showSaveIndicator() {
  const el = panelEl?.querySelector('.cp-save-indicator');
  if (!el) return;
  el.textContent = '✓ Saved';
  el.classList.add('visible');
  setTimeout(() => el.classList.remove('visible'), 2000);
}

// ============================================================================
// STUDENT CRUD
// ============================================================================

function createStudent(firstName, lastName) {
  if (classData.students.length >= MAX_STUDENTS) {
    alert(`Maximum ${MAX_STUDENTS} students allowed.`);
    return null;
  }

  /** @type {StudentRecord} */
  const student = {
    id: generateId(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    nickname: '',
    age: null,
    gender: '',
    proficiency: 'Not Assessed',
    notes: '',
    xp: 0,
    level: 1,
    streak: 0,
    completedLessons: {},
    lessonScores: {},
    completedUnits: {},
    attendance: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  classData.students.push(student);
  debouncedSave();
  return student;
}

function updateStudent(id, updates) {
  const student = classData.students.find(s => s.id === id);
  if (!student) return null;

  Object.assign(student, updates, { updatedAt: new Date().toISOString() });
  debouncedSave();
  return student;
}

function deleteStudent(id) {
  const idx = classData.students.findIndex(s => s.id === id);
  if (idx === -1) return false;

  classData.students.splice(idx, 1);
  if (activeStudentId === id) activeStudentId = null;
  debouncedSave();
  return true;
}

function getStudent(id) {
  return classData.students.find(s => s.id === id) || null;
}

// ============================================================================
// AUTO-PROGRESS SYNC
// ============================================================================

/**
 * Syncs current app progress to the active student record.
 * Only syncs the CURRENT lesson/unit — not the global cumulative state,
 * to avoid accidentally copying other students' progress.
 */
export function syncProgressToStudent(studentId) {
  const student = getStudent(studentId || activeStudentId);
  if (!student) return;

  // Sync CURRENT lesson completion (not the entire global set)
  const currentLessonId = AppState.navigation.lessonId;
  if (currentLessonId && AppState.progress.completedLessons.has(currentLessonId)) {
    student.completedLessons[currentLessonId] = true;
  }

  // Sync CURRENT unit completion
  const currentUnitId = AppState.navigation.unitId;
  if (currentUnitId && AppState.progress.completedUnits.has(currentUnitId)) {
    student.completedUnits[currentUnitId] = true;
  }

  // Sync XP and level
  student.xp = Math.max(student.xp, AppState.session.xp);
  student.level = Math.max(student.level, AppState.session.level);
  student.streak = Math.max(student.streak, AppState.session.streak);

  // Current lesson score — keep highest
  if (currentLessonId && AppState.session.maxScore > 0) {
    const pct = Math.round((AppState.session.score / AppState.session.maxScore) * 100);
    if (!student.lessonScores[currentLessonId] || pct > student.lessonScores[currentLessonId]) {
      student.lessonScores[currentLessonId] = pct;
    }
  }

  student.updatedAt = new Date().toISOString();
  debouncedSave();
}

/**
 * Record attendance for today
 */
function markAttendance(studentId, status) {
  const student = getStudent(studentId);
  if (!student) return;
  const today = new Date().toISOString().split('T')[0];
  student.attendance[today] = status;
  debouncedSave();
}

// ============================================================================
// ANALYTICS HELPERS
// ============================================================================

function getClassAnalytics() {
  const students = classData.students;
  if (students.length === 0) return null;

  const totalStudents = students.length;

  // Average lessons completed
  const avgLessons = students.reduce((sum, s) => sum + Object.keys(s.completedLessons).length, 0) / totalStudents;

  // Average XP
  const avgXP = students.reduce((sum, s) => sum + (s.xp || 0), 0) / totalStudents;

  // Average level
  const avgLevel = students.reduce((sum, s) => sum + (s.level || 1), 0) / totalStudents;

  // Score average across all lesson scores
  let totalScores = 0;
  let scoreCount = 0;
  students.forEach(s => {
    Object.values(s.lessonScores).forEach(score => {
      totalScores += score;
      scoreCount++;
    });
  });
  const avgScore = scoreCount > 0 ? Math.round(totalScores / scoreCount) : 0;

  // Proficiency distribution
  const profDist = {};
  students.forEach(s => {
    profDist[s.proficiency] = (profDist[s.proficiency] || 0) + 1;
  });

  // Today's attendance
  const today = new Date().toISOString().split('T')[0];
  let presentToday = 0;
  let absentToday = 0;
  let unmarkedToday = 0;
  students.forEach(s => {
    const att = s.attendance[today];
    if (att === 'present' || att === 'late') presentToday++;
    else if (att === 'absent' || att === 'excused') absentToday++;
    else unmarkedToday++;
  });

  // Top performers (by XP)
  const topPerformers = [...students]
    .sort((a, b) => (b.xp || 0) - (a.xp || 0))
    .slice(0, 5);

  // Struggling students (lowest score average or 0 lessons)
  const struggling = students
    .filter(s => {
      const scores = Object.values(s.lessonScores);
      if (scores.length === 0) return Object.keys(s.completedLessons).length < 2;
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      return avg < 50;
    })
    .slice(0, 5);

  return {
    totalStudents,
    avgLessons: Math.round(avgLessons * 10) / 10,
    avgXP: Math.round(avgXP),
    avgLevel: Math.round(avgLevel * 10) / 10,
    avgScore,
    profDist,
    presentToday,
    absentToday,
    unmarkedToday,
    topPerformers,
    struggling,
  };
}

function getStudentProgress(student) {
  const availableUnits = getAvailableUnits();
  const allLessons = [];

  availableUnits.forEach(unitId => {
    const lessonIds = getUnitLessonIds(unitId);
    if (lessonIds) {
      lessonIds.forEach(lid => allLessons.push({ unitId, lessonId: lid }));
    }
  });

  const totalLessons = allLessons.length || 1;
  const completedCount = Object.keys(student.completedLessons).length;
  const completionRate = Math.round((completedCount / totalLessons) * 100);

  const scores = Object.values(student.lessonScores);
  const avgScore = scores.length > 0
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;

  const attendanceDays = Object.entries(student.attendance);
  const presentDays = attendanceDays.filter(([_, v]) => v === 'present' || v === 'late').length;
  const attendanceRate = attendanceDays.length > 0
    ? Math.round((presentDays / attendanceDays.length) * 100)
    : 100;

  return {
    completedCount,
    totalLessons,
    completionRate,
    avgScore,
    attendanceRate,
    presentDays,
    totalAttendanceDays: attendanceDays.length,
  };
}

// ============================================================================
// CSS
// ============================================================================

const CLASS_PROFILE_CSS = `
/* ================================================
   CLASS PROFILE PANEL - Teacher Mode Only
   Dark glassmorphism design language
   ================================================ */

.cp-overlay {
  position: fixed;
  inset: 0;
  z-index: 9500;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.35s ease;
}
.cp-overlay.open {
  opacity: 1;
  visibility: visible;
}

.cp-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: min(680px, 92vw);
  height: 100vh;
  z-index: 9600;
  background: linear-gradient(165deg, rgba(22, 22, 38, 0.97), rgba(15, 15, 28, 0.99));
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -20px 0 80px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}
.cp-panel.open {
  transform: translateX(0);
}

/* Header */
.cp-header {
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  background: linear-gradient(180deg, rgba(74, 85, 104, 0.4), transparent);
}
.cp-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.cp-header-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.35);
}
.cp-header-title {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.cp-header-subtitle {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.75rem;
  margin-top: 2px;
}
.cp-close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cp-close-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  transform: scale(1.1);
}
.cp-save-indicator {
  font-size: 0.7rem;
  color: #4ecdc4;
  opacity: 0;
  transition: opacity 0.3s ease;
  position: absolute;
  right: 70px;
  top: 32px;
}
.cp-save-indicator.visible {
  opacity: 1;
}

/* Tabs */
.cp-tabs {
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0 24px;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.15);
}
.cp-tab {
  padding: 12px 20px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  user-select: none;
}
.cp-tab:hover {
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.03);
}
.cp-tab.active {
  color: #667eea;
  border-bottom-color: #667eea;
}

/* Scrollable content */
.cp-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.15) transparent;
}
.cp-content::-webkit-scrollbar {
  width: 6px;
}
.cp-content::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.15);
  border-radius: 3px;
}

/* ========================
   ROSTER TAB
   ======================== */

.cp-add-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.cp-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-size: 0.85rem;
  transition: border-color 0.2s ease;
  outline: none;
}
.cp-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.cp-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
}
.cp-btn {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.cp-btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}
.cp-btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}
.cp-btn-danger {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
}
.cp-btn-danger:hover {
  background: rgba(239, 68, 68, 0.25);
}
.cp-btn-sm {
  padding: 6px 12px;
  font-size: 0.75rem;
}
.cp-btn-ghost {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.cp-btn-ghost:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

/* Student count */
.cp-count-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px 0;
}
.cp-count {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
}
.cp-count strong {
  color: #667eea;
}

/* Student cards list */
.cp-student-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.cp-student-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: all 0.2s ease;
}
.cp-student-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(102, 126, 234, 0.3);
}
.cp-student-card.active {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.4);
}
.cp-student-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}
.cp-student-avatar.female {
  background: linear-gradient(135deg, #f093fb, #f5576c);
}
.cp-student-info {
  flex: 1;
  min-width: 0;
}
.cp-student-name {
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cp-student-meta {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.72rem;
  margin-top: 2px;
}
.cp-student-stats {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}
.cp-stat-pill {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.6);
}
.cp-stat-pill.xp {
  color: #f1c40f;
  background: rgba(241, 196, 15, 0.1);
}
.cp-stat-pill.level {
  color: #4ecdc4;
  background: rgba(78, 205, 196, 0.1);
}
.cp-stat-pill.score {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

/* Attendance quick buttons on student card */
.cp-att-btns {
  display: flex;
  gap: 3px;
  flex-shrink: 0;
}
.cp-att-btn {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cp-att-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
.cp-att-btn.att-present { border-color: rgba(78, 205, 196, 0.4); }
.cp-att-btn.att-present.active { background: rgba(78, 205, 196, 0.25); border-color: #4ecdc4; }
.cp-att-btn.att-absent { border-color: rgba(239, 68, 68, 0.4); }
.cp-att-btn.att-absent.active { background: rgba(239, 68, 68, 0.25); border-color: #ef4444; }
.cp-att-btn.att-late { border-color: rgba(251, 191, 36, 0.4); }
.cp-att-btn.att-late.active { background: rgba(251, 191, 36, 0.25); border-color: #fbbf24; }

/* ========================
   STUDENT DETAIL VIEW
   ======================== */
.cp-detail {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px;
  margin-top: 16px;
  animation: cpFadeIn 0.3s ease;
}
@keyframes cpFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.cp-detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.cp-detail-name {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
}
.cp-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}
.cp-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.cp-field-label {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}
.cp-field-value {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.2s ease;
}
.cp-field-value:focus {
  border-color: #667eea;
}
select.cp-field-value {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 30px;
}
select.cp-field-value option {
  background: #1a1a2e;
  color: #fff;
}

/* Notes textarea */
.cp-notes-area {
  width: 100%;
  min-height: 80px;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  font-size: 0.85rem;
  font-family: inherit;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s ease;
}
.cp-notes-area:focus {
  border-color: #667eea;
}

/* Progress bars in detail view */
.cp-progress-section {
  margin-top: 16px;
}
.cp-progress-section h4 {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}
.cp-progress-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.cp-progress-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  width: 100px;
  flex-shrink: 0;
}
.cp-progress-bar-wrap {
  flex: 1;
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}
.cp-progress-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease;
  background: linear-gradient(90deg, #667eea, #764ba2);
}
.cp-progress-bar-fill.green { background: linear-gradient(90deg, #4ecdc4, #44a08d); }
.cp-progress-bar-fill.gold { background: linear-gradient(90deg, #f1c40f, #e67e22); }
.cp-progress-value {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  width: 40px;
  text-align: right;
  flex-shrink: 0;
}

/* ========================
   ANALYTICS TAB
   ======================== */
.cp-analytics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}
.cp-analytics-card {
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.cp-analytics-card-label {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}
.cp-analytics-card-value {
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
}
.cp-analytics-card-value.purple { color: #667eea; }
.cp-analytics-card-value.green { color: #4ecdc4; }
.cp-analytics-card-value.gold { color: #f1c40f; }
.cp-analytics-card-value.red { color: #f87171; }

.cp-section-title {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
  margin: 20px 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.cp-mini-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.cp-mini-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
}
.cp-mini-list-name {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.82rem;
}
.cp-mini-list-value {
  font-size: 0.78rem;
  font-weight: 600;
}

/* ========================
   SETTINGS TAB
   ======================== */
.cp-settings-group {
  margin-bottom: 20px;
}
.cp-settings-group h4 {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}
.cp-settings-field {
  margin-bottom: 12px;
}
.cp-settings-field label {
  display: block;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
.cp-export-btns {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

/* Empty state */
.cp-empty {
  text-align: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.3);
}
.cp-empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.5;
}
.cp-empty-text {
  font-size: 0.9rem;
  margin-bottom: 8px;
}
.cp-empty-hint {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.2);
}

/* Mobile responsive */
@media (max-width: 500px) {
  .cp-panel {
    width: 100vw;
  }
  .cp-detail-grid {
    grid-template-columns: 1fr;
  }
  .cp-analytics-grid {
    grid-template-columns: 1fr;
  }
  .cp-student-stats {
    display: none;
  }
}
`;

// ============================================================================
// RENDER HELPERS
// ============================================================================

function renderRosterTab() {
  const today = new Date().toISOString().split('T')[0];

  let html = `
    <div class="cp-add-bar">
      <input class="cp-input" id="cp-add-first" type="text" placeholder="First name" maxlength="30" />
      <input class="cp-input" id="cp-add-last" type="text" placeholder="Last name" maxlength="30" />
      <button class="cp-btn cp-btn-primary" id="cp-add-btn">+ Add</button>
    </div>
    <div class="cp-count-bar">
      <span class="cp-count">Students: <strong>${classData.students.length}</strong> / ${MAX_STUDENTS}</span>
      <button class="cp-btn cp-btn-ghost cp-btn-sm" id="cp-sync-all-btn" title="Sync current app progress to active student">↻ Sync Progress</button>
    </div>
    <div class="cp-student-list">
  `;

  if (classData.students.length === 0) {
    html += `
      <div class="cp-empty">
        <div class="cp-empty-icon">👩‍🎓</div>
        <div class="cp-empty-text">No students yet</div>
        <div class="cp-empty-hint">Add students using the fields above</div>
      </div>
    `;
  } else {
    classData.students.forEach(student => {
      const firstName = student.firstName || '';
      const lastName = student.lastName || '';
      const initials = (firstName[0] || '?') + (lastName[0] || '?');
      const progress = getStudentProgress(student);
      const todayAtt = student.attendance[today] || '';
      const avatarClass = student.gender === 'F' ? ' female' : '';
      const safeName = escapeHtml(firstName + ' ' + lastName);
      const safeNick = student.nickname ? ` (${escapeHtml(student.nickname)})` : '';

      html += `
        <div class="cp-student-card ${activeStudentId === student.id ? 'active' : ''}" data-id="${student.id}">
          <div class="cp-student-avatar${avatarClass}">${escapeHtml(initials.toUpperCase())}</div>
          <div class="cp-student-info">
            <div class="cp-student-name">${safeName}${safeNick}</div>
            <div class="cp-student-meta">Lvl ${student.level} · ${progress.completedCount} lessons · ${progress.avgScore}% avg</div>
          </div>
          <div class="cp-student-stats">
            <span class="cp-stat-pill xp">${student.xp} XP</span>
            <span class="cp-stat-pill level">Lvl ${student.level}</span>
          </div>
          <div class="cp-att-btns">
            <button class="cp-att-btn att-present ${todayAtt === 'present' ? 'active' : ''}" data-sid="${student.id}" data-att="present" title="Present">✓</button>
            <button class="cp-att-btn att-absent ${todayAtt === 'absent' ? 'active' : ''}" data-sid="${student.id}" data-att="absent" title="Absent">✗</button>
            <button class="cp-att-btn att-late ${todayAtt === 'late' ? 'active' : ''}" data-sid="${student.id}" data-att="late" title="Late">⏱</button>
          </div>
        </div>
      `;
    });
  }

  html += `</div>`;

  // Detail view for selected student
  if (activeStudentId) {
    const student = getStudent(activeStudentId);
    if (student) {
      html += renderStudentDetail(student);
    }
  }

  return html;
}

function renderStudentDetail(student) {
  const progress = getStudentProgress(student);

  return `
    <div class="cp-detail" id="cp-student-detail">
      <div class="cp-detail-header">
        <span class="cp-detail-name">📋 ${student.firstName} ${student.lastName}</span>
        <div style="display:flex;gap:6px;">
          <button class="cp-btn cp-btn-ghost cp-btn-sm" id="cp-save-student" data-id="${student.id}">💾 Save</button>
          <button class="cp-btn cp-btn-danger cp-btn-sm" id="cp-delete-student" data-id="${student.id}">🗑 Delete</button>
        </div>
      </div>

      <div class="cp-detail-grid">
        <div class="cp-field">
          <span class="cp-field-label">First Name</span>
          <input class="cp-field-value" id="cp-f-first" value="${escapeHtml(student.firstName)}" maxlength="30" />
        </div>
        <div class="cp-field">
          <span class="cp-field-label">Last Name</span>
          <input class="cp-field-value" id="cp-f-last" value="${escapeHtml(student.lastName)}" maxlength="30" />
        </div>
        <div class="cp-field">
          <span class="cp-field-label">Nickname</span>
          <input class="cp-field-value" id="cp-f-nick" value="${escapeHtml(student.nickname || '')}" maxlength="20" />
        </div>
        <div class="cp-field">
          <span class="cp-field-label">Age</span>
          <input class="cp-field-value" id="cp-f-age" type="number" min="5" max="99" value="${student.age || ''}" />
        </div>
        <div class="cp-field">
          <span class="cp-field-label">Gender</span>
          <select class="cp-field-value" id="cp-f-gender">
            <option value="" ${student.gender === '' ? 'selected' : ''}>—</option>
            <option value="M" ${student.gender === 'M' ? 'selected' : ''}>Male</option>
            <option value="F" ${student.gender === 'F' ? 'selected' : ''}>Female</option>
          </select>
        </div>
        <div class="cp-field">
          <span class="cp-field-label">Proficiency Level</span>
          <select class="cp-field-value" id="cp-f-prof">
            ${PROFICIENCY_LEVELS.map(p => `<option value="${p}" ${student.proficiency === p ? 'selected' : ''}>${p}</option>`).join('')}
          </select>
        </div>
        <div class="cp-field">
          <span class="cp-field-label">XP</span>
          <input class="cp-field-value" id="cp-f-xp" type="number" min="0" value="${student.xp}" />
        </div>
        <div class="cp-field">
          <span class="cp-field-label">Level</span>
          <input class="cp-field-value" id="cp-f-level" type="number" min="1" max="20" value="${student.level}" />
        </div>
      </div>

      <div class="cp-field" style="margin-bottom: 16px;">
        <span class="cp-field-label">Teacher Notes</span>
        <textarea class="cp-notes-area" id="cp-f-notes" placeholder="Add notes about this student...">${escapeHtml(student.notes || '')}</textarea>
      </div>

      <div class="cp-progress-section">
        <h4>📊 Progress Overview</h4>
        <div class="cp-progress-row">
          <span class="cp-progress-label">Lessons</span>
          <div class="cp-progress-bar-wrap">
            <div class="cp-progress-bar-fill" style="width: ${progress.completionRate}%"></div>
          </div>
          <span class="cp-progress-value">${progress.completionRate}%</span>
        </div>
        <div class="cp-progress-row">
          <span class="cp-progress-label">Avg Score</span>
          <div class="cp-progress-bar-wrap">
            <div class="cp-progress-bar-fill green" style="width: ${progress.avgScore}%"></div>
          </div>
          <span class="cp-progress-value">${progress.avgScore}%</span>
        </div>
        <div class="cp-progress-row">
          <span class="cp-progress-label">Attendance</span>
          <div class="cp-progress-bar-wrap">
            <div class="cp-progress-bar-fill gold" style="width: ${progress.attendanceRate}%"></div>
          </div>
          <span class="cp-progress-value">${progress.attendanceRate}%</span>
        </div>
      </div>
    </div>
  `;
}

function renderAnalyticsTab() {
  const analytics = getClassAnalytics();
  if (!analytics) {
    return `
      <div class="cp-empty">
        <div class="cp-empty-icon">📊</div>
        <div class="cp-empty-text">No data yet</div>
        <div class="cp-empty-hint">Add students and track progress to see analytics</div>
      </div>
    `;
  }

  let html = `
    <div class="cp-analytics-grid">
      <div class="cp-analytics-card">
        <div class="cp-analytics-card-label">Total Students</div>
        <div class="cp-analytics-card-value purple">${analytics.totalStudents}</div>
      </div>
      <div class="cp-analytics-card">
        <div class="cp-analytics-card-label">Avg Score</div>
        <div class="cp-analytics-card-value green">${analytics.avgScore}%</div>
      </div>
      <div class="cp-analytics-card">
        <div class="cp-analytics-card-label">Avg XP</div>
        <div class="cp-analytics-card-value gold">${analytics.avgXP}</div>
      </div>
      <div class="cp-analytics-card">
        <div class="cp-analytics-card-label">Avg Level</div>
        <div class="cp-analytics-card-value purple">${analytics.avgLevel}</div>
      </div>
      <div class="cp-analytics-card">
        <div class="cp-analytics-card-label">Avg Lessons Done</div>
        <div class="cp-analytics-card-value green">${analytics.avgLessons}</div>
      </div>
      <div class="cp-analytics-card">
        <div class="cp-analytics-card-label">Today Attendance</div>
        <div class="cp-analytics-card-value ${analytics.unmarkedToday > 0 ? 'red' : 'green'}">
          ${analytics.presentToday} / ${analytics.totalStudents}
        </div>
      </div>
    </div>
  `;

  // Top performers
  if (analytics.topPerformers.length > 0) {
    html += `<div class="cp-section-title">🏆 Top Performers</div>`;
    html += `<div class="cp-mini-list">`;
    analytics.topPerformers.forEach((s, i) => {
      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '  ';
      html += `
        <div class="cp-mini-list-item">
          <span class="cp-mini-list-name">${medal} ${s.firstName} ${s.lastName}</span>
          <span class="cp-mini-list-value" style="color: #f1c40f">${s.xp} XP</span>
        </div>
      `;
    });
    html += `</div>`;
  }

  // Struggling students
  if (analytics.struggling.length > 0) {
    html += `<div class="cp-section-title">⚠️ Need Attention</div>`;
    html += `<div class="cp-mini-list">`;
    analytics.struggling.forEach(s => {
      const scores = Object.values(s.lessonScores);
      const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
      html += `
        <div class="cp-mini-list-item">
          <span class="cp-mini-list-name">${s.firstName} ${s.lastName}</span>
          <span class="cp-mini-list-value" style="color: #f87171">${avg}% avg</span>
        </div>
      `;
    });
    html += `</div>`;
  }

  // Proficiency distribution
  html += `<div class="cp-section-title">📝 Proficiency Distribution</div>`;
  html += `<div class="cp-mini-list">`;
  for (const [level, count] of Object.entries(analytics.profDist)) {
    html += `
      <div class="cp-mini-list-item">
        <span class="cp-mini-list-name">${level}</span>
        <span class="cp-mini-list-value" style="color: #667eea">${count}</span>
      </div>
    `;
  }
  html += `</div>`;

  return html;
}

function renderSettingsTab() {
  return `
    <div class="cp-settings-group">
      <h4>📋 Class Information</h4>
      <div class="cp-settings-field">
        <label>Class Name</label>
        <input class="cp-input" id="cp-s-classname" value="${escapeHtml(classData.className)}" placeholder="e.g., Group 7A English" />
      </div>
      <div class="cp-settings-field">
        <label>Teacher Name</label>
        <input class="cp-input" id="cp-s-teacher" value="${escapeHtml(classData.teacherName)}" placeholder="e.g., Abdullayev Sardor" />
      </div>
      <div class="cp-settings-field">
        <label>Academic Year</label>
        <input class="cp-input" id="cp-s-year" value="${escapeHtml(classData.academicYear)}" placeholder="e.g., 2025-2026" />
      </div>
      <div class="cp-settings-field">
        <label>Class Notes</label>
        <textarea class="cp-notes-area" id="cp-s-notes" placeholder="General notes about the class...">${escapeHtml(classData.notes || '')}</textarea>
      </div>
      <button class="cp-btn cp-btn-primary" id="cp-save-settings">💾 Save Class Info</button>
    </div>

    <div class="cp-settings-group">
      <h4>📤 Data Management</h4>
      <div class="cp-export-btns">
        <button class="cp-btn cp-btn-ghost" id="cp-export-json">📋 Export JSON</button>
        <button class="cp-btn cp-btn-ghost" id="cp-export-csv">📊 Export CSV</button>
        <button class="cp-btn cp-btn-danger" id="cp-clear-all">🗑 Clear All Data</button>
      </div>
    </div>

    <div class="cp-settings-group">
      <h4>ℹ️ Info</h4>
      <div style="font-size: 0.78rem; color: rgba(255,255,255,0.4); line-height: 1.6;">
        <div>Students: ${classData.students.length}</div>
        <div>Created: ${new Date(classData.createdAt).toLocaleDateString()}</div>
        <div>Last updated: ${new Date(classData.updatedAt).toLocaleDateString()}</div>
        <div>Auto-save: ON (every ${AUTOSAVE_DEBOUNCE_MS / 1000}s)</div>
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ============================================================================
// PANEL LIFECYCLE
// ============================================================================

function injectCSS() {
  if (document.getElementById('class-profile-css')) return;
  const style = document.createElement('style');
  style.id = 'class-profile-css';
  style.textContent = CLASS_PROFILE_CSS;
  document.head.appendChild(style);
}

function createPanelDOM() {
  if (panelEl) return;
  injectCSS();

  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'cp-overlay';
  overlay.id = 'cp-overlay';
  overlay.addEventListener('click', () => closeClassProfile());

  // Panel
  const panel = document.createElement('div');
  panel.className = 'cp-panel';
  panel.id = 'cp-panel';

  panel.innerHTML = `
    <div class="cp-header">
      <div class="cp-header-left">
        <div class="cp-header-icon">🏫</div>
        <div>
          <div class="cp-header-title">Class Profile</div>
          <div class="cp-header-subtitle">Teacher Dashboard</div>
        </div>
      </div>
      <span class="cp-save-indicator" id="cp-save-ind"></span>
      <button class="cp-close-btn" id="cp-close-btn">✕</button>
    </div>
    <div class="cp-tabs">
      <div class="cp-tab active" data-tab="roster">👩‍🎓 Roster</div>
      <div class="cp-tab" data-tab="analytics">📊 Analytics</div>
      <div class="cp-tab" data-tab="settings">⚙️ Settings</div>
    </div>
    <div class="cp-content" id="cp-content"></div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(panel);
  panelEl = panel;

  // Event listeners
  panel.querySelector('#cp-close-btn').addEventListener('click', closeClassProfile);

  // Tab switching
  panel.querySelectorAll('.cp-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activeTab = /** @type {HTMLElement} */ (tab).dataset.tab;
      panel.querySelectorAll('.cp-tab').forEach(t => t.classList.toggle('active', t === tab));
      renderActiveTab();
    });
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeClassProfile();
  });
}

function renderActiveTab() {
  const content = panelEl?.querySelector('#cp-content');
  if (!content) return;

  switch (activeTab) {
    case 'roster':
      content.innerHTML = renderRosterTab();
      attachRosterListeners(content);
      break;
    case 'analytics':
      content.innerHTML = renderAnalyticsTab();
      break;
    case 'settings':
      content.innerHTML = renderSettingsTab();
      attachSettingsListeners(content);
      break;
  }
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

function attachRosterListeners(container) {
  // Add student button
  const addBtn = container.querySelector('#cp-add-btn');
  const firstInput = /** @type {HTMLInputElement} */ (container.querySelector('#cp-add-first'));
  const lastInput = /** @type {HTMLInputElement} */ (container.querySelector('#cp-add-last'));

  if (addBtn) {
    const doAdd = () => {
      const first = firstInput?.value?.trim();
      const last = lastInput?.value?.trim();
      if (!first) { firstInput?.focus(); return; }
      if (!last) { lastInput?.focus(); return; }
      const newStudent = createStudent(first, last);
      if (newStudent) {
        activeStudentId = newStudent.id;
        renderActiveTab();
      }
    };
    addBtn.addEventListener('click', doAdd);

    // Enter key on inputs
    [firstInput, lastInput].forEach(input => {
      if (input) input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doAdd();
      });
    });
  }

  // Student card clicks
  container.querySelectorAll('.cp-student-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger on attendance buttons
      if (/** @type {HTMLElement} */ (e.target).closest('.cp-att-btn')) return;
      const id = card.dataset.id;
      activeStudentId = activeStudentId === id ? null : id;
      renderActiveTab();
    });
  });

  // Attendance buttons
  container.querySelectorAll('.cp-att-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const sid = btn.dataset.sid;
      const att = btn.dataset.att;
      markAttendance(sid, att);
      renderActiveTab();
    });
  });

  // Sync all progress
  const syncBtn = container.querySelector('#cp-sync-all-btn');
  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      if (activeStudentId) {
        syncProgressToStudent(activeStudentId);
        renderActiveTab();
      } else {
        alert('Select a student first to sync app progress to their record.');
      }
    });
  }

  // Student detail save
  const saveBtn = container.querySelector('#cp-save-student');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      saveStudentFromForm(saveBtn.dataset.id);
    });
  }

  // Student detail delete
  const delBtn = container.querySelector('#cp-delete-student');
  if (delBtn) {
    delBtn.addEventListener('click', () => {
      const id = delBtn.dataset.id;
      const student = getStudent(id);
      if (student && confirm(`Delete ${student.firstName} ${student.lastName}? This cannot be undone.`)) {
        deleteStudent(id);
        renderActiveTab();
      }
    });
  }

  // Auto-save on field changes in detail view
  const detailEl = container.querySelector('#cp-student-detail');
  if (detailEl) {
    detailEl.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('change', () => {
        const id = container.querySelector('#cp-save-student')?.dataset?.id;
        if (id) saveStudentFromForm(id);
      });
    });
  }
}

function saveStudentFromForm(id) {
  const container = panelEl?.querySelector('#cp-content');
  if (!container) return;

  const getValue = (/** @type {string} */ sel) => {
    const el = /** @type {HTMLInputElement} */ (container.querySelector(sel));
    return el?.value ?? '';
  };

  updateStudent(id, {
    firstName: getValue('#cp-f-first').trim() || 'Unknown',
    lastName: getValue('#cp-f-last').trim() || '',
    nickname: getValue('#cp-f-nick').trim(),
    age: parseInt(getValue('#cp-f-age')) || null,
    gender: getValue('#cp-f-gender'),
    proficiency: getValue('#cp-f-prof'),
    xp: parseInt(getValue('#cp-f-xp')) || 0,
    level: parseInt(getValue('#cp-f-level')) || 1,
    notes: getValue('#cp-f-notes'),
  });

  showSaveIndicator();
}

function attachSettingsListeners(container) {
  // Save class info
  const saveBtn = container.querySelector('#cp-save-settings');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      classData.className = /** @type {HTMLInputElement} */ (container.querySelector('#cp-s-classname'))?.value || '';
      classData.teacherName = /** @type {HTMLInputElement} */ (container.querySelector('#cp-s-teacher'))?.value || '';
      classData.academicYear = /** @type {HTMLInputElement} */ (container.querySelector('#cp-s-year'))?.value || '';
      classData.notes = /** @type {HTMLTextAreaElement} */ (container.querySelector('#cp-s-notes'))?.value || '';
      saveClassData();
      showSaveIndicator();
    });
  }

  // Export JSON
  const jsonBtn = container.querySelector('#cp-export-json');
  if (jsonBtn) {
    jsonBtn.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(classData, null, 2)], { type: 'application/json' });
      downloadBlob(blob, `class-profile-${classData.className || 'export'}.json`);
    });
  }

  // Export CSV
  const csvBtn = container.querySelector('#cp-export-csv');
  if (csvBtn) {
    csvBtn.addEventListener('click', () => {
      const csv = exportCSV();
      const blob = new Blob([csv], { type: 'text/csv' });
      downloadBlob(blob, `class-roster-${classData.className || 'export'}.csv`);
    });
  }

  // Clear all
  const clearBtn = container.querySelector('#cp-clear-all');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('⚠️ Delete ALL class data? This cannot be undone.')) {
        if (confirm('Are you absolutely sure? All student records will be permanently lost.')) {
          classData = createDefaultClassData();
          saveClassData();
          activeStudentId = null;
          renderActiveTab();
        }
      }
    });
  }

  // Auto-save on settings field changes
  container.querySelectorAll('#cp-s-classname, #cp-s-teacher, #cp-s-year, #cp-s-notes').forEach(field => {
    field.addEventListener('input', () => {
      classData.className = /** @type {HTMLInputElement} */ (container.querySelector('#cp-s-classname'))?.value || '';
      classData.teacherName = /** @type {HTMLInputElement} */ (container.querySelector('#cp-s-teacher'))?.value || '';
      classData.academicYear = /** @type {HTMLInputElement} */ (container.querySelector('#cp-s-year'))?.value || '';
      classData.notes = /** @type {HTMLTextAreaElement} */ (container.querySelector('#cp-s-notes'))?.value || '';
      debouncedSave();
    });
  });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportCSV() {
  const headers = ['First Name', 'Last Name', 'Nickname', 'Age', 'Gender', 'Proficiency', 'XP', 'Level', 'Streak', 'Lessons Completed', 'Avg Score %', 'Notes'];
  const rows = classData.students.map(s => {
    const scores = Object.values(s.lessonScores);
    const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    return [
      s.firstName,
      s.lastName,
      s.nickname || '',
      s.age || '',
      s.gender || '',
      s.proficiency,
      s.xp,
      s.level,
      s.streak,
      Object.keys(s.completedLessons).length,
      avgScore,
      (s.notes || '').replace(/"/g, '""'),
    ].map(v => `"${v}"`).join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

// ============================================================================
// PUBLIC API
// ============================================================================

export function openClassProfile() {
  if (!AppState.modes.teacher) {
    console.warn('⚠️ Class Profile is only available in Teacher Mode');
    return;
  }

  if (!classData) loadClassData();
  createPanelDOM();

  isOpen = true;
  activeTab = 'roster';
  document.body.style.overflow = 'hidden'; // Lock body scroll

  // Reset tab UI
  panelEl.querySelectorAll('.cp-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === 'roster');
  });

  renderActiveTab();

  // Animate in — double rAF to ensure CSS transition fires
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.getElementById('cp-overlay')?.classList.add('open');
      panelEl?.classList.add('open');
    });
  });
}

export function closeClassProfile() {
  isOpen = false;
  document.body.style.overflow = ''; // Restore body scroll

  // Save on close
  if (classData) saveClassData();

  document.getElementById('cp-overlay')?.classList.remove('open');
  panelEl?.classList.remove('open');
}

export function isClassProfileOpen() {
  return isOpen;
}

/**
 * Initialize the class profile system.
 * Loads data and sets up auto-sync hooks.
 */
export function initClassProfile() {
  loadClassData();

  // Subscribe to state changes for auto-sync (guard against duplicate subscriptions)
  if (!_subscribed) {
    _subscribed = true;
    subscribe((path) => {
      if (!activeStudentId || !AppState.modes.teacher) return;

      if (path === 'progress.completedLessons' ||
          path === 'progress.completedUnits' ||
          path === 'session.xp' ||
          path === 'session.score') {
        syncProgressToStudent(activeStudentId);
      }
    });
  }

  console.log('✅ Class Profile initialized');
}

export function getClassData() {
  if (!classData) loadClassData();
  return classData;
}

export function getActiveStudentId() {
  return activeStudentId;
}

export function setActiveStudent(id) {
  activeStudentId = id;
}

// Window exports
if (typeof window !== 'undefined') {
  window.openClassProfile = openClassProfile;
  window.closeClassProfile = closeClassProfile;
}
