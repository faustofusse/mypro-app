import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN_KEY = "auth-token-key";
export const INTRO_KEY = "intro-key";

export const doneIntro = () => AsyncStorage.setItem(INTRO_KEY, 'true');

export const getIntro = () => AsyncStorage.getItem(INTRO_KEY);

export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);

export const updateToken = (token) => AsyncStorage.setItem(TOKEN_KEY, token);

export const deleteToken = () =>  AsyncStorage.removeItem(TOKEN_KEY);
