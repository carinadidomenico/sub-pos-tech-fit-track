/** Nível de humor diário (1 = pior, 5 = melhor). */
export type MoodLevel = 1 | 2 | 3 | 4 | 5;

/** Registro diário de hábitos de saúde. */
export interface DailyRecord {
  id: string;
  /** Data no formato ISO YYYY-MM-DD */
  date: string;
  waterMl: number;
  sleepHours: number;
  mood: MoodLevel;
  exercise: string;
  exerciseDone: boolean;
}

/** Metas diárias centralizadas — usadas por utils/goals.ts */
export const DAILY_GOALS = {
  waterMl: 2000,
  sleepHours: 7,
  minMood: 3 as MoodLevel,
} as const;

/** Campos obrigatórios para criar um registro (sem id). */
export type DailyRecordInput = Omit<DailyRecord, 'id'>;

/** Valida se um valor é um nível de humor válido. */
export function isMoodLevel(value: number): value is MoodLevel {
  return Number.isInteger(value) && value >= 1 && value <= 5;
}
