import {FriendInvite} from "./friendInvite";

export type Notification = {
    id: number,
    title: string,
}

export type FriendInviteNotification = Notification & {
    friendInvite: FriendInvite
}