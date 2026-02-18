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
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account Settings</Text>

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
        <SettingItem
          icon="card-outline"
          label="Payment & Bank Details"
          onPress={() => {}}
        />

        <Text style={styles.sectionTitle}>App Preferences</Text>

        <SettingItem
          icon="notifications-outline"
          label="Notification Preferences"
          onPress={() => {}}
          showBadge={true}
          badgeCount="1"
        />

        <SettingItem
          icon="map-outline"
          label="Route & Map Settings"
          onPress={() => {}}
        />

        <Text style={styles.sectionTitle}>Support & Legal</Text>
        <SettingItem
          icon="help-circle-outline"
          label="Help & Support"
          onPress={() => {}}
        />
        <SettingItem
          icon="shield-checkmark-outline"
          label="Privacy Policy"
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
  showBadge = false,
  badgeCount,
}: {
  icon: any;
  label: string;
  onPress: () => void;
  showBadge?: boolean;
  badgeCount?: string;
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
