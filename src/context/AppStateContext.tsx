import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useNavigation} from "@react-navigation/native";
import {AppState} from "react-native";
import {EventsContext} from "./EventsContext";
import {FriendsContext} from "./FriendsContext";
import {ChatContext} from "./ChatContext";
export const AppContext = createContext(null);

export const AppProvider = ({children}) => {
    const {getPendingEventInvites} = useContext(EventsContext);
    const {getFriendList, getPendingFriendInvites} = useContext(FriendsContext);
    const {getChatList} = useContext(ChatContext);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                getPendingEventInvites()
                getFriendList()
                getPendingFriendInvites()
                getChatList()
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