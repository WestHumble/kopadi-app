import {View, Text, StyleSheet, Image} from "react-native";
import React, {useRef, useEffect, useState, useContext} from "react";
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import {MarkerData} from "../../types/marker";
import {LocationContext} from "../../context/LocationContext";
import {getCloseEvents} from "../../components/Api/event";

const HomeScreen = () => {
  const { userLocation, shareLocation, setShareLocation } = useContext(LocationContext)
  const navigation = useNavigation();
  const mapViewRef = useRef<MapView>(null);
  const [region, setRegion] = useState({
    latitude: userLocation?.coords.latitude,
    longitude: userLocation?.coords.longitude,
    latitudeDelta: 0.14,
    longitudeDelta: 0.16,
  });
    const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion(region, 1000);
    }
  }, []);

  const onRegionChange = (newRegion) => {
      setRegion(newRegion)
  };
    const onBackToLoginPress = () => {
        navigation.navigate("SignIn");
    };
    const onShareLocationToggle = () => {
        setShareLocation(!shareLocation)
    };

    const onLoadCloseEvents = () => {
        getCloseEvents(region.latitude, region.longitude, 1000)
            .then(res => setMarkers(res.data))
            .catch(error => console.error(error))
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
            title={marker.name}
            description={marker.description}
          />
        ))}
      </MapView>
        <CustomButton
            additionalStyles={{
                position: "absolute",
                top: "89%",
                left: 0,
                width: "20%",
                marginHorizontal: "5%",
            }}
            text="Cofnij"
            onPress={onBackToLoginPress}
            type="PRIMARY"
            bgColor={undefined}
            fgColor={undefined}
        />
        <CustomButton
        additionalStyles={{
            position: "absolute",
            top: "89%",
            left: "35%",
            width: "20%",
            marginHorizontal: "5%",
        }}
        text={shareLocation ? "Sharing on": "Sharing off"}
        onPress={onShareLocationToggle}
        type="PRIMARY"
        bgColor={undefined}
        fgColor={undefined}
    />
        <CustomButton
            additionalStyles={{
                position: "absolute",
                top: "89%",
                left: "70%",
                width: "20%",
                marginHorizontal: "5%",
            }}
            text="Load close events"
            onPress={onLoadCloseEvents}
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
