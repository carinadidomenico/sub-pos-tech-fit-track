import { ReactNode } from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';

import { colors, layout, spacing, typography } from '../theme';

export type StatusBannerVariant = 'success' | 'error' | 'info';

export interface StatusBannerProps {
  message: string;
  variant?: StatusBannerVariant;
}

export function StatusBanner({ message, variant = 'info' }: StatusBannerProps) {
  const variantStyle = VARIANT_STYLES[variant];

  return (
    <View
      style={[styles.banner, variantStyle.container]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <Text style={[styles.text, variantStyle.text]}>{message}</Text>
    </View>
  );
}

const VARIANT_STYLES = {
  success: {
    container: { backgroundColor: '#DCFCE7', borderColor: colors.success },
    text: { color: '#166534' },
  },
  error: {
    container: { backgroundColor: '#FEE2E2', borderColor: colors.error },
    text: { color: '#991B1B' },
  },
  info: {
    container: { backgroundColor: '#EFF6FF', borderColor: colors.primary },
    text: { color: colors.primaryDark },
  },
} as const;

export interface FormFieldProps extends ViewProps {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function FormField({ label, error, hint, children, style, ...rest }: FormFieldProps) {
  return (
    <View style={[styles.field, style]} {...rest}>
      <Text style={styles.fieldLabel} accessibilityRole="text">
        {label}
      </Text>
      {hint ? <Text style={styles.fieldHint}>{hint}</Text> : null}
      {children}
      {error ? (
        <Text style={styles.errorText} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

export interface ScreenContentProps {
  children: ReactNode;
  centered?: boolean;
}

export function ScreenContent({ children, centered = false }: ScreenContentProps) {
  return (
    <View style={[styles.screenContent, centered && styles.screenContentCentered]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderWidth: 1,
    borderRadius: 10,
    padding: spacing.sm,
    marginVertical: spacing.md,
  },
  text: {
    ...typography.body,
    fontWeight: '600',
    textAlign: 'center',
  },
  field: {
    gap: spacing.sm,
  },
  fieldLabel: {
    ...typography.subtitle,
    color: colors.text,
  },
  fieldHint: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
  },
  screenContent: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  screenContentCentered: {
    flex: 1,
    justifyContent: 'center',
  },
});
