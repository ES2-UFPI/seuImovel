import React, { useState, useEffect } from 'react'
import { FlatList, Text, View, TouchableOpacity, Image, Platform, Modal, Alert } from 'react-native'
import styles from './style'
import api from '../../services/api'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Banner from '../../components/banner/banner'
import { DadosContext } from '../../DadosContext'




export default function ConfigUsuario() {

    const {cpf, fotoDoPerfil} = React.useContext(DadosContext)
    const [isEnabled, setIsEnabled] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [usuarioConfig, setusuarioConfig] = useState([])
    const [plano, setPlano] = useState()
    const [descricaoPlano, setDescricaoPlano] = useState()
    const [quantImagens, setQuantImagens] = useState()
    const [quantImoveis, setQuantImoveis] = useState()
    const [notificacoes, setNotificacoes] = useState()
    const navigation = useNavigation()
    const { tipoDeConta, setTipoDeconta } = React.useContext(DadosContext)

    //conexão de api
    async function loadUsuarioConfig() {
        await api.get(`/usuarioConfig/${cpf}`)
            .then((response) => {
                setusuarioConfig(response.data)
            })

    }

    function openMenu() {
        navigation.openDrawer();
    }
    
    async function changeFreeAccount() {
        console.log(usuarioConfig)
        await api.put(`/updateToFreeAccount/${cpf}`)
        loadUsuarioConfig()
        setTipoDeconta(usuarioConfig.plano)
    }

    async function changeUsuario() {
        console.log(usuarioConfig)
        await api.put(`/usuarioConfig/${cpf}`, {
            plano: usuarioConfig.plano,
            descricaoPlano: usuarioConfig.descricaoPlano,
            quantImagens: usuarioConfig.quantImagens,
            quantImoveis: usuarioConfig.quantImoveis,
            notificacoes: usuarioConfig.notificacoes,
        })
        setTipoDeconta(usuarioConfig.plano)
    }

    //falta criar a tela de editar perfil
    function navigateToEditProfile() {
        navigation.navigate('GerenciarPerfil')
    }

   

    useEffect(() => {
        loadUsuarioConfig()
    }, []);

    
    async function deletePerfil() {
       



        Alert.alert(
            "Remoção do Imóvel",
            "Você deseja excluir o imóvel?",
            [
              {
                text: "Cancelar",
                onPress: () => {},
                style: "cancel"
              },
              { text: "Sim", onPress: () => {
                api.delete(`/usuarioPerfil/${cpf}`).
                then(() => { Alert.alert("Perfil deletado!"); navigation.navigate('Login');})
                .catch(() => { })

              } 
            }
            ]
          )

    }

    

// updateToFreeAccount/41789623615 
    return (
        <>
        <View style={styles.container}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
            <View style={styles.firstContainer}>
                <Image
                    style={styles.imageUser}
                    source={{uri: fotoDoPerfil}}
                />
                <View style={styles.containerText}>
                    <Text style={styles.editPerfil}>Editar informações do perfil</Text>
                    <TouchableOpacity onPress={() => navigateToEditProfile()}>
                        <FontAwesome name="pencil-square-o" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.firstText}>Plano</Text>
                    <Text style={styles.secondText}>{usuarioConfig.plano}</Text>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.firstText}>Descrição</Text>
                    <Text style={styles.secondText}>{usuarioConfig.descricaoPlano}</Text>
                </View>
                
                <View style={(Platform.OS === 'ios') ? styles.containerTextIos : styles.containerText}>
                
                    <Text style={(Platform.OS === 'ios') ? styles.firstTextIos : styles.firstText}>Notificações</Text>
                   
                    <Picker
                        itemStyle={{height: 80,}}
                        style={styles.pickerText}
                        selectedValue={usuarioConfig.notificacoes}
                        onValueChange={(itemValue, itemIndex) =>
                            setusuarioConfig({
                                plano: usuarioConfig.plano,
                                descricaoPlano: usuarioConfig.descricaoPlano,
                                quantImagens: usuarioConfig.quantImagens,
                                quantImoveis: usuarioConfig.quantImoveis,
                                notificacoes: itemValue
                            })
                        }>
                        <Picker.Item label="Ativado" value={true} />
                        <Picker.Item label="Desativado" value={false} />
                    </Picker>
                </View>

                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.upgradeText}>{'MUDAR PLANO'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={changeUsuario}><Text style={styles.upgradeText}>Salvar Mudanças</Text></TouchableOpacity>


                {((usuarioConfig.plano != "grátis") && (usuarioConfig.plano !="gratis")) &&
                    <TouchableOpacity onPress={changeFreeAccount}>
                        <Text style={styles.cancelText}>Cancelar conta Premium</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity onPress={()=>deletePerfil()}>
                    <Text style={styles.cancelText}>{'Deletar Perfil'}</Text>
                </TouchableOpacity>


            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(false) }}
            >

                <View style={styles.modalContent}>
                    <ScrollView>
                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', borderBottomWidth: 2, borderColor: '#1E90FF', marginRight: 15 }}>
                            <TouchableOpacity onPress={() => {
                                alert("Plano alterado para Plano Premium 1 com sucesso!");
                                setModalVisible(false);
                                setusuarioConfig({
                                    plano: 'premium 1',
                                    descricaoPlano: 'Até 7 imóveis , 7 imagens por imóvel venda/aluguel',
                                    quantImagens: 7,
                                    quantImoveis: 7,
                                    notificacoes: true,
                                })

                            }}><Text style={{ fontSize: 19, textAlign: 'left', color: '#1E90FF', textAlign: 'left', fontStyle: 'italic' }}>Plano Premium 1</Text></TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={styles.textPlano}>*     Até 7 imóveis</Text>
                            <Text style={styles.textPlano}>*     7 Imagens por imóvel </Text>
                            <Text style={styles.textPlano}>*     Venda/Aluguel </Text>
                        </View>

                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', borderBottomWidth: 2, borderColor: '#1E90FF', marginRight: 15 }}>
                            <TouchableOpacity onPress={() => {
                                alert("Plano alterado para Plano Premium 2 com sucesso!");
                                setModalVisible(false);
                                setusuarioConfig({
                                    plano: 'premium 2',
                                    descricaoPlano: 'Até 10 imóveis , 10 imagens por imóvel venda/aluguel',
                                    quantImagens: 10,
                                    quantImoveis: 10,
                                    notificacoes: true,
                                })

                            }}><Text style={{ fontSize: 19, textAlign: 'left', color: '#1E90FF', textAlign: 'left', fontStyle: 'italic' }}>Plano Premium 2</Text></TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={styles.textPlano}>*     Até 10 imóveis</Text>
                            <Text style={styles.textPlano}>*     10 Imagens por imóvel </Text>
                            <Text style={styles.textPlano}>*     Venda/Aluguel </Text>
                        </View>

                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', borderBottomWidth: 2, borderColor: '#1E90FF', marginRight: 15 }}>
                            <TouchableOpacity onPress={() => {
                                alert("Plano alterado para Plano Premium 3 com sucesso!");
                                setModalVisible(false);
                                setusuarioConfig({
                                    plano: 'premium 3',
                                    descricaoPlano: 'Até 15 imóveis , 15 imagens por imóvel venda/aluguel',
                                    quantImagens: 15,
                                    quantImoveis: 15,
                                    notificacoes: true,
                                })

                            }}><Text style={{ fontSize: 19, textAlign: 'left', color: '#1E90FF', textAlign: 'left', fontStyle: 'italic' }}>Plano Premium 3</Text></TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={styles.textPlano}>*     Até 15 imóveis</Text>
                            <Text style={styles.textPlano}>*     15 Imagens por imóvel </Text>
                            <Text style={styles.textPlano}>*     Venda/Aluguel </Text>
                        </View>

                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', borderBottomWidth: 2, borderColor: '#1E90FF', marginRight: 15 }}>
                            <TouchableOpacity onPress={() => {
                                alert("Plano alterado para Premium 4 com sucesso!");
                                setModalVisible(false);
                                setusuarioConfig({
                                    plano: 'premium 4',
                                    descricaoPlano: 'Até 20 imóveis , 20 imagens por imóvel venda/aluguel',
                                    quantImagens: 20,
                                    quantImoveis: 20,
                                    notificacoes: true,
                                })


                            }}><Text style={{ fontSize: 19, textAlign: 'left', color: '#1E90FF', textAlign: 'left', fontStyle: 'italic' }}>Plano Premium 4</Text></TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={styles.textPlano}>*     Até 20 imóveis</Text>
                            <Text style={styles.textPlano}>*     20 Imagens por imóvel </Text>
                            <Text style={styles.textPlano}>*     Venda/Aluguel </Text>
                        </View>
                    </ScrollView>


                    <TouchableOpacity onPress={() => setModalVisible(false)}><Text style={{ textAlign: 'center', paddingTop: 20, color: 'black' }}>Fechar</Text></TouchableOpacity>


                </View>
            </Modal>
            <TouchableOpacity onPress={() => openMenu()} style={styles.iconeMenu}>
                <Entypo name="menu" size={40} color="green" />
            </TouchableOpacity>
            </ScrollView>                    
        </View>
        {(tipoDeConta == "grátis" || tipoDeConta == "gratis") &&
                <Banner />
            }
       </>
    )
}