import 'react-native-gesture-handler';
import React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import { getToken } from './utils/storage';

import HomeScreen from './screens/HomeScreen'; 
import Register from './screens/Register'; 
import Login from './screens/Login'; 
import Introduction from './screens/Introduction'; 
import Start from './screens/Start'; 
import { getUser, setToken } from './redux/actions';

const Stack = createStackNavigator();

export default function App(props) {
  const logged = store.getState().token !== null;

  useEffect(() => {
      if (!store.getState().token){
          getToken().then(token => {
            if (token){
              store.dispatch(setToken(token));
              store.dispatch(getUser(token));
            }
          });
      }
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        { logged ? (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
         ) : (
          <Stack.Navigator initialRouteName="Start"> 
            <Stack.Screen name="Introduction" component={Introduction} options={{headerShown: false}}/>
            <Stack.Screen name="Start" component={Start} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown: true}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown: true}}/>
          </Stack.Navigator>
        ) }
      </NavigationContainer>
    </Provider>
  );
}
