import { SET_NOTIFICATION, REMOVE_NOTIFICATION, REMOVE_ERROR } from '../actions/actionTypes';
// import notifier from 'notifier-js';
import { NOTIFICATION_ERROR, NOTIFICATION_SUCCESS } from '../../constants';

const initialState = { type : null, message : null, errors: [] }

export default function reducer(state = initialState, {type, payload}){
    switch (type) {
        case SET_NOTIFICATION: 
            const title = payload.type === NOTIFICATION_SUCCESS ? 'Success!' : (payload.type === NOTIFICATION_ERROR ? 'Error!' : 'Info');
            const notificationType =  payload.type === NOTIFICATION_SUCCESS ? 'success' : (payload.type === NOTIFICATION_ERROR ? 'danger' : 'info');
            // if (payload.msg) notifier.show(title, payload.msg, notificationType, '', 3 * 1000);
            return payload;
        case REMOVE_NOTIFICATION: return initialState;
        case REMOVE_ERROR:
            let newState = Object.assign({}, state);
            const { [payload]: value, ...errors } = newState.errors;
            newState.errors = errors;
            return newState;
        default :  return state;
    }
}