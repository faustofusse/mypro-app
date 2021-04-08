import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile, Explore, Chats, Cart } from '../screens/home'; 
import Header from '../components/navigation/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';

const iconNames = { 'Home': 'home', 'Explore': 'explore', 'Chats': 'chat', 'Cart': 'shopping-cart', 'Profile': 'account-circle' };

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = props => ( 
    <Tab.Navigator initialRouteName="Home" sceneContainerStyle={{backgroundColor: 'transparent'}}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => (
                <Icon name={iconNames[route.name]} size={30} color={color} />
            ),
        })}
        tabBarOptions={{
            activeTintColor: '#676767',
            inactiveTintColor: '#FFB500',
            showLabel: false,
            keyboardHidesTabBar: true,
            style: styles.tabBar 
        }} > 

        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Explore" component={Explore} />
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Profile" component={Profile} />

    </Tab.Navigator>
);

const HomeNavigator = props => (
        <Stack.Navigator screenOptions={{header: Header}}>
            <Stack.Screen name='Home' component={TabNavigator} />
        </Stack.Navigator>
);

const styles = StyleSheet.create({
    tabBar: { 
        position: 'absolute',
        height: Platform.OS === 'ios' ? '15%' : '12%',
        borderTopStartRadius: 30, 
        borderTopEndRadius: 30, 
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    }
});

export default HomeNavigator;