import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { BACKGROUND_DARK, BACKGROUND_LIGHT, RED } from '../../../constants/colors';
import { Button, IconButton } from '../../../components/buttons';
import { Input, Selector } from '../../../components/auth';

const Professional = ({ navigation, route }) => {
    const TITLE = route.params.user.business ? 'Empresa' : 'Particular';
    const BACKGROUND_COLOR = BACKGROUND_DARK;
    const FONT_COLOR = BACKGROUND_LIGHT;

    const [user, setUser] = useState(route.params.user);
    const handleChangeText = (name, value) => setUser({ ...user, [name]: value });

    const next = () => alert(JSON.stringify(user));

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <IconButton iconName='arrow-back-ios' onPress={navigation.goBack} color={FONT_COLOR} style={styles.icon}/>
                    <Text style={[styles.title, {color: FONT_COLOR}]}>{TITLE}</Text>
                </View>
                <ScrollView>
                    <View style={styles.inputs}>
                        <Input style={styles.input} textColor={FONT_COLOR} onChange={v => handleChangeText('matricula', v)} placeholder='358723894582' label='Matrícula'/>
                        <Input style={styles.input} textColor={FONT_COLOR} onChange={v => handleChangeText('zone', v)} 
                            placeholder={'<Mapita>'} label={'Zona de trabajo'}/>
                        <Selector style={styles.input} onValueChange={v => handleChangeText('area', v)} label='Área de trabajo' 
                            placeholder={'Elige una zona...'} textColor={FONT_COLOR}
                            items={[{ label: 'Plomeria', value: 'Plomeria', key: 0 }, { label: 'Plomeria', value: 'Plomeria', key: 1 }, { label: 'Plomeria', value: 'Plomeria', key: 2 }]}/>
                        
                        { user.business ? (
                            <Input style={styles.input} textColor={FONT_COLOR} onChange={v => handleChangeText('employees', v)} placeholder='400' label='Cantidad de empleados' keyboard='number-pad'/>
                        ) : (
                            <Input style={styles.input} textColor={FONT_COLOR} onChange={v => handleChangeText('experience', v)} placeholder='14' label='Años de experiencia' keyboard='number-pad'/>
                        )}
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

export default Professional;