import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { RED, BLUE, BLACK, GRAY } from '../../constants/colors';
import { useNavigation } from '@react-navigation/core';
import AuthButton from '../../components/buttons/Auth';
import Logo from '../../assets/images/logo.svg';

import Mail from '../../assets/images/mail.svg';
const mail = () => <Mail />;
import Google from '../../assets/images/google.svg';
const google = () => <Google />;
import Facebook from '../../assets/images/facebook.svg';
const facebook = () => <Facebook />;

const Start = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={GRAY} />
            <Logo style={styles.logo} />
            <Text style={styles.slogan}>SOLUCIONES A TUS PROBLEMAS</Text>
            <Text style={styles.text}>Conectarse con</Text>
            <AuthButton icon={mail} color={RED} text='Correo Electronico' onPress={()=>navigation.navigate('Mail')}/>
            <AuthButton icon={facebook} color={BLUE} text='Facebook' onPress={()=>console.log('boton')}/>
            <AuthButton icon={google} color={BLACK} text='Google' onPress={()=>console.log('boton')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: GRAY,
      justifyContent: 'center',
      alignItems: 'center',
      color: '#FF0000'
    },
    logo: {
      maxWidth: '65%',
      marginBottom: 20
    },
    text: {
      fontFamily: 'MavenProBold',
      fontSize: 20,
      marginBottom: 23
    },
    slogan: {
      fontFamily: 'MavenProMedium',
      fontSize: 14,
      marginBottom: 150
    }
  });

export default Start;