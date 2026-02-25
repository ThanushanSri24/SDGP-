import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { Marker, Polyline } from "react-native-maps";
import {
  Navigation,
  Play,
  Pause,
  Users,
  MapPin,
  Clock,
  ChevronUp,
  ChevronDown,
  Map,
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

type RouteType = "pickup" | "dropoff" | null;

export default function DriverMap() {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);
  const [routeStarted, setRouteStarted] = useState(false);
  const [currentStop, setCurrentStop] = useState(0);
  const [showStopsList, setShowStopsList] = useState(false);
  const [showRouteTypeModal, setShowRouteTypeModal] = useState(false);
  const [routeType, setRouteType] = useState<RouteType>(null);

  const allStops: Stop[] = [
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

  // Get stops in correct order based on route type
  const stops = routeType === "dropoff"
    ? [...allStops].reverse()
    : allStops;

  // Function to send notification when student is picked up/dropped off
  const sendStopNotification = async (stop: Stop) => {
    console.log(`Sending notification for stop: ${stop.name}`);
    console.log(`Students at this stop: ${stop.students.join(", ")}`);

    const studentNames = stop.students.join(", ");
    const actionText = routeType === "pickup" ? "pickup" : "drop-off";
    Alert.alert(
      "Notification Sent",
      `Parents of ${studentNames} have been notified of ${actionText} at ${stop.name}`,
      [{ text: "OK" }]
    );
  };

  // Function to send notification when route is complete
  const sendRouteCompleteNotification = async () => {
    console.log(`Sending 'route complete' notification for ${routeType}`);

    const message = routeType === "pickup"
      ? "All parents have been notified that students arrived at school"
      : "All parents have been notified that students have been dropped off";

    Alert.alert(
      "Route Complete",
      message,
      [{ text: "OK" }]
    );
  };

  // Initial region centered on all stops
  const initialRegion = {
    latitude: 37.79025,
    longitude: -122.4304,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  };

  // Fit map to show all markers on mount
  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.fitToCoordinates(
          allStops.map((stop) => ({
            latitude: stop.latitude,
            longitude: stop.longitude,
          })),
          {
            edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
            animated: true,
          }
        );
      }, 500);
    }
  }, []);

  const handleStartRoute = () => {
    if (!routeStarted) {
      // Show modal to select route type
      setShowRouteTypeModal(true);
    } else {
      // Pause route
      setRouteStarted(false);
    }
  };

  const startRouteWithType = (type: RouteType) => {
    setRouteType(type);
    setShowRouteTypeModal(false);
    setRouteStarted(true);
    setCurrentStop(0);

    // Animate to first stop based on route type
    const firstStop = type === "dropoff" ? allStops[allStops.length - 1] : allStops[0];
    mapRef.current?.animateToRegion(
      {
        latitude: firstStop.latitude,
        longitude: firstStop.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000
    );
  };

  const markStopComplete = (stopId: number) => {
    console.log(`Completed stop ${stopId}`);
    // Move to next stop
    if (currentStop < stops.length - 1) {
      const nextStopIndex = currentStop + 1;
      setCurrentStop(nextStopIndex);

      // Animate to next stop
      mapRef.current?.animateToRegion(
        {
          latitude: stops[nextStopIndex].latitude,
          longitude: stops[nextStopIndex].longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000
      );
    }
  };

  const focusOnStop = (stop: Stop) => {
    console.log(`Focusing on stop: ${stop.name}`);
    mapRef.current?.animateToRegion(
      {
        latitude: stop.latitude,
        longitude: stop.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      500
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar style="dark" />

      {/* Route Type Selection Modal */}
      <Modal
        visible={showRouteTypeModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowRouteTypeModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 24,
              width: "80%",
              maxWidth: 400,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#111827",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              Select Route Type
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6B7280",
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              Choose whether you're picking up or dropping off students
            </Text>

            <TouchableOpacity
              onPress={() => startRouteWithType("pickup")}
              style={{
                backgroundColor: "#60A5FA",
                paddingVertical: 16,
                borderRadius: 12,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                🏠 Pick Up Route
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 12,
                  textAlign: "center",
                  marginTop: 4,
                  opacity: 0.9,
                }}
              >
                Start from stops → End at school
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => startRouteWithType("dropoff")}
              style={{
                backgroundColor: "#FDE68A",
                paddingVertical: 16,
                borderRadius: 12,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: "#92400E",
                  fontSize: 16,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                🏫 Drop Off Route
              </Text>
              <Text
                style={{
                  color: "#92400E",
                  fontSize: 12,
                  textAlign: "center",
                  marginTop: 4,
                  opacity: 0.8,
                }}
              >
                Start from school → End at stops
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowRouteTypeModal(false)}
              style={{
                paddingVertical: 12,
              }}
            >
              <Text
                style={{
                  color: "#6B7280",
                  fontSize: 14,
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
              {routeType === "pickup" ? "Pick Up Route" : routeType === "dropoff" ? "Drop Off Route" : "Morning Route"}
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
              backgroundColor: routeStarted ? "#EF4444" : "#60A5FA",
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

      {/* Real Map */}
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={initialRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={true}
          loadingEnabled={true}
        >
          {/* Draw route line between stops */}
          <Polyline
            coordinates={stops.map((stop) => ({
              latitude: stop.latitude,
              longitude: stop.longitude,
            }))}
            strokeColor="#2563EB"
            strokeWidth={4}
            lineDashPattern={[1]}
          />

          {/* Markers for each stop */}
          {stops.map((stop, index) => (
            <Marker
              key={stop.id}
              coordinate={{
                latitude: stop.latitude,
                longitude: stop.longitude,
              }}
              title={stop.name}
              description={`${stop.students.length} student${stop.students.length !== 1 ? "s" : ""
                } • ${stop.time}`}
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
                  alignItems: "center",
                }}
              >
                {/* Custom marker */}
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
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3,
                    elevation: 5,
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
                {/* Pointer triangle */}
                <View
                  style={{
                    width: 0,
                    height: 0,
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderLeftWidth: 6,
                    borderRightWidth: 6,
                    borderTopWidth: 8,
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderTopColor:
                      index === currentStop && routeStarted
                        ? "#2563EB"
                        : stop.students.length === 0
                          ? "#10B981"
                          : "#EF4444",
                  }}
                />
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
                backgroundColor: routeType === "pickup" ? "#DBEAFE" : "#FEF3C7",
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
                  color: routeType === "pickup" ? "#1E3A8A" : "#92400E",
                  marginBottom: 8,
                }}
              >
                Current Progress
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <Text style={{ fontSize: 14, color: routeType === "pickup" ? "#1E40AF" : "#78350F" }}>
                  Stop {currentStop + 1} of {stops.length}
                </Text>
                <Text
                  style={{ fontSize: 14, color: routeType === "pickup" ? "#1E40AF" : "#78350F", fontWeight: "500" }}
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
            <ChevronDown size={24} color="#60A5FA" />
          ) : (
            <ChevronUp size={24} color="#60A5FA" />
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
                  focusOnStop(stop);
                  setShowStopsList(false);
                }}
                style={{
                  backgroundColor: "#F9FAFB",
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  borderLeftWidth: 4,
                  borderLeftColor:
                    index === currentStop && routeStarted
                      ? (routeType === "pickup" ? "#60A5FA" : "#FDE68A")
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
                    <Users size={14} color={routeType === "pickup" ? "#60A5FA" : "#F59E0B"} />
                    <Text
                      style={{
                        fontSize: 14,
                        color: routeType === "pickup" ? "#60A5FA" : "#F59E0B",
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
                        backgroundColor: routeType === "pickup" ? "#60A5FA" : "#FDE68A",
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 6,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: routeType === "pickup" ? "#fff" : "#92400E",
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

      {/* Single Action Button */}
      {routeStarted && currentStop < stops.length && (
        <View
          style={{
            position: "absolute",
            bottom: insets.bottom + 20,
            left: 20,
            right: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              const currentStopData = stops[currentStop];
              // Safety check for currentStopData
              if (!currentStopData) return;

              // Mark stop complete and send notifications
              if (currentStopData.students.length > 0) {
                // This is a pickup/dropoff stop with students
                markStopComplete(currentStopData.id);
                sendStopNotification(currentStopData);
              } else {
                // This is the school - final stop
                markStopComplete(currentStopData.id);
                sendRouteCompleteNotification();
              }
            }}
            style={{
              backgroundColor: currentStop === stops.length - 1
                ? (routeType === "pickup" ? "#60A5FA" : "#FDE68A")
                : (routeType === "pickup" ? "#60A5FA" : "#FDE68A"),
              borderRadius: 12,
              paddingVertical: 18,
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
            <Text
              style={{
                color: routeType === "pickup" ? "#fff" : "#92400E",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              {currentStop === stops.length - 1
                ? routeType === "pickup"
                  ? "✓ Arrived at School - Complete Route"
                  : "✓ All Students Dropped Off - Complete Route"
                : `✓ ${routeType === "pickup" ? "Picked Up" : "Dropped Off"} ${stops[currentStop]?.students.length || 0} Student${(stops[currentStop]?.students.length || 0) !== 1 ? "s" : ""
                }`}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}