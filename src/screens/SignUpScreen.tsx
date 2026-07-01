import { useState } from 'react';
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
  validateSignUpForm,
} from '../utils/validateAuth';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export function SignUpScreen({ navigation }: Props) {
  const { signUp, error, clearError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function clearFieldError(field: keyof AuthFormErrors) {
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (error) {
      clearError();
    }
  }

  async function handleSignUp() {
    const formErrors = validateSignUpForm(name, email, password, confirmPassword);
    setErrors(formErrors);

    if (hasAuthFormErrors(formErrors)) {
      return;
    }

    setSubmitting(true);

    try {
      await signUp({ name, email, password });
    } catch (error) {
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
              Criar conta
            </Text>
            <Text style={styles.subtitle}>
              Seus dados ficam salvos neste dispositivo
            </Text>

            {error ? <StatusBanner message={error} variant="error" /> : null}

            <FormField label="Nome" error={errors.name}>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={name}
                onChangeText={(value) => {
                  setName(value);
                  clearFieldError('name');
                }}
                placeholder="Seu nome"
                accessibilityLabel="Nome"
              />
            </FormField>

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
              />
            </FormField>

            <FormField label="Senha" hint="Mínimo de 4 caracteres" error={errors.password}>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  clearFieldError('password');
                }}
                secureTextEntry
                placeholder="Crie uma senha"
                accessibilityLabel="Senha"
              />
            </FormField>

            <FormField label="Confirmar senha" error={errors.confirmPassword}>
              <TextInput
                style={[styles.input, errors.confirmPassword && styles.inputError]}
                value={confirmPassword}
                onChangeText={(value) => {
                  setConfirmPassword(value);
                  clearFieldError('confirmPassword');
                }}
                secureTextEntry
                placeholder="Repita a senha"
                accessibilityLabel="Confirmar senha"
              />
            </FormField>

            <CustomButton
              label="Cadastrar"
              onPress={handleSignUp}
              loading={submitting}
              disabled={submitting}
              accessibilityLabel="Criar conta no FitTrack"
            />
            <CustomButton
              label="Já tenho conta"
              variant="outline"
              onPress={() => navigation.goBack()}
              disabled={submitting}
              accessibilityLabel="Voltar para login"
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
  },
  title: {
    ...typography.title,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
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
  },
  inputError: {
    borderColor: colors.error,
  },
});
