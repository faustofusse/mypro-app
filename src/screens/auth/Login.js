import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GRAY, RED } from '../../constants/colors';
import Fields from './Fields';

const touchableText = (text, onPress, size, color, visible=true) => visible ? <TouchableOpacity onPress={onPress}><Text style={{fontSize: size, color}}>{text}</Text></TouchableOpacity> : null;

export const Mail = Fields( ({ input, styles, text, button, user, navigation, login }) =>
     <View style={styles.items}>
          <View style={styles.inputs}>
               { input(text, 'email', 'pedrogonzales@gmail.com', 'Ingresa tu email', 'emailAddress', user.email) }
               { input(text, 'password', '********', 'Ingresa una contraseña', 'password', user.password) }
               <View style={{width: '80%'}}>
                    { touchableText('Olvide mi contraseña', () => navigation.push('Forgot', { title: 'Cambiar contraseña', background: GRAY }), 13, RED) }
               </View>
               <View style={styles.register}>
                    <Text style={{ fontSize: 16, marginRight: 5 }}>¿No tienes cuenta?</Text>
                    { touchableText('Registrate', () => navigation.push('Register', { user: {} }), 16, RED) }
               </View>
          </View>
          { button(login) }
     </View>
);

export const Forgot = Fields( ({ input, styles, text, button, user, navigation, forgot }) =>
     <View style={styles.items}>
          <View style={styles.inputs}>
               { input(text, 'email', 'pedrogonzales@gmail.com', 'Ingresa tu email', 'emailAddress', user.email) }
          </View>
          { button( forgot( response => response.success ? navigation.popToTop() : alert(response.message) ) ) }
     </View>
);