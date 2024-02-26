import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import MapView from "../../components/MapView";

const HomeScreen = () => {
  const [region, setRegion] = useState({
    latitude: 52.4064,
    longitude: 16.9252,
    latitudeDelta: 0.14,
    longitudeDelta: 0.16,
  });

  const markers = [
    {
      latlng: { latitude: 52.4064, longitude: 16.9252 },
      title: "Marker 1",
      description: "Opis Marker 1",
    },
    // Dodaj więcej markerów według potrzeb
  ];

  const onRegionChange = (newRegion) => {
    // Dodaj dowolną logikę, jeśli potrzebujesz reagować na zmiany regionu mapy
    // Consol loguje informacje o zmianie regionu
    // console.log("Region changed:", newRegion);
  };

  return (
    <View>
      <MapView
        region={region}
        onRegionChange={onRegionChange}
        markers={markers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default HomeScreen;
