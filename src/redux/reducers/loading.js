import { ON_LOAD, OFF_LOAD } from '../actions/actionTypes';

export default function reducer(state = false, {type, payload}){
    switch (type) {
        case ON_LOAD : return true;
        case OFF_LOAD : return false;
        default : return false;
    }
}