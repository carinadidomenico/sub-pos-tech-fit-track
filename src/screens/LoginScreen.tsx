import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  CustomButton,
  FormField,
  ScreenContent,
  StatusBanner,
} from '../components';
import { useAuth } from '../hooks/useAuth';
import { AuthStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import {
  AuthFormErrors,
  hasAuthFormErrors,
  validateLoginForm,
} from '../utils/validateAuth';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { login, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        clearError();
        setErrors({});
      };
    }, [clearError]),
  );

  function clearFieldError(field: keyof AuthFormErrors) {
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (error) {
      clearError();
    }
  }

  async function handleLogin() {
    const formErrors = validateLoginForm(email, password);
    setErrors(formErrors);

    if (hasAuthFormErrors(formErrors)) {
      return;
    }

    setSubmitting(true);

    try {
      await login(email, password);
    } catch {
      console.error(error);
    } finally {
      setSubmitting(false);
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
              Bem-vindo ao FitTrack
            </Text>
            <Text style={styles.subtitle}>
              Entre para acompanhar seus hábitos de saúde
            </Text>

            {error ? <StatusBanner message={error} variant="error" /> : null}

            <FormField label="E-mail" error={errors.email}>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  clearFieldError('email');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="seu@email.com"
                accessibilityLabel="E-mail"
                accessibilityHint="Informe seu e-mail de acesso"
              />
            </FormField>

            <FormField label="Senha" error={errors.password}>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  clearFieldError('password');
                }}
                secureTextEntry
                placeholder="Sua senha"
                accessibilityLabel="Senha"
                accessibilityHint="Informe sua senha"
              />
            </FormField>

            <CustomButton
              style={styles.button}
              label="Entrar"
              onPress={handleLogin}
              loading={submitting}
              disabled={submitting}
              accessibilityLabel="Entrar no FitTrack"
            />
            <CustomButton
              style={styles.button}
              label="Criar conta"
              variant="outline"
              onPress={() => navigation.navigate('SignUp')}
              disabled={submitting}
              accessibilityLabel="Ir para cadastro"
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
    gap: spacing.md,
    paddingBottom: spacing.xl,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    ...typography.title,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginVertical: spacing.sm,
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
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
  button: {
    marginTop: spacing.lg,
  },
});
