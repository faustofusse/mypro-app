import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AuthButton({ iconName=null, iconSize=30, text='', onPress }) {
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={styles.container}>
                <Icon hide={iconName === null} name={iconName} size={iconSize} />
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        backgroundColor: '#F5F5F5',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2.22,
        elevation: 3,
        marginVertical: 10,
        padding: 20,
        borderRadius: 30,
    },
    text: {
        marginLeft: 10
    }
});
