import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>

        <SettingItem
          icon="person-outline"
          label="Edit Profile"
          onPress={() => router.push("/Parent/profile")}
        />

        <SettingItem
          icon="lock-closed-outline"
          label="Change Password"
          onPress={() => {}} //need to link with the change password
        />

        {/* Support Section */}
        <Text style={styles.sectionTitle}>Support</Text>

        <SettingItem
          icon="help-circle-outline"
          label="Help & Support"
          onPress={() => {}}
        />

        <SettingItem
          icon="information-circle-outline"
          label="About"
          onPress={() => {}}
        />

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  sectionTitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemLabel: {
    marginLeft: 12,
    fontSize: 16,
    color: "#111827",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },

  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#DC2626",
    fontWeight: "500",
  },
});
function SettingItem({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <Ionicons name={icon} size={20} color="#2563EB" />
        <Text style={styles.itemLabel}>{label}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
    </TouchableOpacity>
  );
}
