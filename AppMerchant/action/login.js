import { LOGIN_SUCCESS, LOGIN_FAIL } from '../utils/common';

export const loginSuccess = (user, permission, token) => {
    return { 
        type: LOGIN_SUCCESS, 
        payload: { user, permission, token }
    };
}

export const loginFailed = (errorMessage) => {
    return {
        type: LOGIN_FAIL, 
        payload: { errorMessage }
    };
}