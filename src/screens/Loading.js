import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RED } from '../constants/colors';

export default Loading = () => (
    <View style={styles.container}><Text style={styles.text}>Loading...</Text></View>
);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        opacity: 0.7,
        left: 0, top: 0,
        zIndex: 5
    },
    text: {
        fontFamily: 'MavenProBold',
        fontSize: 30,
        color: RED
    }
})