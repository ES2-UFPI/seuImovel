import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import Constants from 'expo-constants'
import styles from './style'
import {useNavigation} from '@react-navigation/native'

import api from '../../services/api'

const index = () => {


    let cpf = '41789623615'//cpf do usuario ficticio
  
  
    const [listaImoveis, setListaImoveis] = useState([])//vetor de imóveis
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [totalImoveis,setTotalImoveis] = useState(0)
    const navigation = useNavigation()

    function navigateToDescricao(imovel){
        navigation.navigate('DescricaoImovel', { imovel })
    }
    

    //conexão de api
    async function loadListMovel(){
        if(loading){
            return;
        }
  
        if(totalImoveis >0 && listaImoveis.length >= totalImoveis){
            return ;
        }
  
        setLoading(true);
        const response = await api.get(`/listaImoveisUsuario?cpf=${cpf}&page=${page}`)
        setListaImoveis(response.data)        
        setTotalImoveis(response.headers['x-total-count'])
        setListaImoveis([...listaImoveis,...response.data])
        setPage(page+1)
        setLoading(false)
    }


    useEffect(() => {
        loadListMovel()
    }, []);



    return (
        <View style={styles.container}>
        <FlatList 
            onEndReached={loadListMovel}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={true}
            data={listaImoveis}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) =>{
                return(
                     <TouchableOpacity onPress={() => navigateToDescricao(item)}>
                        <View style={styles.contextHomes}>
                            <Text style={styles.contextText}>
                                <Text style={styles.title}>{'Casa - '+ item.tipo+ ' (R$' + item.valor+')\n'}</Text> 
                                <Text style={styles.description}>{item.descricao.substr(0, 50)+'...\n'}</Text> 
                                <Text style={styles.endereco}>{item.complemento}</Text>
                            </Text>
                            <Image
                            style={styles.imageHome}
                            source={{uri: item.imagens[0]}}
                            />
                        </View>
                     </TouchableOpacity>
                                      
            )}}        
        >
        </FlatList>
        {/* <Feather onPress={() => navigateToImoveis()} name="map" size={30} style={styles.icon}/> */}
    </View>
    )
}

export default index

