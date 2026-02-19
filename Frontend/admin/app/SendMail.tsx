import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ForgetPasswordScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleNext = () => {
    console.log("Email:", email);
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* 🔙 Back Button (Fixed Position) */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={22} color="#111827" />
      </TouchableOpacity>

      {/* 📧 Image */}
      <Image
        source={require("../assets/images/Sendmail.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>FORGET PASSWORD!</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Provide your account's email for which you{"\n"}
        want to reset your password.
      </Text>

      {/* Email Input */}
      <View style={styles.form}>
        <Ionicons name="mail-outline" size={20} color="gray" />

        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      {/* Next Button */}
      <TouchableOpacity
        onPress={handleNext}
        style={styles.nextButton}
      >
        <Text style={styles.nextText}>NEXT</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

/* 🎨 Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  /* 🔙 Back Button */
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    zIndex: 10,
  },

  /* Image */
  image: {
    width: 210,
    height: 200,
    marginTop: 80,
    marginBottom: 20,
  },

  /* Title */
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  /* Subtitle */
  subtitle: {
    textAlign: "center",
    color: "gray",
    fontSize: 13,
    marginBottom: 30,
  },

  /* Input Container */
  form: {
    width: "100%",
    height: 52,
    borderWidth: 1,
    borderColor: "#50bcff",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 18,
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#000",
  },

  /* Button */
  nextButton: {
    backgroundColor: "#50bcff",
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },

  nextText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 15,
  },
});
