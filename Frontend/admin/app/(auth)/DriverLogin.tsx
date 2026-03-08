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

        try {
      //await login(email, password, 'driver');
      router.replace('/Driver');
    } catch (error: any) {
      alert(error.message || "Login failed");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome back! Glad{"\n"}to see you, Again!
        </Text>

        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  backButton: {
    marginLeft: 23,
    marginTop: 40,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    fontSize: 20,
    fontWeight: "600",
  },

  container: {
    paddingHorizontal: 24,
    marginTop: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 40,
    color: "#111827",
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#5AA9E6",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    marginBottom: 18,
  },

});