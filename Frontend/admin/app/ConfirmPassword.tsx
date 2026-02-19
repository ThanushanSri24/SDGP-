import React from "react";
import { Image } from "react-native";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function ConfirmPassword() {
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

});
