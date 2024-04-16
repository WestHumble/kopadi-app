import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useNavigation} from "@react-navigation/native";
import {AppState} from "react-native";
import {EventsContext} from "./EventsContext";
import {FriendsContext} from "./FriendsContext";
export const AppContext = createContext(null);

export const AppProvider = ({children}) => {
    const {getPendingEventInvites} = useContext(EventsContext);
    const {getFriendList, getPendingFriendInvites} = useContext(FriendsContext);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                getPendingEventInvites()
                getFriendList()
                getPendingFriendInvites()
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);
    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    );
}