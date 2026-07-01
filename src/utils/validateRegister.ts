import { MoodLevel } from '../models/DailyRecord';

export interface RegisterFormValues {
  waterMl: string;
  sleepHours: string;
  mood: MoodLevel | null;
  exercise: string;
  exerciseDone: boolean;
}

export type RegisterFormErrors = Partial<
  Record<'waterMl' | 'sleepHours' | 'mood', string>
>;

export function validateRegisterForm(
  values: RegisterFormValues,
): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  const water = Number(values.waterMl.replace(',', '.'));
  if (values.waterMl.trim() === '' || Number.isNaN(water)) {
    errors.waterMl = 'Informe a quantidade de água.';
  } else if (water < 0) {
    errors.waterMl = 'A água não pode ser negativa.';
  }

  const sleep = Number(values.sleepHours.replace(',', '.'));
  if (values.sleepHours.trim() === '' || Number.isNaN(sleep)) {
    errors.sleepHours = 'Informe as horas de sono.';
  } else if (sleep < 0 || sleep > 24) {
    errors.sleepHours = 'O sono deve estar entre 0 e 24 horas.';
  }

  if (values.mood === null) {
    errors.mood = 'Selecione seu humor.';
  }

  return errors;
}

export function parseRegisterForm(values: RegisterFormValues) {
  return {
    waterMl: Math.round(Number(values.waterMl.replace(',', '.'))),
    sleepHours: Number(values.sleepHours.replace(',', '.')),
    mood: values.mood as MoodLevel,
    exercise: values.exercise.trim(),
    exerciseDone: values.exerciseDone,
  };
}

export function hasFormErrors(errors: RegisterFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
