import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Image, View, TextInput, ScrollView } from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import { useDispatch } from 'react-redux';
import AuthButton from '../../components/buttons/AuthButton';
import { register } from '../../utils/user';
import DatePicker from '../../components/auth/DatePicker';

const Register = (props) => {
    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    const [user, setUser] = useState({ gender: 'male', userType: 'client' });
    
    const handleChangeText = (name, value) => setUser({ ...user, [name]: value });

    const registerUser = async () => { 
      console.log('Crear usuario', user); 
      dispatch(register(user, (res) => {
        alert(res.message);
        if (res.success) navigate('Login');
      })); 
    };

    const input = (placeholder, valueName, type, keyboard='default', secure=false) => ( <TextInput style={styles.input} secureTextEntry={secure} keyboardType={keyboard} textContentType={type} placeholder={placeholder} autoCapitalize='none' onChangeText={(value) => handleChangeText(valueName, value)} placeholderTextColor='#bdbdbd' /> );

    return (
        <ScrollView > 
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../../assets/images/logo.png')} resizeMode='contain'/>
                {input('Nombre', 'firstName', 'name')}
                {input('Apellido', 'lastName', 'familyName')}
                <SwitchSelector style={styles.selector} initial={0} onPress={value => handleChangeText('gender', value)}
                    options={[{label: 'Hombre', value: 'male', activeColor:'#ffb74d'}, {label: 'Mujer', activeColor:'#ffb74d', value: 'female'}]} /> 
                {input('Email', 'email', 'emailAddress', 'email-address')}
                {input('DNI', 'dni', 'none', 'number-pad')}
                {input('Teléfono', 'phone', 'telephoneNumber', 'phone-pad')}
                {input('Domicilio', 'address', 'fullStreetAddress')}
                <DatePicker onChange={d => setUser({ ...user, birthdate: Date.parse(d) })}/>
                <SwitchSelector style={styles.selector} initial={0} onPress={value => handleChangeText('userType', value)}
                    options={[{label: 'Cliente', value: 'client', activeColor:'#ffb74d'}, {label: 'Profesional', activeColor:'#ffb74d', value: 'professional'}]} /> 
                {input('Contraseña', 'password', 'oneTimeCode', 'default', true)}
                {input('Repetir contraseña', 'repeatPassword', 'password', 'default', true)}
                <AuthButton onPress={registerUser} iconName="login" text='Crear cuenta' />
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
      padding: '12%'
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
      width: '100%',
      backgroundColor: '#F5F5F5',
      borderRadius: 10,
      padding: 15,
      fontSize: 18,
      marginBottom: 15
    },
  });  

export default Register;