import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MailLogin, Start } from '../screens/auth';
// import { Login, Register, Introduction, Start } from '../screens/auth';

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator initialRouteName={'Start'}> 
        <Stack.Screen name="Start" component={Start} options={{headerShown: false}}/>
        <Stack.Screen name="Mail" component={MailLogin} options={{headerShown: false}}/>
        {/* <Stack.Screen name="Login" component={Login} options={{headerShown: true}}/> */}
        {/* <Stack.Screen name="Register" component={Register} options={{headerShown: true}}/> */}
        {/* <Stack.Screen name="Introduction" component={Introduction} options={{headerShown: false}}/> */}
    </Stack.Navigator>
);

export default AuthNavigator;