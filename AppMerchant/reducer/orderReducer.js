import {    
    INCREMENT, DECREMENT,
    START_LOADING, STOP_LOADING,    
} from '../utils/common';

export const INITIAL_STATE = {
    count: 0,
    isLoading: false,    
};

const orderReducer = function(state = INITIAL_STATE, { type, payload }) {
    switch (type) {
    case START_LOADING:
        return {
            ...state,
            isLoading: true
        }
    case STOP_LOADING:
        return {
            ...state,
            isLoading: false
        }    
    case INCREMENT:
        return {
            ...state,
            count: state.count + 1
        }
    case DECREMENT:
        return {
            ...state,
            count: state.count - 1
        }
    default:
        return state;
    }
}

export default orderReducer;