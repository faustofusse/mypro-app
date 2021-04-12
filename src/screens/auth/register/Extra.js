import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Input, PhoneInput, Switch, Selector, DatePicker } from '../../../components/auth';
import { BACKGROUND_DARK, BACKGROUND_LIGHT, RED } from '../../../constants/colors';
import { Button, IconButton} from '../../../components/buttons';
import { USER_MODELS } from '../../../constants';

const TITLE = 'Completa tus datos';
const GENDER_ITEMS = [{ label: 'Hombre', value: 'male', key: 0 }, { label: 'Mujer', value: 'female', key: 1 }, { label: 'Otro', value: 'other', key: 2 }];
const AREA_ITEMS = [{ label: 'Plomeria', value: 'Plomeria', key: 0 }, { label: 'Plomeria', value: 'Plomeria', key: 1 }, { label: 'Plomeria', value: 'Plomeria', key: 2 }];

const checkValues = (object, values=null) => { 
    for (let i = 0; i < values.length; i++) if (object[values[i]] == null || object[values[i]] === '') return false;
    return true;
}

const validate = user => {
    const extras = USER_MODELS[user.professional ? 'professional' : 'client'][user.business ? 'business' : 'particular'];
    const values = extras.concat(USER_MODELS['all']);
    return checkValues(user, values);
}

const Extra = ({ navigation, route }) => {
    const isClient = !route.params.user.professional;
    const BACKGROUND_COLOR = isClient ? BACKGROUND_LIGHT : BACKGROUND_DARK;
    const FONT_COLOR = isClient ? BACKGROUND_DARK : BACKGROUND_LIGHT;

    const [user, setUser] = useState({...route.params.user, business: false});
    const handleChangeText = (name, value) => setUser({ ...user, [name]: value });

    const basicProps = (key, placeholder, label) => ({ style: styles.input, textColor: FONT_COLOR, onChange: v => handleChangeText(key, v), placeholder, label});
    const input = (visible, key, placeholder, label, keyboard='default') => visible ? <Input keyboard={keyboard} {...basicProps(key, placeholder, label)}/> : null;
    const selector = (visible, key, placeholder, label, items) => visible ? <Selector items={items} {...basicProps(key, placeholder, label)}/> : null;

    const register = () => alert(validate(user));
    // const next = () => !isClient ? navigation.navigate('Professional', { client: isClient, user: user }) : alert(JSON.stringify(user));

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <IconButton iconName='arrow-back-ios' onPress={navigation.goBack} color={FONT_COLOR} style={styles.icon}/>
                    <Text style={[styles.title, {color: FONT_COLOR}]}>{TITLE}</Text>
                </View>
                <ScrollView>
                    <View style={styles.inputs}>
                        <Switch style={{width: '70%', marginBottom: 15}} onPress={value => handleChangeText('business', value)} />

                        {input(true, 'name', user.business ? 'Gonzales Construcciones S.A.' : 'Pedro', 'Nombre')}
                        {input(user.business, 'cuit', '30-12345678-9', 'Cuit')}
                        {input(!user.business, 'lastName', 'Gonzalez', 'Apellido')}
                        {selector(!user.business, 'gender', 'Elige un género...', 'Género', GENDER_ITEMS)}
                        {!user.business ? <DatePicker style={styles.input} textColor={FONT_COLOR} onChange={d => handleChangeText('birthdate', Date.parse(d))} label='Fecha de nacimiento'/> : null }
                        {input(!user.business, 'dni', '32719027', 'DNI', 'numeric')}
                        {input(true, 'address', 'Av. Congreso 3321', 'Dirección')}
                        <PhoneInput style={[styles.input, {marginBottom: 20}]} label='Teléfono' dark={!isClient} placeholder='11223344' textColor={FONT_COLOR} onChangeFormatted={v => handleChangeText('phone', v)}/>
                        {input(!isClient, 'enrollment', '358723894582', 'Matrícula')}
                        {input(!isClient, 'workZone', '<Mapita>', 'Zona de trabajo')}
                        {selector(!isClient, 'workArea', 'Elige una zona', 'Área de trabajo', AREA_ITEMS)}
                        {input(!isClient && user.business, 'employees', '400', 'Cantidad de empleados', 'number-pad')}
                        {input(!isClient && !user.business, 'experience', '15', 'Años de experiencia', 'number-pad')}

                        <Button width='80%' text='Continuar' onPress={register} color={RED} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '20%',
    },
    input: {
        width: '80%',
        marginVertical: 15,
    },
    inputs: {
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10%'
    },
    header: {
        position: 'absolute',
        zIndex: 2,
        left: 0, top: 0,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems:'center',
        flexDirection: 'row',
    },
    title: {
        fontFamily: 'MavenProBold',
        fontSize: 23,
        position: 'absolute',
        width: '100%',
        zIndex: -2,
        textAlign: 'center'
    },
    icon: {
        padding: 15,
    }
});

export default Extra;