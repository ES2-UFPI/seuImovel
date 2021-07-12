import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button} from 'react-native-paper'

const Login = ({navigation}) => {
    return (
        <View>
            <Text>Login</Text>
            <Button color='green' onPress={() => navigation.navigate('Cadastrar Usuario')} >Cadastrar</Button>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({})
