import { LOGIN_SUCCESS, LOGIN_FAIL } from '../utils/common';

const INITIAL_STATE = {    
    isLogin: false,
    userProfile: {
        user: {},
        permission: [],
        token: ''
    },
    errorMessage: ''
};

const loginReducer = function(state = INITIAL_STATE, { type, payload }) {
    switch (type) {
    case LOGIN_SUCCESS:
        return {
            ...state,
            isLogin: true,
            userProfile: {
                user: payload.user,
                permission: payload.permission,
                token: payload.token
            },
            errorMessage: ''
        }
    case LOGIN_FAIL:
        return {
            ...state,
            isLogin: false,
            userProfile: {
                user: {},
                permission: [],
                token: ''
            },
            errorMessage: payload.errorMessage
        }
    default:
        return state;
    }
}

export default loginReducer;