import React, { useState } from 'react';
import { StyleSheet, Image, View, TextInput, ScrollView } from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import AuthButton from '../components/Buttons/AuthButton';

const Register = (props) => {
    const [user, setUser] = useState({ gender: 'male', userType: 'client' });

    const handleChangeText = (name, value) => setUser({ ...user, [name]: value });

    const register = async () => { console.log('crear usuario', user) };

    const input = (placeholder, valueName, type, keyboard='default') => ( <TextInput style={styles.input} keyboardType={keyboard} textContentType={type} placeholder={placeholder} autoCapitalize='none' onChangeText={(value) => handleChangeText(valueName, value)} /> );

    return (
        <ScrollView > 
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')} resizeMode='contain'/>
                {input('Nombre', 'firstName', 'name')}
                {input('Apellido', 'lastName', 'familyName')}
                <SwitchSelector style={styles.selector} initial={0} onPress={value => handleChangeText('gender', value)}
                    options={[{label: 'Hombre', value: 'male', activeColor:'#ffb74d'}, {label: 'Mujer', activeColor:'#ffb74d', value: 'female'}]} /> 
                {input('Email', 'email', 'emailAddress', 'email-address')}
                {input('DNI', 'dni', 'none', 'number-pad')}
                {input('Teléfono', 'phone', 'telephoneNumber', 'phone-pad')}
                {input('Domicilio', 'address', 'fullStreetAddress')}
                <SwitchSelector style={styles.selector} initial={0} onPress={value => handleChangeText('userType', value)}
                    options={[{label: 'Cliente', value: 'client', activeColor:'#ffb74d'}, {label: 'Profesional', activeColor:'#ffb74d', value: 'professional'}]} /> 
                {input('Contraseña', 'password', 'password')}
                {input('Repetir contraseña', 'repeatPassword', 'password')}
                <AuthButton onPress={register} iconName="login" text='Crear cuenta' />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:'100%',
      height:'100%',
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 20
    },
    logo: {
        width:'70%',
        height:100,
        marginBottom: 15
    },
    selector: {
      width: '75%',
      marginBottom: 15
    },
    input: {
      width: '80%',
      backgroundColor: '#F5F5F5',
      borderRadius: 10,
      padding: 15,
      fontSize: 18,
      marginBottom: 15
    },
  });  

export default Register;