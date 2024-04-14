export type Notification = {
    title: string,
    type: string,
    action?: () => void,
    actionText: () => string,
}