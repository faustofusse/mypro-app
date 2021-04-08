import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { getIntro, getToken } from './utils/storage';
import { NavigationContainer } from '@react-navigation/native';
import { Loading } from './screens/auth';
import { Provider } from 'react-redux';
import { setToken } from './redux/actions';
import { getUser } from './utils/user';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeNavigator from './navigation/HomeNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import store from './redux/store';

export default function App(props) {
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);
    const [intro, setIntro] = useState(false);

    // Esto se ejecuta al abrir la app
    useEffect(() => {
        getIntro().then((v) => {
            setIntro(v === 'true');
            getToken().then((token) => {
                if (token) {
                    store.dispatch(setToken(token));
                    store.dispatch(getUser(token));
                }
                setInterval(() => setLoading(false), 1000);
                // setLoading(false);
            });
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
                    {logged ? ( <HomeNavigator /> ) : ( <AuthNavigator intro={intro} /> )}
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}
