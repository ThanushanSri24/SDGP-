import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
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

  return (
    <SafeAreaView style={styles.safe}>
      {/* BACK BUTTON */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        {/* TITLE */}
        <Text style={styles.title}>
          Welcome back! Glad{"\n"}to see you, Again!
        </Text>

        {/* EMAIL */}
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          keyboardType="email-address"
        />

        {/* PASSWORD */}
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
    borderColor: "#50bcffff",
    borderRadius: 12,
    paddingHorizontal:14,
    fontSize: 15,
    marginBottom: 18,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#50bcffff",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
  },

});
