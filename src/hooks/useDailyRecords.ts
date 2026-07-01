import { useFitTrackContext } from '../context/FitTrackContext';

/** Acesso à lista de registros e operações CRUD. */
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
