import { StyleSheet, Text, View } from "react-native";

import React from "react";

export default function HomeScreen() {
  return (
    <View style={style.container}>
      <Text style={style.text}>Hello! Welcome to the Parent dashboard!</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#Fbf1b1",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "black",
    marginBottom: 15,
  },
  testButton: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#ffeb3b",
    marginTop: 10,
  },
});
