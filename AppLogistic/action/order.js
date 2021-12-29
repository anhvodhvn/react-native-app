import { 
    PANEL_VIEW, SELECTED_PANEL_VIEW,
    START_LOADING, STOP_LOADING,
    INCREMENT, DECREMENT, 
    GET_ORDER_PENDING, GET_ORDER_COMPLETED,
    GET_ORDER_DETAIL_BY_ID, SET_ORDER_DETAIL_ITEM_CHECKED
} from '../utils/common';


export const startLoading = () => {
    return { type: START_LOADING };
}

export const stopLoading = () => {
    return { type: STOP_LOADING };
}

export const selectedPanelView = (panelName) => {
    if(panelName === PANEL_VIEW.COMPLETE)
        return { type: SELECTED_PANEL_VIEW, payload: PANEL_VIEW.COMPLETE };
    else 
        return { type: SELECTED_PANEL_VIEW, payload: PANEL_VIEW.PENDING };
}

export const getPendingOrders = (tickets) => {
    return {
        type: GET_ORDER_PENDING,
        payload: tickets
    }
}

export const getCompletedOrders = (tickets) => {
    return {
        type: GET_ORDER_COMPLETED,
        payload: tickets
    }
}

export const getOrderDetailById = (order) => {
    return {
        type: GET_ORDER_DETAIL_BY_ID,
        payload: order
    }
}

export const setOrderDetailItemChecked = (products) => {
    return {
        type: SET_ORDER_DETAIL_ITEM_CHECKED,
        payload: products
    }
}

export const doIncrement = () => {
    return { type: INCREMENT };
}

export const doDecrement = () => {
    return { type: DECREMENT };
}