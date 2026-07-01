import { useFitTrackContext } from '../context/FitTrackContext';

export function useDailyRecords() {
  const { records, loading, error, refresh, addRecord, removeRecord } =
    useFitTrackContext();

  return {
    records,
    loading,
    error,
    refresh,
    addRecord,
    removeRecord,
    recordCount: records.length,
  };
}
