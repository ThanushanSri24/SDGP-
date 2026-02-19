import React from "react";
import { Image } from "react-native";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

export default function ForgetPasswordScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Forget Password Screen</Text>

      <Image
  source={require("../assets/images/Sendmail.png")}
  style={styles.image}
  resizeMode="contain"
/>

<Text style={styles.title}>FORGET PASSWORD!</Text>

<Text style={styles.subtitle}>
  Provide your account's email for which you{"\n"}
  want to reset your password.
</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
  width: 210,
  height: 200,
  marginTop: 80,
  marginBottom: 20,
},

title: {
  fontSize: 22,
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 10,
},

subtitle: {
  textAlign: "center",
  color: "gray",
  fontSize: 13,
  marginBottom: 30,
},

});
