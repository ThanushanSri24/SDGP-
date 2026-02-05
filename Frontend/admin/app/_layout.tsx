// Import Firebase initialization (ensure this is at the very top)
import '../firebaseConfig';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

import { useColorScheme } from '@/hooks/use-color-scheme';

// Configure your backend API base URL
// Use your computer's local IP address for testing on physical devices
// For emulator: Android uses 10.0.2.2, iOS uses localhost
const API_BASE_URL = 'http://10.0.2.2:3000'; // Android emulator
// const API_BASE_URL = 'http://localhost:3000'; // iOS simulator
// const API_BASE_URL = 'http://YOUR_LOCAL_IP:3000'; // Physical device (replace with your IP)

// Request permission and get FCM token
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    return true;
  }
  return false;
}

// Get FCM token and send to backend
async function getFCMToken() {
  try {
    const token = await messaging().getToken();
    if (token) {
      console.log('FCM Token:', token);
      // Send token to your backend server
      await axios.post(`${API_BASE_URL}/api/save-token`, { token });
      return token;
    }
  } catch (error) {
    console.log('Error getting FCM token:', error);
  }
  return null;
}

export const unstable_settings = {
  initialRouteName: 'RoleSelectionScreen',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Initialize Firebase messaging
    const initializeFirebaseMessaging = async () => {
      const hasPermission = await requestUserPermission();
      if (hasPermission) {
        await getFCMToken();
      }
    };

    initializeFirebaseMessaging();

    // Handle foreground messages
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);
      // Handle the notification here (e.g., show an alert or update UI)
    });

    // Handle background/quit state messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background message received:', remoteMessage);
    });

    // Handle token refresh
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(async newToken => {
      console.log('Token refreshed:', newToken);
      await axios.post(`${API_BASE_URL}/api/save-token`, { token: newToken });
    });

    return () => {
      unsubscribeForeground();
      unsubscribeTokenRefresh();
    };
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="RoleSelectionScreen" options={{ headerShown: false }} />
        <Stack.Screen name="Driver" options={{ headerShown: false }} />
        <Stack.Screen name="Parent" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
