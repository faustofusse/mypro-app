import React from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconButton from '../buttons/IconButton';

const Header = (props) => {
    return (
        <SafeAreaView>
            <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../../assets/images/logo.png')} resizeMode='contain' />
                    <View style={styles.icons}>
                        <IconButton iconName='favorite' iconSize={30} color={'#FFB500'} onPress={() => console.log('favorites!')} />
                        <IconButton style={{marginHorizontal: 10}} iconName='notifications' iconSize={30} color={'#FFB500'} onPress={() => console.log('notifications!')} />
                    </View>
                    <View style={styles.searchContainer}>
                        <View style={styles.searchBar}>
                            <Icon name={'search'} size={25} color={'rgba(0,0,0,.39)'} />
                            <TextInput style={styles.input} placeholder={'¿Qué estas buscando?'} onChangeText={props.onSearch} />
                        </View>
                        <IconButton style={{height: '100%', padding: 5}} iconName='menu' iconSize={30} color={'rgba(0,0,0,.39)'} onPress={() => console.log('menu!')} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11, 
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    logo: {
        width: '40%',
        height: 40,
        marginBottom: 15
    },
    icons: {
        flexDirection: 'row',
    },
    searchContainer: {
        width: '100%',
        backgroundColor: '#e5e5e5',
        borderRadius: 40,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    searchBar: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        borderRadius: 24,
        paddingLeft: 5,
    },
    input: {
        flex: 1,
        fontSize: 16,
        minHeight: 0,
        padding: 5
    }
});

export default Header;