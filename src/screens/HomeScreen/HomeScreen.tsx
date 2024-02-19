import { View, Text, StyleSheet } from "react-native";
import React, { useRef, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";

const HomeScreen = () => {
  const navigation = useNavigation();
  const mapViewRef = useRef<MapView>(null);
  const INITIAL_REGION = {
    latitude: 51.9194,
    longitude: 19.1451,
    latitudeDelta: 14,
    longitudeDelta: 16,
  };

  useEffect(() => {
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion(INITIAL_REGION, 1000);
    }
  }, []);

  const onBackToLoginPress = () => {
    navigation.navigate("SignIn");
  };
  return (
    <View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        userInterfaceStyle="dark"
        followsUserLocation={true}
      />
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
