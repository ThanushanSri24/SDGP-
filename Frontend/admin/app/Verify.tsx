import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet } from "react-native";

export default function VerifyScreen() {
  const [code, setCode] = useState("");

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/verify.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Verify Your Email to Begin</Text>

      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        maxLength={4}
        value={code}
        onChangeText={setCode}
        placeholder="Enter 4-digit code"
        placeholderTextColor="#9CA3AF"
        textAlign="center"
      />
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
  input: {
    width: "60%",
    height: 50,
    borderWidth: 1,
    borderColor: "#50bcffff",
    borderRadius: 10,
    fontSize: 19,
    marginBottom: 30,
    marginTop: 15,
  },
});
