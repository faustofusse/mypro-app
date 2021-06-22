import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { BLACK, GRAY } from '../../constants/colors';
import IconButton from '../../components/buttons/Icon';
import Profesional from '../../assets/images/professional.svg';
import Client from '../../assets/images/client.svg';

const Options = ({ navigation, route }) => {
    const user = route.params.user || {};
    // const user = route.params.user ? route.params.user : {};
    const skipBasic = user.google || user.facebook;

    const button = (title, icon, onPress) => (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <View style={styles.optionIcon}>{icon()}</View>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );

    const next = (professional) => () => navigation.navigate(skipBasic ? 'Extra' : 'Basic', 
        { user: { ...user, professional: professional }, title: skipBasic ? 'Completa tus datos' : professional ? 'Profesional' : 'Cliente' });

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <IconButton iconName='arrow-back-ios' onPress={navigation.goBack} color={BLACK} style={styles.icon}/>
            </SafeAreaView>
            <Text style={{fontFamily: 'MavenProBold', fontSize: 30, marginBottom: 30}}>Tipo de cuenta:</Text>
            <View style={styles.buttons}>
                { button('Cliente', () => <Client />, next(false)) }
                { button('Profesional', () => <Profesional />, next(true)) }
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