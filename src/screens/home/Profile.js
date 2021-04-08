import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../utils/user';
import Button from '../../components/buttons/Auth';

const Profile = (props) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token); 
    const user = useSelector(state => state.user); 
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize: 40}}>Profile</Text>
            <Button text='LOGOUT' onPress={() => dispatch(logout(token))} />
        </View>
    )
}

const styles = StyleSheet.create({

});

export default Profile;