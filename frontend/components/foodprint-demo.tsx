import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FoodPrintButton } from './foodprint-button';
import { FoodPrintText } from './foodprint-text';

export function FoodPrintDemo() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <FoodPrintText variant="title" color="primary">
          FoodPrint
        </FoodPrintText>
        <FoodPrintText variant="subtitle" color="secondary">
          Track your food's environmental impact
        </FoodPrintText>
      </View>

      <View style={styles.buttonContainer}>
        <FoodPrintButton variant="accent" size="lg" onPress={() => alert('Scan Food!')}>
          📸 Scan Food
        </FoodPrintButton>
        
        <FoodPrintButton variant="primary" size="md" onPress={() => alert('View Stats!')}>
          📊 View Stats
        </FoodPrintButton>
        
        <FoodPrintButton variant="secondary" size="md" onPress={() => alert('Explore!')}>
          🌱 Explore
        </FoodPrintButton>
        
        <FoodPrintButton variant="outline" size="sm" onPress={() => alert('Settings!')}>
          ⚙️ Settings
        </FoodPrintButton>
      </View>

      <View style={styles.textContainer}>
        <FoodPrintText variant="body" color="primary">
          Your eco-friendly food tracking companion
        </FoodPrintText>
        <FoodPrintText variant="caption" color="muted">
          Make sustainable food choices with every meal
        </FoodPrintText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    gap: 16,
    width: '100%',
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    gap: 8,
  },
});
