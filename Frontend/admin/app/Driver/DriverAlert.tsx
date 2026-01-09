import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    Clock, TrafficCone, Wrench, Cloud, AlertCircle, CheckCircle,
} from "lucide-react-native";

export default function AlertScreen() {
    const insets = useSafeAreaInsets();
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [customMessage, setCustomMessage] = useState("");
    const maxLength = 100;

    const quickAlerts = [
        {
            id: 1,
            icon: Clock,
            text: "Running 10 mins late",
            message: "Running 1 0 mins late",
        },
        {
            id: 2,
            icon: TrafficCone,
            text: "Heavy traffic delay",
            message: "Experiencing heavy traffic delay",
        },
        {
            id: 3,
            icon: Wrench,
            text: "Mechanical issue",
            message: "Van has a mechanical issue",
        },
        {
            id: 4,
            icon: Cloud,
            text: "Delay due to weather",
            message: "Delay due to weather conditions",
        },
        {
            id: 5,
            icon: AlertCircle,
            text: "Accident",
            message: "Accident on route - expect delays",
        },
        {
            id: 6,
            icon: CheckCircle,
            text: "All students dropped off",
            message: "All students have been dropped off",
        },
    ];
    // function to handle selection of quick alert options
    const handleQuickAlert = (alert) => {
        setSelectedAlert(alert.id);
        setCustomMessage("");
    };

    //function to handle custom message option
    const handleSendAlert = async () => {
        const messageToSend =
            customMessage.trim() ||
            quickAlerts.find((a) => a.id === selectedAlert)?.message;

        //validation if no message
        if (!messageToSend) {
            Alert.alert("No message", "Please select an alert or type a message.");
            return;
        }

        // API Endpoint configuration
        const API_URL = Platform.select({
            android: 'http://10.0.2.2:3000/api/trips/alert',
            ios: 'http://localhost:3000/api/trips/alert',
            default: 'http://localhost:3000/api/trips/alert',
        });

        // TODO: Replace with actual logged-in driver ID
        const TEST_DRIVER_ID = "driver_001";

        try {
            console.log("Sending alert to:", API_URL);
            const response = await fetch(API_URL!, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    driverId: TEST_DRIVER_ID,
                    message: messageToSend,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert(
                    "Alert Sent",
                    `Message sent to parents: "${messageToSend}"`,
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                setSelectedAlert(null);
                                setCustomMessage("");
                            },
                        },
                    ],
                );
            } else {
                throw new Error(data.error || "Failed to send alert");
            }
        } catch (error: any) {
            console.error("Alert Error:", error);
            Alert.alert("Error", error.message || "Could not send alert. Please try again.");
        }
    };

    //Header section of screen
    return (
        <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
            <StatusBar style="dark" />

            <View
                style={{
                    backgroundColor: "#fff",
                    paddingTop: insets.top + 20,
                    paddingHorizontal: 20,
                    paddingBottom: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#E5E7EB",
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "#111827",
                    }}
                >
                    Send Parent Alert
                </Text>

            </View>

            {/*scrollable content area with "Quick Alerts"*/}
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/*Quick alert section*/}
                <View style={{ padding: 20 }}>
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            color: "#111827",
                            marginBottom: 20,

                        }}
                    >
                        Quick Alerts
                    </Text>

                    {/*Quick alert grid*/}
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                        }}
                    >
                        {quickAlerts.map((alert) => {
                            const Icon = alert.icon;
                            const isSelected = selectedAlert === alert.id;
                            return (
                                <TouchableOpacity
                                    key={alert.id}
                                    onPress={() => handleQuickAlert(alert)}
                                    style={{
                                        width: "48%",
                                        backgroundColor: isSelected ? "#EFF6FF" : "#F3F4F6",
                                        borderRadius: 16,
                                        padding: 20,
                                        marginBottom: 16,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        minHeight: 140,
                                        borderWidth: isSelected ? 2 : 0,
                                        borderColor: "#2563EB",
                                    }}
                                >
                                    <View
                                        style={{
                                            marginBottom: 12,
                                        }}
                                    >
                                        <Icon size={40} color="#2563EB" strokeWidth={2} />
                                    </View>
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontWeight: "500",
                                            color: "#111827",
                                            textAlign: "center",
                                        }}
                                    >
                                        {alert.text}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/*custom message section*/}
                    <View style={{ marginTop: 24 }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#111827",
                                marginBottom: 12,
                                fontWeight: "500",
                            }}
                        >
                            Type a custom message below.
                        </Text>

                        <View
                            style={{
                                backgroundColor: "#F3F4F6",
                                borderRadius: 12,
                                padding: 16,
                                minHeight: 120,
                            }}
                        >
                            <TextInput
                                style={{
                                    fontSize: 15,
                                    color: "#111827",
                                    flex: 1,
                                    textAlignVertical: "top",
                                }}
                                placeholder="Detour due to closure on street."
                                placeholderTextColor="#9CA3AF"
                                multiline
                                maxLength={maxLength}
                                value={customMessage}
                                onChangeText={(text) => {
                                    setCustomMessage(text);
                                    if (text.trim()) {
                                        setSelectedAlert(null);
                                    }
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "#6B7280",
                                    textAlign: "right",
                                    marginTop: 8,
                                }}
                            >
                                {customMessage.length}/{maxLength}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/*Send alert button*/}
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "#fff",
                    paddingHorizontal: 20,
                    paddingTop: 16,
                    paddingBottom: insets.bottom + 16,
                    borderTopWidth: 1,
                    borderTopColor: "#E5E7EB",
                }}
            >
                <TouchableOpacity
                    onPress={handleSendAlert}
                    style={{
                        backgroundColor: "#2563EB",
                        borderRadius: 12,
                        paddingVertical: 16,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 17,
                            fontWeight: "bold",

                        }}
                    >
                        Send Alert
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}


