import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import IntroButton from '../../components/buttons/IntroButton';
import { logout } from '../../utils/user';

const Profile = (props) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token); 
    const user = useSelector(state => state.user); 
    return (
        <View>
            <Text>Profile</Text>
            <IntroButton text='LOGOUT' onPress={() => dispatch(logout(token))} />
        </View>
    )
}

export default Profile;