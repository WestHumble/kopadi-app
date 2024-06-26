import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable, Platform, Linking,
} from "react-native";
import React, { useRef, useEffect, useState, useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { LatLngData, MarkerData } from "../../types/marker";
import { LocationContext } from "../../context/LocationContext";
import { ApiContext } from "../../context/ApiContext";
import { EventsContext } from "../../context/EventsContext";
import { FriendsContext } from "../../context/FriendsContext";
import { Friend } from "../../types/friend";
import { Event } from "../../types/event";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import eventsRefreshImg from "../../../assets/images/refresh.png";
import eventsClearImg from "../../../assets/images/searchClear.png";
import eventsAddImg from "../../../assets/images/addevent.png";
import Avatar from "../Avatar";

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
  const { userLocation, mapViewRef, eventsRef, friendsRef } = useContext(LocationContext);
  const { friends } = useContext(FriendsContext);
  const { get, userToken } = useContext(ApiContext);
  const [isUserLocationHandled, setUserLocationHandled] = useState(false);
  const [region, setRegion] = useState({
    latitude: userLocation?.coords.latitude ?? 52.4064,
    longitude: userLocation?.coords.longitude ?? 16.9252,
    latitudeDelta: 0.14,
    longitudeDelta: 0.16,
  });
  const mapStyle = [
    {
      featureType: "poi.attraction",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.business",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.business",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.business",
      elementType: "geometry.stroke",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.business",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.business",
      elementType: "labels.text.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.business",
      elementType: "labels.text.stroke",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.government",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.medical",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.school",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.sports_complex",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];

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

  const [friendsMarkers, setFriendsMarkers] = useState<MarkerData[]>([]);

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };
  const onLoadCloseEvents = () => {
    loadCloseEvents(region);
    reloadMarkers();
  };

  useEffect(() => {
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion(region, 1000);
    }
  }, []);

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
        if (!friend) continue;
        newMarkers.push({
          id: friend?.id,
          latlng: latlngData,
          name: friend?.name,
          surname: friend?.surname,
        });
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
  }, [userToken, friends]);

  const reloadMarkers = () => {
    eventsRef.current.forEach((marker) => {
      if (marker !== null) marker.redraw();
    });
    friendsRef.current.forEach((marker) => {
      if (marker !== null) marker.redraw();
    });
  };
  const renderMarker = (event: Event, source) => {
    if (event.latlng === null) {
      return;
    }
    return (
      <Marker
        ref={(el) => (eventsRef.current[event.id] = el)}
        key={event.id}
        coordinate={event.latlng}
        title={event.name}
        description={event.description}
        tracksViewChanges={false}
        onCalloutPress={() => {
          navigation.navigate("EventView", { eventId: event.id });
        }}
      >
        <View>
          <Image
            source={source}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </View>
      </Marker>
    );
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    reloadMarkers();
    const interval = setInterval(() => reloadMarkers(), 5000);
    return () => clearInterval(interval);
  }, [isFocused, friendsMarkers, eventsRef, friendsRef]);

  return (
    <>
      <MapView
        style={styles.map}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        onRegionChange={onRegionChange}
        showsUserLocation={true}
        userInterfaceStyle="dark"
        followsUserLocation={true}
        rotateEnabled={false}
        ref={mapViewRef}
        toolbarEnabled={false}
      >
        {(isSearchActive ? eventsCreatedSearch : eventsCreated).map((marker) =>
          renderMarker(marker, require("../../../assets/images/pin-green.png"))
        )}
        {(isSearchActive ? eventsInvitedSearch : eventsInvited).map((marker) =>
          renderMarker(marker, require("../../../assets/images/pin.png"))
        )}
        {(isSearchActive ? eventsOtherSearch : eventsOther).map((marker) =>
          renderMarker(marker, require("../../../assets/images/pin-blue.png"))
        )}
        {friendsMarkers.map((marker, index) => {
          if (marker.latlng === null) {
            return;
          }
          return (
            <Marker
              ref={(el) => (friendsRef.current[marker.id] = el)}
              key={index}
              coordinate={marker.latlng}
              title={marker.name}
              description={marker.description}
              tracksViewChanges={false}
              onCalloutPress={() => {
                navigation.navigate("DisplayProfile", {
                  userId: marker.id,
                  userName: marker.name,
                  userSurname: marker.surname,
                });
              }}
            >
              <View style={styles.avatarDiv}>
                <Avatar
                  style={styles.avatar}
                  userId={marker.id}
                  userName={marker.name}
                  userSurname={marker.surname}
                />
              </View>
            </Marker>
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
    top: "57%",
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 0,
    padding: 0,
    backgroundColor: "#F2B138",
  },
  avatarDiv: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 0,
    padding: 0,
    backgroundColor: "#F2B138",
  },
});

export default MapViewComponent;
