import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings } from 'react-native-fbsdk-next';
import { getToken } from './utils/storage';
import { Provider } from 'react-redux';
import { setToken } from './redux/actions';
import { getUser } from './utils/user';
import HomeNavigator from './navigation/HomeNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import Loading from './screens/Loading';
import store from './redux/store';

LogBox.ignoreLogs(['\"null\" is not a valid color or brush'])

export default function App(props) {
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    // Esto se ejecuta al abrir la app
    useEffect(() => {
        GoogleSignin.hasPlayServices().catch(error => console.log(error)); //.then(value => console.log('Play services:', value));
        GoogleSignin.configure({iosClientId: '750089684301-a39sl3g2eiv1u2r2ev8j1uhubq7hjmv8.apps.googleusercontent.com'});
        Settings.initializeSDK();
        getToken().then((token) => {
            if (token) {
                store.dispatch(setToken(token));
                store.dispatch(getUser(token));
            }
            // setInterval(() => setLoading(false), 1000);
            setLoading(false);
        });
    }, []);

    // Funcion que se ejecuta cada vez que cambia el state de redux
    store.subscribe(() => {
        setLogged(store.getState().token !== null);
        setLoading(store.getState().loading);
    });

    return (
        <Provider store={store}>
            { loading ? <Loading /> : null }
            <SafeAreaProvider>
                <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
                <NavigationContainer>
                    {logged ? ( <HomeNavigator /> ) : ( <AuthNavigator /> )}
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}
