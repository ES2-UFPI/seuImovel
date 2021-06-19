import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './style'
import api from '../../services/api'
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { WebView } from 'react-native-webview';
import { Platform } from 'react-native';
import Search from '../../components/Search/index'


export default function ImoveisNoMapa({navigation}) {

  let totalImoveis = 0;
  let listaImoveis = []


  const [listaImoveis2, setListaImoveis2] = useState([])//vetor de imóveis
  //const [totalImoveis, setTotalImoveis] = useState(0)//total de imóveis da api
  const [region, setRegion] = useState({//Região inicial -Antes de carregar a localizacao do usuario - Centro de Teresina
    latitude: -5.0903678,
    longitude: -42.8105988,
    latitudeDelta: 0.014,
    longitudeDelta: 0.014
  })



  function navigateToListagem() {//vai para a tela de listagem de imóveis
    navigation.navigate('ListagemDeImoveis')
  }

  function navigateToDescricaoImovel(imovel){//imovel selecionado
    navigation.navigate('DescricaoImovel',{imovel})
  }

  function openMenu(){
    navigation.openDrawer();
}
  


  const obterLocalizacao = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync()

    if (!granted) return
    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({
      timeout:2000,
      enableHighAccuracy:true,
      maximumAge:1000
    })
    setRegion({ latitude, longitude, latitudeDelta: 0.014, longitudeDelta: 0.014 })

  }

  //conexão de api
  async function loadListMovel() {
    
    if ((totalImoveis > 0 && listaImoveis.length >= totalImoveis)) {//se todos imóveis já tiverem sidos carregados
      return
    }
    else {//se não tiver recebido todos imóveis da api
      let page = 1
      while(true){
        if (totalImoveis > 0 && listaImoveis.length >= totalImoveis) {//quando receber todos imóveis
          setListaImoveis2(listaImoveis)
          return
        }

        await api.get(`/listaImoveis/?page=${page}`)
          .then((response) => {
            listaImoveis = listaImoveis.concat(response.data)
            totalImoveis = response.headers['x-total-count']
            page = page + 1
          })
      }
    }
  }



  useEffect(() => {
    obterLocalizacao()
  }, []);

  useEffect(() => {
    loadListMovel()
  }, [])



  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>


        <MapView
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={false}
          loadingEnabled={true}
          style={styles.map}
          region={region}
        >
          {
            listaImoveis2.map(imovel => (
              <Marker
                key={imovel.id}
                coordinate={{
                  latitude: imovel.latitude,
                  longitude: imovel.longitude,

                }}
                image={require('../../../assets/map_marker.png')}
              >
                <Callout tooltip onPress = {()=>navigateToDescricaoImovel(imovel)}>
                  <>
                    <View style={styles.bubble}>
                      <Text style={styles.titulo}>{imovel.tipo} {"\n"} R$ {imovel.valor}</Text>
                      <Text>{imovel.descricao.substring(0, 35) + '...'}</Text>
                      {Platform.OS === 'ios' ?
                        <Image
                          style={styles.image}
                          source={{ uri: imovel.imagens[0] }}
                        /> :
                        <WebView
                          style={styles.image}
                          source={{ uri: imovel.imagens[0] }}
                        />
                      }
                    </View>
                    <View style={styles.arrowBorder} />
                    <View style={styles.arrow} />
                  </>


                </Callout>
              </Marker>
            ))
          }


        </MapView>
        <Search callBackFuntion = {(data,details)=>{
             const loc = details.geometry.location
             let lat = Number(loc.lat);
             let long = Number(loc.lng);
             setRegion({ latitude:lat, longitude:long, latitudeDelta: 0.014, longitudeDelta: 0.014 })

        }}/>
        <TouchableOpacity onPress={() => openMenu()} style={styles.iconeMenu}>
        <Entypo name="menu" size={40} color="green" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToListagem()} style={styles.iconeLista}>
          <Ionicons name="md-list-circle-outline" size={60} color="green" />
        </TouchableOpacity>

      </View>
    </View>
  )
}