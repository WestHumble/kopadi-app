import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useRef, useEffect, useState, useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import CustomButton from "../../components/CustomButton";
import { LatLngData, MarkerData } from "../../types/marker";
import { LocationContext } from "../../context/LocationContext";
import { ApiContext } from "../../context/ApiContext";
import { EventsContext } from "../../context/EventsContext";
import { FriendsContext } from "../../context/FriendsContext";
import { Friend } from "../../types/friend";
import { Event } from "../../types/event";
import { useNavigation } from "@react-navigation/native";
import { BorderlessButton } from "react-native-gesture-handler";
import eventsRefreshImg from "../../../assets/images/refresh.png";
import eventsClearImg from "../../../assets/images/searchClear.png";
import eventsAddImg from "../../../assets/images/addevent.png";

const MapViewComponent = () => {
  const navigation = useNavigation();
  const {
    eventsCreated,
    eventsInvited,
    eventsOther,
    eventsCreatedSearch,
    eventsInvitedSearch,
    eventsOtherSearch,
    loadCloseEvents,
    clearSearchEvents,
    isSearchActive,
  } = useContext(EventsContext);
  const { userLocation, shareLocation, setShareLocation } =
    useContext(LocationContext);
  const { friends } = useContext(FriendsContext);
  const { get, userToken } = useContext(ApiContext);
  const mapViewRef = useRef<MapView>(null);
  const [isUserLocationHandled, setUserLocationHandled] = useState(false);
  const [region, setRegion] = useState({
    latitude: userLocation?.coords.latitude ?? 52.4064,
    longitude: userLocation?.coords.longitude ?? 16.9252,
    latitudeDelta: 0.14,
    longitudeDelta: 0.16,
  });
  useEffect(() => {
    if (isUserLocationHandled || !userLocation) return;
    setUserLocationHandled(true);
    let regionUser = {
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
      latitudeDelta: 0.14,
      longitudeDelta: 0.16,
    };
    loadCloseEvents(regionUser);
  }, [userLocation]);

  const [markers, setMarkers] = useState<Event[]>([]);
  const [friendsMarkers, setFriendsMarkers] = useState<MarkerData[]>([]);

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };
  const onLoadCloseEvents = () => {
    loadCloseEvents(region);
  };

  useEffect(() => {
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion(region, 1000);
    }
  }, []);

  useEffect(() => {
    if (isSearchActive) {
      setMarkers(
        eventsCreatedSearch.concat(eventsInvitedSearch, eventsOtherSearch)
      );
      return;
    }
    setMarkers(eventsCreated.concat(eventsInvited, eventsOther));
  }, [
    eventsCreated,
    eventsInvited,
    eventsOther,
    eventsCreatedSearch,
    eventsInvitedSearch,
    eventsOtherSearch,
    isSearchActive,
  ]);
  const addEventPressed = () => {
    navigation.navigate("AddEvent");
  };
  const updateFriendsMarkers = () => {
    get("user/location/get-friends", null, (res) => {
      let latlngData: LatLngData;
      let friend: Friend;
      let newMarkers: MarkerData[] = [];
      for (var k in res.data) {
        latlngData = res.data[k];
        friend = friends.filter((friend) => friend.id == k).pop();
        newMarkers.push({ latlng: latlngData, name: friend?.name ?? k });
      }
      setFriendsMarkers(newMarkers);
    });
  };

  useEffect(() => {
    if (!userToken) {
      return;
    }
    updateFriendsMarkers();
    const interval = setInterval(
      () => updateFriendsMarkers(),
      parseInt(process.env.EXPO_PUBLIC_LOCALIZATION_UPDATE_TIME)
    );
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
        {markers.map((marker) => {
          if (marker.latlng === null) {
            return;
          }
          return (
            <Marker
              key={marker.id}
              coordinate={marker.latlng}
              title={marker.name}
              description={marker.description}
              tracksViewChanges={false}
              onPress={() => {
                navigation.navigate("EventView", { eventId: marker.id });
              }}
              onCalloutPress={() => {
                navigation.navigate("EventView", { eventId: marker.id });
              }}
            >
              <View>
                <Image
                  source={require("../../../assets/images/pin.png")}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
              </View>
            </Marker>
          );
        })}
        {friendsMarkers.map((marker, index) => {
          if (marker.latlng === null) {
            return;
          }
          return (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.name}
              description={marker.description}
              tracksViewChanges={false}
            />
          );
        })}
      </MapView>
      <View style={styles.buttonsGroup}>
        {isSearchActive && (
          <View style={styles.clearButton}>
            <Pressable onPress={clearSearchEvents}>
              <Image
                source={eventsClearImg}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </Pressable>
          </View>
        )}
        <View style={styles.refreshButton}>
          <Pressable onPress={onLoadCloseEvents}>
            <Image
              source={eventsRefreshImg}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </Pressable>
        </View>
        <View style={styles.addEventButton}>
          <Pressable onPress={addEventPressed}>
            <Image
              source={eventsAddImg}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </Pressable>
        </View>
      </View>
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
  callout: {
    backgroundColor: "#131417",
    width: 240,
    borderRadius: 20,
    padding: 20,
    display: "none",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 0,
  },
  description: {
    color: "#fff",
    fontSize: 14,
  },
  address: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 20,
  },
  date: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 0,
  },
  hr: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  buttonsGroup: {
    position: "absolute",
    top: "60%",
    right: "5%",
    height: 215,
    // borderStyle: "solid",
    // borderWidth: 3,
    // borderColor: "#131417",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    alignContent: "space-between",
  },
  addEventButton: {
    backgroundColor: "#F2B138",
    borderRadius: 50,
    padding: 12,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#131417",
    marginVertical: 5,
  },
  clearButton: {
    backgroundColor: "#F2B138",
    borderRadius: 50,
    padding: 12,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#131417",
    marginVertical: 5,
  },
  refreshButton: {
    backgroundColor: "#F2B138",
    borderRadius: 50,
    padding: 12,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#131417",
    marginVertical: 5,
  },
});

export default MapViewComponent;
