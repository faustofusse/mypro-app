import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BLACK } from '../../constants/colors'
import PhoneInput from "react-native-phone-number-input";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Input = ({label, placeholder, defaultValue, dark, onChangeText, onChangeFormatted, style, textColor=BLACK}) => {
    return (
        <View style={style}>
            <Text style={[styles.text, {color: textColor}]}>{label}</Text>
            <PhoneInput
                flagButtonStyle={{borderBottomWidth:1, borderBottomColor: '#B4B4B4'}}
                codeTextStyle={{color: textColor, padding: 0, fontFamily: 'MavenProRegular', fontSize: 18}}
                textInputStyle={{color: textColor, padding: 0, fontFamily: 'MavenProRegular', fontSize: 18}}
                containerStyle={{backgroundColor: 'transparent'}}
                textContainerStyle={styles.textContainer}
                textInputProps={{placeholderTextColor: '#B4B4B4'}}
                defaultValue={defaultValue}
                defaultCode='AR'
                layout='first'
                onChangeText={onChangeText}
                onChangeFormattedText={onChangeFormatted}
                withDarkTheme={dark}
                placeholder={placeholder}
                countryPickerProps={{filterProps: {placeholder: 'Buscar país...'}}}
                renderDropdownImage={<Icon name={'expand-more'} size={20} color={textColor} />}
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
    },
    text: {
        fontFamily: 'MavenProBold',
        fontSize: 20,
        marginBottom: 5
    },
    textContainer: {
        borderBottomWidth: 1, 
        borderBottomColor: '#B4B4B4', 
        backgroundColor: 'transparent',
        padding: 0
    }
})

export default Input;