import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { DARK_GRAY, RED } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function DatePicker({ onChange, textColor, style, initialDate, label=null }) {
    const [date, setDate] = useState(initialDate ? new Date(initialDate) : null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleConfirmDate = (date) => {
      setDate(date);
      setShowDatePicker(false);
      onChange(date);
    };

    if (date) {
        var day = date.getUTCDate() < 10 ? '0'.concat(date.getUTCDate()) : date.getUTCDate();
        var month = date.getUTCMonth() < 9 ? '0'.concat(date.getUTCMonth() + 1) : date.getUTCMonth() + 1;
        var year = date.getUTCFullYear();
    }

    return (
        <View style={style}>
            { label ? ( <Text style={[styles.label, {color: textColor}]}>{label}</Text> ) : null}

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.container]}>
                <Text style={[styles.text, {color: date ? textColor : DARK_GRAY}]}>{date ? `${day}/${month}/${year}` : 'DD/MM/AAAA'}</Text>
                <Icon name={'today'} color={RED} size={30} />
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={showDatePicker}
                onConfirm={handleConfirmDate}
                onCancel={() => setShowDatePicker(false)}
                headerTextIOS='Elegir una fecha'
                cancelTextIOS='Cancelar'
                confirmTextIOS='Confirmar'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: '#F5F5F5',
        paddingVertical: 7,
        // marginBottom: 15,
        borderBottomColor: DARK_GRAY,
        borderBottomWidth: 1
    },
    label: {
        fontFamily: 'MavenProBold',
        fontSize: 20,
        marginBottom: 5
    },
    text: {
        fontSize: 18,
        fontFamily: 'MavenProRegular'
    }
});
