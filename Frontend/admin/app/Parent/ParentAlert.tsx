import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AlertsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Emergency Alerts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  text: { fontSize: 20, color: "red" },
        
});
