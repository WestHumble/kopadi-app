import { post } from './apiRequest';

export const register = async (email, password, name, surname) => {
    return await post('register', {
        email,
        password,
        name,
        surname
    });
}