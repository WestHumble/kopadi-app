import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {ApiContext} from "./ApiContext";
import * as Notifications from "expo-notifications";
import {NavigationContext} from "./NavigationContext";
import {Chat, ChatMessage} from "../types/chat";
import {Event} from "../types/event";


export const ChatContext = createContext(null);

export const ChatProvider = ({children}) => {
    const [chat, setChat] = useState<Chat>(null);
    const [fetchingMessages, setFetchingMessages] = useState<boolean>(false);
    const [initializingChat, setInitializingChat] = useState<boolean>(false);
    const [chats, setChats] = useState<Chat[]>([]);
    const [unreadChatCounter, setUnreadChatCounter] = useState<number>(0);
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
            res.data.forEach((data)=> {
                let chatTmp = chats.find(e => e.id === data.id)

                if (chatTmp) {
                    chatTmp.name = data.name;
                    chatTmp.participants = data.participants;
                    chatTmp.is_seen = data.is_seen;
                    chatsCopy.push(chatTmp)
                } else {
                    chatsCopy.push(data)
                }
            })
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
    const setChatMessages = () => {
        if (chat !== null) {
            setFetchingMessages(true)
            get('chat/get-all-messages/' + chat.id, null, (res) => {
                chat.messages = res.data
                chat.messages.sort((c1, c2) => c1.created_at > c2.created_at)

                chats.find(e => e.id === chat.id).messages = chat.messages
                setFetchingMessages(false)
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
            setChatAsRead,
            unreadChatCounter,
            fetchingMessages,
            initChat,
            initializingChat,
        }}>
            {children}
        </ChatContext.Provider>
    );
}