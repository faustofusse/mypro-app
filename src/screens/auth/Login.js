import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RED } from '../../constants/colors';
import Fields from './Fields';

const touchableText = (text, onPress, size, color, visible=true) => visible ? <TouchableOpacity onPress={onPress}><Text style={{fontSize: size, color}}>{text}</Text></TouchableOpacity> : null;

export const Mail = Fields( ({ input, styles, text, button, user, navigation, login }) =>
     <View style={styles.items}>
          <View style={styles.inputs}>
               { input(text, 'email', 'pedrogonzales@gmail.com', 'Ingresa tu email', 'emailAddress', user.email) }
               { input(text, 'password', '********', 'Ingresa una contraseña', 'password', user.password) }
               <View style={{width: '80%'}}>
                    { touchableText('Olvide mi contraseña', () => navigation.push('Forgot', { forgot: true, scroll: false, title: 'Cambiar contraseña' }), 13, RED) }
               </View>
               <View style={styles.register}>
                    <Text style={{ fontSize: 16, marginRight: 5 }}>¿No tienes cuenta?</Text>
                    { touchableText('Registrate', () => navigation.push('Register', { user: {} }), 16, RED) }
               </View>
          </View>
          { button(login) }
     </View>
);