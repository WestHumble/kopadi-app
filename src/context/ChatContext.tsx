import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {ApiContext} from "./ApiContext";
import {AppState} from "react-native";
import {Friend} from "../types/friend";
import * as Notifications from "expo-notifications";
import {FriendInvite} from "../types/friendInvite";
import {NavigationContext} from "./NavigationContext";
import {Chat} from "../types/chat";
import {Event} from "../types/event";

export const ChatContext = createContext(null);

export const ChatProvider = ({children}) => {
    const [chats, setChats] = useState<Chat[]>([]);

    const { get, userToken } = useContext(ApiContext);
    const { navigationRef } = useContext(NavigationContext);
    const getChatList = () => {
        get('chat/get-all-chats', null, (res) => {
            setChats(res.data)
        })
    };
    const setChatMessages = (chatId, setChatMessagesList) => {
        get('chat/get-all-messages/' + chatId, null, (res) => {
            setChatMessagesList(res.data)
        })
    };

    const getChatMessages = () => {
        // get('chat/get-all-chats', null, (res) => {
        //     setChats(res.data)
        // })
    };


    const setChatById = async (chatId, setChat): Event => {
        let chat: Chat = chats.find(e => e.id === chatId)

        setChat(chat)
    };

    const notificationListener = useRef();

    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            if ('new_chat' === notification.request.trigger.channelId) {
                getChatList()
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
        };
    }, []);

    useEffect(() => {
        if (userToken) {
            getChatList()
        } else {
            setChats([])
        }
    }, [userToken]);

    return (
        <ChatContext.Provider value={{
            chats,
            getChatList,
            setChatById,
            setChatMessages,
        }}>
            {children}
        </ChatContext.Provider>
    );
}