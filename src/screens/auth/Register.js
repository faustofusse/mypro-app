import React from 'react';
import { View, ScrollView } from 'react-native';
import Fields from './Fields';
import { AREA_ITEMS } from '../../constants/index';

// Funciones que se llaman al presionar 'Continuar' ---------------------------------------------------------

const basic = (navigation, user, checkEmail) => () => checkEmail(res => {
     if (res.exists) return alert('El correo electronico ya fue registrado!');
     navigation.navigate('Extra', { user: { ...user, business: false }, title: 'Completa tus datos' });
});

const extra = (navigation, user, register) => user.professional ? 
     () => navigation.navigate('Professional', { user: user, title: user.business ? 'Empresa' : 'Particular'}) 
     : register;

// Pantallas ------------------------------------------------------------------------------------------------

export const Basic = Fields( ({ input, text, styles, button, user, navigation, checkEmail }) => 
     <View style={styles.items}>
          <View style={styles.inputs}>
               { input(text, 'email', 'pedrogonzales@gmail.com', 'Ingresa tu email', 'emailAddress', user.email) }
               { input(text, 'password', '********', 'Ingresa una contraseña', 'password', user.password) }
               { input(text, 'repeatPassword', '********', 'Repite la contraseña', 'password', user.repeatPassword) }
          </View>
          { button(basic(navigation, user, checkEmail)) }
     </View>
);

export const Extra = Fields( ({ input, text, birthdate, phone, styles, button, switchBusiness, user, navigation, register }) => 
     <ScrollView contentContainerStyle={styles.inputs}>
          { input(switchBusiness, 'business') }
          { input(text, 'name', user.business ? 'Gonzales Construcciones S.A.' : 'Pedro', 'Nombre', user.business ? 'organizationName' : 'givenName', user.name) }
          { input(text, 'lastName', 'Gonzalez', 'Apellido', 'familyName', user.lastName, !user.business) }
          { input(text, 'cuit', '30-12345678-9', 'Cuit', 'none', user.cuit, user.business) }
          { input(text, 'dni', '43812233', 'DNI', 'none', user.dni, !user.business) }
          { input(birthdate, 'birthdate', 'Fecha de nacimiento', !user.business) }
          { input(phone, 'phone', 'Teléfono', '11223344') }
          { button(extra(navigation, user, register)) }
     </ScrollView>
);

export const Professional = Fields( ({ input, text, selector, styles, button, user, register }) => 
     <ScrollView contentContainerStyle={styles.inputs}>
          { input(text, 'address', 'Av. Congreso 3321', 'Dirección', 'fullStreetAddress', user.address) }
          { input(text, 'enrollment', '358723894582', 'Matrícula', 'none', user.enrollment) }
          { input(text, 'workZone', '<Mapita>', 'Zona de trabajo', 'none', user.workZone) }
          { input(selector, 'workArea', 'Elige una zona', 'Área de trabajo', AREA_ITEMS) }
          { input(text, 'employees', '400', 'Cantidad de empleados', 'none', user.employees, user.business) }
          { input(text, 'experience', '15', 'Años de experiencia', 'none', user.experience, !user.business) }
          { button(register) }
     </ScrollView>
);