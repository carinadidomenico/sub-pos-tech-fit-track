import { useEffect, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  CustomButton,
  FormField,
  MoodWidget,
  ScreenContent,
  StatusBanner,
} from '../components';
import { useDailyRecords } from '../hooks/useDailyRecords';
import { useTodaySummary } from '../hooks/useTodaySummary';
import { MoodLevel } from '../models/DailyRecord';
import { AppStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import { getTodayDateString } from '../utils/formatDate';
import {
  hasFormErrors,
  parseRegisterForm,
  RegisterFormErrors,
  validateRegisterForm,
} from '../utils/validateRegister';

type Props = NativeStackScreenProps<AppStackParamList, 'Register'>;

type SaveStatus = 'idle' | 'success' | 'error';

export function RegisterScreen({ navigation }: Props) {
  const { addRecord } = useDailyRecords();
  const { todayRecord } = useTodaySummary();

  const [waterMl, setWaterMl] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [mood, setMood] = useState<MoodLevel | null>(null);
  const [exercise, setExercise] = useState('');
  const [exerciseDone, setExerciseDone] = useState(false);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const navigateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!todayRecord) {
      return;
    }

    setWaterMl(String(todayRecord.waterMl));
    setSleepHours(String(todayRecord.sleepHours));
    setMood(todayRecord.mood);
    setExercise(todayRecord.exercise);
    setExerciseDone(todayRecord.exerciseDone);
  }, [todayRecord]);

  useEffect(() => {
    return () => {
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current);
      }
    };
  }, []);

  function clearFieldError(field: keyof RegisterFormErrors) {
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  async function handleSave() {
    setSaveStatus('idle');
    setFormMessage(null);

    const formErrors = validateRegisterForm({
      waterMl,
      sleepHours,
      mood,
      exercise,
      exerciseDone,
    });

    setErrors(formErrors);

    if (hasFormErrors(formErrors)) {
      return;
    }

    const parsed = parseRegisterForm({
      waterMl,
      sleepHours,
      mood,
      exercise,
      exerciseDone,
    });

    setSaving(true);

    try {
      await addRecord({
        date: getTodayDateString(),
        ...parsed,
      });

      setSaveStatus('success');
      setFormMessage('Registro salvo com sucesso!');

      navigateTimeoutRef.current = setTimeout(() => {
        navigation.goBack();
      }, 1400);
    } catch {
      setSaveStatus('error');
      setFormMessage('Não foi possível salvar. Tente novamente.');
      Alert.alert('Erro', 'Não foi possível salvar o registro. Tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ScreenContent>
            <Text style={styles.title} accessibilityRole="header">
              Registro Diário
            </Text>
            <Text style={styles.subtitle}>
              {todayRecord ? 'Atualize os dados de hoje' : 'Preencha os dados de hoje'}
            </Text>

            {formMessage && saveStatus !== 'idle' ? (
              <StatusBanner
                message={formMessage}
                variant={saveStatus === 'success' ? 'success' : 'error'}
              />
            ) : null}

            {formMessage && saveStatus === 'idle' ? (
              <StatusBanner message={formMessage} variant="error" />
            ) : null}

            <FormField
              label="Água consumida (ml)"
              error={errors.waterMl}
            >
              <TextInput
                style={[styles.input, errors.waterMl && styles.inputError]}
                value={waterMl}
                onChangeText={(value) => {
                  setWaterMl(value);
                  clearFieldError('waterMl');
                }}
                keyboardType="numeric"
                placeholder="Ex: 2000"
                accessibilityLabel="Água consumida em mililitros"
                accessibilityHint={
                  errors.waterMl
                    ? `Erro: ${errors.waterMl}`
                    : 'Informe quantos mililitros de água você bebeu hoje'
                }
              />
            </FormField>

            <FormField
              label="Horas de sono"
              error={errors.sleepHours}
              style={styles.textField}
            >
              <TextInput
                style={[styles.input, errors.sleepHours && styles.inputError]}
                value={sleepHours}
                onChangeText={(value) => {
                  setSleepHours(value);
                  clearFieldError('sleepHours');
                }}
                keyboardType="decimal-pad"
                placeholder="Ex: 7.5"
                accessibilityLabel="Horas de sono"
                accessibilityHint={
                  errors.sleepHours
                    ? `Erro: ${errors.sleepHours}`
                    : 'Informe quantas horas você dormiu'
                }
              />
            </FormField>

            <FormField label="Humor" error={errors.mood} style={styles.textField}>
              <MoodWidget
                value={mood}
                onChange={(value) => {
                  setMood(value);
                  clearFieldError('mood');
                }}
              />
            </FormField>

            <FormField 
              label="Exercício do dia" 
              hint="Opcional — descreva a atividade" 
              style={styles.textField}>
              <TextInput
                style={styles.input}
                value={exercise}
                onChangeText={setExercise}
                placeholder="Ex: Caminhada, musculação..."
                accessibilityLabel="Descrição do exercício"
                accessibilityHint="Descreva o exercício realizado ou planejado"
              />
            </FormField>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel} accessibilityRole="text">
                Exercício realizado?
              </Text>
              <Switch
                value={exerciseDone}
                onValueChange={setExerciseDone}
                trackColor={{ false: colors.border, true: colors.primary }}
                accessibilityLabel="Marcar exercício como realizado"
                accessibilityState={{ checked: exerciseDone }}
              />
            </View>

            <CustomButton
              style={styles.saveButton}
              label="Salvar registro"
              onPress={handleSave}
              disabled={saving || saveStatus === 'success'}
              loading={saving}
              accessibilityLabel="Salvar registro diário"
            />
            <CustomButton
            style={styles.cancelButton}
              label="Cancelar"
              variant="outline"
              onPress={() => navigation.goBack()}
              disabled={saving}
              accessibilityLabel="Cancelar e voltar"
            />
          </ScreenContent>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.sm,
    paddingBottom: spacing.xl,
    flexGrow: 1,
  },
  title: {
    ...typography.title,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    ...typography.body,
    color: colors.text,
    marginTop: spacing.xs,
  },
  inputError: {
    borderColor: colors.error,
    marginTop: spacing.xs,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
    paddingVertical: spacing.xs,
  },
  switchLabel: {
    ...typography.body,
    color: colors.text,
    flex: 1,
    paddingRight: spacing.sm,
    marginTop: spacing.xs,
  },
  saveButton: {
    backgroundColor: colors.primary,
    marginTop: spacing.lg,
  },
  cancelButton: {
    backgroundColor: colors.surface,
    marginTop: spacing.lg,
  },
  textField: {
    marginTop: spacing.md,
  },
});
