import {FriendInvite} from "./friendInvite";
import {EventInvite} from "./eventInvite";

export type NotificationType = 'friendInvite' | 'eventInvite'

export type Notification = {
    id: number,
    title: string,
    notificationType: NotificationType
}

export type FriendInviteNotification = Notification & {
    notificationType: 'friendInvite'
    friendInvite: FriendInvite
}

export type EventInviteNotification = Notification & {
    notificationType: 'eventInvite'
    eventInvite: EventInvite
}