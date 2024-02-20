import { post } from './apiRequest';

export const resetPasswordInit = async (email, token) => {
    return await post('reset_password', {
        email,
        token
    }, true);
}

export const resetPasswordHandle = async (token, newPassword, code) => {
    return await post('reset_password/handle', {
        token,
        newPassword,
        code
    }, true);
}