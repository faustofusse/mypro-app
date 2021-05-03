import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { BLACK, GRAY } from '../../constants/colors'

const Input = ({label, placeholder, onChange, secure=false, keyboard='default', type, style, textColor=BLACK, value}) => {
    return (
        <View style={style}>
            <Text style={[styles.text, {color: textColor}]}>{label}</Text>
            <TextInput style={[styles.input, {color: textColor}]} 
                secureTextEntry={secure} 
                keyboardType={keyboard} 
                placeholderTextColor={'#B4B4B4'}
                textContentType={type} 
                placeholder={placeholder} 
                autoCapitalize='none' 
                onChangeText={onChange} 
                defaultValue={value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderBottomColor: '#B4B4B4',
        borderBottomWidth: 1,
        paddingVertical: 7,
        fontSize: 18,
        fontFamily: 'MavenProRegular'
    },
    text: {
        fontFamily: 'MavenProBold',
        fontSize: 20,
        marginBottom: 5
    }
})

export default Input;