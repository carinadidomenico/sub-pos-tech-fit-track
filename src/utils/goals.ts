import { DailyRecord, DAILY_GOALS, MoodLevel } from '../models/DailyRecord';

export interface DailyProgress {
  completed: number;
  total: number;
  percentage: number;
}

export function isWaterGoalMet(waterMl: number): boolean {
  return waterMl >= DAILY_GOALS.waterMl;
}

export function isSleepGoalMet(sleepHours: number): boolean {
  return sleepHours >= DAILY_GOALS.sleepHours;
}

export function isMoodGoalMet(mood: MoodLevel): boolean {
  return mood >= DAILY_GOALS.minMood;
}

export function isExerciseGoalMet(exerciseDone: boolean): boolean {
  return exerciseDone;
}

const GOAL_CHECKERS: ((record: DailyRecord) => boolean)[] = [
  (record) => isWaterGoalMet(record.waterMl),
  (record) => isSleepGoalMet(record.sleepHours),
  (record) => isMoodGoalMet(record.mood),
  (record) => isExerciseGoalMet(record.exerciseDone),
];

export function calculateDailyProgress(record: DailyRecord): DailyProgress {
  const total = GOAL_CHECKERS.length;
  const completed = GOAL_CHECKERS.filter((check) => check(record)).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { completed, total, percentage };
}

export function areAllGoalsMet(record: DailyRecord): boolean {
  const { completed, total } = calculateDailyProgress(record);
  return completed === total;
}

export function countMetGoals(record: DailyRecord): number {
  return calculateDailyProgress(record).completed;
}
