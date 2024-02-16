import { post } from './apiRequest';

export const register = async (email, password) => {
    return await post('register', {
            email,
            password
        });
}