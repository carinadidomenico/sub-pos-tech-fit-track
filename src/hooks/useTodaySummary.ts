import { useMemo } from 'react';

import { useFitTrackContext } from '../context/FitTrackContext';
import { calculateDailyProgress, DailyProgress } from '../utils/goals';
import { getTodayDateString } from '../utils/formatDate';

const EMPTY_PROGRESS: DailyProgress = {
  completed: 0,
  total: 4,
  percentage: 0,
};

/** Resumo do registro e progresso do dia atual. */
export function useTodaySummary() {
  const { records, loading, error } = useFitTrackContext();
  const todayDate = getTodayDateString();

  const todayRecord = useMemo(
    () => records.find((record) => record.date === todayDate) ?? null,
    [records, todayDate],
  );

  const progress = useMemo(
    () => (todayRecord ? calculateDailyProgress(todayRecord) : EMPTY_PROGRESS),
    [todayRecord],
  );

  return {
    todayDate,
    todayRecord,
    progress,
    hasRecordToday: todayRecord !== null,
    loading,
    error,
  };
}
