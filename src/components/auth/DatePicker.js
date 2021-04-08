import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function DatePicker({ onChange }) {
    const [date, setDate] = useState(null);
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
        <View style={{width:'100%'}}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.container}>
                <Text style={styles.text}>Nacimiento: <Text style={{color: date ? 'black' : '#bdbdbd'}}>{date ? `${day}/${month}/${year}` : 'DD/MM/AAAA'}</Text></Text>
                <Icon name={'today'} color={'#ffb74d'} size={30} />
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
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15
    },
    text: {
        fontSize: 18,
        color: '#bdbdbd'
    }
});
