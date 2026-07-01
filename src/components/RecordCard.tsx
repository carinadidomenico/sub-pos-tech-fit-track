import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { DailyRecord, DAILY_GOALS } from '../models/DailyRecord';
import { colors, spacing, typography } from '../theme';
import { formatDisplayDate } from '../utils/formatDate';
import {
  areAllGoalsMet,
  calculateDailyProgress,
  isExerciseGoalMet,
  isMoodGoalMet,
  isSleepGoalMet,
  isWaterGoalMet,
} from '../utils/goals';
import { getMoodLabel } from './MoodWidget';
import { ProgressIndicator } from './ProgressIndicator';

export interface RecordCardProps {
  record: DailyRecord;
  onPress?: () => void;
}

export function RecordCard({ record, onPress }: RecordCardProps) {
  const progress = calculateDailyProgress(record);
  const highlighted = record.exerciseDone || areAllGoalsMet(record);
  const exerciseLabel = record.exercise.trim() || 'Nenhum exercício informado';

  const content = (
    <>
      <View style={styles.header}>
        <Text style={styles.date}>{formatDisplayDate(record.date)}</Text>
      </View>

      <View style={styles.metrics}>
        <MetricRow
          label="Água"
          value={`${record.waterMl} ml`}
          met={isWaterGoalMet(record.waterMl)}
          goal={`meta ${DAILY_GOALS.waterMl} ml`}
        />
        <MetricRow
          label="Sono"
          value={`${record.sleepHours} h`}
          met={isSleepGoalMet(record.sleepHours)}
          goal={`meta ${DAILY_GOALS.sleepHours} h`}
        />
        <MetricRow
          label="Humor"
          value={`${record.mood} — ${getMoodLabel(record.mood)}`}
          met={isMoodGoalMet(record.mood)}
          goal="meta ≥ 3"
        />
        <MetricRow
          style={styles.metricRowExercise}
          label="Exercício"
          value={exerciseLabel}
          met={isExerciseGoalMet(record.exerciseDone)}
          goal={record.exerciseDone ? '' : 'Não realizado'}
        />
      </View>

      <ProgressIndicator progress={progress} label="Metas do dia" />
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Registro de ${formatDisplayDate(record.date)}, ${progress.completed} de ${progress.total} metas`}
        style={({ pressed }) => [
          styles.card,
          highlighted && styles.cardHighlighted,
          pressed && styles.cardPressed,
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      style={[styles.card, highlighted && styles.cardHighlighted]}
      accessibilityLabel={`Registro de ${formatDisplayDate(record.date)}`}
    >
      {content}
    </View>
  );
}

interface MetricRowProps {
  label: string;
  value: string;
  met: boolean;
  goal: string;
  style?: StyleProp<ViewStyle>;
}

function MetricRow({ label, value, met, goal, style }: MetricRowProps) {
  return (
    <View style={[styles.metricRow, style]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, met && styles.metricValueMet]}>{value}</Text>
      <Text style={styles.metricGoal}>{goal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
  },
  cardHighlighted: {
    borderColor: colors.success,
    backgroundColor: '#F0FDF4',
  },
  cardPressed: {
    opacity: 0.9,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  date: {
    ...typography.subtitle,
    color: colors.title,
  },
  metrics: {
    gap: spacing.sm,
  },
  metricRow: {
    gap: 2,
  },
  metricLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '700',
  },
  metricValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '500',
  },
  metricValueMet: {
    color: colors.success,
    fontWeight: '500',
  },
  metricGoal: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  metricRowExercise: {
      marginTop: spacing.sm,
    },
});
