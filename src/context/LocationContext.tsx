import React, {createContext, useEffect, useState} from 'react';
import * as Location from "expo-location";
import {setLocation} from "../components/Api/location";

export const LocationContext = createContext(null);

export const LocationProvider = ({children}) => {
    const [shareLocation, setShareLocation] = useState(false);
    const [userLocation, setUserLocation] = useState(null);

    let lastUpdateDate = null
    useEffect(() => {
        const interval = setInterval(() => {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setUserLocation(location);
                if (null === lastUpdateDate || ((new Date()) - lastUpdateDate) > 11000) {
                    lastUpdateDate = new Date()
                    setLocation(location.coords.longitude, location.coords.latitude).catch((error)=>{
                        console.error(error)
                    });
                }
            })();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        console.log(shareLocation)
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