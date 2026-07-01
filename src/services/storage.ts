import AsyncStorage from '@react-native-async-storage/async-storage';

import { DailyRecord, isMoodLevel } from '../models/DailyRecord';

export const STORAGE_KEY = '@fittrack/records';

function isValidDailyRecord(value: unknown): value is DailyRecord {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.id === 'string' &&
    typeof record.date === 'string' &&
    typeof record.waterMl === 'number' &&
    typeof record.sleepHours === 'number' &&
    typeof record.mood === 'number' &&
    isMoodLevel(record.mood) &&
    typeof record.exercise === 'string' &&
    typeof record.exerciseDone === 'boolean'
  );
}

function parseRecords(raw: string | null): DailyRecord[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidDailyRecord);
  } catch {
    return [];
  }
}

async function readRecords(): Promise<DailyRecord[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return parseRecords(raw);
}

async function writeRecords(records: DailyRecord[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export async function getRecords(): Promise<DailyRecord[]> {
  const records = await readRecords();
  return records.sort((a, b) => b.date.localeCompare(a.date));
}

export async function saveRecord(record: DailyRecord): Promise<void> {
  const records = await readRecords();
  const index = records.findIndex(
    (item) => item.id === record.id || item.date === record.date,
  );

  if (index >= 0) {
    records[index] = record;
  } else {
    records.push(record);
  }

  await writeRecords(records);
}

export async function getRecordByDate(
  date: string,
): Promise<DailyRecord | null> {
  const records = await readRecords();
  return records.find((record) => record.date === date) ?? null;
}

export async function deleteRecord(id: string): Promise<boolean> {
  const records = await readRecords();
  const nextRecords = records.filter((record) => record.id !== id);

  if (nextRecords.length === records.length) {
    return false;
  }

  await writeRecords(nextRecords);
  return true;
}

export async function clearRecords(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export function createRecordId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
