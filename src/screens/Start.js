import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import AuthButton from '../components/Buttons/AuthButton';

const Start = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/images/logo.png')} resizeMode='contain'/>
            <Text style={styles.text}>Para comenzar, inicia sesion o crea una cuenta.</Text>
            <View style={{width:'60%'}}>
                <AuthButton iconName="login" text='Iniciar Sesión' onPress={ ()=> navigation.navigate('Login')} />
                <AuthButton iconName="edit" text='Crear una cuenta' onPress={ ()=> navigation.navigate('Register')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#FF0000'
    },
    logo: {
      width:'70%',
      height:100,
      marginBottom: 15
    },
    text: {
      fontSize: 23,
      width: '70%',
      marginBottom: 15,
    }
  });

export default Start;