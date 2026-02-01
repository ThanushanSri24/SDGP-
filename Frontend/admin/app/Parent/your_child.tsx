import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";

export default function YourChild() {
  const navigation = useNavigation();
  const [attendance, setAttendance] = useState<"ABSENT" | "PRESENT" | null>(
    null
  );

  const confirmAttendance = (type: "ABSENT" | "PRESENT") => {
    Alert.alert("Confirm Attendance", `Are you sure your child is ${type}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => setAttendance(type) },
    ]);
  };

  return (
    <View style={styles.screen}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Your Child</Text>
      </View>

      {/* CHILD CARD */}
      <View style={styles.childCard}>
        {/* LEFT SIDE */}
        <View style={styles.leftBlock}>
          <View style={styles.topRow}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={28} color="#555" />
            </View>

            <View>
              <Text style={styles.attendanceTitle}>Attendance</Text>

              <View style={styles.attendanceRow}>
                <TouchableOpacity
                  style={[
                    styles.attendanceButton,
                    attendance === "ABSENT" && styles.attendanceActive,
                  ]}
                  onPress={() => confirmAttendance("ABSENT")}
                >
                  <Text style={styles.attendanceText}>ABSENT</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.attendanceButton,
                    attendance === "PRESENT" && styles.attendanceActive,
                  ]}
                  onPress={() => confirmAttendance("PRESENT")}
                >
                  <Text style={styles.attendanceText}>PRESENT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.childName}>Joy</Text>
            <Text style={styles.schoolName}>Musaeus College</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 12,
  },

  childCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#86c7ef",
    padding: 16,
    borderRadius: 16,
  },

  leftBlock: {
    flex: 1,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  childName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  schoolName: {
    fontSize: 14,
    color: "#777",
  },

  trackButton: {
    backgroundColor: "#86c7ef",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 12, // ✅ NEW
  },

  trackText: {
    fontSize: 16,
    fontWeight: "600",
  },

  attendanceTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  attendanceRow: {
    flexDirection: "row",
  },

  attendanceButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
    marginRight: 10,
  },

  attendanceActive: {
    backgroundColor: "#FFF3A0",
  },

  attendanceText: {
    fontSize: 14,
  },
});
