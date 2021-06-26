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

import  Constants  from 'expo-constants';
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications';

import {DadosContext} from '../../DadosContext'

export default function ImoveisNoMapa({navigation}) {

  let totalImoveis = 0;
  let listaImoveis = []
  let cpf = '41789623615'//cpf do usuario ficticio


  const [listaImoveis2, setListaImoveis2] = useState([])//vetor de imóveis
  //const [totalImoveis, setTotalImoveis] = useState(0)//total de imóveis da api
  const [region, setRegion] = useState({//Região inicial -Antes de carregar a localizacao do usuario - Centro de Teresina
    latitude: -5.0903678,
    longitude: -42.8105988,
    latitudeDelta: 0.014,
    longitudeDelta: 0.014
  })

  const [expoPushToken, setExpoPushToken] = useState(null);//Guardará o token do celular do usuário
  const {cadastrando, setCadastrando, setRegiao, regiao} = React.useContext(DadosContext)


  async function registerForPushNotificationsAsync () {//Regista o token do usuário
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {//Falha ao obter o token do usuario
        console.log('Falha ao obter permissão de notificações!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token)//muda o token para o token do aparelho do usuario
      //console.log(token)
      //this.setState({ expoPushToken: token });
    } else {
      //console.log('Notificações não funcionam em emulador!\nPrecisa ser um dispositivo físico!');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    };

    async function registraToken(cpf){//Salva o token do usuario no bd do firebase
        await api.post('/usuarioToken', {
          cpf: cpf,
          token: expoPushToken,
        })
        .then(()=>{})//()=>console.log("Token foi add no bd!"))
        .catch(()=>{})//()=>console.log("Token já foi adicionado antes no bd!"))
    } 


  useEffect(()=>{
    registerForPushNotificationsAsync()
  },[])

  useEffect(()=>{
    if (expoPushToken !== null){
      registraToken(cpf)
    }
  },[expoPushToken])




  function navigateToListagem() {//vai para a tela de listagem de imóveis
    navigation.navigate('ListagemDeImoveis')
  }

  function navigateToDescricaoImovel(imovel){//imovel selecionado
    navigation.navigate('DescricaoImovel',{imovel})
  }

  function openMenu(){
    navigation.openDrawer();
}
  

  //console.log(cadastrando);


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
          onPress={e => {
            if(cadastrando === true){

              setRegiao(e.nativeEvent.coordinate)
              setCadastrando(false)
              navigation.navigate("CadastroImovel")
            }
          }}
        >

           { regiao && <Marker pinColor='green' coordinate={{...regiao, latitudeDelta: 0.014, longitudeDelta: 0.014  }}/>}
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