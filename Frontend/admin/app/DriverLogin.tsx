import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back! Glad to see you, Again!</Text>
        
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          keyboardType="email-address"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="#6B7280"
            /> 
          </TouchableOpacity>
        </View>  
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    paddingHorizontal:14,
    fontSize: 15,
    marginBottom: 18,
  },
   passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#5AA9E6",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
  },
});
