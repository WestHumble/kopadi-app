import React, {createContext, useContext, useEffect, useState} from 'react';
import * as Location from "expo-location";
import {ApiContext} from "./ApiContext";

export const LocationContext = createContext(null);

export const LocationProvider = ({children}) => {
    const [shareLocation, setShareLocation] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const {post, userToken} = useContext(ApiContext)
    let lastUpdateDate = null;

    useEffect(() => {
        post(shareLocation ? 'user/location/init' : 'user/location/stop');
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
        if (!userToken) {
            return
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        if (!location) {
            return;
        }
        setUserLocation(location);
        if (shareLocation && (null === lastUpdateDate || ((new Date()) - lastUpdateDate) >= parseInt(process.env.EXPO_PUBLIC_LOCALIZATION_UPDATE_TIME))) {
            lastUpdateDate = new Date()
            post('user/location/update', {
                longitude: location.coords.longitude,
                latitude: location.coords.latitude
            }, null, (error)=>{
                if (error.response.status == 404) {
                    setShareLocation(false)
                }
            })
        }
    }


    return (
        <LocationContext.Provider value={{userLocation, shareLocation, setShareLocation}}>
            {children}
        </LocationContext.Provider>
    );
}