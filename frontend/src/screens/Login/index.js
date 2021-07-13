import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import styles from './style'

const Login = ({ navigation }) => {
    return (

        <View style={styles.cotainer}>
            <View style={styles.firstContainer}>
                <Image
                    style={styles.imageUser}
                    source={require('../../../assets/splash.png')}
                />
                <Text style={styles.firstText}>Entrar com gmail: </Text>
                <IconButton
                    icon="gmail"
                    style={{ marginBottom: 20 }}
                    color='green'
                    size={50}
                    onPress={() => console.log('ok')}
                />
                <Button color='green' mode="contained" onPress={() => navigation.navigate('Cadastrar Usuario')} >Cadastrar</Button>
            </View>
        </View>
    )
}
export default Login

