import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { getIntro, getToken } from './utils/storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store';

import HomeScreen from './screens/HomeScreen'; 
import Register from './screens/Register'; 
import Login from './screens/Login'; 
import Introduction from './screens/Introduction'; 
import Start from './screens/Start'; 
import { setToken } from './redux/actions';
import { getUser } from './utils/user';
import Loading from './screens/Loading';

const Stack = createStackNavigator();

export default function App(props) {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [intro, setIntro] = useState(false);

  // Esto se ejecuta al abrir la app
  useEffect(() => {
      getIntro().then((v) => {
          setIntro(v === 'true');
          getToken().then(token => {
              if (token) {
                  store.dispatch(setToken(token));
                  store.dispatch(getUser(token));
              }
              setLoading(false);
          });
      });
  }, []);

  // Funcion que se ejecuta cada vez que cambia el state de redux
  store.subscribe(() => setLogged(store.getState().token !== null));

  if (loading) return (<Loading />);
  return (
    <Provider store={store}>
      <NavigationContainer>
        { logged ? ( 
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
         ) : (
          <Stack.Navigator initialRouteName={intro ? 'Start' : 'Introduction'}> 
            <Stack.Screen name="Start" component={Start} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown: true}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown: true}}/>
            <Stack.Screen name="Introduction" component={Introduction} options={{headerShown: false}}/>
          </Stack.Navigator>
        ) }
      </NavigationContainer>
    </Provider>
  );
}
