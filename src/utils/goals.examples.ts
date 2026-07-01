import { MOCK_RECORDS } from '../models/mocks';
import {
  areAllGoalsMet,
  calculateDailyProgress,
  isExerciseGoalMet,
  isMoodGoalMet,
  isSleepGoalMet,
  isWaterGoalMet,
} from './goals';

export const goalsUsageExamples = {
  complete: calculateDailyProgress(MOCK_RECORDS.complete),
  empty: calculateDailyProgress(MOCK_RECORDS.empty),
  partial: calculateDailyProgress(MOCK_RECORDS.partial),
  helpers: {
    water: isWaterGoalMet(MOCK_RECORDS.partial.waterMl),
    sleep: isSleepGoalMet(MOCK_RECORDS.partial.sleepHours),
    mood: isMoodGoalMet(MOCK_RECORDS.partial.mood),
    exercise: isExerciseGoalMet(MOCK_RECORDS.partial.exerciseDone),
    allGoalsMet: areAllGoalsMet(MOCK_RECORDS.complete),
  },
};

export const EXPECTED_RESULTS = {
  complete: { completed: 4, total: 4, percentage: 100 },
  empty: { completed: 0, total: 4, percentage: 0 },
  partial: { completed: 2, total: 4, percentage: 50 },
};
