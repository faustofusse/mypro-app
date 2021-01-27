import { SET_USER, EDIT_USER } from '../actions/actionTypes';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER: return action.payload;
        case EDIT_USER: return Object.assign({}, state, action.payload);
        default: return state;
    }
}

export default reducer;