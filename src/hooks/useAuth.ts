import { useAuthContext } from '../context/AuthContext';

export function useAuth() {
  const { session, loading, error, isAuthenticated, login, signUp, logout, clearError } =
    useAuthContext();

  return {
    session,
    user: session,
    loading,
    error,
    isAuthenticated,
    login,
    signUp,
    logout,
    clearError,
  };
}
