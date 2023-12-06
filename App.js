import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Button, StyleSheet } from "react-native";

const App = () => {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    setCounter(counter - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Licznik: {counter}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Zwiększ" onPress={incrementCounter} />
        <Button title="Zmniejsz" onPress={decrementCounter} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
});

export default App;
