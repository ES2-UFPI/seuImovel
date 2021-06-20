import React, { useState, useEffect } from 'react'
import { ScrollView, Linking, Text, View, TouchableOpacity, Image, StatusBar, Share, ImageBackground, TouchableHighlight, } from 'react-native'
import styles from './style'
import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native'
import { SliderBox } from "react-native-image-slider-box"
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../services/api'



export default function DescricaoImovel() {

    const route = useRoute()
    const imovel = route.params.imovel
    var contato = '5586995279594'
    var cpf = '41789623615'
    const [favorite, setFavorite] = useState()
    const message = 'Olá, tenho interesse no imóvel'



    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${contato}&text=${message}`)
    }

    async function loadFavorite() {
        await api.get(`/imovelFavoritacaoUnica?cpf=${cpf}&imovelID=${imovel.id}`)
            .then(() => { setFavorite(true) })
            .catch(() => { setFavorite(false) })
    }

    async function loadPostFavorite() {

        await api.post(`/imovelFavoritacao`, {
            'cpf': cpf,
            'imovelID': imovel.id,
        }).then(() => {
            if (favorite === true) {
                setFavorite(false)
            } else setFavorite(true)
        })
            .catch(() => { })
    }

    useEffect(() => {
        loadFavorite()
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
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
                        <Text style={styles.firstText}>Descrição</Text>
                        <Text style={styles.secondText}>
                            {
                                imovel.banheiros + ' banheiros e ' +
                                imovel.quartos + ' quartos\n' +
                                imovel.descricao
                            }
                        </Text>
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


                    <TouchableOpacity onPress={loadPostFavorite} style={styles.containerFavorite}>

                        <Text style={styles.favoriteText}>Favoritar</Text> 

                        {favorite ?
                            <MaterialIcons name="favorite" size={24} color="red" style={{ paddingLeft: 10 }} /> :
                            <MaterialIcons name="favorite" size={24} color="grey" style={{ paddingLeft: 10 }} />
                        }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={sendWhatsapp} style={styles.containerShare}>
                        <Text style={styles.thirdText}>WhatsApp do anunciante</Text>
                        <FontAwesome name="whatsapp" size={30} color="green" />
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </View>


    )
}
