import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useRouter } from "expo-router";
//import { useAuth } from "../../context/AuthContext";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
  }
}