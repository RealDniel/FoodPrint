import { FoodPrintButton } from '@/components/foodprint-button';
import { FoodPrintText } from '@/components/foodprint-text';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { signIn, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);

    if (error) {
      Alert.alert('Login Failed', error.message);
    } else {
      router.replace('/dashboard');
    }
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <FoodPrintText variant="title" color="primary" size="3xl">
            Welcome Back
          </FoodPrintText>
          <FoodPrintText variant="body" color="muted" style={styles.subtitle}>
            Sign in to continue your eco-friendly journey
          </FoodPrintText>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <FoodPrintText variant="body" color="primary" weight="medium" style={styles.label}>
              Email
            </FoodPrintText>
            <TextInput
              style={[styles.input, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border, color: colors.text }]}
              placeholder="Enter your email"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <FoodPrintText variant="body" color="primary" weight="medium" style={styles.label}>
              Password
            </FoodPrintText>
            <TextInput
              style={[styles.input, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border, color: colors.text }]}
              placeholder="Enter your password"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <FoodPrintButton 
            variant="accent" 
            size="lg" 
            onPress={handleLogin}
            style={styles.loginButton}
            disabled={isLoading || loading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </FoodPrintButton>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <FoodPrintText variant="body" color="muted">
            Don't have an account?{' '}
          </FoodPrintText>
          <TouchableOpacity onPress={handleSignUp}>
            <FoodPrintText variant="body" color="accent" weight="medium">
              Sign Up
            </FoodPrintText>
          </TouchableOpacity>
        </View>

        {/* Back to Landing */}
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <FoodPrintText variant="body" color="muted">
            ← Back to Landing
          </FoodPrintText>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 8,
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 50,
    justifyContent: 'center',
  },
  loginButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    alignItems: 'center',
    padding: 12,
  },
});
