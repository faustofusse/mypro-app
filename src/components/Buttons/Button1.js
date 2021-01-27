import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Button1({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.boton}>
                <Text style={styles.botonTexto}>{ text }</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    boton: {
        borderRadius: 3,
        width: 80,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.22,
        elevation: 3,
    },
    botonTexto: {
        padding: 10,
        textAlign: 'center',
    }
});
