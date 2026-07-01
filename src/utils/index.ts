export {
  areAllGoalsMet,
  calculateDailyProgress,
  countMetGoals,
  isExerciseGoalMet,
  isMoodGoalMet,
  isSleepGoalMet,
  isWaterGoalMet,
} from './goals';
export type { DailyProgress } from './goals';
export { formatDisplayDate, getTodayDateString, toDateString } from './formatDate';
export {
  hasFormErrors,
  parseRegisterForm,
  validateRegisterForm,
} from './validateRegister';
export type { RegisterFormErrors, RegisterFormValues } from './validateRegister';
export {
  hasAuthFormErrors,
  normalizeEmail,
  toSession,
  validateLoginForm,
  validateSignUpForm,
} from './validateAuth';
export type { AuthFormErrors } from './validateAuth';
