import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Clock, TrafficCone, Wrench, Cloud, AlertCircle, CheckCircle, LucideIcon } from "lucide-react-native";

interface QuickAlert {
    id: number;
    icon: LucideIcon;
    text: string;
    message: string;
}

// Configure how notifications should be handled when app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function DriverAlert() {
    const insets = useSafeAreaInsets();
    const [selectedAlert, setSelectedAlert] = useState<number | null>(null);
    const [customMessage, setCustomMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState<string>("");
    const maxLength = 100;

    const quickAlerts: QuickAlert[] = [
        {
            id: 1,
            icon: Clock,
            text: "Running 10 mins late",
            message: "Running 10 mins late",
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

    // Get Expo Push Token on component mount
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            if (token) {
                setExpoPushToken(token);
                console.log("Expo Push Token:", token);
                // TODO: Send this token to your backend to store for this driver
            }
        });
    }, []);

    // Function to register for push notifications and get token
    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            
            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            
            if (finalStatus !== "granted") {
                console.log("Push notification permissions not granted");
                return;
            }
            
            try {
                token = (await Notifications.getExpoPushTokenAsync({
                    projectId: "7c01cf21-d0c7-4d53-a992-5d74bfde98f2",
                })).data;
            } catch (error) {
                console.error("Error getting push token:", error);
            }
        } else {
            console.log("Not a physical device - push notifications won't work");
        }

        return token;
    }

    // Function to handle selection of quick alert options
    const handleQuickAlert = (alert: QuickAlert) => {
        setSelectedAlert(alert.id);
        setCustomMessage("");
    };

    // Function to send alert via your backend OR send test notification locally
    const handleSendAlert = async () => {
        const messageToSend =
            customMessage.trim() ||
            quickAlerts.find((a) => a.id === selectedAlert)?.message;
    
        // Validation if no message
        if (!messageToSend) {
            Alert.alert("No message", "Please select an alert or type a message.");
            return;
        }

        setIsSending(true);

        try {
            // OPTION 1: Send via your backend (when ready)
            /*
            const response = await fetch("https://your-backend-api.com/api/send-alert", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    driverToken: expoPushToken,
                    message: messageToSend,
                    timestamp: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send alert");
            }

            const result = await response.json();
            */

            // OPTION 2: Send test notification locally (only if on physical device with token)
            if (expoPushToken && Device.isDevice) {
                await sendTestNotification(messageToSend);
            }
            
            // Success feedback - ALWAYS show this regardless of device type
            Alert.alert(
                "Alert Sent Successfully",
                `Message sent to all parents: "${messageToSend}"`,
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
        } catch (error) {
            console.error("Error sending alert:", error);
            Alert.alert(
                "Error",
                "Failed to send alert. Please check your connection and try again.",
                [{ text: "OK" }]
            );
        } finally {
            setIsSending(false);
        }
    };

    // Helper function to send test notification locally (for testing)
    const sendTestNotification = async (message: string) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Driver Alert 🚐",
                body: message,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
            },
            trigger: null, // Send immediately
        });
    };

    // Header section of screen
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
                
                {/* Show connection status */}
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                    <View
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: expoPushToken ? "#10B981" : "#EF4444",
                            marginRight: 6,
                        }}
                    />
                    <Text style={{ fontSize: 14, color: "#6B7280" }}>
                        {expoPushToken ? "Connected to notification service" : "Not connected"}
                    </Text>
                </View>
            </View>

            {/* Scrollable content area with "Quick Alerts" */}
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Quick alert section */}
                <View style={{ padding: 20}}>
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

                    {/* Quick alert grid */}
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
                                    disabled={isSending}
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
                                        opacity: isSending ? 0.5 : 1,
                                    }}
                                >
                                    <View style={{ marginBottom: 12 }}>
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

                    {/* Custom message section */}
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
                                editable={!isSending}
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

                    {/* Info Box */}
                    <View
                        style={{
                            backgroundColor: "#EFF6FF",
                            borderRadius: 12,
                            padding: 16,
                            marginTop: 20,
                            borderLeftWidth: 4,
                            borderLeftColor: "#2563EB",
                        }}
                    >
                        <Text style={{ fontSize: 14, color: "#1E40AF", lineHeight: 20 }}>
                            <Text style={{ fontWeight: "600" }}>ℹ️ Note: </Text>
                            {expoPushToken 
                                ? "This alert will be sent as a test notification to your device. In production, it will be sent to all parents via your backend server."
                                : "Testing on simulator - notifications won't actually be sent, but you'll see the confirmation message. Use a physical device for real notifications."}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Send alert button */}
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
                    disabled={isSending}
                    style={{
                        backgroundColor: isSending ? "#9CA3AF" : "#2563EB",
                        borderRadius: 12,
                        paddingVertical: 16,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2},
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        flexDirection: "row",
                        justifyContent: "center",
                    }}    
                >
                    {isSending ? (
                        <>
                            <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
                            <Text
                                style={{
                                    color: "#fff",
                                    fontSize: 17,
                                    fontWeight: "bold",
                                }}
                            >
                                Sending...
                            </Text>
                        </>
                    ) : (
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 17,
                                fontWeight: "bold",
                            }}
                        >
                            Send Alert
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}