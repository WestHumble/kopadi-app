import { get, post } from './apiRequest';

export const getFriendsLocations = async () => {
    return await get('user/location/get-friends');
}
export const initLocation = async () => {
    return await post('user/location/init');
}
export const stopLocationSharing = async () => {
    return await post('user/location/stop');
}
export const setLocation = async (longitude, latitude) => {
    return await post('user/location/update', {
        longitude,
        latitude
    });
}