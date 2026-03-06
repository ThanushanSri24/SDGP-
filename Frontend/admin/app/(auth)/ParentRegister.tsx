import React, { useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { Picker } from "@react-native-picker/picker";

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

export default function ParentRegisterScreen() {
  const scrollRef = useRef<ScrollView | null>(null);
  const router = useRouter();
  const { register, isLoading } = useAuth();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [childName, setChildName] = React.useState("");
  const [childClass, setChildClass] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [drivers, setDrivers] = React.useState<any[]>([]);
  const [selectedDriver, setSelectedDriver] = React.useState("");

  // Fetch drivers
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "drivers"));
        const driverList: any[] = [];

        snapshot.forEach((docItem) => {
          driverList.push({
            id: docItem.id,
            ...docItem.data(),
          });
        });

        setDrivers(driverList);
      } catch (error) {
        console.log("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  const handleRegister = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (
      !name ||
      !cleanEmail ||
      !password ||
      !confirmPassword ||
      !selectedDriver
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // Proper email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      await register(cleanEmail, password, "parent");

      if (auth.currentUser) {
        await setDoc(doc(db, "parents", auth.currentUser.uid), {
          name: name.trim(),
          email: cleanEmail,
          phone: phone.trim(),
          childName: childName.trim(),
          childClass: childClass.trim(),
          role: "parent",
          assignedDriverId: selectedDriver,
          createdAt: new Date().toISOString(),
        });
      }

      router.replace("/Parent");
    } catch (error: any) {
      console.log("Registration error:", error);
      Alert.alert(
        "Registration Failed",
        error.message || "Something went wrong"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Parent Portal</Text>
            <Text style={styles.subtitle}>
              Track your child’s school van in real time
            </Text>
          </View>

          <View style={styles.form}>
            {input("account", "Parent Name", "Enter your full name", false, scrollRef, 0, name, setName)}
            {input("email-outline", "Email", "Enter your email", false, scrollRef, 0, email, setEmail, true)}
            {input("phone-outline", "Phone Number", "Enter phone number", false, scrollRef, 0, phone, setPhone)}
            {input("account-child-outline", "Student Name", "Enter child’s name", false, scrollRef, 150, childName, setChildName)}
            {input("school-outline", "Current Class", "e.g. Grade 5A", false, scrollRef, 200, childClass, setChildClass)}
            {input("lock-outline", "Password", "Create password", true, scrollRef, 300, password, setPassword)}
            {input("lock-check-outline", "Confirm Password", "Re-enter password", true, scrollRef, 350, confirmPassword, setConfirmPassword)}

            {/* Driver Picker */}
            {/* <View style={{ marginBottom: 14 }}>
              <Text style={styles.label}>Select Driver</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selectedDriver}
                  onValueChange={(itemValue) => setSelectedDriver(itemValue)}
                >
                  <Picker.Item label="Select a driver..." value="" />
                  {drivers.map((driver) => (
                    <Picker.Item
                      key={driver.id}
                      label={driver.name}
                      value={driver.id}
                    />
                  ))}
                </Picker>
              </View>
            </View> */}

            <TouchableOpacity
              style={styles.button}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Registering..." : "Register"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const input = (
  iconName: IconName,
  label: string,
  placeholder: string,
  secure: boolean,
  scrollRef: React.RefObject<ScrollView | null>,
  scrollY: number,
  value: string,
  setValue: (text: string) => void,
  isEmail: boolean = false
) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <MaterialCommunityIcons name={iconName} size={20} color="#777" />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={secure}
        style={styles.input}
        value={value}
        onChangeText={setValue}
        keyboardType={isEmail ? "email-address" : "default"}
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={() =>
          scrollRef?.current?.scrollTo({ y: scrollY, animated: true })
        }
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8f8ffff" },
  scroll: { padding: 20, paddingBottom: 40 },
  header: { alignItems: "center", marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "700", color: "#222", marginTop: 20 },
  subtitle: { fontSize: 13, color: "#666", textAlign: "center", marginTop: 5 },
  form: { backgroundColor: "#fff", borderRadius: 18, padding: 18 },
  field: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: "600", marginBottom: 6, color: "#333" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#71d6f3ff",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#FAFAFA",
  },
  input: { flex: 1, height: 46, marginLeft: 8, fontSize: 14, color: "#000" },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#71d6f3ff",
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
  },
  button: {
    backgroundColor: "#5AA9E6",
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
