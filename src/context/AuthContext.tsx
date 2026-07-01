import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { AuthSession, UserInput } from '../models/User';
import {
  getSession,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/authStorage';

export interface AuthContextValue {
  session: AuthSession | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (input: UserInput) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSession() {
      try {
        const stored = await getSession();
        setSession(stored);
      } catch {
        setSession(null);
      } finally {
        setLoading(false);
      }
    }

    void loadSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);

    try {
      const nextSession = await loginUser(email, password);
      setSession(nextSession);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Não foi possível entrar.';
      setError(message);
      throw err;
    }
  }, []);

  const signUp = useCallback(async (input: UserInput) => {
    setError(null);

    try {
      const user = await registerUser(input);
      const nextSession = await loginUser(user.email, user.password);
      setSession(nextSession);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Não foi possível cadastrar.';
      setError(message);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    setError(null);
    await logoutUser();
    setSession(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      session,
      loading,
      error,
      isAuthenticated: session !== null,
      login,
      signUp,
      logout,
      clearError,
    }),
    [session, loading, error, login, signUp, logout, clearError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de AuthProvider.');
  }

  return context;
}
