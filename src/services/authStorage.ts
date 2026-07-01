import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthSession, User, UserInput } from '../models/User';
import { normalizeEmail, toSession } from '../utils/validateAuth';

export const USERS_STORAGE_KEY = '@fittrack/users';
export const SESSION_STORAGE_KEY = '@fittrack/session';

function isValidUser(value: unknown): value is User {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const user = value as Record<string, unknown>;

  return (
    typeof user.id === 'string' &&
    typeof user.name === 'string' &&
    typeof user.email === 'string' &&
    typeof user.password === 'string'
  );
}

function isValidSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const session = value as Record<string, unknown>;

  return (
    typeof session.userId === 'string' &&
    typeof session.name === 'string' &&
    typeof session.email === 'string'
  );
}

async function readUsers(): Promise<User[]> {
  const raw = await AsyncStorage.getItem(USERS_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isValidUser) : [];
  } catch {
    return [];
  }
}

async function writeUsers(users: User[]): Promise<void> {
  await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function createUserId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function registerUser(input: UserInput): Promise<User> {
  const users = await readUsers();
  const email = normalizeEmail(input.email);

  if (users.some((user) => user.email === email)) {
    throw new Error('Este e-mail já está cadastrado.');
  }

  const user: User = {
    id: createUserId(),
    name: input.name.trim(),
    email,
    password: input.password,
  };

  await writeUsers([...users, user]);
  return user;
}

export async function loginUser(
  email: string,
  password: string,
): Promise<AuthSession> {
  const users = await readUsers();
  const normalizedEmail = normalizeEmail(email);
  const user = users.find(
    (item) => item.email === normalizedEmail && item.password === password,
  );

  if (!user) {
    throw new Error('E-mail ou senha incorretos.');
  }

  const session = toSession(user);
  await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  return session;
}

export async function getSession(): Promise<AuthSession | null> {
  const raw = await AsyncStorage.getItem(SESSION_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    return isValidSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function saveSession(session: AuthSession): Promise<void> {
  await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export async function logoutUser(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
}

export async function getUserById(userId: string): Promise<User | null> {
  const users = await readUsers();
  return users.find((user) => user.id === userId) ?? null;
}
