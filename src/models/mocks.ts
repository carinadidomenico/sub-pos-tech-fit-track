import { DailyRecord } from '../models/DailyRecord';

/** Registros fictícios para validar utils/goals.ts (Fase 1). */
export const MOCK_RECORDS = {
  /** Todas as 4 metas atingidas → 100% */
  complete: {
    id: 'mock-complete',
    date: '2026-06-29',
    waterMl: 2500,
    sleepHours: 8,
    mood: 5,
    exercise: 'Caminhada 30 min',
    exerciseDone: true,
  } satisfies DailyRecord,

  /** Nenhuma meta atingida → 0% */
  empty: {
    id: 'mock-empty',
    date: '2026-06-28',
    waterMl: 500,
    sleepHours: 5,
    mood: 2,
    exercise: '',
    exerciseDone: false,
  } satisfies DailyRecord,

  /** Metade das metas → 50% */
  partial: {
    id: 'mock-partial',
    date: '2026-06-27',
    waterMl: 2000,
    sleepHours: 6,
    mood: 4,
    exercise: 'Pilates',
    exerciseDone: false,
  } satisfies DailyRecord,
} as const;
