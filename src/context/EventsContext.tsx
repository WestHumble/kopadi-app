import React, {createContext, useContext, useEffect, useState} from 'react';
import * as Location from "expo-location";
import {ApiContext} from "./ApiContext";
import {LocationContext} from "./LocationContext";
import {MarkerData} from "../types/marker";
import {Event} from "../types/event";

export const EventsContext = createContext(null);

export const EventsProvider = ({children}) => {
    const [eventsCreated, setEventsCreated] = useState<Event[]>([]);
    const [eventsInvited, setEventsInvited] = useState<Event[]>([]);
    const [eventsOther, setEventsOther] = useState<Event[]>([]);

    const { userLocation, shareLocation, setShareLocation } =
        useContext(LocationContext);
    const { get, post, userToken } = useContext(ApiContext);
    const loadCloseEvents = (region) => {
        post('event/close-list', {
            latitude: region?.latitude??userLocation?.coords.latitude ?? 52.4064,
            longitude: region?.longitude??userLocation?.coords.longitude ?? 16.9252,
            distanceInMeters: 1000
        }, (res) => eventsOther(res.data))
    };

    const loadAllEvents = (region) => {
        post('event/logged-user-event-list', {
            latitude: region?.latitude??userLocation?.coords.latitude ?? 52.4064,
            longitude: region?.longitude??userLocation?.coords.longitude ?? 16.9252,
            distanceInMeters: 1000
        }, (res) => {
            let eventsData = res.data
            setEventsCreated(eventsData['created'])
            setEventsInvited(eventsData['invited'])
            setEventsOther(eventsData['other'])
        }, (res) => {
            console.log(res.response.data)
        })
    };

    useEffect(() => {
        if (userToken) {
            loadAllEvents()
        } else {
            setEventsCreated([])
            setEventsInvited([])
            setEventsOther([])
        }
    }, [userToken]);
    return (
        <EventsContext.Provider value={{eventsCreated, eventsInvited, eventsOther, loadAllEvents, loadCloseEvents}}>
            {children}
        </EventsContext.Provider>
    );
}