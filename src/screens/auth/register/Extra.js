import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { BACKGROUND_DARK, BACKGROUND_LIGHT, RED } from '../../../constants/colors';
import { Input, PhoneInput, Switch, Selector, DatePicker } from '../../../components/auth';
import { Button, IconButton} from '../../../components/buttons';

const Extra = ({ navigation, route }) => {
    const isClient = route.params.client;

    const TITLE = 'Completa tus datos';
    const BACKGROUND_COLOR = isClient ? BACKGROUND_LIGHT : BACKGROUND_DARK;
    const FONT_COLOR = isClient ? BACKGROUND_DARK : BACKGROUND_LIGHT;

    const [user, setUser] = useState({...route.params.user, business: false});
    const [phoneValue, setPhoneValue] = useState('');
    const handleChangeText = (name, value) => setUser({ ...user, [name]: value });

    const next = () => {
        if (isClient) alert(JSON.stringify(user));
        else navigation.navigate('Professional', { client: isClient, user: user });
    };

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
                        <Input style={styles.input} textColor={FONT_COLOR} onChange={v => handleChangeText('name', v)} placeholder={user.business ? 'Gonzales Construcciones S.A.' : 'Pedro'} label='Nombre'/>
                        <Input style={styles.input} textColor={FONT_COLOR} onChange={v => handleChangeText(user.business ? 'cuit' : 'lastName', v)} 
                            placeholder={user.business ? '30-12345678-9' : 'Gonzalez'} label={user.business ? 'Cuit' : 'Apellido'}/>
                        { !user.business ? (
                            <View style={[styles.inputs, {marginBottom: 0}]}>
                                <Selector style={styles.input} onValueChange={v => handleChangeText('gender', v)} label='Género' 
                                    placeholder={'Elige un género...'} textColor={FONT_COLOR}
                                    items={[{ label: 'Hombre', value: 'male', key: 0 }, { label: 'Mujer', value: 'female', key: 1 }, { label: 'Otro', value: 'other', key: 2 }]}/>
                                <DatePicker style={styles.input} textColor={FONT_COLOR} onChange={d => handleChangeText('birthdate', Date.parse(d))} label='Fecha de nacimiento'/>
                                <Input style={styles.input} textColor={FONT_COLOR} onChange={v => handleChangeText('dni', v)} placeholder='32719027' label='DNI' keyboard='numeric'/>
                            </View>
                        ) : null }
                        <Input style={styles.input} textColor={FONT_COLOR} onChange={v => handleChangeText('email', v)} placeholder='pedrogonzales@gmail.com' label='Mail' type='emailAddress' keyboard='email-address'/>
                        <Input style={styles.input} textColor={FONT_COLOR} onChange={v => handleChangeText('address', v)} placeholder='Av. Congreso 3321' label='Dirección' />
                        <PhoneInput style={[styles.input, {marginBottom: 20}]} label='Teléfono' dark={!isClient} 
                            defaultValue={phoneValue} onChangeText={setPhoneValue} placeholder='11223344' 
                            textColor={FONT_COLOR} onChangeFormatted={v => handleChangeText('phone', v)}/>
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