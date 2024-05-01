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
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.latlng}
            title={marker.name}
            description={marker.description}
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
            <Callout tooltip style={styles.callout}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EventView", { eventId: marker.id });
                }}
              >
                <Text style={styles.title}>{marker.name}</Text>
                <View style={styles.hr} />
                <Text style={styles.date}>
                  {new Date(marker.date.date).toLocaleString([], {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <View style={styles.hr} />
                <Text style={styles.address}>{marker.address}</Text>
                <CustomButton
                  text="Szczegóły wydarzenia"
                  onPress={() => {
                    navigation.navigate("EventView", { eventId: marker.id });
                  }}
                  type="PRIMARY"
                  bgColor={undefined}
                  fgColor={undefined}
                  additionalStyles={undefined}
                />
              </TouchableOpacity>
            </Callout>
          </Marker>
        ))}
        {friendsMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.name}
            description={marker.description}
          >
            <Callout tooltip style={styles.callout}>
              <View>
                <Text style={styles.title}>{marker.name}</Text>
                <Text style={styles.description}>{marker.description}</Text>
                <CustomButton
                  text="Details"
                  onPress={() => {}}
                  type="PRIMARY"
                  bgColor={undefined}
                  fgColor={undefined}
                  additionalStyles={undefined}
                />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {isSearchActive && (
        <View
          style={{
            position: "absolute",
            top: "62.3%",
            right: "5%",
            backgroundColor: "#F2B138",
            borderRadius: 50,
            padding: 12,
            borderStyle: "solid",
            borderWidth: 3,
            borderColor: "#131417",
          }}
        >
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
      <View
        style={{
          position: "absolute",
          top: "69.5%",
          right: "5%",
          backgroundColor: "#F2B138",
          borderRadius: 50,
          padding: 12,
          borderStyle: "solid",
          borderWidth: 3,
          borderColor: "#131417",
        }}
      >
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
});

export default MapViewComponent;
