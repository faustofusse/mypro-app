import { SET_NOTIFICATION, REMOVE_ERROR, REMOVE_NOTIFICATION } from "./actionTypes";

export const setNotification = (type, msg, errors = {}) => {
    return ({
        type: SET_NOTIFICATION,
        payload: { type, msg, errors }
    });
}

export const removeError = (key) => {
    return ({
        type: REMOVE_ERROR,
        payload: key
    });
}

export const removeNotification = () => {
    return ({
        type: REMOVE_NOTIFICATION,
        payload: null
    });
}