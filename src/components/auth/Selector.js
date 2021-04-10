import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BLACK, DARK_GRAY, RED } from '../../constants/colors'
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Selector = ({label, onValueChange, items, placeholder, style, textColor=BLACK}) => {
    return (
        <View style={style}>
            <Text style={[styles.text, {color: textColor}]}>{label}</Text>
            <RNPickerSelect onValueChange={onValueChange} items={items} 
                Icon={() => <Icon name={'expand-more'} size={30} color={RED} style={{marginRight: 3}}/>}
                useNativeAndroidPickerStyle={false}
                placeholder={{
                    label: placeholder,
                    value: null,
                    color: DARK_GRAY,
                }}
                style={{
                    inputAndroid: {...styles.input, color: textColor },
                    inputIOS: {...styles.input, color: textColor },
                    iconContainer: {justifyContent: 'center', height:'100%'},
                    placeholder: { padding: 0, color: DARK_GRAY, fontSize: 18, fontFamily: 'MavenProRegular'},
                }} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 0,
        paddingVertical: 10,
        fontSize: 18,
        fontFamily: 'MavenProRegular',
        borderBottomWidth: 1,
        borderBottomColor: DARK_GRAY
    },
    text: {
        fontFamily: 'MavenProBold',
        fontSize: 20,
        marginBottom: 5
    }
});

export default Selector;