import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PasswordUpdatedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Title */}
        <Text style={styles.title}>PASSWORD{"\n"}UPDATED</Text>

        {/* Blue Tick Circle */}
        <View style={styles.circle}>
          <Ionicons name="checkmark" size={40} color="#fff" />
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Your password has been updated!
        </Text>

        {/* Login Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    paddingTop: 160, 
 },

  content: {
    alignItems: "center",
  },

  title: {
    fontSize: 27,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 40,
    color: "#000",
  },

  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#50bcff", 
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  subtitle: {
    fontSize: 15,
    color: "#555",
    marginBottom: 25,
  },

  button: {
    backgroundColor: "#50bcff", 
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 8,
  },

  buttonText: {
    color: "#201a1a",
    fontWeight: "700",
    fontSize: 17,
  },
});
