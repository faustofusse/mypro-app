import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Button1({ text, onPress }) {
    return (
        <View style={styles.boton}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.botonTexto}>{ text }</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    boton: {
        marginHorizontal: 10,
        borderRadius: 10,
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
        padding: 10,
    },
    botonTexto: {
        textAlign: 'center',
        fontSize: 18,
    }
});
