import {Friend} from "./friend";

export type Chat = {
    id: number,
    name: string,
    event_name: string,
    participants: Friend[],
    is_seen: boolean,
    messages: ChatMessage[],
    last_message_date: string,
}

export type ChatMessage = {
    id: number,
    chat_id: number,
    sender_id: number,
    message_text: string,
    created_at: string,
    sent_by_logged_user: boolean,
}