export type MarkerData = {
    latlng: LatLngData,
    name: string,
    description: string,
    distanceInMeters: number,
}

export type LatLngData = {
    latitude: number;
    longitude: number;
}