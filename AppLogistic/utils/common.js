import { forEach } from 'lodash';
import moment from 'moment';

export const isBlank = function (valer) {
    if (valer === null || valer === undefined || valer === '')
        return true;
    else
        return false;
}

export const parseInt = function (val) {
    var parsed = parseInt(val);
    return isNaN(parsed) ? val : parsed;
}

export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';