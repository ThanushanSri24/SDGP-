import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import {
  Navigation,
  Play,
  Pause,
  Users,
  MapPin,
  Clock,
  ChevronUp,
  ChevronDown,
} from "lucide-react-native";

interface Stop {
  id: number;
  name: string;
  address: string;
  students: string[];
  time: string;
  status: string;
  latitude: number;
  longitude: number;
}

export default function DriverMap() {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);
  const [routeStarted, setRouteStarted] = useState(false);
  const [currentStop, setCurrentStop] = useState(0);
  const [showStopsList, setShowStopsList] = useState(false);

  const stops: Stop[] = [
    {
      id: 1,
      name: "Maple Street",
      address: "123 Maple St",
      students: ["Emma Johnson", "Lucas Brown"],
      time: "7:15 AM",
      status: "pending",
      latitude: 37.78825,
      longitude: -122.4324,
    },
    {
      id: 2,
      name: "Oak Avenue",
      address: "456 Oak Ave",
      students: ["Sophia Davis", "Mason Wilson"],
      time: "7:22 AM",
      status: "pending",
      latitude: 37.78925,
      longitude: -122.4314,
    },
    {
      id: 3,
      name: "Pine Road",
      address: "789 Pine Rd",
      students: ["Olivia Miller"],
      time: "7:30 AM",
      status: "pending",
      latitude: 37.79025,
      longitude: -122.4304,
    },
    {
      id: 4,
      name: "Elm Street",
      address: "321 Elm St",
      students: ["Noah Garcia", "Ava Martinez"],
      time: "7:38 AM",
      status: "pending",
      latitude: 37.79125,
      longitude: -122.4294,
    },
    {
      id: 5,
      name: "Washington Elementary",
      address: "100 School Ave",
      students: [],
      time: "7:45 AM",
      status: "pending",
      latitude: 37.79225,
      longitude: -122.4284,
    },
  ];

  // Create route coordinates for the polyline
  const routeCoordinates = stops.map((stop) => ({
    latitude: stop.latitude,
    longitude: stop.longitude,
  }));

  const handleStartRoute = () => {
    setRouteStarted(!routeStarted);
    if (!routeStarted && mapRef.current) {
      // Fit map to show all markers
      mapRef.current.fitToCoordinates(routeCoordinates, {
        edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
        animated: true,
      });
    }
  };

  const markStopComplete = (stopId: number) => {
    // In a real app, this would update the stop status
    console.log(`Completed stop ${stopId}`);
  };

  const focusOnStop = (stop: Stop) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: stop.latitude,
          longitude: stop.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "#fff",
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
          zIndex: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#111827" }}
            >
              Morning Route
            </Text>
            <Text style={{ fontSize: 16, color: "#6B7280", marginTop: 4 }}>
              {stops.length - 1} stops •{" "}
              {stops.reduce((total, stop) => total + stop.students.length, 0)}{" "}
              students
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleStartRoute}
            style={{
              backgroundColor: routeStarted ? "#EF4444" : "#10B981",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {routeStarted ? (
              <Pause size={16} color="#fff" />
            ) : (
              <Play size={16} color="#fff" />
            )}
            <Text style={{ color: "#fff", fontWeight: "600", marginLeft: 6 }}>
              {routeStarted ? "Pause" : "Start Route"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Map View */}
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
        >
          {/* Route Line */}
          {routeStarted && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#2563EB"
              strokeWidth={4}
            />
          )}

          {/* Stop Markers */}
          {stops.map((stop, index) => (
            <Marker
              key={stop.id}
              coordinate={{
                latitude: stop.latitude,
                longitude: stop.longitude,
              }}
              title={stop.name}
              description={`${stop.time} - ${stop.students.length} student${stop.students.length !== 1 ? "s" : ""}`}
              pinColor={
                index === currentStop && routeStarted
                  ? "#2563EB"
                  : stop.students.length === 0
                  ? "#10B981"
                  : "#EF4444"
              }
              onPress={() => focusOnStop(stop)}
            >
              <View
                style={{
                  backgroundColor:
                    index === currentStop && routeStarted
                      ? "#2563EB"
                      : stop.students.length === 0
                      ? "#10B981"
                      : "#EF4444",
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 20,
                  borderWidth: 3,
                  borderColor: "#fff",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  {index + 1}
                </Text>
              </View>
            </Marker>
          ))}
        </MapView>

        {/* Route Progress Card - Floating on Map */}
        {routeStarted && (
          <View
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              right: 16,
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                padding: 16,
                borderRadius: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: 8,
                }}
              >
                Current Progress
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <Text style={{ fontSize: 14, color: "#6B7280" }}>
                  Stop {currentStop + 1} of {stops.length}
                </Text>
                <Text
                  style={{ fontSize: 14, color: "#2563EB", fontWeight: "500" }}
                >
                  Next: {stops[currentStop]?.name}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Toggle Stops List Button */}
        <TouchableOpacity
          onPress={() => setShowStopsList(!showStopsList)}
          style={{
            position: "absolute",
            top: routeStarted ? 120 : 16,
            right: 16,
            backgroundColor: "#fff",
            borderRadius: 12,
            padding: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          {showStopsList ? (
            <ChevronDown size={24} color="#2563EB" />
          ) : (
            <ChevronUp size={24} color="#2563EB" />
          )}
        </TouchableOpacity>
      </View>

      {/* Stops List - Sliding Panel */}
      {showStopsList && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "50%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 10,
          }}
        >
          <View
            style={{
              paddingVertical: 12,
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#E5E7EB",
            }}
          >
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: "#D1D5DB",
                borderRadius: 2,
              }}
            />
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingBottom: insets.bottom + (routeStarted ? 80 : 20),
              paddingHorizontal: 20,
              paddingTop: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#111827",
                marginBottom: 12,
              }}
            >
              Today's Stops
            </Text>

            {stops.map((stop, index) => (
              <TouchableOpacity
                key={stop.id}
                onPress={() => {
                  markStopComplete(stop.id);
                  focusOnStop(stop);
                }}
                style={{
                  backgroundColor: "#F9FAFB",
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  borderLeftWidth: 4,
                  borderLeftColor:
                    index === currentStop && routeStarted
                      ? "#2563EB"
                      : "#E5E7EB",
                }}
              >
                {/* Stop Header */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}
                  >
                    {stop.name}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Clock size={14} color="#6B7280" />
                    <Text
                      style={{ fontSize: 14, color: "#6B7280", marginLeft: 4 }}
                    >
                      {stop.time}
                    </Text>
                  </View>
                </View>

                {/* Address */}
                <Text
                  style={{ fontSize: 14, color: "#6B7280", marginBottom: 8 }}
                >
                  {stop.address}
                </Text>

                {/* Students */}
                {stop.students.length > 0 ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Users size={14} color="#2563EB" />
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#2563EB",
                        marginLeft: 4,
                        fontWeight: "500",
                      }}
                    >
                      {stop.students.length} student
                      {stop.students.length > 1 ? "s" : ""}:{" "}
                      {stop.students.join(", ")}
                    </Text>
                  </View>
                ) : (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        backgroundColor: "#10B981",
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 6,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#fff",
                          fontWeight: "500",
                        }}
                      >
                        SCHOOL
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Navigation Button */}
      {routeStarted && (
        <View
          style={{
            position: "absolute",
            bottom: insets.bottom + 20,
            left: 20,
            right: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#2563EB",
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Navigation size={20} color="#fff" />
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 8,
              }}
            >
              Navigate to {stops[currentStop]?.name}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}