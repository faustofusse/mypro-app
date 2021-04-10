import React, { useRef, useState } from 'react'
import { Animated, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DARK_GRAY, RED } from '../../constants/colors'

const Switch = ({onPress, style}) => {
    const [particular, setParticular] = useState(true);
    const textStyle = selected => selected ? styles.textSelected : styles.text; 

    const changeValue = value => {
        setParticular(value);
        onPress(!value);
        animateTo(value ? 0 : 70);
    };

    const left = useRef(new Animated.Value(0)).current;
    const leftParsed = left.interpolate({ inputRange: [0,100], outputRange: ['0%', '100%'] });

    const animateTo = v => Animated.timing(left, { toValue: v, duration: 200, useNativeDriver: false }).start();
    
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity style={styles.button} onPress={() => changeValue(true)}>
                <Text style={textStyle(particular)}>Particular</Text>
            </TouchableOpacity>

            <View style={styles.divisor}/>

            <TouchableOpacity style={styles.button} onPress={() => changeValue(false)}>
                <Text style={textStyle(!particular)}>Empresa</Text>
            </TouchableOpacity>

            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', height: 3}}>
                <View style={{width: '70%', height: '100%', justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Animated.View style={{ left: leftParsed, width: '30%', height:'100%', backgroundColor: RED, position: 'absolute', borderRadius: 50 }} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent:'space-around',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        // backgroundColor: GRAY
    },
    button: {
        // padding: 10
        paddingVertical: 5,
        flex: 1
    },
    text: {
        fontFamily: 'MavenProMedium',
        fontSize: 20,
        textAlign: 'center',
        color: DARK_GRAY
    },
    textSelected: {
        fontFamily: 'MavenProMedium',
        fontSize: 20,
        textAlign: 'center',
        color: RED
    },
    divisor: {
        width: 1,
        height: '50%',
        backgroundColor: DARK_GRAY,
    }
})

export default Switch;