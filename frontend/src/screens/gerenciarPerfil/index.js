import React, { useState, useEffect } from 'react'
import { Keyboard, Text, View, TouchableOpacity, Image, StatusBar, TextInput, Switch, Modal, Pressable } from 'react-native'
import styles from './style';
import api from '../../services/api'
import { useNavigation, useRoute } from '@react-navigation/native'



export default function GerenciarPerfil() {

    const [usuarioPerfil, setusuarioPerfil] = useState([])
    const [nome, setNome] = useState(null)
    const [email, setEmail] = useState(null)
    const [idade, setIdade] = useState(null)
    const [nascimento, setNascimento] = useState(null)
    const [telefone, setTelefone] = useState(null)


    const navigation = useNavigation()

    //conexão de api
    async function loadUsuarioPerfil() {
        const response = await api.get('/usuarioPerfil/78945612301')
        setusuarioPerfil(response.data)
        setNome(response.data.nome.toString())
        setEmail(response.data.email.toString())
        setIdade(response.data.idade.toString())
        setNascimento(response.data.nascimento.toString())
        setTelefone(response.data.telefone.toString())
    }

    async function changePerfil() {
        await api.put('/usuarioPerfil/78945612301', {
            nome: nome,
            email: email,
            idade: parseInt(idade),
            nascimento: usuarioPerfil.nascimento,
            telefone: parseInt(telefone),
        })
    }


    useEffect(() => {
        loadUsuarioPerfil()
    }, []);


    return (
        <View style={styles.container}>
            <Pressable
                onPress={Keyboard.dismiss}
            >
                <View style={styles.firstContainer}>
                   
                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Nome</Text>
                        <TextInput
                            onChangeText={setNome}
                            value={nome}
                            style={styles.secondText}

                        />
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Email</Text>
                        <TextInput
                            onChangeText={setEmail}
                            value={email}
                            style={styles.secondText}
                            keyboardType='email-address'
                        />
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Idade</Text>
                        <TextInput
                            onChangeText={setIdade}
                            value={idade}
                            style={styles.secondText}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Nascimento</Text>
                        <TextInput
                            onChangeText={setNascimento}
                            value={nascimento}
                            style={styles.secondText}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Telefone</Text>
                        <TextInput
                            onChangeText={setTelefone}
                            value={telefone}
                            style={styles.secondText}
                            keyboardType='numeric'
                        />
                    </View>
                    <TouchableOpacity onPress={changePerfil}><Text style={styles.upgradeText}>Salvar Mudança</Text></TouchableOpacity>

                </View>

            </Pressable>
        </View>
    )
}