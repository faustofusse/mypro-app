import { combineReducers } from 'redux';

import userReducer from './user';
import loadingReducer from './loading';
import tokenReducer from './token';
import notificationReducer from './notification';

export default combineReducers({
    user: userReducer,
    loading: loadingReducer,
    token: tokenReducer,
    notification: notificationReducer,
});