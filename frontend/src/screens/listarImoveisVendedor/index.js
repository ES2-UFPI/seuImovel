import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import Constants from 'expo-constants'
import styles from './style'
import { useNavigation } from '@react-navigation/native'
import Banner from '../../components/banner/banner'
import { DadosContext } from '../../DadosContext'
import { Entypo } from '@expo/vector-icons';

import api from '../../services/api'

const index = () => {


    const { cpf } = React.useContext(DadosContext)


    const [listaImoveis, setListaImoveis] = useState([])//vetor de imóveis
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalImoveis, setTotalImoveis] = useState(0)
    const navigation = useNavigation()
    const { tipoDeConta } = React.useContext(DadosContext)

    function navigateToDescricao(imovel) {
        navigation.navigate('DescricaoImovel', { imovel })
    }


    //conexão de api
    async function loadListMovel() {
        if (loading) {
            return;
        }

        if (totalImoveis > 0 && listaImoveis.length >= totalImoveis) {
            return;
        }

        setLoading(true);
        const response = await api.get(`/listaImoveisUsuario?cpf=${cpf}&page=${page}`)
        setListaImoveis(response.data)
        setTotalImoveis(response.headers['x-total-count'])
        setListaImoveis([...listaImoveis, ...response.data])
        setPage(page + 1)
        setLoading(false)
    }

    function openMenu() {
        navigation.openDrawer();
    }

    useEffect(() => {
        loadListMovel()
    }, []);



    return (

        <>
            {

                (listaImoveis.length !== 0) ?
                    <>
                        <View style={styles.container}>
                            <FlatList
                                onEndReached={loadListMovel}
                                onEndReachedThreshold={0.2}
                                showsVerticalScrollIndicator={true}
                                data={listaImoveis}
                                keyExtractor={item => String(item.id)}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity onPress={() => navigateToDescricao(item)}>
                                            <View style={styles.contextHomes}>
                                                <Text style={styles.contextText}>
                                                    <Text style={styles.title}>{'Casa - ' + item.tipo + ' (R$' + item.valor + ')\n'}</Text>
                                                    <Text style={styles.description}>{item.descricao.substr(0, 50) + '...\n'}</Text>
                                                    <Text style={styles.endereco}>{item.complemento}</Text>
                                                </Text>
                                                <Image
                                                    style={styles.imageHome}
                                                    source={{ uri: item.imagens[0] }}
                                                />
                                            </View>
                                        </TouchableOpacity>

                                    )
                                }}
                            >
                            </FlatList>
                            {/* <Feather onPress={() => navigateToImoveis()} name="map" size={30} style={styles.icon}/> */}
                        </View>
                        {(tipoDeConta == "grátis" || tipoDeConta == "gratis") &&
                            <Banner />
                        }
                        <TouchableOpacity onPress={() => openMenu()} style={styles.iconeMenu}>
                            <Entypo name="menu" size={40} color="green" />
                        </TouchableOpacity>
                    </>
                    :
                    <View style={styles.container2}>
                        <Text style={styles.contextText2}>Você não tem imóveis</Text>
                        {(tipoDeConta == "grátis" || tipoDeConta == "gratis") &&
                            <Banner />
                        }
                         <TouchableOpacity onPress={() => openMenu()} style={styles.iconeMenu}>
                            <Entypo name="menu" size={40} color="green" />
                        </TouchableOpacity>
                    </View>


            }
        </>
    )
}

export default index

