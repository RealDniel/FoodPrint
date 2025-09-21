import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { user, loading } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [fallbackLoading, setFallbackLoading] = useState(true);

  // Fallback timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFallbackLoading(false);
    }, 3000); // 3 second fallback timeout

    return () => clearTimeout(timeout);
  }, []);

  // Show loading spinner while checking auth state
  if (loading && fallbackLoading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: colors.background 
      }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // If user is logged in, redirect to dashboard
  if (user) {
    return <Redirect href="/dashboard" />;
  }

  // If user is not logged in, redirect to landing page
  return <Redirect href="/landing" />;
}
