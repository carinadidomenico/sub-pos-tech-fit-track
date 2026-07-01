import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MoodLevel } from '../models/DailyRecord';
import { colors, spacing, typography } from '../theme';

const MIN_TOUCH_SIZE = 44;

const MOOD_OPTIONS: { level: MoodLevel; emoji: string; label: string }[] = [
  { level: 1, emoji: '😢', label: 'Péssimo' },
  { level: 2, emoji: '😕', label: 'Ruim' },
  { level: 3, emoji: '😐', label: 'Regular' },
  { level: 4, emoji: '🙂', label: 'Bom' },
  { level: 5, emoji: '😄', label: 'Ótimo' },
];

export interface MoodWidgetProps {
  value: MoodLevel | null;
  onChange: (mood: MoodLevel) => void;
  disabled?: boolean;
}

export function MoodWidget({ value, onChange, disabled = false }: MoodWidgetProps) {
  return (
    <View style={styles.container} accessibilityRole="radiogroup" accessibilityLabel="Nível de humor">
      {MOOD_OPTIONS.map((option) => {
        const selected = value === option.level;

        return (
          <Pressable
            key={option.level}
            onPress={() => onChange(option.level)}
            disabled={disabled}
            accessibilityRole="radio"
            accessibilityLabel={`Humor ${option.level}: ${option.label}`}
            accessibilityState={{ selected, disabled }}
            style={({ pressed }) => [
              styles.option,
              selected && styles.optionSelected,
              disabled && styles.optionDisabled,
              pressed && !disabled && styles.optionPressed,
            ]}
          >
            <Text style={styles.emoji}>{option.emoji}</Text>
            <Text style={[styles.label, selected && styles.labelSelected]}>
              {option.level}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function getMoodLabel(mood: MoodLevel): string {
  return MOOD_OPTIONS.find((option) => option.level === mood)?.label ?? String(mood);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  option: {
    minWidth: MIN_TOUCH_SIZE,
    minHeight: MIN_TOUCH_SIZE,
    flex: 1,
    maxWidth: 64,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#EFF6FF',
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionPressed: {
    opacity: 0.85,
  },
  emoji: {
    fontSize: 24,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  labelSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
});
