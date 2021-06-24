import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { DatePicker, Input, PhoneInput, Selector, Switch } from '../../components/auth';
import { BACKGROUND_DARK, BACKGROUND_LIGHT, RED } from '../../constants/colors';
import { register, checkEmail, login, forgot } from '../../utils/user';
import { IconButton, Button } from '../../components/buttons';
import { useDispatch } from 'react-redux';

const emailExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const incomplete = (fields, user) => fields.some( v => !Object.keys(user).includes(v) || user[v] === null || user[v] === '' );
const getKeyboard = value => value == 'email' ? 'email-address' : ['dni', 'enrollment', 'experience', 'employees'].includes(value) ? 'number-pad' : 'default';

const Fields = component => ({ route, navigation }) => {
    const dispatch = useDispatch();
    // State and Refs
    const [user, setUser] = useState(route.params.user || {});
    const [firstRender, setFirstRender] = useState(true);
    const fields = useRef([]);
    // Constants
    const { title, background } = route.params;
    const dark = user.professional;
    const backgroundColor = background || (dark ? BACKGROUND_DARK : BACKGROUND_LIGHT);
    const fontColor = dark == null ? BACKGROUND_DARK : (dark ? BACKGROUND_LIGHT : BACKGROUND_DARK);
    // Functions
    const previousFields = () => route.params.user ? Object.keys(route.params.user) : [];
    const filtered = user => Object.fromEntries( Object.entries(user).filter( ([key, val]) => fields.current.concat(previousFields()).includes(key) ) );
    const changeValue = (name, value) => setUser({ ...user, [name]: value });
    const check = callback => dispatch(checkEmail(user.email, callback));
    const forgotPassword = callback => () => dispatch(forgot(user.email, callback));
    const validate = next => () => incomplete(fields.current, user) ? alert('Error: completa todos los campos') : next() ;
    const registerUser = () => dispatch(register(filtered(user), res => {
        console.log(JSON.stringify(res));
        if (!res.success) return console.log(res.errors);
        navigation.popToTop();
    }));
    const loginUser = () => dispatch(login(user));
    // Inputs
    const basicProps = (key, placeholder, label) => ({ style: styles.input, textColor: fontColor, onChange: v => changeValue(key, v), placeholder, label});
    const selector = (key, placeholder, label, items, visible=true) => visible ? <Selector items={items} {...basicProps(key, placeholder, label)}/> : null;
    const text = (key, placeholder, label, type, value, visible=true) => visible ? <Input value={value} keyboard={getKeyboard(key)} secure={key == 'password' || key == 'repeatPassword'} textContentType={type} {...basicProps(key, placeholder, label)}/> : null;
    const birthdate = (key, label, visible=true)=> visible ? <DatePicker style={styles.input} textColor={fontColor} initialDate={user.birthdate} onChange={d => changeValue(key, Date.parse(d))} label={label}/> : null;
    const phone = (key, label, placeholder, visible=true) => visible ? <PhoneInput style={[styles.input, {marginBottom: 20}]} label={label} dark={dark} placeholder={placeholder} textColor={fontColor} onChangeFormatted={v => changeValue(key, v)}/> : null;
    const switchBusiness = (key) => <Switch visible={true} style={{width: '70%', marginBottom: 15}} onPress={value => {
        fields.current = [];
        setFirstRender(true);
        changeValue(key, value);
    }} />
    const input = (element,...args) => {
        const visible = typeof(args[args.length - 1]) != 'boolean' || args[args.length - 1];
        if (firstRender && visible == false) changeValue(args[0], null);
        if (firstRender && visible != false) fields.current.push(args[0]);
        return element(...args);
    }
    const button = onClick => <Button text='Continuar' onPress={validate(onClick)} color={RED} />;
    // Render
    if (firstRender) setFirstRender(false);
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: backgroundColor}}>
            <View style={styles.container}>
                <StatusBar backgroundColor={backgroundColor} barStyle={dark ? 'light-content' : 'dark-content'}/>
                <View style={styles.header}>
                    <IconButton iconName='arrow-back-ios' onPress={navigation.goBack} color={fontColor} style={styles.icon}/>
                    <Text style={[styles.title, {color: fontColor, display: !title ? 'none' : 'flex'}]}>{title}</Text>
                </View>
                { component({ user, styles, navigation, forgot: forgotPassword, login: loginUser, register: registerUser, checkEmail: check, validate, input, selector, text, phone, switchBusiness, birthdate, button }) }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '20%',
        alignItems: 'stretch',
    },
    items: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20%'
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
    },
    register: {
        flexDirection: 'row',
        width:'100%',
        justifyContent: 'center',
        marginVertical: 15
    }
});

export default Fields;