export type MarkerData = {
    id: number,
    latlng: LatLngData,
    name: string,
    surname: string,
    description: string,
    distanceInMeters: number,
}

export type LatLngData = {
    latitude: number;
    longitude: number;
}