import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function HomeScreen() {
  const router = useRouter();

  const [showMap, setShowMap] = useState(false);

  // ✅ Static van location (no animation)
  const vanLocation = {
    latitude: 6.9271,
    longitude: 79.8612,
  };

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour >= 17
      ? "Good Evening"
      : hour >= 12
      ? "Good Afternoon"
      : "Good Morning";

  const todayDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting}!</Text>
          <Text style={styles.name}>Amana</Text>
          <Text style={styles.date}>{todayDate}</Text>
        </View>

        <TouchableOpacity
          style={styles.routeButton}
          onPress={() => router.push("/Parent")}
        >
          <Text style={styles.routeButtonText}>Select the Route</Text>
        </TouchableOpacity>
      </View>

      {/* Van Card */}
      <View style={styles.vanCard}>
        <Text style={styles.vanTitle}>🚐 Van is on the way!</Text>
        <View style={styles.vanRow}>
          <Text style={styles.vanLabel}>Estimated arrival</Text>
          <View style={styles.vanTimeBadge}>
            <Text style={styles.vanTimeText}>—</Text>
          </View>
        </View>

        {/* Live Tracking Button */}
        <TouchableOpacity
          style={styles.liveButton}
          onPress={() => setShowMap(!showMap)}
        >
          <Text style={styles.liveButtonText}>
            {showMap ? "Hide Live Tracking" : "Show Live Tracking"}
          </Text>
        </TouchableOpacity>

        {/* Live tracking active badge*/}
        {showMap && (
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveBadgeText}>Live Tracking Active</Text>
          </View>
        )}

        {/* Map */}
        {showMap && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: vanLocation.latitude,
              longitude: vanLocation.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker coordinate={vanLocation}>
              <Image
                source={require("../../assets/images/van.png")}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </Marker>
          </MapView>
        )}

        {/*Actions*/}
        <View style={styles.vanLocations}></View>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callButtonText}>📞 Call Driver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { fontSize: 18, color: "#555" },
  name: { fontSize: 28, fontWeight: "bold", color: "#000" },
  date: { fontSize: 14, color: "#666" },
  routeButton: {
    backgroundColor: "#fff3a0",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#000",
  },
  routeButtonText: { fontWeight: "600", color: "#000", fontSize: 14 },
  vanCard: {
    backgroundColor: "#FFF8CC",
    marginTop: 30,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5D98A",
  },
  vanHeader: {
    marginBottom: 12,
  },

  vanTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  vanMap: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginTop: 12,
  },

  vanRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vanLabel: { fontSize: 14, color: "#555" },
  vanTimeBadge: {
    backgroundColor: "#DCFCE7",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  vanTimeText: { color: "#166534", fontWeight: "600", fontSize: 13 },
  liveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
  liveButtonText: { color: "#fff", fontWeight: "600" },
  map: {
    width: "100%",
    height: 200,
    marginTop: 20,
    borderRadius: 12,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "#ECFDF5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#34D399",
  },

  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginRight: 8,
  },

  liveBadgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#065F46",
  },
  vanLocations: {
    marginTop: 16,
  },

  callButton: {
    marginTop: 12,
    backgroundColor: "#93C5FD",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  callButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});
