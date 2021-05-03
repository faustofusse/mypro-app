import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { BACKGROUND_DARK, BACKGROUND_LIGHT, RED } from '../../../constants/colors';
import { Button, IconButton } from '../../../components/buttons';
import { Input } from '../../../components/auth';
import { checkEmail } from '../../../utils/user';
import { useDispatch } from 'react-redux';

const emailExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Basic = ({ navigation, route }) => {
    const isClient = !route.params.user.professional;
    const TITLE = isClient ? 'Cliente' : 'Profesional';
    const BACKGROUND_COLOR = isClient ? BACKGROUND_LIGHT : BACKGROUND_DARK;
    const FONT_COLOR = isClient ? BACKGROUND_DARK : BACKGROUND_LIGHT;

    const dispatch = useDispatch();
    const [user, setUser] = useState({ ...route.params.user, email: null, password: null, repeatPassword: null });
    const handleChangeText = (name, value) => setUser({ ...user, [name]: value });
    
    const input = (key, placeholder, label, type, keyboard='default', secure=false, style=styles.input, textColor=FONT_COLOR, ) => 
        <Input onChange={v => handleChangeText(key, v)} placeholder={placeholder} label={label} style={style} textColor={textColor} keyboard={keyboard} type={type} secure={secure}/>

    const next = () => {
        if (!user.email || !user.password || !user.repeatPassword) return alert('Completa todos los campos!');
        if (emailExpression.test(user.email) == false) return alert('El correo no es valido.');
        if (user.password !== user.repeatPassword) return alert('Las contraseñas no coinciden.');
        dispatch(checkEmail(user.email, res => {
            if (res.exists) return alert('El correo electronico ya fue registrado!');
            navigation.navigate('Extra', { user: user });
        }));
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
            <View style={styles.container}>
                <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle={isClient ? 'dark-content' : 'light-content'}/>

                <View style={styles.header}>
                    <IconButton iconName='arrow-back-ios' onPress={navigation.goBack} color={FONT_COLOR} style={styles.icon}/>
                    <Text style={[styles.title, {color: FONT_COLOR}]}>{TITLE}</Text>
                </View>

                <View style={styles.inputs}>
                    {input('email', 'pedrogonzales@gmail.com', 'Ingresa tu email', 'emailAddress', 'email-address')}
                    {input('password', '********', 'Ingresa una contraseña', 'password', 'default', true)}
                    {input('repeatPassword', '********', 'Repite la contraseña', 'password', 'default', true)}
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