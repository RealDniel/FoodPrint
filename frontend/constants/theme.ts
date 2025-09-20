/**
 * FoodPrint App Theme Configuration
 * Colors and fonts for the eco-friendly food tracking app
 */

import { Platform } from 'react-native';

// FoodPrint Brand Colors
export const BrandColors = {
  // Deep Forest Green - Header and primary navigation
  deepForest: {
    primary: '#1B4332',
    secondary: '#2D6A4F',
  },
  // Fresh/Mint Green - Secondary buttons and stat cards
  freshMint: {
    primary: '#52B788',
    secondary: '#74C69D',
  },
  // Bright Orange - Call-to-action scan button
  brightOrange: '#F77F00',
  // Soft Green Gradient Background
  softGreen: {
    light: '#E8F5E8',
    medium: '#D4F1D4',
    dark: '#C1EDC1',
  },
};

export const Colors = {
  light: {
    // Brand colors
    primary: BrandColors.deepForest.primary,
    primaryLight: BrandColors.deepForest.secondary,
    secondary: BrandColors.freshMint.primary,
    secondaryLight: BrandColors.freshMint.secondary,
    accent: BrandColors.brightOrange,
    
    // Background colors
    background: '#FFFFFF',
    backgroundSecondary: BrandColors.softGreen.light,
    backgroundTertiary: BrandColors.softGreen.medium,
    
    // Text colors
    text: '#1B4332',
    textSecondary: '#2D6A4F',
    textMuted: '#6B7280',
    
    // UI elements
    tint: BrandColors.deepForest.primary,
    icon: BrandColors.deepForest.secondary,
    tabIconDefault: '#9CA3AF',
    tabIconSelected: BrandColors.deepForest.primary,
    
    // Borders and dividers
    border: BrandColors.freshMint.secondary,
    divider: '#E5E7EB',
    
    // Status colors
    success: BrandColors.freshMint.primary,
    warning: BrandColors.brightOrange,
    error: '#EF4444',
    info: BrandColors.deepForest.secondary,
  },
  dark: {
    // Brand colors (adjusted for dark mode)
    primary: BrandColors.freshMint.primary,
    primaryLight: BrandColors.freshMint.secondary,
    secondary: BrandColors.deepForest.secondary,
    secondaryLight: BrandColors.deepForest.primary,
    accent: BrandColors.brightOrange,
    
    // Background colors
    background: '#0F172A',
    backgroundSecondary: '#1E293B',
    backgroundTertiary: '#334155',
    
    // Text colors
    text: '#F8FAFC',
    textSecondary: '#E2E8F0',
    textMuted: '#94A3B8',
    
    // UI elements
    tint: BrandColors.freshMint.primary,
    icon: BrandColors.freshMint.secondary,
    tabIconDefault: '#64748B',
    tabIconSelected: BrandColors.freshMint.primary,
    
    // Borders and dividers
    border: BrandColors.deepForest.secondary,
    divider: '#374151',
    
    // Status colors
    success: BrandColors.freshMint.primary,
    warning: BrandColors.brightOrange,
    error: '#F87171',
    info: BrandColors.freshMint.secondary,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** Mona Sans - Primary font for FoodPrint */
    sans: 'Mona-Sans',
    /** Fallback system fonts */
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  android: {
    /** Mona Sans - Primary font for FoodPrint */
    sans: 'Mona-Sans',
    /** Fallback system fonts */
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    /** Mona Sans with fallbacks for web */
    sans: "'Mona Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  default: {
    /** Mona Sans - Primary font for FoodPrint */
    sans: 'Mona-Sans',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
});

// Font weights for Mona Sans
export const FontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
} as const;

// Font sizes for consistent typography
export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
} as const;
