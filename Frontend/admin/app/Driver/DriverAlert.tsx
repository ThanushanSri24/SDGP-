import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Clock, TrafficCone, Wrench, Cloud, AlertCircle, CheckCircle,
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
           message: "Accident on route - expext delays",
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
    const handleSendAlert = () => {
        const messageToSend =
            customMessage.trim() ||
            quickAlerts.find((a) => a.id === selectedAlert)?.message;
    
    //validation if no message
        if(!messageToSend) {
            Alert.alert("No message", "Please select an alert or type a message.");
            return;
        }
        
        }
    
}


