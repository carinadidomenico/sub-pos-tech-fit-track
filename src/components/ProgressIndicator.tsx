import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../theme';
import { DailyProgress } from '../utils/goals';

export interface ProgressIndicatorProps {
  progress: DailyProgress;
  label?: string;
}

export function ProgressIndicator({
  progress,
  label = 'Progresso das metas',
}: ProgressIndicatorProps) {
  const clampedPercentage = Math.min(100, Math.max(0, progress.percentage));

  return (
    <View
      style={styles.container}
      accessibilityRole="progressbar"
      accessibilityLabel={`${label}: ${progress.completed} de ${progress.total} metas, ${clampedPercentage} por cento`}
      accessibilityValue={{
        min: 0,
        max: progress.total,
        now: progress.completed,
        text: `${clampedPercentage}%`,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {progress.completed}/{progress.total} ({clampedPercentage}%)
        </Text>
      </View>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${clampedPercentage}%`,
              minWidth: clampedPercentage > 0 ? 4 : 0,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  value: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  track: {
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
});
