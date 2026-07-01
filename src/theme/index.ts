export const colors = {
  primary: '#7B0D1E',
  primaryDark: '#1D4ED8',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#3D1308',
  title: '#211103',
  textSecondary: '#3D1308',
  border: '#E2E8F0',
  success: '#16A34A',
  warning: '#F59E0B',
  error: '#DC2626',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  title: {
    fontSize: 26,
    fontWeight: '700' as const,
    color: colors.title,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 18,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
};

export const layout = {
  maxContentWidth: 560,
};
