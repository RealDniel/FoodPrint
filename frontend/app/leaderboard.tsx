import { CrownIcon } from '@/components/crown-icon';
import { FoodPrintButton } from '@/components/foodprint-button';
import { FoodPrintText } from '@/components/foodprint-text';
import { MedalIcon } from '@/components/medal-icon';
import { StarIcon } from '@/components/star-icon';
import { TrophyIcon } from '@/components/trophy-icon';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useScanHistory } from '@/contexts/ScanHistoryContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LeaderboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { leaderboardData, leaderboardLoading, fetchLeaderboard } = useScanHistory();
  const { user } = useAuth();

  // Animation values for floating elements
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const floatAnim3 = useRef(new Animated.Value(0)).current;
  const floatAnim4 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create floating animations for different elements
    const createFloatAnimation = (animValue: Animated.Value, duration: number, delay: number = 0) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 1,
            duration: duration,
            delay: delay,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      );
    };

    // Start all floating animations
    Animated.parallel([
      createFloatAnimation(floatAnim1, 3600, 0),
      createFloatAnimation(floatAnim2, 4200, 600),
      createFloatAnimation(floatAnim3, 3300, 1200),
      createFloatAnimation(floatAnim4, 3900, 1800),
    ]).start();
  }, []);
  
  // Animation values - start with full opacity for instant clarity
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    console.log('Leaderboard mounted - Data length:', leaderboardData.length, 'Loading:', leaderboardLoading);
    
    // Only fetch if we don't have data or if it's loading
    if (leaderboardData.length === 0 && !leaderboardLoading) {
      console.log('Fetching leaderboard data...');
      fetchLeaderboard();
    }
  }, []);

  // Animate when data is loaded
  useEffect(() => {
    if (leaderboardData.length > 0) {
      // Start with faded state for animation
      fadeAnim.setValue(0.3);
      slideAnim.setValue(30);
      scaleAnim.setValue(0.95);
      
      // Animate to full clarity
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [leaderboardData]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <CrownIcon size={28} color="#FFD700" />;
      case 2:
        return <MedalIcon size={28} color="#C0C0C0" />;
      case 3:
        return <TrophyIcon size={28} color="#CD7F32" />;
      default:
        return <StarIcon size={24} color="#52B788" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return colors.primary;
    }
  };

  const getRankBackground = (rank: number) => {
    switch (rank) {
      case 1:
        return 'rgba(255, 215, 0, 0.1)';
      case 2:
        return 'rgba(192, 192, 192, 0.1)';
      case 3:
        return 'rgba(205, 127, 50, 0.1)';
      default:
        return colors.backgroundSecondary;
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  // Animated leaderboard item component
  const AnimatedLeaderboardItem = ({ entry, index }: { entry: any; index: number }) => {
    const itemFadeAnim = useRef(new Animated.Value(0)).current;
    const itemSlideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
      const delay = index * 150; // Stagger animation
      Animated.parallel([
        Animated.timing(itemFadeAnim, {
          toValue: 1,
          duration: 600,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(itemSlideAnim, {
          toValue: 0,
          duration: 500,
          delay,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.leaderboardItem,
          { 
            backgroundColor: getRankBackground(entry.rank),
            borderColor: getRankColor(entry.rank),
            borderWidth: entry.rank <= 3 ? 2 : 1,
            opacity: itemFadeAnim,
            transform: [{ translateY: itemSlideAnim }],
          }
        ]}
      >
        <View style={styles.rankContainer}>
          {getRankIcon(entry.rank)}
          <FoodPrintText 
            variant="caption" 
            color="primary" 
            weight="bold" 
            style={[styles.rankNumber, { color: getRankColor(entry.rank) }]}
          >
            #{entry.rank}
          </FoodPrintText>
        </View>

        <View style={styles.userInfo}>
          <FoodPrintText variant="subtitle" color="primary" weight="medium" style={styles.userName}>
            {entry.user_name}
          </FoodPrintText>
          <FoodPrintText variant="caption" color="muted" style={styles.userStats}>
            {entry.total_scans} scans • {entry.average_eco_score.toFixed(1)} avg score
          </FoodPrintText>
        </View>

        <View style={styles.scoreContainer}>
          <FoodPrintText 
            variant="title" 
            color="primary" 
            weight="bold" 
            style={[styles.score, { color: getRankColor(entry.rank) }]}
          >
            {entry.average_eco_score.toFixed(1)}
          </FoodPrintText>
          <FoodPrintText variant="caption" color="muted" style={styles.scoreLabel}>
            Eco Score
          </FoodPrintText>
        </View>
      </Animated.View>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Floating background elements */}
      <View style={styles.floatingContainer}>
        {/* Floating leaf 1 */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingLeaf1,
            {
              opacity: floatAnim1.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.5],
              }),
              transform: [
                {
                  translateY: floatAnim1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -12],
                  }),
                },
                {
                  rotate: floatAnim1.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '7deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🍃</FoodPrintText>
        </Animated.View>

        {/* Floating apple */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingApple,
            {
              opacity: floatAnim2.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
              transform: [
                {
                  translateY: floatAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -18],
                  }),
                },
                {
                  scale: floatAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1.1],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🍎</FoodPrintText>
        </Animated.View>

        {/* Floating carrot */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingCarrot,
            {
              opacity: floatAnim3.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.5],
              }),
              transform: [
                {
                  translateY: floatAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -16],
                  }),
                },
                {
                  rotate: floatAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-5deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🥕</FoodPrintText>
        </Animated.View>

        {/* Floating broccoli */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingBroccoli,
            {
              opacity: floatAnim4.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
              transform: [
                {
                  translateY: floatAnim4.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -14],
                  }),
                },
                {
                  scale: floatAnim4.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🥦</FoodPrintText>
        </Animated.View>
      </View>

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        {/* Subtle gradient overlay */}
        <View style={styles.headerGradient} />
        
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <FoodPrintText variant="body" color="primary" weight="medium">
              ← Back
            </FoodPrintText>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={fetchLeaderboard} style={styles.refreshButton}>
            <FoodPrintText variant="body" color="primary" weight="medium">
              🔄 Refresh
            </FoodPrintText>
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerMain}>
          <FoodPrintText variant="title" color="primary" style={styles.headerTitle}>
            🏆 Eco Champions
          </FoodPrintText>
          <FoodPrintText variant="body" color="primary" style={styles.headerSubtitle}>
            Top sustainable food scanners
          </FoodPrintText>
        </View>
      </View>

      {/* Leaderboard Content */}
      <View style={styles.content}>
        {leaderboardLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <FoodPrintText variant="body" color="muted" style={styles.loadingText}>
              Loading leaderboard...
            </FoodPrintText>
          </View>
        ) : leaderboardData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <FoodPrintText variant="title" color="muted" style={styles.emptyTitle}>
              🌱 No Champions Yet
            </FoodPrintText>
            <FoodPrintText variant="body" color="muted" style={styles.emptyText}>
              Start scanning food items to compete for the top 10 eco-friendly spots!
            </FoodPrintText>
            <FoodPrintButton 
              variant="accent" 
              size="lg" 
              onPress={handleGoBack}
              style={styles.emptyButton}
            >
              Start Scanning
            </FoodPrintButton>
          </View>
        ) : (
          <Animated.View 
            style={[
              styles.leaderboardContainer,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim }
                ]
              }
            ]}
          >
            <FoodPrintText variant="subtitle" color="primary" style={styles.sectionTitle}>
              Top 10 Eco Champions 🌿
            </FoodPrintText>
            <FoodPrintText variant="caption" color="muted" style={styles.subtitleInfo}>
              Ranked by average sustainability score from all scanned items
            </FoodPrintText>
            
            {leaderboardData.map((entry, index) => (
              <AnimatedLeaderboardItem 
                key={entry.user_id} 
                entry={entry} 
                index={index}
              />
            ))}

            {/* Fun decorations */}
            <Animated.View 
              style={[
                styles.decorations,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <FoodPrintText variant="caption" color="muted" style={styles.decorationText}>
                🌟 Keep scanning to climb the ranks! 🌟
              </FoodPrintText>
            </Animated.View>
          </Animated.View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  floatingElement: {
    position: 'absolute',
  },
  floatingEmoji: {
    fontSize: 18,
  },
  floatingLeaf1: {
    top: height * 0.25,
    left: width * 0.1,
  },
  floatingApple: {
    top: height * 0.45,
    right: width * 0.08,
  },
  floatingCarrot: {
    top: height * 0.65,
    left: width * 0.15,
  },
  floatingBroccoli: {
    top: height * 0.85,
    right: width * 0.12,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  refreshButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  headerMain: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#FFFFFF',
    opacity: 0.9,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  emptyButton: {
    marginTop: 8,
  },
  leaderboardContainer: {
    flex: 1,
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 20,
  },
  subtitleInfo: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 12,
    fontStyle: 'italic',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rankContainer: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 50,
  },
  rankNumber: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '800',
  },
  userInfo: {
    flex: 1,
    marginRight: 16,
  },
  userName: {
    marginBottom: 4,
    fontSize: 16,
  },
  userStats: {
    fontSize: 12,
  },
  scoreContainer: {
    alignItems: 'center',
    minWidth: 60,
  },
  score: {
    fontSize: 20,
    marginBottom: 2,
  },
  scoreLabel: {
    fontSize: 10,
  },
  decorations: {
    marginTop: 32,
    alignItems: 'center',
  },
  decorationText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
});