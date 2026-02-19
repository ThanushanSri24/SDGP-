import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";

export default function DriverRegister() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Driver Portal</Text>
        <Text style={styles.subtitle}>
          Manage Your Van Route & Students
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f8ffff",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },

  subtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 5,
  },
});
