import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { BACKGROUND_DARK, BACKGROUND_LIGHT, RED } from '../../../constants/colors';
import { Button, IconButton } from '../../../components/buttons';
import { Input, Selector } from '../../../components/auth';
import { useDispatch } from 'react-redux';
import { validate } from '../../../utils/register';
import { register } from '../../../utils/user';

const AREA_ITEMS = [{ label: 'Plomeria', value: 'Plomeria', key: 0 }, { label: 'Plomeria', value: 'Plomeria', key: 1 }, { label: 'Plomeria', value: 'Plomeria', key: 2 }];

const Professional = ({ navigation, route }) => {
    const isClient = !route.params.user.professional;
    const TITLE = route.params.user.business ? 'Empresa' : 'Particular';
    const BACKGROUND_COLOR = BACKGROUND_DARK;
    const FONT_COLOR = BACKGROUND_LIGHT;

    const dispatch = useDispatch();
    const [user, setUser] = useState(route.params.user);
    const handleChangeText = (name, value) => setUser({ ...user, [name]: value });

    const basicProps = (key, placeholder, label) => ({ style: styles.input, textColor: FONT_COLOR, onChange: v => handleChangeText(key, v), placeholder, label});
    const input = (visible, key, placeholder, label, keyboard='default') => visible ? <Input keyboard={keyboard} {...basicProps(key, placeholder, label)}/> : null;
    const selector = (visible, key, placeholder, label, items) => visible ? <Selector items={items} {...basicProps(key, placeholder, label)}/> : null;

    const registerUser = () => {
        if (!validate(user)) return alert('Completa todos los campos!');
        dispatch(register(user, res => {
            console.log(JSON.stringify(res));
            if (!res.success) return console.log(res.errors);
            navigation.popToTop();
        }));
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <IconButton iconName='arrow-back-ios' onPress={navigation.goBack} color={FONT_COLOR} style={styles.icon}/>
                    <Text style={[styles.title, {color: FONT_COLOR}]}>{TITLE}</Text>
                </View>
                <ScrollView>
                    <View style={styles.inputs}>
                        {input(true, 'address', 'Av. Congreso 3321', 'Dirección')}
                        {input(!user.business, 'dni', '32719027', 'DNI', 'numeric')}
                        {input(!isClient, 'enrollment', '358723894582', 'Matrícula')}
                        {input(!isClient, 'workZone', '<Mapita>', 'Zona de trabajo')}
                        {selector(!isClient, 'workArea', 'Elige una zona', 'Área de trabajo', AREA_ITEMS)}
                        {input(!isClient && user.business, 'employees', '400', 'Cantidad de empleados', 'number-pad')}
                        {input(!isClient && !user.business, 'experience', '15', 'Años de experiencia', 'number-pad')}
                        
                        <Button width='80%' text='Continuar' onPress={registerUser} color={RED} />
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

export default Professional;