import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  // Greeting & Date Logic
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
    <View style={style.container}>
      {/* Header Section */}
      <View style={style.header}>
        <View>
          <Text style={style.greeting}>{greeting}!</Text>
          <Text style={style.name}>Amana</Text>
          <Text style={style.date}>{todayDate}</Text>
        </View>

        {/* Select Route Button */}
        <TouchableOpacity
          style={style.routeButton}
          onPress={() => router.push("/Parent")}
        >
          <Text style={style.routeButtonText}>Select the Route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    fontSize: 18,
    color: "#555",
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },

  date: {
    fontSize: 14,
    color: "#666",
  },

  routeButton: {
    backgroundColor: "#fff3a0",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#000",
  },

  routeButtonText: {
    fontWeight: "600",
    color: "#000",
    fontSize: 14,
  },
});
