import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile, Explore, Chats, Cart } from '../screens/home'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
const iconNames = { 'Home': 'home', 'Explore': 'explore', 'Chats': 'chat', 'Cart': 'shopping-cart', 'Profile': 'account-circle' };

const Tab = createBottomTabNavigator();

const HomeNavigator = props => ( 
    <Tab.Navigator initialRouteName="Home" 
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => (
                <Icon name={iconNames[route.name]} size={30} color={color} />
            )
        })} 
        tabBarOptions={{
            activeTintColor: '#676767',
            inactiveTintColor: '#FFB500',
            showLabel: false,
            style: { 
                position: 'absolute',
                height: '10%',
                borderTopStartRadius: 30, 
                borderTopEndRadius: 30, 
                backgroundColor: '#fff',
                elevation: 12,
                shadowColor: 'grey',
                shadowOpacity: 0.05,
            } 
        }} > 

        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Explore" component={Explore} />
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Profile" component={Profile} />

    </Tab.Navigator>
)

export default HomeNavigator;