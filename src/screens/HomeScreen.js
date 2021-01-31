import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import IntroButton from '../components/Buttons/IntroButton';
import { logout } from '../utils/user';

const HomeScreen = (props) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token); 
    const user = useSelector(state => state.user); 
    return (
        <View>
            <Text>{JSON.stringify(user)}</Text>
            <IntroButton text='LOGOUT' onPress={() => dispatch(logout(token))} />
        </View>
    )
}

export default HomeScreen;