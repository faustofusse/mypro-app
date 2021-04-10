import React from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import IconButton from '../../../components/buttons/Icon';
import { BLACK, GRAY } from '../../../constants/colors';

import Client from '../../../assets/images/client.svg';
const client = () => <Client />;
import Profesional from '../../../assets/images/professional.svg';
const professional = () => <Profesional />;

const Options = ({ navigation }) => {

    const button = (title, icon, onPress) => (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <View style={styles.optionIcon}>{icon()}</View>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
    
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <IconButton iconName='arrow-back-ios' onPress={navigation.goBack} color={BLACK} style={styles.icon}/>
            </SafeAreaView>
            <Text style={{fontFamily: 'MavenProBold', fontSize: 30, marginBottom: 30}}>Tipo de cuenta:</Text>
            <View style={styles.buttons}>
                {button('Cliente', client, () => navigation.navigate('Basic', { client:true }))}
                {button('Profesional', professional, () => navigation.navigate('Basic', { client:false }))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: GRAY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        padding: 15,
    },
    safeArea: {
        position: 'absolute',
        zIndex: 2,
        left: 0, top: 0
    },
    buttons: {
        width:'100%',
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'MavenProBold',
        color: BLACK
    },
});

export default Options;