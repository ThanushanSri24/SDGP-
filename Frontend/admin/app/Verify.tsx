import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function VerifyScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/verify.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Verify Your Email to Begin</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    marginTop: -200,
    width: 250,
    height: 250,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
});
