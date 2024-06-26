import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
  additionalStyles,
  additionalStylesText,
  disabled,
}) => {
  return (
    <Pressable
      disabled={disabled}
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
          additionalStylesText,
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
    height: 60,
    padding: 0,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "center",
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
