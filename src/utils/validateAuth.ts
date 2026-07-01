import { AuthSession, User, UserInput } from '../models/User';

export type AuthFormErrors = Partial<
  Record<'name' | 'email' | 'password' | 'confirmPassword', string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginForm(
  email: string,
  password: string,
): AuthFormErrors {
  const errors: AuthFormErrors = {};

  if (!email.trim()) {
    errors.email = 'Informe o e-mail.';
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'E-mail inválido.';
  }

  if (!password) {
    errors.password = 'Informe a senha.';
  }

  return errors;
}

export function validateSignUpForm(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
): AuthFormErrors {
  const errors = validateLoginForm(email, password);

  if (!name.trim()) {
    errors.name = 'Informe seu nome.';
  } else if (name.trim().length < 2) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres.';
  }

  if (password && password.length < 4) {
    errors.password = 'Senha deve ter pelo menos 4 caracteres.';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Confirme a senha.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'As senhas não coincidem.';
  }

  return errors;
}

export function hasAuthFormErrors(errors: AuthFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function toSession(user: User): AuthSession {
  return {
    userId: user.id,
    name: user.name,
    email: user.email,
  };
}
