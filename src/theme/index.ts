/**
 * Design tokens sampled from design.png
 * Dark navy "glassmorphism" finance UI.
 */

export const colors = {
  // backgrounds
  bg: '#1A1838',
  bgDeep: '#151330',
  bgSoft: '#232048',
  bgBottom: '#2C2A63',

  // surfaces
  surface: 'rgba(255,255,255,0.045)',
  surfaceStrong: 'rgba(255,255,255,0.08)',
  surfaceBorder: 'rgba(255,255,255,0.08)',
  glassBorder: 'rgba(140,200,255,0.18)',

  // text
  text: '#FFFFFF',
  textMuted: '#9B99C4',
  textDim: '#6F6D96',

  // accents
  cyan: '#2FC4F0',
  cyanSoft: '#69DCF7',
  blue: '#3B62F6',
  indigo: '#4B3BF6',
  purple: '#8A3BF6',
  purpleDeep: '#6C21D9',
  green: '#3ED598',
  greenSoft: '#7BE8A8',
  red: '#F6584B',
  amber: '#F5A623',
} as const;

export const gradients = {
  screen: ['#1B1839', '#1D1A40', '#2B2860'] as const,
  screenBottom: ['rgba(60,120,220,0)', 'rgba(70,120,230,0.22)'] as const,
  card: ['#9A3BF7', '#7A2BEE', '#6A1FD6'] as const,
  cardBlue: ['#2E6BF5', '#2A4FD8'] as const,
  cardTeal: ['#39C9A8', '#2FA9C6'] as const,
  cta: ['#37C2F0', '#3B62F6'] as const,
  pill: ['#3EC8F2', '#3D6BF5'] as const,
  chart: ['rgba(63,200,242,0.55)', 'rgba(63,200,242,0.02)'] as const,
  glass: ['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.02)'] as const,
  tileSend: ['#A64BFA', '#6E2BE8'] as const,
  tileWallet: ['#4A7BFB', '#2B4FE0'] as const,
  tileReceive: ['#4CE08B', '#22A867'] as const,
  tileStats: ['#4FD4F5', '#2C9BD6'] as const,
};

export const radius = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  pill: 999,
};

export const spacing = (n: number) => n * 4;

export const font = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
};

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  glow: {
    shadowColor: colors.cyan,
    shadowOpacity: 0.5,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
};
