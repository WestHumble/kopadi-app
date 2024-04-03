import React, {createContext, useContext, useEffect, useState} from 'react';
import * as Location from "expo-location";
import {ApiContext} from "./ApiContext";
import {LocationContext} from "./LocationContext";
import {MarkerData} from "../types/marker";
import {Event} from "../types/event";
import {Alert} from "react-native";
import {Friend} from "../types/friend";

export const FriendsContext = createContext(null);

export const FriendsProvider = ({children}) => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [isSearchActive, setSearchActive] = useState(false);

    const { get, post, userToken } = useContext(ApiContext);
    const getFriendList = () => {
        post('user/get-friends', null, (res) => {
            setFriends(res.data)
        })
    };

    useEffect(() => {
        if (userToken) {
            getFriendList()
        } else {
            setFriends([])
            setSearchActive(false)
        }
    }, [userToken]);

    return (
        <FriendsContext.Provider value={{
            friends,
            getFriendList,
            isSearchActive,
        }}>
            {children}
        </FriendsContext.Provider>
    );
}