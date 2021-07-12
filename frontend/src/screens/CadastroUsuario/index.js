import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import {Button} from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'

const CadastroUsuario = ({navigation}) => {

    const [telefone, setTelefone] = React.useState('')
    const [cpf, setCpf] = React.useState('')
    const [nascimento, setNascimento] = React.useState('')

    return (
        <View style={styles.container}>
            <View style={styles.containerInputs}>
           
                <TextInputMask
                style={styles.input}
                placeholder='Telefone'
                type={'cel-phone'}
                options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                }}
                value={telefone}
                onChangeText={text => setTelefone(text)}/>

                <TextInputMask
                style={styles.input}
                placeholder='CPF *'
                type={'cpf'}
                value={cpf}
                onChangeText={text => setCpf(text)}
                />

                <TextInputMask
                style={styles.input}
                placeholder='Nascimento *'
                type={'datetime'}
                options={{
                    format: 'DD/MM/YYYY'
                }}
                value={nascimento}
                onChangeText={text => setNascimento(text) }
                />

            </View>

            <Button color='green' style={styles.btn}>Cadastrar</Button>
        </View>
    )
}

export default CadastroUsuario

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight + 10,
        justifyContent: 'space-between'
    },
    containerInputs: {
        // borderWidth: 1,
        height: '40%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginTop: 15
    },
    btn: {
        marginBottom: 30
    }
})
