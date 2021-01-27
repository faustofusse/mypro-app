import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN_KEY = "auth-token-key";

export const getToken = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(TOKEN_KEY)
      .then(res => {
        resolve(JSON.parse(res));
      })
      .catch(err => reject(err));
  });
};

export const updateToken = user => {
  console.log("Update user (Async Storage)");
  return AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(user));
};

export const deleteToken = user => {
  AsyncStorage.removeItem(TOKEN_KEY);
};
