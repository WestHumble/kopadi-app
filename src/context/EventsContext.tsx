import React, {createContext, useContext, useEffect, useState} from 'react';
import * as Location from "expo-location";
import {ApiContext} from "./ApiContext";
import {LocationContext} from "./LocationContext";
import {MarkerData} from "../types/marker";
import {Event} from "../types/event";

export const EventsContext = createContext(null);

export const EventsProvider = ({children}) => {
    const [events, setEvents] = useState<Event[]>([]);

    const { userLocation, shareLocation, setShareLocation } =
        useContext(LocationContext);
    const { post, userToken } = useContext(ApiContext);
    const loadCloseEvents = (region) => {
        post('event/close-list', {
            latitude: region?.latitude??userLocation?.coords.latitude ?? 52.4064,
            longitude: region?.longitude??userLocation?.coords.longitude ?? 16.9252,
            distanceInMeters: 1000
        }, (res) => setEvents(res.data))
    };

    useEffect(() => {
        if (userToken) {
            loadCloseEvents()
        } else {
            setEvents([])
        }
    }, [userToken]);
    return (
        <EventsContext.Provider value={{events, loadCloseEvents}}>
            {children}
        </EventsContext.Provider>
    );
}