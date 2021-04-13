import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { RED, BLUE, BLACK, GRAY } from '../../constants/colors';
import { useNavigation } from '@react-navigation/core';
import { Button } from '../../components/buttons';
import Facebook from '../../assets/images/facebook.svg';
import Google from '../../assets/images/google.svg';
import Mail from '../../assets/images/mail.svg';
import Logo from '../../assets/images/logo.svg';


const Start = (props) => {
    const navigation = useNavigation();

    const google = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        alert(userInfo)
        console.log(userInfo)
      } catch (error) { JSON.stringify(alert(error)) };
    }

    return (
        <View style={styles.container}>
            <StatusBar animated backgroundColor={GRAY} />
            <Logo style={styles.logo} />
            <Text style={styles.slogan}>SOLUCIONES A TUS PROBLEMAS</Text>
            <Text style={styles.text}>Ingresar con</Text>
            <Button icon={() => <Mail />} color={RED} text='Correo Electronico' onPress={()=>navigation.navigate('Mail')}/>
            <Button icon={() => <Facebook />} color={BLUE} text='Facebook' onPress={()=>console.log('boton')}/>
            <Button icon={() => <Google />} color={BLACK} text='Google' onPress={google}/>
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