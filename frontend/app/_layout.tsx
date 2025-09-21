import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/contexts/AuthContext';
import { ScanHistoryProvider } from '@/contexts/ScanHistoryContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ScanHistoryProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
        <Stack.Screen 
          name="landing" 
          options={{ 
            headerShown: false,
            title: 'Welcome to FoodPrint'
          }} 
        />
        <Stack.Screen 
          name="dashboard" 
          options={{ 
            headerShown: false,
            title: 'Dashboard'
          }} 
        />
        <Stack.Screen 
          name="leaderboard" 
          options={{ 
            headerShown: false,
            title: 'Leaderboard'
          }} 
        />
        <Stack.Screen 
          name="login" 
          options={{ 
            headerShown: false,
            title: 'Sign In'
          }} 
        />
        <Stack.Screen 
          name="signup" 
          options={{ 
            headerShown: false,
            title: 'Sign Up'
          }} 
        />
        <Stack.Screen 
          name="scanning" 
          options={{ 
            headerShown: false,
            title: 'Scan Food'
          }} 
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            title: 'Main App'
          }} 
        />
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal', 
            title: 'Modal' 
          }} 
        />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </ScanHistoryProvider>
    </AuthProvider>
  );
}
