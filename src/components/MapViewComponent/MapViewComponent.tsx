import React, { useRef, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";

const MapViewComponent = () => {
  const mapViewRef = useRef(null);
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

  useEffect(() => {
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion(region, 1000);
    }
  }, [region]);

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={region}
      onRegionChange={onRegionChange}
      showsUserLocation={true}
      userInterfaceStyle="dark"
      followsUserLocation={true}
      ref={mapViewRef}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapViewComponent;
