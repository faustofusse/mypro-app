import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PADDING = 12;

export default function Auth({ icon=null, color='#000', onPress, width='80%', text='Boton'}) {
    return (
        <View style={[styles.container, { backgroundColor: color, width }]}>
            <TouchableOpacity onPress={onPress}>
                { icon ? ( <View style={styles.icon}>{ icon() }</View> ) : null}
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderRadius: 18,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 3,
    },
    text: {
        padding: PADDING,
        color: '#fff',
        fontSize: 18,
        fontFamily: 'MavenProMedium',
        textAlign: 'center',
    },
    icon: {
        padding: PADDING,
        position: 'absolute',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
    }
});