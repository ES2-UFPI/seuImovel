import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Button } from 'react-native-paper'
import styles from './style'

const Login = ({ navigation }) => {
    return (

        <View style={styles.cotainer}>
            <View style={styles.firstContainer}>
                <Image
                    style={styles.imageUser}
                    source={require('../../../assets/splash.png')}
                />
                <Button style={{ marginBottom: 20 }} color='green' mode="contained" >Login</Button>
                <Button color='green' mode="contained" onPress={() => navigation.navigate('Cadastrar Usuario')} >Cadastrar</Button>
            </View>
        </View>
    )
}
export default Login

