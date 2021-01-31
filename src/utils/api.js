import { METHOD_GET, METHOD_POST, METHOD_PUT, METHOD_DELETE, NOTIFICATION_ERROR, API_URL, NOTIFICATION_SUCCESS } from '../constants';
import { stopLoading, startLoading, setNotification } from '../redux/actions';
import axios from 'axios';

export const call = (method, url, param, config, actionType, callback = null) => {
    param = param != null ? param : '';
    config = config != null ? config : {};
    return dispatch => {    
        dispatch(startLoading());
        return callService(method, url, param, config)
        .then(response => {
            if(!response.data.success){
                dispatch(setNotification(NOTIFICATION_ERROR, response.data.message, response.data.errors));    
                return callback ? callback(response.data, dispatch) : response.data;
            }
            dispatch(setNotification(NOTIFICATION_SUCCESS, response.data.message));
            if (actionType) dispatch({ type: actionType, payload: response.data.success });
            if (callback) return callback(response.data, dispatch);
            return response.data;
        })
        .finally(() => dispatch(stopLoading()))
        .catch(err => {alert(err); dispatch(stopLoading())});
    };
}

export const uploadFile = (url, fieldName, token, file, load, error, progress) => {
    return dispatch => {
        const config = {
            headers: { 'x-auth-token': token },
            onUploadProgress: (e) => progress(e.lengthComputable, e.loaded, e.total),
        }
        const formData = new FormData();
        formData.append(fieldName, file, file.name);
        return axios.post(url, formData, config).then(response => {
            if (!response.data.success) return error(response.data.message);
            load(response.data);
            return response.data.success;
        }).catch(e => error(e.message));
    };
}

export const getUserByUsername = async (username) => {
    const response = await axios.get(`${API_URL}/users/${username}`);
    return response.data.user;
}

const callService = (method, url, param, config) => {
    console.log(`Llamando al servicio ${url}, method ${method}, parametro ${JSON.stringify(param)}`);
    switch (method){
        case METHOD_GET: return axios.get(`${url}/${param}`, config);
        case METHOD_POST: return axios.post(url, param, config);
        case METHOD_PUT: return axios.put(url, param, config);
        case METHOD_DELETE: return axios.delete(`${url}/${param}`, config);
        default: return null;
    }
}