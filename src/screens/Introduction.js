import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, Image, View } from 'react-native';
import IntroButton from '../components/Buttons/IntroButton';
import { doneIntro } from '../utils/storage';

const Introduction = (props) => {
    const navigation = useNavigation();
    const [screen, setScreen] = useState(0);

    const titles = [
        '¡Bienvenido a myPro!',
        '¡Disfruta de los beneficios myPro!',
        '¡Recuerda!',
    ];
    const texts = [
        'El lugar donde encontrar y ofrecer los mejores trabajos para el hogar y más...',
        'Para ello, primero comencemos creando tu cuenta.',
        'Si eres profesional, consigue la verificación, así más gente te podrá encontrar.',
    ];

    const skip = () => doneIntro().then(() => navigation.navigate('Start'));

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/images/logo.png')} resizeMode="contain" />
            <Text style={styles.titulo}>{titles[screen]}</Text>
            <Text style={styles.texto}>{texts[screen]}</Text>
            <View style={styles.botones}>
                {screen !== 0 ? ( <IntroButton text="Atras" onPress={() => setScreen(screen - 1)} /> ) : null}
                {screen < texts.length - 1 ? ( <IntroButton text="Continuar" onPress={() => setScreen(screen + 1)} /> ) : null}
                <IntroButton text="Saltear" onPress={skip} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '40%',
    },
    logo: {
        width: '70%',
        height: 100,
    },
    botones: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titulo: {
        fontSize: 30,
        marginVertical: 25,
        maxWidth: '80%',
    },
    texto: {
        fontSize: 23,
        maxWidth: '70%',
        marginBottom: 35,
    },
});

export default Introduction;
