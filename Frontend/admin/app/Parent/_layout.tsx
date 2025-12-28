import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

import { useColorScheme } from "../../hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#86c7ef",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      {/* Your Child */}
      <Tabs.Screen
        name="your_child"
        options={{
          title: "Your Child",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "accessibility" : "accessibility-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      {/* Alerts */}
      <Tabs.Screen
        name="ParentAlert"
        options={{
          title: "Alerts",
          headerTitle: "Alerts",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitle: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
