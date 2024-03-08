import React, {createContext, useContext, useEffect, useState} from 'react';
import * as Location from "expo-location";
import {setLocation, stopLocationSharing, initLocation} from "../components/Api/location";
import {AuthContext} from "./AuthContext";

export const LocationContext = createContext(null);

export const LocationProvider = ({children}) => {
    const [shareLocation, setShareLocation] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const {userToken} = useContext(AuthContext);

    let lastUpdateDate = null;

    useEffect(() => {
        if (shareLocation) {
            initLocation().catch((error)=>{
                console.error(error)
            });
        } else {
            stopLocationSharing().catch((error)=>{
                console.error(error)
            });
        }
    }, [shareLocation]);

    useEffect(() => {
        if (!userToken) {
            return
        }
        getLocation(shareLocation);
        const interval = setInterval(() => getLocation(shareLocation), parseInt(process.env.EXPO_PUBLIC_LOCALIZATION_REFRESH_TIME));
        return () => clearInterval(interval);
    }, [userToken, shareLocation]);

    const getLocation = async (shareLocation) => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
        if (shareLocation && (null === lastUpdateDate || ((new Date()) - lastUpdateDate) >= parseInt(process.env.EXPO_PUBLIC_LOCALIZATION_UPDATE_TIME))) {
            lastUpdateDate = new Date()
            setLocation(location.coords.longitude, location.coords.latitude).catch((error)=>{
                if (error.response.status == 404) {
                    setShareLocation(false)
                }
            });
        }
    }


    return (
        <LocationContext.Provider value={{userLocation, shareLocation, setShareLocation}}>
            {children}
        </LocationContext.Provider>
    );
}