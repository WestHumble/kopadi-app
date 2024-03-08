import { StyleSheet } from "react-native";
import React, { useRef, useEffect, useState, useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import CustomButton from "../../components/CustomButton";
import {LatLngData, MarkerData} from "../../types/marker";
import { LocationContext } from "../../context/LocationContext";
import { getCloseEvents } from "../../components/Api/event";
import {getFriendsLocations} from "../Api/location";
import {AuthContext} from "../../context/AuthContext";

const MapViewComponent = () => {
  const { userLocation, shareLocation, setShareLocation } =
    useContext(LocationContext);
  const mapViewRef = useRef<MapView>(null);
  const [region, setRegion] = useState({
    latitude: userLocation?.coords.latitude ?? 52.4064,
    longitude: userLocation?.coords.longitude ?? 16.9252,
    latitudeDelta: 0.14,
    longitudeDelta: 0.16,
  });

  const {userToken} = useContext(AuthContext);

  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [friendsMarkers, setFriendsMarkers] = useState<MarkerData[]>([]);

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };
  const onShareLocationToggle = () => {
    setShareLocation(!shareLocation);
  };
  const onLoadCloseEvents = () => {
    getCloseEvents(region.latitude, region.longitude, 1000)
      .then((res) => setMarkers(res.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion(region, 1000);
    }
  }, []);

  const updateFriendsMarkers = () => {
      getFriendsLocations()
          .then((res) => {
              let latlngData : LatLngData
              let newMarkers : MarkerData[] = []
              for(var k in res.data) {
                  latlngData = res.data[k]
                  newMarkers.push({ latlng: latlngData, name: k, description: "friend" })
              }
              setFriendsMarkers(newMarkers)
          })
          .catch((error) => console.error(error));
  }

    useEffect(() => {
        if (!userToken) {
            return
        }
        updateFriendsMarkers();
        const interval = setInterval(() => updateFriendsMarkers(), parseInt(process.env.EXPO_PUBLIC_LOCALIZATION_UPDATE_TIME));
        return () => clearInterval(interval);
    }, [userToken]);

  return (
    <>
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
            title={marker.name}
            description={marker.description}
          />
        ))}
      {friendsMarkers.map((marker, index) => (
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
          top: "70%",
          left: "35%",
          width: "20%",
          marginHorizontal: "5%",
        }}
        text={shareLocation ? "Sharing on" : "Sharing off"}
        onPress={onShareLocationToggle}
        type="PRIMARY"
        bgColor={undefined}
        fgColor={undefined}
      />
      {/*<CustomButton*/}
      {/*  additionalStyles={{*/}
      {/*    position: "absolute",*/}
      {/*    top: "89%",*/}
      {/*    left: "70%",*/}
      {/*    width: "20%",*/}
      {/*    marginHorizontal: "5%",*/}
      {/*  }}*/}
      {/*  text="Load close events"*/}
      {/*  onPress={onLoadCloseEvents}*/}
      {/*  type="PRIMARY"*/}
      {/*  bgColor={undefined}*/}
      {/*  fgColor={undefined}*/}
      {/*/>*/}
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
    elevation: 1,
  },
});

export default MapViewComponent;
