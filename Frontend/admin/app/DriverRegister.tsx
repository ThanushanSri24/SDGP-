import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DriverRegister() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        {input("account", "Driver Name", "Enter your full name")}
        {input("email-outline", "Email", "Enter your email")}
        {input("phone-outline", "Phone Number", "Enter phone number")}
      </View>
    </SafeAreaView>
  );
}

const input = (
  iconName: any,
  label: string,
  placeholder: string
) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>

    <View style={styles.inputWrapper}>
      <MaterialCommunityIcons name={iconName} size={20} color="#777" />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={styles.input}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f8ffff",
    padding: 20,
  },

  form: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
  },

  field: {
    marginBottom: 14,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#71d6f3ff",
    borderRadius: 12,
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    height: 46,
    marginLeft: 8,
  },
});
