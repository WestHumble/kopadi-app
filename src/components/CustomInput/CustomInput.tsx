import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#e8e8e8",
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "white",
    width: "100%",
  },
  input: {
    height: 40,
  },
});

export default CustomInput;
