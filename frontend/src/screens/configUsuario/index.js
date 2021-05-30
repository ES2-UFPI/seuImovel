import React, {useState, useEffect} from 'react'
import {FlatList, Text, View, TouchableOpacity, Image, StatusBar, TextInput, Switch} from 'react-native'
import styles from './style'
import api from '../../services/api'
import { FontAwesome } from '@expo/vector-icons';



export default function ConfigUsuario(){

    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)

    const [usuarioConfig, setusuarioConfig] = useState([])

    //conexão de api
    async function loadUsuarioConfig(){
        const response = await api.get('/usuarioConfig/41789623615')
        setusuarioConfig(response.data)
        setIsEnabled(usuarioConfig.notificacoes)
    }

    useEffect(() => {
        loadUsuarioConfig()
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.firstContainer}>
                <Image
                    style={styles.imageUser}
                    source={require('../../../assets/me.jpeg')}
                />
                
                <Text style={styles.notificationText}>{isEnabled ? 'Notificações ativadas' : 'Notificações desativadas'}</Text>
                <Switch
                    trackColor={{false: '#767577', true: '#7FFF00'}}
                    thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor='#3e3e3e'
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <View style={styles.containerText}>
                    <Text style={styles.firstText}>Nome</Text>
                    <Text style={styles.secondText}>Rodrigo Elyel</Text>
                    <FontAwesome name="pencil-square-o" size={24} color="black"/>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.firstText}>Plano</Text>
                    <Text style={styles.secondText}>{usuarioConfig.plano}</Text>
                    <FontAwesome name="pencil-square-o" size={24} color="black"/>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.firstText}>Descrição</Text>
                    <Text style={styles.secondText}>{usuarioConfig.descricaoPlano}</Text>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.firstText}>Raio de Notificações</Text>
                    <Text style={styles.secondText}>{usuarioConfig.raioNotificacoes}</Text>
                </View>
                <Text style={styles.upgradeText}>{usuarioConfig.plano === 'premium' ? '' : 'UPGRADE DE CONTA'}</Text>
            </View>
        </View>
    )
}