import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { FoodPrintText } from './foodprint-text';

interface FoodPrintButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function FoodPrintButton({
  variant = 'primary',
  size = 'md',
  style,
  children,
  ...props
}: FoodPrintButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primary,
          borderWidth: 0,
        };
      case 'secondary':
        return {
          backgroundColor: colors.secondary,
          borderWidth: 0,
        };
      case 'accent':
        return {
          backgroundColor: colors.accent,
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: colors.primary,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
      default:
        return {
          backgroundColor: colors.primary,
          borderWidth: 0,
        };
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return {
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 8,
        };
      case 'md':
        return {
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 12,
        };
      case 'lg':
        return {
          paddingHorizontal: 32,
          paddingVertical: 16,
          borderRadius: 16,
        };
      default:
        return {
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 12,
        };
    }
  };

  const getTextColor = (): 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'warning' | 'error' => {
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'accent':
        return 'primary';
      case 'outline':
      case 'ghost':
        return 'primary';
      default:
        return 'primary';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'sm';
      case 'md':
        return 'base';
      case 'lg':
        return 'lg';
      default:
        return 'base';
    }
  };

  const buttonStyles = [
    styles.base,
    getVariantStyles(),
    getSizeStyles(),
    style,
  ];

  return (
    <TouchableOpacity style={buttonStyles} {...props}>
      <FoodPrintText
        variant="button"
        color={getTextColor()}
        size={getTextSize()}
        weight="medium"
        style={[
          variant === 'primary' || variant === 'secondary' || variant === 'accent'
            ? { color: '#FFFFFF' }
            : {},
        ]}
      >
        {children}
      </FoodPrintText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: Fonts.sans,
  },
});
