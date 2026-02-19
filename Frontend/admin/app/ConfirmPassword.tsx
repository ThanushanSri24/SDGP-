import React from "react";
import { Image } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native";
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
import { Ionicons } from "@expo/vector-icons";



import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function ConfirmPassword() {

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Confirm Password Screen</Text>
           source={require("../assets/images/Newpassword.png")}
      style={styles.logo}
      resizeMode="contain"
    /

    <Text style={styles.title}>Recover Password</Text>

    <Text style={styles.subtitle}>
      Your Identity has been verified{"\n"}
      Set your new password
    </Text>

    <View style={styles.form}>

  <TextInput
    placeholder="New Password"
    placeholderTextColor="#9CA3AF"
    secureTextEntry
    style={styles.input}
    value={newPassword}
    onChangeText={setNewPassword}
  />

  <TextInput
    placeholder="Confirm Password"
    placeholderTextColor="#9CA3AF"
    secureTextEntry
    style={styles.input}
    value={confirmPassword}
    onChangeText={setConfirmPassword}
  />

  <View style={styles.passwordContainer}>
  <TextInput
    placeholder="New Password"
    placeholderTextColor="#9CA3AF"
    secureTextEntry={!showNewPassword}
    style={styles.passwordInput}
    value={newPassword}
    onChangeText={setNewPassword}
  />

  <TouchableOpacity
    onPress={() => setShowNewPassword(!showNewPassword)}
  >
    <Ionicons
      name={showNewPassword ? "eye" : "eye-off"}
      size={22}
      color="#6B7280"
    />
  </TouchableOpacity>
</View>

<View style={styles.passwordContainer}>
  <TextInput
    placeholder="Confirm Password"
    placeholderTextColor="#9CA3AF"
    secureTextEntry={!showConfirmPassword}
    style={styles.passwordInput}
    value={confirmPassword}
    onChangeText={setConfirmPassword}
  />

  <TouchableOpacity
    onPress={() =>
      setShowConfirmPassword(!showConfirmPassword)
    }
  >
    <Ionicons
      name={showConfirmPassword ? "eye" : "eye-off"}
      size={22}
      color="#6B7280"
    />
  </TouchableOpacity>
</View>


</View>



      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
  width: 200,
  height: 200,
  alignSelf: "center",
  marginBottom: 10,
},

title: {
  fontSize: 25,
  fontWeight: "700",
  textAlign: "center",
  marginBottom: 6,
  color: "#000",
},

subtitle: {
  fontSize: 14,
  color: "#555",
  textAlign: "center",
  marginBottom: 30,
},

form: {
  width: "100%",
},

input: {
  height: 52,
  borderWidth: 1,
  borderColor: "#50bcff",
  borderRadius: 12,
  paddingHorizontal: 14,
  fontSize: 15,
  marginBottom: 18,
},

passwordContainer: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#50bcff",
  borderRadius: 12,
  paddingHorizontal: 14,
  height: 52,
  marginBottom: 18,
},

passwordInput: {
  flex: 1,
  fontSize: 15,
},



});
