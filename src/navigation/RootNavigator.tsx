import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { FitTrackProvider } from '../context/FitTrackContext';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../theme';
import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';

export function RootNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
          accessibilityLabel="Carregando sessão"
        />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  return (
    <FitTrackProvider>
      <AppNavigator />
    </FitTrackProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
