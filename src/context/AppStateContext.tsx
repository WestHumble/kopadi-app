import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useNavigation} from "@react-navigation/native";
import {AppState} from "react-native";
import {EventsContext} from "./EventsContext";
import {FriendsContext} from "./FriendsContext";
import {ChatContext} from "./ChatContext";
import {ApiContext} from "./ApiContext";
export const AppContext = createContext(null);

export const AppProvider = ({children}) => {
    const {getPendingEventInvites} = useContext(EventsContext);
    const {getFriendList, getPendingFriendInvites} = useContext(FriendsContext);
    const {getChatList, setChatMessages} = useContext(ChatContext);
    const {userToken} = useContext(ApiContext);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                setTimeout(getPendingEventInvites, 500)
                setTimeout(getFriendList, 500)
                setTimeout(getPendingFriendInvites, 500)
                setTimeout(getChatList, 500)
                setTimeout(setChatMessages, 500)
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, [userToken]);
    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    );
}