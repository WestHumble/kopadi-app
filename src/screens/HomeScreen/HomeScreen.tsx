import { View, Text, StyleSheet } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";

const HomeScreen = () => {
  const navigation = useNavigation();
  const mapViewRef = useRef<MapView>(null);
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

  useEffect(() => {
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion(region, 1000);
    }
  }, []);

  const onRegionChange = (newRegion) => {
    // Dodaj dowolną logikę, jeśli potrzebujesz reagować na zmiany regionu mapy
    // Consol loguje informacje o zmianie regionu
    // console.log("Region changed:", newRegion);
  };

  const onBackToLoginPress = () => {
    navigation.navigate("SignIn");
  };
  return (
    <View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        onRegionChange={onRegionChange}
        showsUserLocation={true}
        showsMyLocationButton={true}
        userInterfaceStyle="dark"
        followsUserLocation={true}
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
      <CustomButton
        additionalStyles={{
          position: "absolute",
          top: "89%",
          left: 0,
          width: "65%",
          marginHorizontal: "5%",
        }}
        text="Cofnij"
        onPress={onBackToLoginPress}
        type="PRIMARY"
        bgColor={undefined}
        fgColor={undefined}
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
