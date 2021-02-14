import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Register, Introduction, Start } from '../screens/auth';

const Stack = createStackNavigator();

const AuthNavigator = ({ intro }) => (
    <Stack.Navigator initialRouteName={intro ? 'Start' : 'Introduction'}> 
        <Stack.Screen name="Start" component={Start} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: true}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown: true}}/>
        <Stack.Screen name="Introduction" component={Introduction} options={{headerShown: false}}/>
    </Stack.Navigator>
);

export default AuthNavigator;