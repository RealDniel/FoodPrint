import { FoodPrintButton } from '@/components/foodprint-button';
import { FoodPrintText } from '@/components/foodprint-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleScanFood = () => {
    // Navigate to scanning screen
    router.push('/scanning');
  };

  const handleViewStats = () => {
    // Navigate to tabs for now, later will be stats screen
    router.push('/(tabs)');
  };

  const handleExploreRecipes = () => {
    // Navigate to tabs for now, later will be recipes screen
    router.push('/(tabs)');
  };

  const handleViewLeaderboard = () => {
    router.push('/leaderboard')
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <FoodPrintText variant="title" color="primary" style={styles.headerTitle}>
          FoodPrint Dashboard
        </FoodPrintText>
        <FoodPrintText variant="body" color="primary" style={styles.headerSubtitle}>
          Track your sustainable food journey
        </FoodPrintText>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.backgroundSecondary }]}>
          <FoodPrintText variant="title" color="accent" size="2xl">
            12
          </FoodPrintText>
          <FoodPrintText variant="caption" color="muted">
            Foods Scanned
          </FoodPrintText>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: colors.backgroundSecondary }]}>
          <FoodPrintText variant="title" color="success" size="2xl">
            85%
          </FoodPrintText>
          <FoodPrintText variant="caption" color="muted">
            Eco Score
          </FoodPrintText>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: colors.backgroundSecondary }]}>
          <FoodPrintText variant="title" color="secondary" size="2xl">
            2.3kg
          </FoodPrintText>
          <FoodPrintText variant="caption" color="muted">
            CO₂ Saved
          </FoodPrintText>
        </View>
      </View>

      {/* Main Actions */}
      <View style={styles.actionsContainer}>
        <FoodPrintText variant="subtitle" color="primary" style={styles.sectionTitle}>
          Quick Actions
        </FoodPrintText>
        
        <FoodPrintButton 
          variant="accent" 
          size="lg" 
          onPress={handleScanFood}
          style={styles.actionButton}
        >
          📸 Scan Food Item
        </FoodPrintButton>
        
        <FoodPrintButton 
          variant="primary" 
          size="md" 
          onPress={handleViewStats}
          style={styles.actionButton}
        >
          📊 View Detailed Stats
        </FoodPrintButton>
        
        <FoodPrintButton 
          variant="secondary" 
          size="md" 
          onPress={handleExploreRecipes}
          style={styles.actionButton}
        >
          🍽️ Explore Eco Recipes
        </FoodPrintButton>

        <FoodPrintButton 
          variant="accent" 
          size="lg" 
          onPress={handleViewLeaderboard}
          style={styles.actionButton}
        >
          Leaderboard
        </FoodPrintButton>
      </View>

      {/* Recent Activity */}
      <View style={styles.activityContainer}>
        <FoodPrintText variant="subtitle" color="primary" style={styles.sectionTitle}>
          Recent Activity
        </FoodPrintText>
        
        <View style={[styles.activityCard, { backgroundColor: colors.backgroundSecondary }]}>
          <View style={styles.activityItem}>
            <FoodPrintText variant="body" color="primary" weight="medium">
              🥗 Scanned Organic Salad
            </FoodPrintText>
            <FoodPrintText variant="caption" color="muted">
              2 hours ago
            </FoodPrintText>
          </View>
          
          <View style={styles.activityItem}>
            <FoodPrintText variant="body" color="primary" weight="medium">
              🍎 Added Local Apples
            </FoodPrintText>
            <FoodPrintText variant="caption" color="muted">
              1 day ago
            </FoodPrintText>
          </View>
          
          <View style={styles.activityItem}>
            <FoodPrintText variant="body" color="primary" weight="medium">
              🌱 Discovered New Recipe
            </FoodPrintText>
            <FoodPrintText variant="caption" color="muted">
              3 days ago
            </FoodPrintText>
          </View>
        </View>
      </View>

      {/* Tips Section */}
      <View style={styles.tipsContainer}>
        <FoodPrintText variant="subtitle" color="primary" style={styles.sectionTitle}>
          Sustainability Tip
        </FoodPrintText>
        
        <View style={[styles.tipCard, { backgroundColor: colors.backgroundTertiary }]}>
          <FoodPrintText variant="body" color="primary" style={styles.tipText}>
            💡 Choose locally grown vegetables to reduce your carbon footprint by up to 30% compared to imported produce.
          </FoodPrintText>
        </View>
      </View>

      {/* Back to Landing Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={[styles.backButton, { borderColor: colors.border }]}
        >
          <FoodPrintText variant="body" color="muted">
            ← Back to Landing
          </FoodPrintText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  actionButton: {
    marginBottom: 12,
  },
  activityContainer: {
    padding: 20,
  },
  activityCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tipsContainer: {
    padding: 20,
  },
  tipCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipText: {
    lineHeight: 22,
  },
  backButtonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
});
