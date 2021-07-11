import React, {useState, useEffect} from 'react'
import {FlatList, Text, View, TouchableOpacity, Image, StatusBar,} from 'react-native'
import styles from './style'
import api from '../../services/api'
import { Feather } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'; 
import Banner from '../../components/banner/banner'
import { DadosContext } from '../../DadosContext'




export default function ImoveisFavoritados() {



    const [listaImoveis, setListaImoveis] = useState([])
    const [totalImoveis,setTotalImoveis] = useState(0)
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const navigation = useNavigation()
    const { tipoDeConta } = React.useContext(DadosContext)
    var cpf = '41789623615'


    const navigateToDescricao = (imovel)=>{
        navigation.navigate('DescricaoImovel', { imovel })
        //console.log(page,listaImoveis,totalImoveis)
        
    }
    
    function openMenu() {
        navigation.openDrawer();
    }
    //conexão de api
    async function loadListMovel(){
        if(loading){
            return;
        }
  
        if(totalImoveis >0 && listaImoveis.length >= totalImoveis){
            return ;
        }
  
        //`/imovelFavoritacao?cpf=${cpf}?page=${page}` imovelFavoritacao?cpf=41789623615&page=1

        setLoading(true);
        const response = await api.get(`/imovelFavoritacao?cpf=${cpf}&?page=${page}`)
        setListaImoveis(response.data)        
        setTotalImoveis(response.headers['x-total-count'])
        setListaImoveis([...listaImoveis,...response.data])
        setPage(page+1)
        setLoading(false)
    }



    useEffect(()=>{
        loadListMovel();
    })


    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            setPage(1)
            setListaImoveis([])
            setTotalImoveis(0)
          });


        return () => {
      // Unsubscribe for the focus Listener
      unsubscribe;
      loadListMovel();
    };
    },[navigation])


    return (
        <>
        <View style={styles.container}>
            <FlatList 
                onEndReached={loadListMovel}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={true}
                data={listaImoveis}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) =>{
                    return(
                        <TouchableOpacity onPress={() => {
                            navigateToDescricao(item)
                        }}>
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
            <TouchableOpacity onPress={() => openMenu()} style={styles.iconeMenu}>
                <Entypo name="menu" size={40} color="green" />
            </TouchableOpacity>
        </View>
        {(tipoDeConta == "grátis" || tipoDeConta == "gratis") &&
                <Banner />
            }
        </>
    )
}
