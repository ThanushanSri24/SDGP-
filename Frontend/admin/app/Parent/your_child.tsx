import { StyleSheet, Text, View } from "react-native";

export default function YourChildScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Child</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  text: { fontSize: 20 },
});
