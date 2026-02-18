import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back! Glad to see you, Again!</Text>
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
});
