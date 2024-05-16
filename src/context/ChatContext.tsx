import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {ApiContext} from "./ApiContext";
import * as Notifications from "expo-notifications";
import {NavigationContext} from "./NavigationContext";
import {Chat} from "../types/chat";


export const ChatContext = createContext(null);

export const ChatProvider = ({children}) => {
    const [chatId, setChatId] = useState<number>(null);
    const [initializingChat, setInitializingChat] = useState<boolean>(false);
    const [chats, setChats] = useState<Chat[]>([]);
    const [unreadChatCounter, setUnreadChatCounter] = useState<number>(0);
    const [refreshTime, setRefreshTime] = useState(0);
    const [redirectChatId, setRedirectChatId] = useState<number>(0);
    const { navigationRef } = useContext(NavigationContext);

    const { get, post, userToken } = useContext(ApiContext);
    const initChat = (friends) => {
        setInitializingChat(true)
        post('chat', {
            participantIds: friends.map(f=>f.id)
        }, (res) => {
            getChatList()
            setRedirectChatId(res.data['chatId'])
        })
    };

    const getChatList = () => {
        get('chat/get-all-chats', null, (res) => {
            let chatsCopy = []
            res.data?.forEach((data)=> {
                let chatTmp = chats.find(e => e.id === data.id)

                if (chatTmp) {
                    chatTmp.name = data.name;
                    chatTmp.participants = data.participants;
                    chatTmp.is_seen = data.is_seen;
                    chatTmp.event_id = data.event_id;
                    chatTmp.last_message_date = data.last_message_date;
                    chatsCopy.push(chatTmp)
                } else {
                    chatsCopy.push(data)
                }
            })

            chatsCopy.sort((c1, c2) => c1.last_message_date > c2.last_message_date ? -1 : 1)
            setChats(chatsCopy)
        })
    };

    useEffect(() => {
        if (redirectChatId === null) {
            setInitializingChat(false)
            return
        }
        let chatTmp = chats.find(e => e.id === redirectChatId)

        if (chatTmp) {
            setRedirectChatId(null)
            navigationRef.current?.navigate('Chat', {
                chatId: redirectChatId
            });
        }
    }, [chats, redirectChatId]);
    const setChatMessages = (chatIdParam) => {
        let chatIdUpdate = chatIdParam ?? chatId
        if (chatIdUpdate !== null && undefined !== getChatById(chatIdUpdate)) {
            get('chat/get-all-messages/' + chatIdUpdate, null, (res) => {
                getChatById(chatIdUpdate).messages = res.data?.sort((c1, c2) => c1.created_at > c2.created_at)
                setRefreshTime(Date.now())
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

    const getChatById = (chatId): Chat => {
        return chats.find(e => e.id === chatId)
    };

    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            if ('chat_init' === notification.request.trigger.channelId || 'chat' === notification.request.trigger.channelId) {
                if (navigationRef.current?.getCurrentRoute().name === 'Chat' && JSON.parse(
                    JSON.parse(
                        notification.request.trigger.remoteMessage.data.body
                    ).payload
                ).conversation_id === chatId) {
                    setChatAsRead(chatId)
                } else {
                    setTimeout(getChatList, 1000)
                }
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
        };
    }, [chatId, userToken]);

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
        }
    }, [userToken]);

    useEffect(() => {
        setUnreadChatCounter(chats.filter(c=> !c.is_seen).length)
    }, [chats]);

    return (
        <ChatContext.Provider value={{
            chatId,
            setChatId,
            chats,
            getChatList,
            getChatById,
            setChatMessages,
            setChatAsRead,
            unreadChatCounter,
            initChat,
            initializingChat,
            refreshTime,
        }}>
            {children}
        </ChatContext.Provider>
    );
}