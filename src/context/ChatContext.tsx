import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {ApiContext} from "./ApiContext";
import * as Notifications from "expo-notifications";
import {NavigationContext} from "./NavigationContext";
import {Chat, ChatMessage} from "../types/chat";
import {Event} from "../types/event";
import {useFocusEffect, useRoute} from '@react-navigation/native';


export const ChatContext = createContext(null);

export const ChatProvider = ({children}) => {
    const [chat, setChat] = useState<Chat>(null);
    const [chatMessagesList, setChatMessagesList] = useState<ChatMessage[]>([]);
    const [chats, setChats] = useState<Chat[]>([]);
    const [unreadChatCounter, setUnreadChatCounter] = useState<number>(0);
    const { navigationRef } = useContext(NavigationContext);

    const { get, userToken } = useContext(ApiContext);
    const getChatList = () => {
        get('chat/get-all-chats', null, (res) => {
            setChats(res.data)
        })
    };
    const setChatMessages = () => {
        if (chat !== null) {
            get('chat/get-all-messages/' + chat.id, null, (res) => {
                setChatMessagesList(res.data)
            })
        }
    };

    const setChatAsRead = (chatId) => {
        if (chatId !== null) {
            get('chat/seen/' + chatId, null, (res) => {
                getChatList()
            })
        }
    };

    const setChatById = async (chatId, setChat): Event => {
        let chat: Chat = chats.find(e => e.id === chatId)

        setChat(chat)
    };

    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            if ('new_chat' === notification.request.trigger.channelId || 'chat' === notification.request.trigger.channelId) {
                if (navigationRef.current?.getCurrentRoute().name === 'Chat' && JSON.parse(
                    JSON.parse(
                        notification.request.trigger.remoteMessage.data.body
                    ).payload
                ).conversation_id === chat.id) {
                    setChatAsRead()
                } else {
                    getChatList()
                }
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
        };
    }, [chat]);

    useEffect(() => {
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            if ('chat' === response.notification.request.trigger.channelId) {
                navigationRef.current?.navigate('Chat', {
                    chatId: JSON.parse(
                        JSON.parse(
                            response.notification.request.trigger.remoteMessage.data.body
                        ).payload
                    ).conversation_id
                });
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        if (userToken) {
            getChatList()
        } else {
            setChats([])
            setChatMessagesList([])
        }
    }, [userToken]);

    useEffect(() => {
        setUnreadChatCounter(chats.filter(c=> !c.is_seen).length)
    }, [chats]);

    return (
        <ChatContext.Provider value={{
            chat,
            setChat,
            chats,
            getChatList,
            setChatById,
            setChatMessages,
            chatMessagesList,
            setChatMessagesList,
            setChatAsRead,
            unreadChatCounter,
        }}>
            {children}
        </ChatContext.Provider>
    );
}