import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View
} from "react-native";

export default function RoleSelectionScreen() {
  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <Ionicons name="arrow-back" size={24} style={styles.backIcon} />

      {/* Logo */}
      <Image source={require("../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />


      {/* Title */}
      <Text style={styles.title}>School Van Tracking</Text>
      <Text style={styles.subtitle}>
        Smart and secure school van tracking for everyone
      </Text>

        {/* Section Title */}
      <Text style={styles.chooseText}>Choose Your Role</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    paddingHorizontal: 24,
    alignItems: "center",
  },

   backIcon: {
    position: "absolute",
    top: 50,
    left: 20,
    color: "#000",
  },

  logo: {
    width: 145,
    height: 150,
    marginTop: 80,
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 13,
    marginBottom: 30,
  },

  chooseText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
    marginTop:13,
  },

});