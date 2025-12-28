import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AlertsScreen() {
  const now = new Date();
  const hour = now.getHours();

  let greeting = "Good Morning";
  if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17) {
    greeting = "Good Evening";
  }

  const todayDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.topBar}>
        <View style={styles.leftSection}>
          <Text style={styles.greeting}>{greeting}!</Text>
          <Text style={styles.date}>{todayDate}</Text>
        </View>

        <Ionicons name="notifications-outline" size={26} color="#000" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  text: { fontSize: 20, color: "red" },


  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 1,
    backgroundColor: "#FFFFFF",
  },
  leftSection: {
    flexDirection: "column",
  },

  greeting: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },

  date: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});
