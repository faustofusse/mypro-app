import { Alert } from 'react-native';
import { SET_USER, REMOVE_TOKEN } from '../redux/actions/actionTypes';
import { API_URL, METHOD_POST, METHOD_GET } from '../constants';
import { call, uploadFile } from './api';
import { removeToken, setToken } from '../redux/actions';
import { deleteToken, updateToken } from './storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk-next";

const authHeaders = (token) => ({ headers: { 'x-auth-token': token } });

export const login = (user) => call(METHOD_POST, `${API_URL}/users/login`, user, null, SET_USER, (response, dispatch) => {
    if (!response.success) return console.log(response.message);
    updateToken(response.token);
    dispatch(setToken(response.token));
});

export const logout = (token) => call(METHOD_GET, `${API_URL}/users/logout`, null, authHeaders(token), REMOVE_TOKEN, async (response, dispatch) => {
    if (await GoogleSignin.isSignedIn) GoogleSignin.signOut();
    deleteToken();
    dispatch(removeToken());
});

const preLogin = (user, dispatch, navigation) => dispatch(checkEmail(user.email, res => {
    if (!res.exists || (user.google && !res.google)) GoogleSignin.signOut();
    if (!res.exists) return navigation.navigate('RegisterOptions', { user: user });
    if ((user.google && res.google) || (user.facebook && res.facebook))
        return dispatch(login(user.google ? { google: user.google } : { facebook: user.facebook }));
    // Este alert no funciona!!!!!!
    Alert.alert(`Cuenta existente!','Ya existe una cuenta con este correo electronico, queres combinarla??`, [
        { text: "NO", onPress: () => console.log('volver'), style: 'cancel'},
        { text: "SI", onPress: () => console.log('combinar'), style: 'default'}
    ]);
}));

export const facebook = (dispatch, navigation) => LoginManager.logInWithPermissions(['public_profile', 'email', 'user_birthday', 'user_gender']).then(async result => {
    if (result.isCancelled) return console.log('FB login cancelled!');
    const { accessToken } = await AccessToken.getCurrentAccessToken();
    const request = new GraphRequest('/me', {
        access_token: { string: accessToken },
        parameters: { fields: { string: 'email,first_name,last_name,picture,birthday,id,gender'} }
    }, (err, res) => {
        if (err) return console.error(err);
        const { email, first_name, last_name, id, picture, gender, birthday } = res;
        const user = { email, gender, birthdate: Date.parse(birthday), name: first_name, lastName: last_name, facebook: String(id), image: (picture.data.is_silhouette ? null : picture.data.url)}
        preLogin(user, dispatch, navigation);
    });
    new GraphRequestManager().addRequest(request).start();
}).catch(err => console.error(err));

export const google = async (dispatch, navigation) => GoogleSignin.signIn().then(googleUser => {
    const { id, email, familyName, givenName, photo } = googleUser.user;
    const user = { google: id, email: email, name: givenName, lastName: familyName, image: photo };
    preLogin(user, dispatch, navigation);
}).catch(error => console.log(error));

export const getUser = (token) => call(METHOD_GET, `${API_URL}/users`, null, authHeaders(token), SET_USER);

export const register = (user, callback = null) => call(METHOD_POST, `${API_URL}/users/register`, user, null, SET_USER, callback);

export const checkEmail = (email, callback = null) => call(METHOD_GET, `${API_URL}/users/email/check`, email, null, null, callback);

export const uploadImage = (fieldName, file, metadata, load, error, progress, abort, transfer, options, token) => {
    return uploadFile(`${API_URL}/images/user`, 'image', token, file, load, error, progress);
}

export const verify = (token, password, repeatPassword, callback = null) => {
    return call(METHOD_POST, `${API_URL}/users/verify`, { token, password, repeatPassword}, null, null, callback);
}
