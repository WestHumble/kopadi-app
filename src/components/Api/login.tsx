import { post } from './apiRequest';

export const login = async (email, password) => {
    return await post('login', {
            email,
            password
        }, true);
}