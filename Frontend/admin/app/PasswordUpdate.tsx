import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function PasswordUpdatedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <Text style={styles.title}>
          PASSWORD{"\n"}UPDATED
        </Text>

        <Text style={styles.subtitle}>
          Your password has been updated!
        </Text>

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
    marginBottom: 20,
    color: "#000",
  },

  subtitle: {
    fontSize: 15,
    color: "#555",
  },
});
