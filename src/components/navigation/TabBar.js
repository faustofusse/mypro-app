import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TabBar = (props) => {
    return (
        <View style={styles.container}>
            <Text>tabbar</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 23,
        backgroundColor: 'blue',
    }
});

export default TabBar;