import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';
import { login as loginPost } from "../components/Api/login";
import uuid from 'react-native-uuid';
import {MarkerData} from "../types/marker";
import * as Location from "expo-location";
import {setLocation} from "../components/Api/location";

export const LocationContext = createContext(null);

export const LocationProvider = ({children}) => {
    const [userLocation, setUserLocation] = useState(null);
    const [shareLocation, setShareLocation] = useState(false);

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
                console.log('Got location')
                console.log(location)
            })();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            // if (!shareLocation) {
            //     return
            // }
            console.log('Updated location')
            console.log(userLocation)
            setLocation(userLocation.coords.longitude, userLocation.coords.latitude).catch((error)=>{
                console.error(error)
            });
        }, 10000);
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