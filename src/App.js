import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getToken } from './utils/storage';
import { Loading } from './screens/auth';
import { Provider } from 'react-redux';
import { setToken } from './redux/actions';
import { getUser } from './utils/user';
import { LogBox, StatusBar } from 'react-native';
import HomeNavigator from './navigation/HomeNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import store from './redux/store';

LogBox.ignoreLogs(['\"null\" is not a valid color or brush'])

export default function App(props) {
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    // Esto se ejecuta al abrir la app
    useEffect(() => {
        getToken().then((token) => {
            if (token) {
                store.dispatch(setToken(token));
                store.dispatch(getUser(token));
            }
            setInterval(() => setLoading(false), 1000);
            // setLoading(false);
        });
    }, []);

    // Funcion que se ejecuta cada vez que cambia el state de redux
    store.subscribe(() => setLogged(store.getState().token !== null));

    if (loading) return <Loading />;
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
                <NavigationContainer>
                    {logged ? ( <HomeNavigator /> ) : ( <AuthNavigator /> )}
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}
