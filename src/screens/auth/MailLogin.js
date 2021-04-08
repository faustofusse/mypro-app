import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, SafeAreaViewComponent, SafeAreaViewBase } from 'react-native';
import IconButton from '../../components/buttons/Icon';
import { BLACK, GRAY, RED, WHITE } from '../../constants/colors';
import { useDispatch } from 'react-redux';
import { login } from '../../utils/user';
import Input from '../../components/auth/Input';
import Button from '../../components/buttons/Auth';

const MailLogin = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [user, setUser] = useState({ email: "", password: "" });
  
    const handleChangeText = (name, value) => setUser({ ...user, [name]: value });

    const logIn = async () => dispatch(login(user.email, user.password));
    const register = async () => navigation.navigate('Register');
    const forgot = async () => alert('forgot password');
  
    const touchableText = (text, onPress, size, color) => <TouchableOpacity onPress={onPress}><Text style={{fontSize: size, color}}>{text}</Text></TouchableOpacity>

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: GRAY}}>
            <View style={styles.container}>
                <StatusBar backgroundColor={GRAY} />
                <IconButton iconName='arrow-back-ios' onPress={navigation.goBack} color={BLACK} style={styles.icon}/>
                <View style={styles.inputs}>
                    <Input style={styles.input} onChange={v => handleChangeText('email', v)} placeholder='pedrogonzales@gmail.com' label='Ingresa tu mail' type='emailAddress' keyboard='email-address'/>
                    <Input style={styles.input} onChange={v => handleChangeText('password', v)} placeholder='********' label='Ingresar contraseña' type='password' secure={true}/>
                    {touchableText('Olvide mi contraseña', forgot, 13, RED)}
                    <View style={styles.register}>
                        <Text style={{fontSize: 16, marginRight: 5}}>¿No tienes cuenta?</Text>
                        {touchableText('Registrate', register, 16, RED)}
                    </View>
                </View>
                <Button text='Continuar' onPress={() => alert('continuar')} color={RED} />
            </View>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: GRAY,
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
    icon: {
        position: 'absolute',
        padding: 15,
        zIndex: 2,
        left: 0, top: 0
    },
    register: {
        flexDirection: 'row',
        width:'100%',
        justifyContent: 'center',
        marginVertical: 15
    }
});

export default MailLogin;