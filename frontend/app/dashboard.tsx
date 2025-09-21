import { CameraIcon } from '@/components/camera-icon';
import { FoodPrintButton } from '@/components/foodprint-button';
import { FoodPrintText } from '@/components/foodprint-text';
import { LeaderboardIcon } from '@/components/leaderboard-icon';
import { ScanIcon } from '@/components/scan-icon';
import { UploadIcon } from '@/components/upload-icon';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useScanHistory } from '@/contexts/ScanHistoryContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Alert, Animated, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { signOut, user, profile, loading: authLoading } = useAuth();
  const { dashboardData, dashboardLoading } = useScanHistory();

  // Animation values for floating elements
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const floatAnim3 = useRef(new Animated.Value(0)).current;
  const floatAnim4 = useRef(new Animated.Value(0)).current;
  const floatAnim5 = useRef(new Animated.Value(0)).current;
  const floatAnim6 = useRef(new Animated.Value(0)).current;
  const floatAnim7 = useRef(new Animated.Value(0)).current;
  const floatAnim8 = useRef(new Animated.Value(0)).current;
  const floatAnim9 = useRef(new Animated.Value(0)).current;
  const floatAnim10 = useRef(new Animated.Value(0)).current;
  const floatAnim11 = useRef(new Animated.Value(0)).current;
  const floatAnim12 = useRef(new Animated.Value(0)).current;
  const floatAnim13 = useRef(new Animated.Value(0)).current;
  const floatAnim14 = useRef(new Animated.Value(0)).current;
  const floatAnim15 = useRef(new Animated.Value(0)).current;
  const floatAnim16 = useRef(new Animated.Value(0)).current;
  const floatAnim17 = useRef(new Animated.Value(0)).current;
  const floatAnim18 = useRef(new Animated.Value(0)).current;
  const floatAnim19 = useRef(new Animated.Value(0)).current;
  const floatAnim20 = useRef(new Animated.Value(0)).current;
  const floatAnim21 = useRef(new Animated.Value(0)).current;
  const floatAnim22 = useRef(new Animated.Value(0)).current;
  const floatAnim23 = useRef(new Animated.Value(0)).current;
  const floatAnim24 = useRef(new Animated.Value(0)).current;

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
      createFloatAnimation(floatAnim1, 3500, 0),
      createFloatAnimation(floatAnim2, 4000, 800),
      createFloatAnimation(floatAnim3, 3200, 1600),
      createFloatAnimation(floatAnim4, 3800, 2400),
      createFloatAnimation(floatAnim5, 3600, 3000),
      createFloatAnimation(floatAnim6, 4200, 3800),
      createFloatAnimation(floatAnim7, 3300, 4600),
      createFloatAnimation(floatAnim8, 3900, 5400),
      createFloatAnimation(floatAnim9, 3700, 6200),
      createFloatAnimation(floatAnim10, 4100, 7000),
      createFloatAnimation(floatAnim11, 3400, 7800),
      createFloatAnimation(floatAnim12, 3900, 8600),
      createFloatAnimation(floatAnim13, 3600, 9400),
      createFloatAnimation(floatAnim14, 4200, 10200),
      createFloatAnimation(floatAnim15, 3300, 11000),
      createFloatAnimation(floatAnim16, 3800, 11800),
      createFloatAnimation(floatAnim17, 3650, 12600),
      createFloatAnimation(floatAnim18, 4150, 13400),
      createFloatAnimation(floatAnim19, 3350, 14200),
      createFloatAnimation(floatAnim20, 3850, 15000),
      createFloatAnimation(floatAnim21, 3550, 15800),
      createFloatAnimation(floatAnim22, 4050, 16600),
      createFloatAnimation(floatAnim23, 3250, 17400),
      createFloatAnimation(floatAnim24, 3750, 18200),
    ]).start();
  }, []);

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
                    outputRange: [0, -15],
                  }),
                },
                {
                  rotate: floatAnim1.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '8deg'],
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
                    outputRange: [0, -20],
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
                    outputRange: [0, -18],
                  }),
                },
                {
                  rotate: floatAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-6deg'],
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
                    outputRange: [0, -16],
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

        {/* Floating tomato */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingTomato,
            {
              opacity: floatAnim5.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.5],
              }),
              transform: [
                {
                  translateY: floatAnim5.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -14],
                  }),
                },
                {
                  rotate: floatAnim5.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '9deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🍅</FoodPrintText>
        </Animated.View>

        {/* Floating corn */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingCorn,
            {
              opacity: floatAnim6.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
              transform: [
                {
                  translateY: floatAnim6.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -19],
                  }),
                },
                {
                  scale: floatAnim6.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1.1],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🌽</FoodPrintText>
        </Animated.View>

        {/* Floating pepper */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingPepper,
            {
              opacity: floatAnim7.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.5],
              }),
              transform: [
                {
                  translateY: floatAnim7.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -17],
                  }),
                },
                {
                  rotate: floatAnim7.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-7deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🫑</FoodPrintText>
        </Animated.View>

        {/* Floating eggplant */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingEggplant,
            {
              opacity: floatAnim8.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
              transform: [
                {
                  translateY: floatAnim8.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -15],
                  }),
                },
                {
                  scale: floatAnim8.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🍆</FoodPrintText>
        </Animated.View>

        {/* Floating cucumber */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingCucumber,
            {
              opacity: floatAnim9.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.5],
              }),
              transform: [
                {
                  translateY: floatAnim9.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -13],
                  }),
                },
                {
                  rotate: floatAnim9.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '6deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🥒</FoodPrintText>
        </Animated.View>

        {/* Floating mushroom */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingMushroom,
            {
              opacity: floatAnim10.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
              transform: [
                {
                  translateY: floatAnim10.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -18],
                  }),
                },
                {
                  scale: floatAnim10.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1.1],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🍄</FoodPrintText>
        </Animated.View>

        {/* Floating lettuce */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingLettuce,
            {
              opacity: floatAnim11.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.5],
              }),
              transform: [
                {
                  translateY: floatAnim11.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -16],
                  }),
                },
                {
                  rotate: floatAnim11.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-8deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🥬</FoodPrintText>
        </Animated.View>

        {/* Floating potato */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingPotato,
            {
              opacity: floatAnim12.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
              transform: [
                {
                  translateY: floatAnim12.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -14],
                  }),
                },
                {
                  scale: floatAnim12.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🥔</FoodPrintText>
        </Animated.View>

        {/* Floating onion */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingOnion,
            {
              opacity: floatAnim13.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.5],
              }),
              transform: [
                {
                  translateY: floatAnim13.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -17],
                  }),
                },
                {
                  rotate: floatAnim13.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '7deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🧅</FoodPrintText>
        </Animated.View>

        {/* Floating garlic */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingGarlic,
            {
              opacity: floatAnim14.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
              transform: [
                {
                  translateY: floatAnim14.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -15],
                  }),
                },
                {
                  scale: floatAnim14.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1.1],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🧄</FoodPrintText>
        </Animated.View>

        {/* Floating radish */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingRadish,
            {
              opacity: floatAnim15.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.5],
              }),
              transform: [
                {
                  translateY: floatAnim15.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -12],
                  }),
                },
                {
                  rotate: floatAnim15.interpolate({
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

        {/* Floating avocado */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingAvocado,
            {
              opacity: floatAnim16.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
              transform: [
                {
                  translateY: floatAnim16.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -19],
                  }),
                },
                {
                  scale: floatAnim16.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🥑</FoodPrintText>
        </Animated.View>

        {/* Floating strawberry */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingStrawberry,
            {
              opacity: floatAnim17.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.5],
              }),
              transform: [
                {
                  translateY: floatAnim17.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -11],
                  }),
                },
                {
                  rotate: floatAnim17.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '5deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🍓</FoodPrintText>
        </Animated.View>

        {/* Floating banana */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingBanana,
            {
              opacity: floatAnim18.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
              transform: [
                {
                  translateY: floatAnim18.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -16],
                  }),
                },
                {
                  scale: floatAnim18.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1.1],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🍌</FoodPrintText>
        </Animated.View>

        {/* Floating grapes */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingGrapes,
            {
              opacity: floatAnim19.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.5],
              }),
              transform: [
                {
                  translateY: floatAnim19.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -14],
                  }),
                },
                {
                  rotate: floatAnim19.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-6deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🍇</FoodPrintText>
        </Animated.View>

        {/* Floating orange */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingOrange,
            {
              opacity: floatAnim20.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
              transform: [
                {
                  translateY: floatAnim20.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -17],
                  }),
                },
                {
                  scale: floatAnim20.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🍊</FoodPrintText>
        </Animated.View>

        {/* Floating lemon */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingLemon,
            {
              opacity: floatAnim21.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.5],
              }),
              transform: [
                {
                  translateY: floatAnim21.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -13],
                  }),
                },
                {
                  rotate: floatAnim21.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '7deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🍋</FoodPrintText>
        </Animated.View>

        {/* Floating watermelon */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingWatermelon,
            {
              opacity: floatAnim22.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
              transform: [
                {
                  translateY: floatAnim22.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -18],
                  }),
                },
                {
                  scale: floatAnim22.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1.1],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🍉</FoodPrintText>
        </Animated.View>

        {/* Floating cherry */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingCherry,
            {
              opacity: floatAnim23.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.5],
              }),
              transform: [
                {
                  translateY: floatAnim23.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -12],
                  }),
                },
                {
                  rotate: floatAnim23.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-4deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🍒</FoodPrintText>
        </Animated.View>

        {/* Floating peach */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingPeach,
            {
              opacity: floatAnim24.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
              transform: [
                {
                  translateY: floatAnim24.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -15],
                  }),
                },
                {
                  scale: floatAnim24.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🍑</FoodPrintText>
        </Animated.View>
      </View>

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
          <View style={styles.buttonContent}>
            <CameraIcon size={20} color="#FFFFFF" />
            <FoodPrintText variant="body" color="primary" weight="medium" style={styles.buttonText}>
              Scan Food Item
            </FoodPrintText>
          </View>
        </FoodPrintButton>

        <FoodPrintButton 
          variant="accent" 
          size="lg" 
          onPress={handleUploadImage}
          style={styles.actionButton}
        >
          <View style={styles.buttonContent}>
            <UploadIcon size={20} color="#FFFFFF" />
            <FoodPrintText variant="body" color="primary" weight="medium" style={styles.buttonText}>
              Upload Food Image
            </FoodPrintText>
          </View>
        </FoodPrintButton>

        <FoodPrintButton 
          variant="accent" 
          size="lg" 
          onPress={handleViewLeaderboard}
          style={styles.actionButton}
        >
          <View style={styles.buttonContent}>
            <LeaderboardIcon size={20} color="#FFFFFF" />
            <FoodPrintText variant="body" color="primary" weight="medium" style={styles.buttonText}>
              Leaderboard
            </FoodPrintText>
          </View>
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
                <View style={styles.activityItemContent}>
                  <ScanIcon size={18} color={colors.primary} />
                  <FoodPrintText variant="caption" color="primary" weight="medium" style={[styles.activityText, { fontSize: 14 }]}>
                    Scanned {scan.food_name}
                  </FoodPrintText>
                  <FoodPrintText variant="caption" color="muted" style={styles.activityDate}>
                    {new Date(scan.created_at).toLocaleDateString()}
                  </FoodPrintText>
                </View>
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
          <View style={styles.tipContent}>
            <FoodPrintText variant="body" color="primary" style={styles.tipText}>
            💡 Choose locally grown vegetables to reduce your carbon footprint by up to 30% compared to imported produce.
            </FoodPrintText>

          </View>
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
    fontSize: 20,
  },
  floatingLeaf1: {
    top: height * 0.3,
    right: width * 0.1,
  },
  floatingApple: {
    top: height * 0.5,
    left: width * 0.05,
  },
  floatingCarrot: {
    top: height * 0.7,
    right: width * 0.15,
  },
  floatingBroccoli: {
    top: height * 0.9,
    left: width * 0.2,
  },
  floatingTomato: {
    top: height * 0.35,
    left: width * 0.8,
  },
  floatingCorn: {
    top: height * 0.55,
    right: width * 0.05,
  },
  floatingPepper: {
    top: height * 0.75,
    left: width * 0.7,
  },
  floatingEggplant: {
    top: height * 0.95,
    right: width * 0.25,
  },
  floatingCucumber: {
    top: height * 0.4,
    left: width * 0.3,
  },
  floatingMushroom: {
    top: height * 0.6,
    right: width * 0.3,
  },
  floatingLettuce: {
    top: height * 0.8,
    left: width * 0.4,
  },
  floatingPotato: {
    top: height * 0.2,
    right: width * 0.4,
  },
  floatingOnion: {
    top: height * 0.45,
    left: width * 0.6,
  },
  floatingGarlic: {
    top: height * 0.65,
    right: width * 0.6,
  },
  floatingRadish: {
    top: height * 0.85,
    left: width * 0.1,
  },
  floatingAvocado: {
    top: height * 0.15,
    right: width * 0.7,
  },
  floatingStrawberry: {
    top: height * 0.25,
    left: width * 0.5,
  },
  floatingBanana: {
    top: height * 0.35,
    right: width * 0.5,
  },
  floatingGrapes: {
    top: height * 0.5,
    left: width * 0.8,
  },
  floatingOrange: {
    top: height * 0.6,
    right: width * 0.8,
  },
  floatingLemon: {
    top: height * 0.75,
    left: width * 0.2,
  },
  floatingWatermelon: {
    top: height * 0.85,
    right: width * 0.2,
  },
  floatingCherry: {
    top: height * 0.1,
    left: width * 0.9,
  },
  floatingPeach: {
    top: height * 0.9,
    right: width * 0.9,
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    marginLeft: 8,
    color: '#FFFFFF',
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
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  activityItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityText: {
    marginLeft: 8,
    flex: 1,
  },
  activityDate: {
    marginLeft: 8,
    fontSize: 11,
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
  tipContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipText: {
    lineHeight: 22,
    marginLeft: 8,
    flex: 1,
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

