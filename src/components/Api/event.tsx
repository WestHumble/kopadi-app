import { post } from './apiRequest';

export const getCloseEvents = async (latitude, longitude, distanceInMeters) => {
    return await post('event/close-list', {
        latitude,
        longitude,
        distanceInMeters
    });
}