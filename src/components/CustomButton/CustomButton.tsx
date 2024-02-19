import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
  additionalStyles,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
        additionalStyles,
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: "#F2B138",
  },
  container_SECONDARY: {
    backgroundColor: "#003f63",
  },
  container_TERTIARY: {
    backgroundColor: "transparent",
  },
  text: {
    fontWeight: "bold",
  },
  text_PRIMARY: {
    color: "white",
  },
  text_SECONDARY: {
    color: "black",
  },
  text_TERTIARY: {
    color: "#999999",
  },
});

export default CustomButton;
