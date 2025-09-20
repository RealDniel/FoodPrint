import { Colors, Fonts, FontSizes, FontWeights } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

interface FoodPrintTextProps extends TextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption' | 'button';
  weight?: 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold';
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'warning' | 'error';
  size?: keyof typeof FontSizes;
}

export function FoodPrintText({
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  size,
  style,
  children,
  ...props
}: FoodPrintTextProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getVariantStyles = () => {
    switch (variant) {
      case 'title':
        return {
          fontSize: size ? FontSizes[size] : FontSizes['3xl'],
          fontWeight: FontWeights.bold,
          lineHeight: size ? FontSizes[size] * 1.2 : FontSizes['3xl'] * 1.2,
        };
      case 'subtitle':
        return {
          fontSize: size ? FontSizes[size] : FontSizes['xl'],
          fontWeight: FontWeights.semiBold,
          lineHeight: size ? FontSizes[size] * 1.3 : FontSizes['xl'] * 1.3,
        };
      case 'body':
        return {
          fontSize: size ? FontSizes[size] : FontSizes.base,
          fontWeight: FontWeights.regular,
          lineHeight: size ? FontSizes[size] * 1.5 : FontSizes.base * 1.5,
        };
      case 'caption':
        return {
          fontSize: size ? FontSizes[size] : FontSizes.sm,
          fontWeight: FontWeights.regular,
          lineHeight: size ? FontSizes[size] * 1.4 : FontSizes.sm * 1.4,
        };
      case 'button':
        return {
          fontSize: size ? FontSizes[size] : FontSizes.base,
          fontWeight: FontWeights.medium,
          lineHeight: size ? FontSizes[size] * 1.2 : FontSizes.base * 1.2,
        };
      default:
        return {
          fontSize: size ? FontSizes[size] : FontSizes.base,
          fontWeight: FontWeights.regular,
        };
    }
  };

  const getColorValue = () => {
    switch (color) {
      case 'primary':
        return colors.text;
      case 'secondary':
        return colors.textSecondary;
      case 'muted':
        return colors.textMuted;
      case 'accent':
        return colors.accent;
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'error':
        return colors.error;
      default:
        return colors.text;
    }
  };

  const textStyles = [
    styles.base,
    {
      fontFamily: Fonts.sans,
      color: getColorValue(),
      fontWeight: FontWeights[weight],
    },
    getVariantStyles(),
    style,
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'Mona-Sans',
  },
});
