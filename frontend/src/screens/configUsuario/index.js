import React, {useState, useEffect} from 'react'
import {FlatList, Text, View, TouchableOpacity, Image, StatusBar, TextInput, Switch,Modal} from 'react-native'
import styles from './style'
import api from '../../services/api'
import { FontAwesome } from '@expo/vector-icons';



export default function ConfigUsuario(){

    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)
    const [modalVisible,setModalVisible] = useState(false)
    const [usuarioConfig, setusuarioConfig] = useState([])
    const [plano,setPlano] = useState('');
    const [descricaoPlano,setDescricaoPlano] = useState('');

    //conexão de api
    async function loadUsuarioConfig(){
        const response = await api.get('/usuarioConfig/41789623615')
        setusuarioConfig(response.data)
        setIsEnabled(usuarioConfig.notificacoes)
    }

    async function changeUsuario(){
        console.log(plano,descricaoPlano,usuarioConfig.notificacoes,usuarioConfig.raioNotificacoes);

        const response = await api.post('/usuarioConfig/41789623615',{
            plano:plano,
            descricaoPlano:descricaoPlano,
            notificacoes:usuarioConfig.notificacoes,
            raioNotificacoes:Number(usuarioConfig.raioNotificacoes)

        })
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
                    <View  style={styles.containerText}>
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
                <TouchableOpacity onPress = {()=>setModalVisible(true)}>
                    <Text style={styles.upgradeText}>{usuarioConfig.plano === 'dpremium' ? '' : 'UPGRADE DE CONTA'}</Text>                
                </TouchableOpacity>             

            </View>

            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=>{setModalVisible(false)}}
          >
            <View style={styles.modalContent}>
            <View style = {{flexDirection:'column',justifyContent:'flex-start',borderBottomWidth:2,borderColor:'#1E90FF'}}>
                <TouchableOpacity onPress = {()=>{
                    alert("Plano alterado para Gold com sucesso!");
                    setModalVisible(false);
                    setPlano("Premium")
                    setDescricaoPlano("Até 7 imóveis , 7 imagens por imóvel venda/aluguel");
                    changeUsuario();
                }}><Text style = {{fontSize:19,textAlign:'left',color:'#1E90FF',textAlign:'left',fontStyle:'italic'}}>Plano Premium</Text></TouchableOpacity>
            </View>
                <View style = {{paddingTop:10}}>
                    <Text style = {{fontSize:14,textAlign:'left',color:'#7FFF00',textAlign:'left'}}>*     Até 7 imóveis</Text>
                    <Text style = {{fontSize:14,textAlign:'left',color:'#7FFF00',textAlign:'left'}}>*     7 Imagens por imóvel </Text>
                    <Text style = {{fontSize:14,textAlign:'left',color:'#7FFF00',textAlign:'left'}}>*     Venda/Aluguel </Text>
                </View>

                <View style = {{flexDirection:'column',justifyContent:'flex-start',borderBottomWidth:2,borderColor:'#1E90FF',marginTop:30}}>
                <TouchableOpacity onPress = {()=>{
                    alert("Plano alterado para Premium Gold com sucesso!");
                    setModalVisible(false);
                    setPlano("Premium Gold")
                    setDescricaoPlano("Até 9 imóveis , 9 imagens por imóvel venda/alugle");
                    changeUsuario();

                }}><Text style = {{fontSize:19,textAlign:'left',color:'#1E90FF',textAlign:'left',fontStyle:'italic'}}>Plano Premium Gold</Text></TouchableOpacity>
            </View>
                <View style = {{paddingTop:10}}>
                    <Text style = {{fontSize:14,textAlign:'left',color:'#7FFF00',textAlign:'left'}}>*     Até 9 imóveis</Text>
                    <Text style = {{fontSize:14,textAlign:'left',color:'#7FFF00',textAlign:'left'}}>*     9 Imagens por imóvel </Text>
                    <Text style = {{fontSize:14,textAlign:'left',color:'#7FFF00',textAlign:'left'}}>*     Venda/Aluguel </Text>
                </View>
                <TouchableOpacity onPress= {()=>setModalVisible(false)}><Text style = {{textAlign:'center',paddingTop:20,color:'#ffff'}}>Fechar</Text></TouchableOpacity>
        

            </View>
          </Modal>
    </View>
    )
}