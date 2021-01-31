import { SET_USER, REMOVE_TOKEN } from '../redux/actions/actionTypes';
import { API_URL, METHOD_POST, METHOD_GET } from '../constants';
import { call, uploadFile } from './api';
import { removeToken, setToken } from '../redux/actions';
import { deleteToken, updateToken } from './storage';

const authHeaders = (token) => ({ headers: { 'x-auth-token': token } });

export const login = (email, password) => {
    const params = { email, password };
    return call(METHOD_POST, `${API_URL}/users/login`, params, null, SET_USER, (response, dispatch) => {
        if (!response.success) return alert(response.message);
        updateToken(response.token);
        dispatch(setToken(response.token));
    });
}

export const logout = (token) => {
    return call(METHOD_GET, `${API_URL}/users/logout`, null, authHeaders(token), REMOVE_TOKEN, (response, dispatch) => {
        deleteToken();
        dispatch(removeToken());
    });
}

export const getUser = (token) => {
    return call(METHOD_GET, `${API_URL}/users`, null, authHeaders(token), SET_USER);
}

export const register = (user, callback = null) => {
    return call(METHOD_POST, `${API_URL}/users/register`, user, null, SET_USER, callback);
}

export const uploadImage = (fieldName, file, metadata, load, error, progress, abort, transfer, options, token) => {
    return uploadFile(`${API_URL}/images/user`, 'image', token, file, load, error, progress);
}

export const verify = (token, password, repeatPassword, callback = null) => {
    return call(METHOD_POST, `${API_URL}/users/verify`, { token, password, repeatPassword}, null, null, callback);
}