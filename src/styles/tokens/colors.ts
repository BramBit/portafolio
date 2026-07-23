export const colors = {
  bg: '#0B0D12',
  surface: '#11141A',
  surfaceElevated: '#1A1F2B',
  primary: '#6366F1',
  secondary: '#8B5CF6',
  accent: '#22D3EE',
  textPrimary: '#F7F8FA',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
} as const;

export type ColorToken = keyof typeof colors;
