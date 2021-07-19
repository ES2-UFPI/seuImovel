import React, { useState, useEffect } from 'react'
import { ScrollView, Linking, Text, View, TouchableOpacity, Image, StatusBar, Share, ImageBackground, TouchableHighlight, Alert, } from 'react-native'
import styles from './style'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { useRoute } from '@react-navigation/native'
import { SliderBox } from "react-native-image-slider-box"
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../services/api'
import { useNavigation } from '@react-navigation/native'
import Banner from '../../components/banner/banner'
import { DadosContext } from '../../DadosContext'



export default function DescricaoImovel() {

    const route = useRoute()
    const imovel = route.params.imovel
    //var contato = '5586995279594'
    const [contato, setContato] = useState()
    const {cpf} = React.useContext(DadosContext)
    const [imovelPertence, setImovelPertence] = useState(false)//verifica se imóvel pertence ou não ao usuário
    const [favorite, setFavorite] = useState()
    const message = 'Olá, tenho interesse no imóvel'
    const { tipoDeConta } = React.useContext(DadosContext)

    const navigation = useNavigation()

    function ligacao(){
        Linking.openURL(`tel:${contato}`)
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${contato}&text=${message}`)
        .then(() => {})
        .catch(() => {ligacao()})
    }

    async function verificaImovel() {//verifica se o imóvel foi cadastrado pelo usuário atual
        await api.get(`/listaImovel?cpf=${cpf}&imovelID=${imovel.id}`)
            .then(() => { setImovelPertence(true) })
            .catch(() => { })
    }

    async function loadFavorite() {
        await api.get(`/imovelFavoritacaoUnica?cpf=${cpf}&imovelID=${imovel.id}`)
            .then(() => { setFavorite(true)})
            .catch(() => { setFavorite(false) })
    }

    async function loadUsuarioPerfil() {
        await api.get(`/usuarioPerfil/${cpf}`)
        .then((response) => {setContato("55"+response.data.telefone.toString())})
        .catch(() => {})
           
    }


    function postOrDelete() {
        if (favorite === true) {
            setFavorite(false)
            deleteFavorite()
        }
        else {
            setFavorite(true)
            postFavorite()
        }
    }

    async function postFavorite() {

        await api.post(`/imovelFavoritacao`, {
            'cpf': cpf,
            'imovelID': imovel.id,
        }).then(() => {

        })
            .catch(() => { })
    }


    async function deleteFavorite() {
        await api.delete('/imovelFavoritacao', {
            data: {
                'cpf': String(cpf),
                'imovelID': String(imovel.id),
            }
        }).then(
            () => { }
        )
            .catch(() => { })

    }

    async function deleteImovel(){
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
                api.delete(`/imovelDelecao?cpf=${cpf}&imovelID=${imovel.id}`)
                .then(()=>{
                    navigation.goBack()
                    Alert.alert("Imóvel foi deletado!")
                })
                .catch(()=>{})

              } }
            ]
          )
    }


    useEffect(() => {
        loadFavorite()
    }, []);

    useEffect(() => {
        loadUsuarioPerfil()
    }, []);

    useEffect(() => {
        verificaImovel()
    }, []);

    return (
        <>
        <View style={styles.container}>
            <ScrollView>
                {
                    imovelPertence &&
                    <View style={styles.iconsContainer}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("GerenciarImovel", { imovel})}>
                        <FontAwesome name="pencil-square-o" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={() =>deleteImovel()}>
                        <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
                    </View>

                }
                <View style={styles.firstContainer}>
                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Título</Text>
                        <Text style={styles.secondText}>{'Casa - ' + imovel.tipo}</Text>
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Endereço</Text>
                        <Text style={styles.secondText}>{imovel.complemento}</Text>
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>N° Casa</Text>
                        <Text style={styles.secondText}>{imovel.numero}</Text>
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Descrição</Text>
                        <Text style={styles.secondText}>
                            {
                                imovel.banheiros + ' banheiros e ' +
                                imovel.quartos + ' quartos\n' +
                                imovel.descricao
                            }
                        </Text>
                    </View>

                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Dimensão</Text>
                        <Text style={styles.secondText}>{imovel.dimensao+" m²"}</Text>
                    </View>

                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Valor</Text>
                        <Text style={styles.secondText}>{"R$ "+imovel.valor}</Text>
                    </View>

                    <View style={{ height: 200 }}>
                        <SliderBox
                            dotColor="#0000CD"
                            images={imovel.imagens}
                        />
                    </View>


                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Anunciante</Text>
                        <Text style={styles.secondText}>{imovel.proprietario}</Text>
                    </View>


                        <TouchableOpacity onPress={postOrDelete} style={styles.containerFavorite}>

                            <Text style={styles.favoriteText}>Favoritar</Text>

                            {favorite ?
                                <MaterialIcons name="favorite" size={24} color="red" style={{ paddingLeft: 10 }} /> :
                                <MaterialIcons name="favorite" size={24} color="grey" style={{ paddingLeft: 10 }} />
                            }
                        </TouchableOpacity>

                  
                        <TouchableOpacity onPress={sendWhatsapp} style={{ marginTop: 40, backgroundColor: '#E8F0F2', alignItems: 'center', flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
                             
                            <Text style={styles.thirdText}>WhatsApp do anunciante</Text>
                        
                            <View>
                                    <FontAwesome name="whatsapp" size={30} color="#4AA96C" />
                            </View>
                        </TouchableOpacity>

                </View>

            </ScrollView>
        </View>
        {(tipoDeConta == "grátis" || tipoDeConta == "gratis") &&
            <Banner />
        }
        </>                

    )
}