import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AlertsScreen() {
  const [notifications, setNotfications] = useState<
    { id: number; title: string; message: string; read: boolean }[]
  >([
    {
      id: 1,
      title: "Van Approaching!",
      message: "Van will arrive in 5 minutes.",
      read: false,
    },
    {
      id: 2,
      title: "Payment Reminder",
      message: "Please complete this month’s payment.",
      read: false,
    },
    {
      id: 3,
      title: "Route Delay",
      message: "Delay due to heavy traffic.",
      read: true,
    },
    {
      id: 4,
      title: "Mechanical issue",
      message: "Delay due to mechanical issue.",
      read: true,
    },
  ]);
  //Mark all as read function
  const markAllAsRead = () => {
    setNotfications(notifications.map((n) => ({ ...n, read: true })));
  };

  //Mark one as read
  const markOneAsRead = (id: number) => {
    setNotfications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const now = new Date();
  const hour = now.getHours();

  let greeting = "Good Morning";
  if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17) {
    greeting = "Good Evening";
  }

  const todayDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.topBar}>
        <View style={styles.leftSection}>
          <Text style={styles.greeting}>{greeting}!</Text>
          <Text style={styles.date}>{todayDate}</Text>
        </View>

        <View style={styles.bellContainer}>
          <Ionicons name="notifications-outline" size={26} color="#000" />
          <View style={styles.notificationDot} />
        </View>
      </View>

      {/*Mark all as read button*/}
      <View style={styles.markReadContainer}>
        <Text style={styles.alertTitle}>Alerts</Text>

        <Text style={styles.markReadText} onPress={markAllAsRead}>
          Mark all as read
        </Text>
      </View>

      {/*Show the notification list*/}
      <View style={styles.alertList}>
        {notifications.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.alertBox}
            onPress={() => markOneAsRead(item.id)}
          >
            <View>
              <Text
                style={[
                  styles.alertTitleText,
                  { fontWeight: item.read ? "normal" : "bold" },
                ]}
              >
                {item.title}
              </Text>
              <Text style={styles.alertMessage}>{item.message}</Text>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  text: { fontSize: 20, color: "red" },


  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 1,
    backgroundColor: "#FFFFFF",
  },
  leftSection: {
    flexDirection: "column",
  },

  greeting: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },

  date: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  bellContainer: {
    position: "relative",
  },

  notificationDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
  },
  markReadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  markReadText: {
    fontSize: 14,
    color: "#86c7ef",
  },
  alertList: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  alertBox: {
    backgroundColor: "#fbf1a1",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alertTitleText: {
    fontSize: 16,
  },
  alertMessage: {
    fontSize: 13,
    color: "#D40F0F",
    marginTop: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
  },
});