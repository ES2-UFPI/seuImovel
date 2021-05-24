import React, {useState, useEffect} from 'react'
import {FlatList, Text, View, TouchableOpacity, Image, StatusBar,} from 'react-native'
import styles from './style'
import api from '../../services/api'


export default function ListarImoveis() {

    const [listaImoveis, setListaImoveis] = useState([])

    //conexão de api
    async function loadListMovel(){
        const response = await api.get('/listaImoveis')
        setListaImoveis(response.data)
    }


    useEffect(() => {
        loadListMovel()
    }, []);


    return (
        <View >
            <FlatList 
                contentContainerStyle={{
                    paddingTop: StatusBar.currentHeight || 42
                }}
                showsVerticalScrollIndicator={false}
                data={listaImoveis}
                keyExtractor={item => String(item.descricao)}
                renderItem={({item}) =>{
                    return(
                        <View style={styles.container}>
                            <View style={styles.contextHomes}>
                                <Text style={styles.contextText}>
                                    <Text style={styles.title}>{'Casa - '+ item.tipo+'\n'}</Text> 
                                    <Text style={styles.description}>{item.descricao+'\n'}</Text> 
                                    <Text style={styles.endereco}>{item.complemento}</Text>
                                </Text>
                                <Image
                                style={styles.imageHome}
                                source={require('../../../assets/figHome.png',)}
                                />
                            </View>
                        </View>                        
                )}}        
            >
            </FlatList>
        </View>
    )
}
