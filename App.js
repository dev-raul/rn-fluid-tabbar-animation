import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import TabBar from "./TabBar";

export default function App() {
  const tabs = [
    {
      name: "grid",
    },
    {
      name: "list",
    },
    {
      name: "repeat",
    },
    {
      name: "map",
    },
    {
      name: "user",
    },
  ];

  return (
    <View style={styles.container}>
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eb3345",
    justifyContent: "flex-end",
  },
});
