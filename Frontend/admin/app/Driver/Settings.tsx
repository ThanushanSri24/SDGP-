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
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account Settings</Text>

        <SettingItem
          icon="person-outline"
          label="Profile"
          onPress={() => console.log("Profile")}
        />

        <SettingItem
          icon="lock-closed-outline"
          label="Change Password"
          onPress={() => console.log("Password")}
        />

        {/* App Preferences */}
        <Text style={styles.sectionTitle}>App Preferences</Text>

        <SettingItem
          icon="notifications-outline"
          label="Notifications"
          showBadge
          badgeCount="2"
          onPress={() => console.log("Notifications")}
        />

        {/* Support */}
        <Text style={styles.sectionTitle}>Support & Legal</Text>

        <SettingItem
          icon="help-circle-outline"
          label="Help Center"
          onPress={() => console.log("Help")}
        />

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => console.log("Logout pressed")}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

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
        <Ionicons name={icon} size={20} color="#111827" />
        <Text style={styles.itemLabel}>{label}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {showBadge && badgeCount && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
        )}
        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
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
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#020813",
    marginTop: 26,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#111827",
  },
  badge: {
    backgroundColor: "#FEF3C7",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#D97706",
  },
  logoutButton: {
    marginTop: 32,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#5AA9E6",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
});