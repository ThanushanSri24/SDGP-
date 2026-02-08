import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ParentProfileCard() {
  const [image, setImage] = useState<string | null>(null);

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
        <Text style={styles.name}>Jane Doe</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
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
});
