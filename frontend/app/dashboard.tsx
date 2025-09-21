import { FoodPrintButton } from '@/components/foodprint-button';
import { FoodPrintText } from '@/components/foodprint-text';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useScanHistory } from '@/contexts/ScanHistoryContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { signOut, user, profile, loading: authLoading } = useAuth();
  const { dashboardData, dashboardLoading } = useScanHistory();

  const handleScanFood = () => {
    // Navigate to scanning screen
    router.push('/scanning');
  };

  const handleUploadImage = () => {
    // Navigate to scanning screen
    router.push('/upload-image');
  };

  const handleViewLeaderboard = () => {
    router.push('/leaderboard')
  }

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              // Add timeout to the entire logout process
              const logoutPromise = signOut();
              const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Logout timeout')), 8000)
              );
              
              await Promise.race([logoutPromise, timeoutPromise]);
              
              // Simple navigation to landing page
              router.replace('/landing');
              
            } catch (error) {
              // Even if logout fails, try to navigate away
              router.replace('/landing');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        {/* Subtle gradient overlay */}
        <View style={styles.headerGradient} />
        
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.greetingContainer}>
              <FoodPrintText variant="body" color="primary" style={styles.greeting}>
                Welcome back!
              </FoodPrintText>
              <FoodPrintText variant="title" color="primary" style={styles.headerTitle}>
                {authLoading ? (
                  'FoodPrint'
                ) : (
                  profile?.full_name || user?.email?.split('@')[0] || 'FoodPrint'
                )}
              </FoodPrintText>
            </View>
          </View>
          <TouchableOpacity 
            onPress={handleLogout}
            style={[styles.logoutButton, { backgroundColor: 'rgba(255,255,255,0.15)' }]}
          >
            <FoodPrintText variant="caption" color="primary" weight="medium">
              Logout
            </FoodPrintText>
          </TouchableOpacity>
        </View>
        <View style={styles.headerBottom}>
          <FoodPrintText variant="body" color="primary" style={styles.headerSubtitle}>
            Track your sustainable food journey 🌱
          </FoodPrintText>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.backgroundSecondary }]}>
          {dashboardLoading ? (
            <ActivityIndicator size="small" color={colors.accent} />
          ) : (
            <FoodPrintText variant="title" color="accent" size="2xl">
              {dashboardData?.totalScans || 0}
            </FoodPrintText>
          )}
          <FoodPrintText variant="caption" color="muted">
            Foods Scanned
          </FoodPrintText>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: colors.backgroundSecondary }]}>
          {dashboardLoading ? (
            <ActivityIndicator size="small" color={colors.success} />
          ) : (
            <FoodPrintText variant="title" color="success" size="2xl">
              {dashboardData?.averageEcoScore || 100}%
            </FoodPrintText>
          )}
          <FoodPrintText variant="caption" color="muted">
            Eco Score
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
          variant="accent" 
          size="lg" 
          onPress={handleUploadImage}
          style={styles.actionButton}
        >
          📁 Upload Food Image
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
          {dashboardLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.primary} />
              <FoodPrintText variant="body" color="muted" style={styles.loadingText}>
                Loading recent activity...
              </FoodPrintText>
            </View>
          ) : dashboardData?.recentScans && dashboardData.recentScans.length > 0 ? (
            dashboardData.recentScans.map((scan, index) => (
              <View key={scan.id} style={styles.activityItem}>
                <FoodPrintText variant="body" color="primary" weight="medium">
                  📸 Scanned {scan.food_name}
                </FoodPrintText>
                <FoodPrintText variant="caption" color="muted">
                  {new Date(scan.created_at).toLocaleDateString()}
                </FoodPrintText>
              </View>
            ))
          ) : (
            <View style={styles.emptyStateContainer}>
              <FoodPrintText variant="body" color="muted" style={styles.emptyStateText}>
                🌱 Ready to start your eco-friendly journey? Scan your first food item!
              </FoodPrintText>
            </View>
          )}
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
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    position: 'relative',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 4,
    fontSize: 14,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 32,
  },
  headerBottom: {
    marginTop: 8,
  },
  headerSubtitle: {
    color: '#FFFFFF',
    opacity: 0.85,
    fontSize: 16,
    lineHeight: 20,
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
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
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 8,
  },
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyStateText: {
    textAlign: 'center',
    lineHeight: 22,
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
