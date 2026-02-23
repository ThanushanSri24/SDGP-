import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

        <Text style={styles.sectionTitle}>Account Settings</Text>
        <Text style={styles.sectionTitle}>App Preferences</Text>
        <Text style={styles.sectionTitle}>Support & Legal</Text>
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

});