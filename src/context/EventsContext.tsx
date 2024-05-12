import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import * as Location from "expo-location";
import {ApiContext} from "./ApiContext";
import {LocationContext} from "./LocationContext";
import {MarkerData} from "../types/marker";
import {Event} from "../types/event";
import {Alert, AppState} from "react-native";
import * as Notifications from "expo-notifications";
import {FriendInvite} from "../types/friendInvite";
import {EventInvite} from "../types/eventInvite";
import {NavigationContext} from "./NavigationContext";

export const EventsContext = createContext(null);

export const EventsProvider = ({children}) => {
    const [eventsCreated, setEventsCreated] = useState<Event[]>([]);
    const [eventsInvited, setEventsInvited] = useState<Event[]>([]);
    const [eventsOther, setEventsOther] = useState<Event[]>([]);
    const [eventsCreatedSearch, setEventsCreatedSearch] = useState<Event[]>([]);
    const [eventsInvitedSearch, setEventsInvitedSearch] = useState<Event[]>([]);
    const [eventsOtherSearch, setEventsOtherSearch] = useState<Event[]>([]);
    const [isSearchActive, setSearchActive] = useState(false);
    const [pendingInvites, setPendingInvites] = useState<EventInvite[]>([]);
    const [unreadEventInvitesCounter, setUnreadEventInvitesCounter] = useState<number>(0);
    const { navigationRef } = useContext(NavigationContext);
    const { userLocation } = useContext(LocationContext);
    const { get, post, userToken } = useContext(ApiContext);
    const getPendingEventInvites = () => {
        get('event-invite/invites', null, (res) => {
            setPendingInvites(res.data)
        })
    };
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            if ('new_event_invite' === notification.request.trigger.channelId) {
                setTimeout(getPendingEventInvites, 1000)
                setTimeout(() => loadAllEvents(userLocation?.coords), 1000)
            }
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            if ('new_event_invite' === response.notification.request.trigger.channelId) {
                navigationRef.current?.navigate('EventInvitesScreen');
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [userLocation]);

    useEffect(() => {
        if (userToken) {
            getPendingEventInvites()
        } else {
            setPendingInvites([])
        }
    }, [userToken]);

    const loadCloseEvents = (region) => {
        post('event/close-list', {
            latitude: region?.latitude ?? 52.4064,
            longitude: region?.longitude ?? 16.9252,
            distanceInMeters: 1000
        }, (res) => {
            let other = res.data?.sort((e1, e2)=> new Date(e1.date.date) < new Date(e2.date.date) ? -1 : 1)
            setEventsOther(other)
        })
    };

    const loadAllEvents = (region) => {
        post('event/logged-user-event-list?' + Date.now(), {
            latitude: region?.latitude?? 52.4064,
            longitude: region?.longitude?? 16.9252,
            distanceInMeters: 1000
        }, (res) => {
            let eventsData = res.data
            let created = eventsData['created']?.sort((e1, e2)=> new Date(e1.date.date) < new Date(e2.date.date) ? -1 : 1)
            let invited = eventsData['invited']?.sort((e1, e2)=> new Date(e1.date.date) < new Date(e2.date.date) ? -1 : 1)
            let other = eventsData['other']?.sort((e1, e2)=> new Date(e1.date.date) < new Date(e2.date.date) ? -1 : 1)
            setEventsCreated(created ?? [])
            setEventsInvited(invited ?? [])
            setEventsOther(other ?? [])
        }, (res) => {
            console.log(res.data)
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
            let created = eventsData['created']?.sort((e1, e2)=> new Date(e1.date.date) < new Date(e2.date.date) ? -1 : 1)
            let invited = eventsData['invited']?.sort((e1, e2)=> new Date(e1.date.date) < new Date(e2.date.date) ? -1 : 1)
            let other = eventsData['other']?.sort((e1, e2)=> new Date(e1.date.date) < new Date(e2.date.date) ? -1 : 1)
            setEventsCreatedSearch(created ?? [])
            setEventsInvitedSearch(invited ?? [])
            setEventsOtherSearch(other ?? [])
            setSearchActive(true)
        },)
    };

    const setEventById = async (eventId, setEvent, forceFetch = false): Event => {

        if (!forceFetch) {
            let event: Event = eventsCreated.concat(eventsInvited, eventsOther).find(e => e.id === eventId)

            if (event) {
                setEvent(event)
                return
            }
        }
        get('event/' + eventId, null, (res) => {
            setEvent(res.data)
        })
    };

    const clearSearchEvents = () => {
        setEventsCreatedSearch([])
        setEventsInvitedSearch([])
        setEventsOtherSearch([])
        setSearchActive(false)
    };

    useEffect(() => {
        if (userToken) {
            loadAllEvents(userLocation?.coords)
        } else {
            setEventsCreated([])
            setEventsInvited([])
            setEventsOther([])
            setSearchActive(false)
        }
    }, [userToken]);


    useEffect(() => {
        setUnreadEventInvitesCounter(pendingInvites.filter(c=> c.status === 'new').length)
    }, [pendingInvites]);

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
            setEventById,
            pendingInvites,
            getPendingEventInvites,
            unreadEventInvitesCounter,
        }}>
            {children}
        </EventsContext.Provider>
    );
}