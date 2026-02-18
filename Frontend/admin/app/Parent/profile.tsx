import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ParentProfileCard() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@email.com");
  const [phone, setPhone] = useState("+1 234 567 890");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.screen}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => router.push("/Parent/settings")}
      >
        <Ionicons name="settings-outline" size={22} color="#374151" />
      </TouchableOpacity>
      <View style={styles.card}>
        {/* Profile Image */}
        <TouchableOpacity
          onPress={pickImage}
          activeOpacity={0.8}
          style={styles.imageWrapper}
        >
          <Image
            source={
              image ? { uri: image } : require("../../assets/images/user.png")
            }
            style={styles.profileImage}
          />

          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={14} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Parent Name */}
        <View style={styles.textContainer}>
          <Text style={styles.label}>Parent</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        {/*Parent Name*/}
        <Text style={styles.labelInput1}>Parent Name</Text>
        <View style={styles.inputBox1}>
          <Ionicons name="person-outline" size={18} color="#6B7280" />
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>
      </View>

      {/* Email */}
      <Text style={styles.labelInput2}>Email</Text>
      <View style={styles.inputBox2}>
        <Ionicons name="mail-outline" size={18} color="#6B7280" />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      {/* Phone */}
      <Text style={styles.labelInput3}>Phone</Text>
      <View style={styles.inputBox3}>
        <Ionicons name="call-outline" size={18} color="#6B7280" />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      {/* Registered Van Number */}
      <Text style={styles.labelInput4}>Registered Van number</Text>
      <View style={styles.inputBox4}>
        <Ionicons name="call-outline" size={18} color="#6B7280" />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#BCEAFB",
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  settingsButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },

  imageWrapper: {
    position: "relative",
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E5E7EB",
  },

  cameraIcon: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#3B82F6",
    padding: 6,
    borderRadius: 20,
  },

  textContainer: {
    marginLeft: 16,
  },

  label: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  detailsContainer: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  labelInput1: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
    marginLeft: 4,
  },

  inputBox1: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 20,
    marginLeft: 1,
  },
  labelInput2: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
    marginLeft: 20,
  },

  inputBox2: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 20,
    marginLeft: 16,
    marginRight: 15,
  },
  labelInput3: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
    marginLeft: 20,
  },

  inputBox3: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  labelInput4: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
    marginLeft: 20,
  },

  inputBox4: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
});
