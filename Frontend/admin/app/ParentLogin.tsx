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

         {/* FORGOT PASSWORD */}
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* LOGIN BUTTON */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* OR LOGIN WITH */}
        <View style={styles.orRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or login with</Text>
          <View style={styles.line} />
        </View>

         {/* SOCIAL BUTTONS */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="facebook" size={22} color="#1877F2" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/images/google.png")}
            style={{ width: 40, height: 22 }}
            resizeMode="contain"
          />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="apple" size={22} color="#000000" />
          </TouchableOpacity>
        </View>


        {/* REGISTER */}
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>
            Don’t have an account?{" "}
          </Text>

          <TouchableOpacity onPress={() => console.log("Go to Register")}>
            <Text style={styles.registerNow}>Register Now</Text>
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

  eyeText: {
    fontSize: 18,
  },

  forgotText: {
    textAlign: "right",
    fontWeight: "600",
    marginVertical: 14,
    marginTop: 15,
  },

  loginButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#50bcffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
  },
  loginText: {
    color: "#0f0101ff",
    fontSize: 16,
    fontWeight: "700",
  },

  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  orText: {
    marginHorizontal: 10,
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
  },

   socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
  },
  socialText: {
    fontSize: 18,
    fontWeight: "700",
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 200,
  },

  registerText: {
    color: "#6B7280",
  },

  registerNow: {
    color: "#50bcffff",
    fontWeight: "700",
  },

});
