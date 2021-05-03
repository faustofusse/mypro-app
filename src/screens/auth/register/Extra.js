import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Input, PhoneInput, Switch, Selector, DatePicker } from '../../../components/auth';
import { BACKGROUND_DARK, BACKGROUND_LIGHT, RED } from '../../../constants/colors';
import { Button, IconButton} from '../../../components/buttons';
import { useDispatch } from 'react-redux';
import { validate } from '../../../utils/register';
import { register } from '../../../utils/user';

const Extra = ({ navigation, route }) => {
    const isClient = !route.params.user.professional;
    const TITLE = 'Completa tus datos';
    const BACKGROUND_COLOR = isClient ? BACKGROUND_LIGHT : BACKGROUND_DARK;
    const FONT_COLOR = isClient ? BACKGROUND_DARK : BACKGROUND_LIGHT;

    const dispatch = useDispatch();
    const [user, setUser] = useState({...route.params.user, business: false });
    const handleChangeText = (name, value) => setUser({ ...user, [name]: value });

    const basicProps = (key, placeholder, label) => ({ style: styles.input, textColor: FONT_COLOR, onChange: v => handleChangeText(key, v), placeholder, label});
    const input = (visible, key, placeholder, label, value) => visible ? <Input value={value} keyboard={'default'} {...basicProps(key, placeholder, label)}/> : null;

    const registerUser = () => {
        if (!validate(user)) return alert('Completa todos los campos!');
        dispatch(register(user, res => {
            console.log(JSON.stringify(res));
            if (!res.success) return console.log(res.errors);
            navigation.popToTop();
        }));
    }
    const next = () => !isClient ? navigation.navigate('Professional', { client: isClient, user: user }) : registerUser();

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

                        {input(true, 'name', user.business ? 'Gonzales Construcciones S.A.' : 'Pedro', 'Nombre', user.name)}
                        {input(user.business, 'cuit', '30-12345678-9', 'Cuit')}
                        {input(!user.business, 'lastName', 'Gonzalez', 'Apellido', user.lastName)}
                        {input(!user.business, 'dni', '43812233', 'DNI')}
                        {!user.business ? <DatePicker style={styles.input} textColor={FONT_COLOR} initialDate={user.birthdate} onChange={d => handleChangeText('birthdate', Date.parse(d))} label='Fecha de nacimiento'/> : null }
                        <PhoneInput style={[styles.input, {marginBottom: 20}]} label='Teléfono' dark={!isClient} placeholder='11223344' textColor={FONT_COLOR} onChangeFormatted={v => handleChangeText('phone', v)}/>

                        <Button width='80%' text='Continuar' onPress={next} color={RED} />
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