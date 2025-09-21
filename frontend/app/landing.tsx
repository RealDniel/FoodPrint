import { FoodPrintButton } from '@/components/foodprint-button';
import { FoodPrintText } from '@/components/foodprint-text';
import { BrandColors, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleGetStarted = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Background gradient effect */}
      <View style={[styles.backgroundGradient, { backgroundColor: colors.backgroundSecondary }]} />
      
      {/* Main content */}
      <View style={styles.content}>
        {/* Top section */}
        <View style={styles.topSection}>
          {/* Logo/Icon area */}
          <View style={styles.logoContainer}>
            <View style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
              <FoodPrintText variant="title" color="primary" style={styles.logoText}>
                🌱
              </FoodPrintText>
            </View>
          </View>

          {/* App title and description */}
          <View style={styles.textContainer}>
            <FoodPrintText variant="title" color="primary" size="4xl" style={styles.appTitle}>
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
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
    opacity: 0.3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 48,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  appTitle: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '800',
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
