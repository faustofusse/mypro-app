import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { BACKGROUND_DARK, BACKGROUND_LIGHT, RED } from '../../../constants/colors';
import { Button, IconButton } from '../../../components/buttons';
import { Input } from '../../../components/auth';

const Basic = ({ navigation, route }) => {
    const isClient = route.params.client;

    const TITLE = isClient ? 'Cliente' : 'Profesional';
    const BACKGROUND_COLOR = isClient ? BACKGROUND_LIGHT : BACKGROUND_DARK;
    const FONT_COLOR = isClient ? BACKGROUND_DARK : BACKGROUND_LIGHT;

    const [user, setUser] = useState({ email: "", password: "", repeatPassword: "" });
    const handleChangeText = (name, value) => setUser({ ...user, [name]: value });

    const next = () => navigation.navigate('Extra', { client: isClient, user: user });

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
            <View style={styles.container}>
                <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle={isClient ? 'dark-content' : 'light-content'}/>
                <View style={styles.header}>
                    <IconButton iconName='arrow-back-ios' onPress={navigation.goBack} color={FONT_COLOR} style={styles.icon}/>
                    <Text style={[styles.title, {color: FONT_COLOR}]}>{TITLE}</Text>
                </View>
                <View style={styles.inputs}>
                    <Input style={styles.input} textColor={FONT_COLOR} onChange={v => handleChangeText('email', v)} placeholder='pedrogonzales@gmail.com' label='Ingresa tu mail' type='emailAddress' keyboard='email-address'/>
                    <Input style={styles.input} textColor={FONT_COLOR} onChange={v => handleChangeText('password', v)} placeholder='********' label='Ingresa una contraseña' type='password' secure={true}/>
                    <Input style={styles.input} textColor={FONT_COLOR} onChange={v => handleChangeText('repeatPassword', v)} placeholder='********' label='Repite la contraseña' type='password' secure={true}/>
                </View>
                <Button text='Continuar' onPress={next} color={RED} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '20%',
    },
    input: {
        width: '100%',
        marginVertical: 15,
    },
    inputs: {
        width:'80%',
        alignItems: 'flex-start',
    },
    header: {
        position: 'absolute',
        zIndex: 2,
        left: 0, top: 0,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems:'center',
        flexDirection: 'row',
    },
    title: {
        fontFamily: 'MavenProBold',
        fontSize: 23,
        position: 'absolute',
        width: '100%',
        zIndex: -2,
        textAlign: 'center'
    },
    icon: {
        padding: 15,
    },
});

export default Basic;