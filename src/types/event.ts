import {LatLngData} from "./marker";

export type Event = {
    id: number,
    latlng: LatLngData,
    name: string,
    description: string,
    title: string,
    date: string,
    address: string,
    invite_status: string,
}