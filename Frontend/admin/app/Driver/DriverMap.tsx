import React from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DriverMap() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: "#F9FAFB",
      paddingTop: insets.top,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Route Map
      </Text>
      <Text style={{ marginTop: 10, color: "#6B7280" }}>
        Coming soon...
      </Text>
    </View>
  );
}