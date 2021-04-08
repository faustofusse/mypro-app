import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function IconButton({ iconName=null, iconSize=30, onPress, color, style={} }) {
    return (
        <View style={style}>
            <TouchableOpacity onPress={onPress}>
                <Icon hide={iconName === null} name={iconName} size={iconSize} color={color} />
            </TouchableOpacity>
        </View>
    )
}
