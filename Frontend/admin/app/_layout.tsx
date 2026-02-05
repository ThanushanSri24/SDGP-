// Import Firebase initialization (ensure this is at the very top)
import '../firebaseConfig';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import axios from 'axios';
import { Platform } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';

// Configure your backend API base URL
// Use your computer's local IP address for testing on physical devices
const API_BASE_URL = 'http://10.0.2.2:3000'; // Android emulator
// const API_BASE_URL = 'http://localhost:3000'; // iOS simulator
// const API_BASE_URL = 'http://YOUR_LOCAL_IP:3000'; // Physical device (replace with your IP)

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Request permission and get Expo push token
async function registerForPushNotifications() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push token - permission not granted');
    return null;
  }

  // Get Expo push token
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Expo Push Token:', token);

  // Send token to your backend server
  try {
    await axios.post(`${API_BASE_URL}/api/save-token`, { token });
  } catch (error) {
    console.log('Error saving token to backend:', error);
  }

  // Android needs a notification channel
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export const unstable_settings = {
  initialRouteName: 'RoleSelectionScreen',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    // Note: Push notifications don't work in Expo Go (SDK 53+)
    // For push notifications, you need a development build
    // Uncomment the following when using a development build:

    // registerForPushNotifications();
    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   console.log('Notification received:', notification);
    // });
    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //   console.log('Notification response:', response);
    // });
    // return () => {
    //   if (notificationListener.current) {
    //     Notifications.removeNotificationSubscription(notificationListener.current);
    //   }
    //   if (responseListener.current) {
    //     Notifications.removeNotificationSubscription(responseListener.current);
    //   }
    // };
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
