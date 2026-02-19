import React from "react";
import { Image } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { View, Text, SafeAreaView, StyleSheet } from "react-native";

export default function ForgetPasswordScreen() {
  const [email, setEmail] = useState("");

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

<View style={styles.form}>
  <Ionicons name="mail-outline" size={20} color="gray" />

  <TextInput
    placeholder="Enter your email"
    placeholderTextColor="#9CA3AF"
    keyboardType="email-address"
    value={email}
    onChangeText={setEmail}
    autoCapitalize="none"
    style={styles.input}
  />
</View>
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

form: {
  width: "100%",
  height: 52,
  borderWidth: 1,
  borderColor: "#50bcff",
  borderRadius: 12,
  paddingHorizontal: 14,
  marginBottom: 18,
  backgroundColor: "#f2f2f2",
  flexDirection: "row",
  alignItems: "center",
},

input: {
  flex: 1,
  marginLeft: 10,
  fontSize: 15,
  color: "#000",
},


});
