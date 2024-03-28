import React, {createContext, useContext, useEffect, useState} from 'react';
import * as Location from "expo-location";
import {ApiContext} from "./ApiContext";
import {LocationContext} from "./LocationContext";
import {MarkerData} from "../types/marker";
import {Event} from "../types/event";
import {Alert} from "react-native";

export const EventsContext = createContext(null);

export const EventsProvider = ({children}) => {
    const [eventsCreated, setEventsCreated] = useState<Event[]>([]);
    const [eventsInvited, setEventsInvited] = useState<Event[]>([]);
    const [eventsOther, setEventsOther] = useState<Event[]>([]);
    const [eventsCreatedSearch, setEventsCreatedSearch] = useState<Event[]>([]);
    const [eventsInvitedSearch, setEventsInvitedSearch] = useState<Event[]>([]);
    const [eventsOtherSearch, setEventsOtherSearch] = useState<Event[]>([]);
    const [isSearchActive, setSearchActive] = useState(false);

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
            setEventsCreated(eventsData['created'] ?? [])
            setEventsInvited(eventsData['invited'] ?? [])
            setEventsOther(eventsData['other'] ?? [])
        }, (res) => {
            console.log(res.response.data)
        })
    };

    const searchEvents = (search, region) => {
        post('event/search', {
            searchPhrase: search,
            latitude: region?.latitude??userLocation?.coords.latitude ?? 52.4064,
            longitude: region?.longitude??userLocation?.coords.longitude ?? 16.9252,
            distanceInMeters: 1000
        }, (res) => {
            let eventsData = res.data
            if (0 === Object.keys(eventsData).length) {
                Alert.alert("Nie znaleziono wydarzeń")
                return
            }
            setEventsCreatedSearch(eventsData['created'] ?? [])
            setEventsInvitedSearch(eventsData['invited'] ?? [])
            setEventsOtherSearch(eventsData['other'] ?? [])
            setSearchActive(true)
        },)
    };

    const clearSearchEvents = () => {
        setEventsCreatedSearch([])
        setEventsInvitedSearch([])
        setEventsOtherSearch([])
        setSearchActive(false)
    };

    useEffect(() => {
        if (userToken) {
            loadAllEvents()
        } else {
            setEventsCreated([])
            setEventsInvited([])
            setEventsOther([])
            setSearchActive(false)
        }
    }, [userToken]);

    return (
        <EventsContext.Provider value={{
            eventsCreated,
            eventsInvited,
            eventsOther,
            eventsCreatedSearch,
            eventsInvitedSearch,
            eventsOtherSearch,
            loadAllEvents,
            loadCloseEvents,
            searchEvents,
            clearSearchEvents,
            isSearchActive,
        }}>
            {children}
        </EventsContext.Provider>
    );
}