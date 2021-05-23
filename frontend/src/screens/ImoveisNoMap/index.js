import React, { useEffect } from 'react'
import {View,Text,StyleSheet} from 'react-native';
import API from '../../Api'


export default ImoveisNoMapa = ()=>{

    useEffect(()=>{

        //Retorna os imoveis da primeira pagina, basta import API do arquivo Api. E chamar a funcao dessa forma.
        API.getListaImoveis('1')  ;   

    },[])
    return (
        <View style = {styles.container}>
        <Text>TELA IMOVEIS NO MAPA A SER FEITA!</Text>
        </View>
    )
}   

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})