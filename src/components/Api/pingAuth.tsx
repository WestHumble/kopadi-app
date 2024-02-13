import { get } from './apiRequest';

export const ping = async () => {
    return get('auth-ping');
}