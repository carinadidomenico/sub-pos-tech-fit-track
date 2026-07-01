import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomButton, RecordCard, ScreenContent } from '../components';
import { useDailyRecords } from '../hooks/useDailyRecords';
import { DailyRecord } from '../models/DailyRecord';
import { AppStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';

type Props = NativeStackScreenProps<AppStackParamList, 'History'>;

export function HistoryScreen({ navigation }: Props) {
  const { records, loading, error } = useDailyRecords();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {loading ? (
        <View style={styles.centered}>
          <ScreenContent centered>
            <ActivityIndicator
              size="large"
              color={colors.primary}
              accessibilityLabel="Carregando histórico"
            />
          </ScreenContent>
        </View>
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.list,
            records.length === 0 && styles.listEmpty,
          ]}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          accessibilityLabel="Lista de registros de hábitos"
          ListHeaderComponent={
            <ScreenContent>
              <View style={styles.header}>
                <Text style={styles.title} accessibilityRole="header">
                  Histórico
                </Text>
                <Text style={styles.subtitle}>
                  {records.length === 0
                    ? 'Seus registros aparecerão aqui'
                    : `${records.length} registro${records.length === 1 ? '' : 's'}`}
                </Text>
                {error ? (
                  <Text style={styles.error} accessibilityLiveRegion="polite">
                    {error}
                  </Text>
                ) : null}
              </View>
            </ScreenContent>
          }
          ListEmptyComponent={
            <ScreenContent>
              <View style={styles.emptyState} accessibilityRole="summary">
                <Text style={styles.emptyTitle}>Nenhum registro ainda</Text>
                <Text style={styles.emptyText}>
                  Registre água, sono, humor e exercícios na tela de registro diário.
                </Text>
                <CustomButton
                  style={styles.registerButton}
                  label="Registrar hoje"
                  onPress={() => navigation.navigate('Register')}
                  accessibilityLabel="Ir para registro diário"
                />
              </View>
            </ScreenContent>
          }
          renderItem={({ item }: { item: DailyRecord }) => (
            <ScreenContent>
              <RecordCard record={item} />
            </ScreenContent>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  list: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  separator: {
    height: spacing.md,
  },
  listEmpty: {
    flexGrow: 1,
  },
  header: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
    paddingTop: spacing.sm,
  },
  title: {
    ...typography.title,
    marginTop: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  error: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.sm,
  },
  emptyState: {
    alignItems: 'stretch',
    gap: spacing.md,
    paddingVertical: spacing.xl,
  },
  emptyTitle: {
    ...typography.subtitle,
    color: colors.title,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  registerButton: {
    marginTop: spacing.lg,
  },
});
