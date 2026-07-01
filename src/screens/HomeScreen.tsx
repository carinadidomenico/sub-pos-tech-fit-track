import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  CustomButton,
  getMoodLabel,
  ProgressIndicator,
  ScreenContent,
} from '../components';
import { useAuth } from '../hooks/useAuth';
import { useDailyRecords } from '../hooks/useDailyRecords';
import { useTodaySummary } from '../hooks/useTodaySummary';
import { DAILY_GOALS } from '../models/DailyRecord';
import { AppStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { user, logout } = useAuth();
  const { recordCount, loading: recordsLoading, error } = useDailyRecords();
  const {
    todayRecord,
    progress,
    hasRecordToday,
    loading: summaryLoading,
  } = useTodaySummary();

  const loading = recordsLoading || summaryLoading;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenContent>
          <Text style={styles.title} accessibilityRole="header">
            FitTrack
          </Text>
          <Text style={styles.tagline}>
            Olá, {user?.name ?? 'colaborador'} — acompanhe seus hábitos de saúde
          </Text>

          {error ? (
            <Text style={styles.error} accessibilityLiveRegion="polite">
              {error}
            </Text>
          ) : null}

          {loading ? (
            <ActivityIndicator
              size="large"
              color={colors.primary}
              accessibilityLabel="Carregando resumo do dia"
            />
          ) : (
            <>
              <Text style={styles.sectionTitle} accessibilityRole="header">
                {hasRecordToday ? 'Resumo de hoje' : 'Nenhum registro para hoje'}
              </Text>
              {hasRecordToday && (
                <ProgressIndicator progress={progress} label="Metas" />
              )}
              {todayRecord ? (
                <View
                  style={styles.summaryCard}
                  accessibilityLabel={`Resumo de hoje: água ${todayRecord.waterMl} mililitros, sono ${todayRecord.sleepHours} horas, humor ${getMoodLabel(todayRecord.mood)}, exercício ${todayRecord.exerciseDone ? 'realizado' : 'pendente'}`}
                >
                  <SummaryRow
                    label="Água"
                    value={`${todayRecord.waterMl} ml`}
                    hint={`meta ${DAILY_GOALS.waterMl} ml`}
                  />
                  <SummaryRow
                    label="Sono"
                    value={`${todayRecord.sleepHours} h`}
                    hint={`meta ${DAILY_GOALS.sleepHours} h`}
                  />
                  <SummaryRow
                    label="Humor"
                    value={`${todayRecord.mood} — ${getMoodLabel(todayRecord.mood)}`}
                    hint="meta ≥ 3"
                  />
                  <SummaryRow
                    label="Exercício"
                    value={
                      todayRecord.exercise.trim() ||
                      (todayRecord.exerciseDone ? 'Realizado' : 'Não informado')
                    }
                    hint={todayRecord.exerciseDone ? 'realizado' : 'pendente'}
                  />
                </View>
              ) : (
                <Text style={styles.hint}>
                  Toque em "Registrar hoje" para começar.
                </Text>
              )}

              <Text style={styles.caption}>
                {recordCount === 0
                  ? 'Histórico vazio'
                  : `${recordCount} registro${recordCount === 1 ? '' : 's'} no histórico`}
              </Text>
            </>
          )}

          <CustomButton
            style={styles.button}
            label={hasRecordToday ? 'Atualizar registro' : 'Registrar hoje'}
            onPress={() => navigation.navigate('Register')}
            accessibilityLabel="Ir para registro diário"
          />
          <CustomButton
            style={styles.button}
            label="Ver histórico"
            variant="outline"
            onPress={() => navigation.navigate('History')}
            accessibilityLabel="Ir para histórico"
          />
          <CustomButton
            style={styles.button}
            label="Sair"
            variant="outline"
            onPress={() => void logout()}
            accessibilityLabel="Sair da conta"
          />
        </ScreenContent>
      </ScrollView>
    </SafeAreaView>
  );
}

interface SummaryRowProps {
  label: string;
  value: string;
  hint: string;
}

function SummaryRow({ label, value, hint }: SummaryRowProps) {
  return (
    <View
      style={styles.summaryRow}
      accessible
      accessibilityLabel={`${label}: ${value}. ${hint}`}
    >
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryHint}>{hint}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xl,
    flexGrow: 1,
  },
  title: {
    ...typography.title,
    marginTop: spacing.sm,
  },
  tagline: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.title,
    marginTop: spacing.md,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  summaryRow: {
    gap: 2,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  summaryValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '500',
    marginTop: spacing.sm,
  },
  summaryHint: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  hint: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  caption: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  error: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.sm,
  },
  button: {
    marginTop: spacing.lg,
  }
});
