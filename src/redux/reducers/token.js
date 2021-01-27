import { SET_TOKEN, REMOVE_TOKEN } from '../actions/actionTypes';

export default function reducer(state = null, {type, payload}){
    // console.log('cambio token a', payload);
    switch (type) {
        case SET_TOKEN : return payload;
        case REMOVE_TOKEN : return null;
        default : return state;
    }
}