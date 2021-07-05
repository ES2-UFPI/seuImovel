import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import Constants from 'expo-constants'
import styles from './style'

import api from '../../services/api'

const index = () => {

   const [listaImoveis, setListaImoveis] = React.useState([{
    id: "0LSRd5uFruysZ5K1ROy7",
    banheiros:3,
    complemento :"Proximo ao Posto são José teste",
    cpf :"41789623615",
    descricao:"Casa com piscina e bem localizada",
    dimensao: 500,
    imagens: "https://s2.glbimg.com/l5tf5ALrBpZgm6SyiYv55yoUlh0=/620x413/smart/e.glbimg.com/og/ed/f/original/2020/01/20/leve-e-iluminada-esta-casa-na-bahia-mistura-estrutura-metalica-madeira-e-vidro_9.jpg",
    latitude :-5.096235980369862,
    longitude: -42.83879868686199,
    numero:8877,
    proprietario:"Joaquim",
    quartos: 4,
    tipo: "Venda",
    valor:387482
   }])



    return (
        <View style={styles.container}>
        <FlatList 
            // onEndReached={loadListMovel}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={true}
            data={listaImoveis}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) =>{
                return(
                    // <TouchableOpacity onPress={() => navigateToDescricao(item)}>
                        <View style={styles.contextHomes}>
                            <Text style={styles.contextText}>
                                <Text style={styles.title}>{'Casa - '+ item.tipo+ ' (R$' + item.valor+')\n'}</Text> 
                                <Text style={styles.description}>{item.descricao.substr(0, 50)+'...\n'}</Text> 
                                <Text style={styles.endereco}>{item.complemento}</Text>
                            </Text>
                            <Image
                            style={styles.imageHome}
                            source={{uri: item.imagens}}
                            />
                        </View>
                    // </TouchableOpacity>
                                      
            )}}        
        >
        </FlatList>
        {/* <Feather onPress={() => navigateToImoveis()} name="map" size={30} style={styles.icon}/> */}
    </View>
    )
}

export default index

