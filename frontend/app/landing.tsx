import { FoodPrintButton } from '@/components/foodprint-button';
import { FoodPrintLogo } from '@/components/foodprint-logo';
import { FoodPrintText } from '@/components/foodprint-text';
import { BrandColors, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Animation values for floating elements
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const floatAnim3 = useRef(new Animated.Value(0)).current;
  const floatAnim4 = useRef(new Animated.Value(0)).current;
  const floatAnim5 = useRef(new Animated.Value(0)).current;
  const floatAnim6 = useRef(new Animated.Value(0)).current;

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
      createFloatAnimation(floatAnim1, 3000, 0),
      createFloatAnimation(floatAnim2, 4000, 500),
      createFloatAnimation(floatAnim3, 3500, 1000),
      createFloatAnimation(floatAnim4, 4500, 1500),
      createFloatAnimation(floatAnim5, 3200, 2000),
      createFloatAnimation(floatAnim6, 3800, 2500),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
                outputRange: [0.3, 0.7],
              }),
              transform: [
                {
                  translateY: floatAnim1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -20],
                  }),
                },
                {
                  rotate: floatAnim1.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '10deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🍃</FoodPrintText>
        </Animated.View>

        {/* Floating leaf 2 */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingLeaf2,
            {
              opacity: floatAnim2.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.6],
              }),
              transform: [
                {
                  translateY: floatAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -15],
                  }),
                },
                {
                  rotate: floatAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-8deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🌿</FoodPrintText>
        </Animated.View>

        {/* Floating apple */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingApple,
            {
              opacity: floatAnim3.interpolate({
                inputRange: [0, 1],
                outputRange: [0.4, 0.8],
              }),
              transform: [
                {
                  translateY: floatAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -25],
                  }),
                },
                {
                  scale: floatAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1.1],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🍎</FoodPrintText>
        </Animated.View>

        {/* Floating leaf 3 */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingLeaf3,
            {
              opacity: floatAnim4.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.7],
              }),
              transform: [
                {
                  translateY: floatAnim4.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -18],
                  }),
                },
                {
                  rotate: floatAnim4.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '12deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🌱</FoodPrintText>
        </Animated.View>

        {/* Floating carrot */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingCarrot,
            {
              opacity: floatAnim5.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.6],
              }),
              transform: [
                {
                  translateY: floatAnim5.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -22],
                  }),
                },
                {
                  rotate: floatAnim5.interpolate({
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
              opacity: floatAnim6.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.7],
              }),
              transform: [
                {
                  translateY: floatAnim6.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -20],
                  }),
                },
                {
                  scale: floatAnim6.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          <FoodPrintText style={styles.floatingEmoji}>🥦</FoodPrintText>
        </Animated.View>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {/* Top section */}
        <View style={styles.topSection}>
          {/* Logo/Icon area */}
          <View style={styles.logoContainer}>
            <FoodPrintLogo size={120} />
          </View>

          {/* App title and description */}
          <View style={styles.textContainer}>
            <FoodPrintText variant="title" color="accent" size="4xl" style={styles.appTitle}>
              FoodPrint
            </FoodPrintText>
            
            <FoodPrintText variant="subtitle" color="secondary" size="lg" style={styles.subtitle}>
              Track your food's environmental impact
            </FoodPrintText>
            
            <FoodPrintText variant="body" color="muted" style={styles.description}>
              Make sustainable food choices with every meal. 
              Scan, track, and discover eco-friendly alternatives 
              for a greener future.
            </FoodPrintText>
          </View>
        </View>


        {/* Bottom section */}
        <View style={styles.bottomSection}>
          <View style={styles.buttonContainer}>
            <FoodPrintButton 
              variant="accent" 
              size="lg" 
              onPress={handleGetStarted}
              style={styles.getStartedButton}
            >
              Sign In
            </FoodPrintButton>
            
            <FoodPrintButton 
              variant="outline" 
              size="lg" 
              onPress={handleSignUp}
              style={styles.signUpButton}
            >
              Create Account
            </FoodPrintButton>
          </View>
          
          <FoodPrintText variant="caption" color="muted" style={styles.footerText}>
            Join thousands making sustainable food choices
          </FoodPrintText>
        </View>
      </View>
    </View>
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
    fontSize: 24,
  },
  floatingLeaf1: {
    top: height * 0.15,
    left: width * 0.1,
  },
  floatingLeaf2: {
    top: height * 0.25,
    right: width * 0.15,
  },
  floatingApple: {
    top: height * 0.4,
    left: width * 0.05,
  },
  floatingLeaf3: {
    top: height * 0.6,
    right: width * 0.1,
  },
  floatingCarrot: {
    top: height * 0.7,
    left: width * 0.2,
  },
  floatingBroccoli: {
    top: height * 0.8,
    right: width * 0.2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    zIndex: 1,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  appTitle: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '800',
    fontStyle: 'italic',
    fontSize: 48,
    letterSpacing: 1.5,
    // Create a dramatic shadow effect
    textShadowColor: BrandColors.deepForest.primary,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
    // Add a subtle glow effect
    shadowColor: BrandColors.brightOrange,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    // Ensure text doesn't get cut off
    paddingBottom: 10,
    paddingTop:5,
    lineHeight: 56,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  bottomSection: {
    flex: 0,
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  getStartedButton: {
    width: '100%',
    marginBottom: 12,
    shadowColor: BrandColors.brightOrange,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  signUpButton: {
    width: '100%',
    marginBottom: 0,
  },
  footerText: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
