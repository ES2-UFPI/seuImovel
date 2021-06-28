  
import React, {useState, useEffect} from 'react'
import {FlatList, Text, View, TouchableOpacity, Image, StatusBar,} from 'react-native'
import styles from './style'
import api from '../../services/api'
import { Feather } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'



export default function ListarImoveis() {



    const [listaImoveis, setListaImoveis] = useState([])
    const [totalImoveis,setTotalImoveis] = useState(0)
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const navigation = useNavigation()


    function navigateToDescricao(imovel){
        navigation.navigate('DescricaoImovel', { imovel })
    }
    
    function navigateToImoveis(){
        navigation.goBack()
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
        const response = await api.get(`/listaImoveis/?page=${page}`)
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
            <Feather onPress={() => navigateToImoveis()} name="map" size={30} style={styles.icon}/>
        </View>
    )
}
