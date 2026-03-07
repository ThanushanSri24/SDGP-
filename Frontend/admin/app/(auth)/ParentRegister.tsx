// Import React and required hooks
import React, { useRef, useEffect } from "react";

// Router for navigation between screens
import { useRouter } from "expo-router";

// Custom authentication context (handles login/register)
import { useAuth } from "../../context/AuthContext";

// React Native components for UI
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

// Icons library for input fields
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Firebase Firestore functions
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

// Firebase configuration
import { db, auth } from "../../firebaseConfig";

// Picker dropdown component
import { Picker } from "@react-native-picker/picker";

// Type for icon names used in MaterialCommunityIcons
type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

// Main parent registration screen component
export default function ParentRegisterScreen() {

  // Scroll reference to control scroll position
  const scrollRef = useRef<ScrollView | null>(null);

  // Router navigation
  const router = useRouter();

  // Access register function and loading state from AuthContext
  const { register, isLoading } = useAuth();

    // Parent details
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  // Child details
  const [childName, setChildName] = React.useState("");
  const [childClass, setChildClass] = React.useState("");

  // Password fields
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // Driver list fetched from database
  const [drivers, setDrivers] = React.useState<any[]>([]);

  // Selected driver ID
  const [selectedDriver, setSelectedDriver] = React.useState("");

    // Fetch available drivers from Firestore
  useEffect(() => {

    const fetchDrivers = async () => {
      try {

        // Get driver collection
        const snapshot = await getDocs(collection(db, "drivers"));

        const driverList: any[] = [];

        // Loop through drivers and push to array
        snapshot.forEach((docItem) => {
          driverList.push({
            id: docItem.id,
            ...docItem.data(),
          });
        });

        // Save drivers into state
        setDrivers(driverList);

      } catch (error) {
        console.log("Error fetching drivers:", error);
      }
    };

    fetchDrivers();

  }, []);

    // Function to handle parent registration
  const handleRegister = async () => {

    // Clean email (remove spaces and make lowercase)
    const cleanEmail = email.trim().toLowerCase();

    // Check if required fields are filled
    if (!name || !cleanEmail || !password || !confirmPassword || !selectedDriver) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    // Password confirmation check
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Minimum password length check
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
  }

}