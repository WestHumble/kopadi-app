import {Friend} from "./friend";

export type Chat = {
    id: number,
    name: string,
    event_name: string,
    participants: Friend[],
}

export type ChatMessage = {
    id: number,
    sender_id: number,
    message_text: string,
    created_at: string,
    sent_by_logged_user: boolean,
}