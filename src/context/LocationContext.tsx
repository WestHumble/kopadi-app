import React, {createContext, useContext, useEffect, useState} from 'react';
import * as Location from "expo-location";
import {setLocation} from "../components/Api/location";
import {AuthContext} from "./AuthContext";

export const LocationContext = createContext(null);

export const LocationProvider = ({children}) => {
    const [shareLocation, setShareLocation] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const {userToken} = useContext(AuthContext);

    let lastUpdateDate = null;
    useEffect(() => {
        if (!userToken) {
            return
        }
        getLocation(shareLocation);
        const interval = setInterval(() => getLocation(shareLocation), 5000);
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
        if (shareLocation && (null === lastUpdateDate || ((new Date()) - lastUpdateDate) > 11000)) {
            console.log('update location');
            lastUpdateDate = new Date()
            setLocation(location.coords.longitude, location.coords.latitude).catch((error)=>{
                console.error(error)
            });
        }
    }
    useEffect(() => {
        if (!shareLocation) {
            // TODO hide location
        }
    }, [shareLocation]);

    return (
        <LocationContext.Provider value={{userLocation, shareLocation, setShareLocation}}>
            {children}
        </LocationContext.Provider>
    );
}