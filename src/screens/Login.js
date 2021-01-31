import React, { useState } from 'react';
import { StyleSheet, Image, View, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import AuthButton from '../components/Buttons/AuthButton';
import { login } from '../utils/user';

export default function Login() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChangeText = (name, value) => setUser({ ...user, [name]: value });

  const logIn = async () => dispatch(login(user.email, user.password));

  const input = (placeholder, valueName, type, keyboard='default', secure=false) => ( <TextInput style={styles.input} secureTextEntry={secure} keyboardType={keyboard} textContentType={type} placeholder={placeholder} autoCapitalize='none' onChangeText={(value) => handleChangeText(valueName, value)} /> );

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/images/logo.png')} resizeMode='contain' />
      {input('Correo electrónico', 'email', 'emailAddress', 'email-address')}
      {input('Contraseña', 'password', 'password', 'default', true)}
      <View style={{width:'60%'}}>
        <AuthButton iconName='login' text='Ingresar' onPress={logIn} />
        <AuthButton iconName='login' text='Ingresar con Google' onPress={() =>  console.log('google login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width:'70%',
    height:100,
    marginBottom: 15
  },
  input: {
    width: '70%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginBottom: 15
  },
});
