import { DailyRecord } from '../models/DailyRecord';

export const MOCK_RECORDS = {
  complete: {
    id: 'mock-complete',
    date: '2026-06-29',
    waterMl: 2500,
    sleepHours: 8,
    mood: 5,
    exercise: 'Caminhada 30 min',
    exerciseDone: true,
  } satisfies DailyRecord,

  empty: {
    id: 'mock-empty',
    date: '2026-06-28',
    waterMl: 500,
    sleepHours: 5,
    mood: 2,
    exercise: '',
    exerciseDone: false,
  } satisfies DailyRecord,

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
