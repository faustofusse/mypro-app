import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const Home = (props) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token); 
    const user = useSelector(state => state.user); 
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize: 40}}>Home</Text>
            {/* <Text>{JSON.stringify(user)}</Text> */}
        </View>
    )
}

export default Home;