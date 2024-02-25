import { get, post } from './apiRequest';

export const getLocation = async () => {
    return await get('user/location');
}

export const setLocation = async (longitude, latitude) => {
    return await post('user/location/update', {
        longitude,
        latitude
    });
}