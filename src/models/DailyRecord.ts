
export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export interface DailyRecord {
  id: string;
  // Data no formato ISO YYYY-MM-DD
  date: string;
  waterMl: number;
  sleepHours: number;
  mood: MoodLevel;
  exercise: string;
  exerciseDone: boolean;
}

export const DAILY_GOALS = {
  waterMl: 2000,
  sleepHours: 7,
  minMood: 3 as MoodLevel,
} as const;

export type DailyRecordInput = Omit<DailyRecord, 'id'>;

export function isMoodLevel(value: number): value is MoodLevel {
  return Number.isInteger(value) && value >= 1 && value <= 5;
}
