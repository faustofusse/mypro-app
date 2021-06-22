import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Basic, Extra, Mail, Options, Professional, Start } from '../screens/auth';
import { TransitionPresets } from '@react-navigation/stack';

const Stack = createStackNavigator();

const options = {
    headerShown: false,
    ...TransitionPresets.SlideFromRightIOS
};

const AuthNavigator = () => (
    <Stack.Navigator initialRouteName={'Start'}> 
        <Stack.Screen options={options} name="Start" component={Start}/>
        <Stack.Screen options={options} name="Mail" component={Mail}/>
        <Stack.Screen options={options} name="Register" component={Options}/>
        <Stack.Screen options={options} name="Basic" component={Basic}/>
        <Stack.Screen options={options} name="Extra" component={Extra}/>
        <Stack.Screen options={options} name="Professional" component={Professional}/>
    </Stack.Navigator>
);

export default AuthNavigator;