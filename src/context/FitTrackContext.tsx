import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { DailyRecord, DailyRecordInput } from '../models/DailyRecord';
import {
  createRecordId,
  deleteRecord,
  getRecords,
  saveRecord,
} from '../services/storage';

export interface FitTrackContextValue {
  records: DailyRecord[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addRecord: (input: DailyRecordInput) => Promise<DailyRecord>;
  removeRecord: (id: string) => Promise<boolean>;
}

export const FitTrackContext = createContext<FitTrackContextValue | undefined>(
  undefined,
);

interface FitTrackProviderProps {
  children: ReactNode;
}

export function FitTrackProvider({ children }: FitTrackProviderProps) {
  const [records, setRecords] = useState<DailyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getRecords();
      setRecords(data);
    } catch {
      setError('Não foi possível carregar os registros.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const addRecord = useCallback(
    async (input: DailyRecordInput): Promise<DailyRecord> => {
      setError(null);

      const existing = records.find((record) => record.date === input.date);
      const record: DailyRecord = {
        ...input,
        id: existing?.id ?? createRecordId(),
      };

      try {
        await saveRecord(record);
        await refresh();
        return record;
      } catch {
        setError('Não foi possível salvar o registro.');
        throw new Error('Não foi possível salvar o registro.');
      }
    },
    [records, refresh],
  );

  const removeRecord = useCallback(
    async (id: string): Promise<boolean> => {
      setError(null);

      try {
        const removed = await deleteRecord(id);

        if (removed) {
          await refresh();
        }

        return removed;
      } catch {
        setError('Não foi possível remover o registro.');
        return false;
      }
    },
    [refresh],
  );

  const value = useMemo(
    () => ({
      records,
      loading,
      error,
      refresh,
      addRecord,
      removeRecord,
    }),
    [records, loading, error, refresh, addRecord, removeRecord],
  );

  return (
    <FitTrackContext.Provider value={value}>{children}</FitTrackContext.Provider>
  );
}

export function useFitTrackContext(): FitTrackContextValue {
  const context = useContext(FitTrackContext);

  if (!context) {
    throw new Error('useFitTrackContext deve ser usado dentro de FitTrackProvider.');
  }

  return context;
}
