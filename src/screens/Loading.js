import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, Animated } from 'react-native';

const Progress = ({ step, steps, height }) => {
    const [width, setWidth] = React.useState(0);
    const animatedValue = React.useRef(new Animated.Value(-1000)).current;
    const reactive = React.useRef(new Animated.Value(-1000)).current;

    React.useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    React.useEffect(() => {
        reactive.setValue(-width + (width * step) / steps);
    }, [step, width]);

    return (
        <View style={[styles.progress, {height: height * 2, borderRadius: height}]} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
            <View style={[styles.circle, styles.grey, {height: height * 2, width: height, borderRadius: height}]}></View>
            <View style={[styles.circle, styles.orange, {height: height, width: height, borderRadius: height, margin: height / 2 }]}></View>
            <Animated.View style={[styles.animated, {height: height, borderRadius: height, transform: [ { translateX: animatedValue } ] }]} />
        </View>
    );
};

export default function Loading() {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => setIndex(index + 1), 300);
        return () => clearInterval(interval);
    }, [index]);

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/images/logo.png')} resizeMode='contain'/>
            <StatusBar />
            <Progress step={index} steps={10} height={10} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '80%',
        height: 100,
    },
    progress: {
        backgroundColor: '#D9D9D9',
        overflow: 'hidden',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '80%',
    },
    animated: {
        width: '200%',
        backgroundColor: '#FFB500',
        left: 0,
    },
    circle: {
        position: 'absolute',
        zIndex: 2,
        left: 0,
    },
    grey: {
        backgroundColor: '#D9D9D9',
    },
    orange: {
       backgroundColor: '#FFB500',
    }
});
