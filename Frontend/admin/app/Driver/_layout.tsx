import { Tabs } from "expo-router";
import { Map, Users, Megaphone, User } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#E5E7EB",
          paddingTop: 4,
        },
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      
      <Tabs.Screen
        name="DriverAlert"
        options={{
          title: "Alerts",
          tabBarIcon: ({ color, size }) => (
            <Megaphone color={color} size={24} />
          ),
        }}
      />
      
    </Tabs>
  );
}

