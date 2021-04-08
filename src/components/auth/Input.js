import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { BLACK, GRAY } from '../../constants/colors'

const Input = ({label, placeholder, onChange, secure=false, keyboard='default', type, style}) => {
    return (
        <View style={style}>
            <Text style={styles.text}>{label}</Text>
            <TextInput style={styles.input} 
                secureTextEntry={secure} 
                keyboardType={keyboard} 
                placeholderTextColor={'#B4B4B4'}
                textContentType={type} 
                placeholder={placeholder} 
                autoCapitalize='none' 
                onChangeText={onChange} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderBottomColor: '#B4B4B4',
        color: BLACK,
        borderBottomWidth: 1,
        paddingVertical: 7,
        fontSize: 18,
    },
    text: {
        fontFamily: 'MavenProBold',
        color: BLACK,
        fontSize: 20,
        marginBottom: 5
    }
})

export default Input;