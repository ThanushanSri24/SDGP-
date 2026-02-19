import { Tabs } from "expo-router";
import { Map, Users, Megaphone, User, CreditCard } from "lucide-react-native";

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
          paddingBottom: 8,
          height: 97,
        },
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="DriverMap"
        options={{
          title: "Map",
          tabBarIcon: ({ color, size }) => (
            <Map color={color} size={24} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="DriverAlert"
        options={{
          title: "Alerts",
          tabBarIcon: ({ color, size }) => (
            <Megaphone color={color} size={24} />
          ),
        }}
      />

      
      <Tabs.Screen
        name="Payment"
        options={{
          title: "Payment",
          tabBarIcon: ({ color, size }) => (
            <CreditCard color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="DriverProfile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}

