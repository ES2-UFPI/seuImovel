import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, StatusBar } from 'react-native';
import { useEffect } from 'react';
import api from '../../services/api'
import SearchBar from '../../components/searchBar/index'
import ModalImovel from '../../components/modalImovel/index'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native'
import { ListItem } from 'react-native-elements/dist/list/ListItem';



export default function ImoveisNoMapa() {

  const [listaImoveis, setListaImoveis] = React.useState([])
  const [totalImoveis, setTotalImoveis] = React.useState(0)
  const [searchValue, setSearchValue] = React.useState('')
  const [isVibile, setVisible] = React.useState(false)
  const [descricao, setDescricao] = React.useState('')
  const [imagem, setImage] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)

  const navigation = useNavigation()


    function navigateToListagem(){
        navigation.navigate('ListagemDeImoveis')
    }


  async function loadListMovel() {
    console.log("hited")

    if (loading) {
      console.log("IsLoading")
      return;
    }

    if (totalImoveis > 0 && listaImoveis.length >= totalImoveis) {
      console.log("NOPE")

      return;

    }

    setLoading(true);
    console.log(listaImoveis.length + "PAGE : " + page)
    const response = await api.get(`/listaImoveis/?page=${page}`)
    setTotalImoveis(response.headers['x-total-count'])
    setListaImoveis([...listaImoveis, ...response.data])
    setPage(page + 1)
    setLoading(false)

  }


  useEffect(() => {

    loadListMovel();



  }, []);


  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={{ alignItems: 'center', paddingTop: 30 }} >
        <SearchBar></SearchBar>

      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -5.0896403,
          longitude: -42.809588,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {
          listaImoveis.map((data, i) => {
            return (
              <Marker
                key={data.id}
                onPress={() => {
                  setVisible(true);
                  ;
                  setDescricao(data.descricao);
                  setImage(data.imagens[0]);

                }}
                coordinate={{
                  latitude: data.latitude,
                  longitude: data.longitude,
                }}
                title={data.descricao}
                description={''}
              >



              </Marker>
            )
          })

        }
      </MapView>

      {
        totalImoveis > listaImoveis.length ?
          <View style={{ zIndex: 2, width: 100, height: 40, position: 'absolute', left: 1 }}
            onPress={() => {

            }}>

            <TouchableOpacity style={{ borderWidth: 1, borderRadius: 20 }}>
              <Text stlye={{ justifyContent: 'justify', padding: 5 }}>
                Carregar mais imóveis
              </Text>

            </TouchableOpacity>
          </View>
          :
          <View></View>

      }
      <View style={styles.modalImovel}>
        <ModalImovel isVibile={isVibile} onReqClose={() => setVisible(false)} descricao={descricao} imagem={imagem} />
      </View>
      <Feather onPress={() => navigateToListagem()} name="map" size={30} style={styles.icon}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {

    flex: 1,
    width: '98%',
    borderWidth: 20,
    borderRadius: 30,
    borderColor: 'green',
    borderWidth: 2.,
    borderRadius: 40,
    borderColor: 'green',
    height: '100%',


  },
  tituloContainer: {
    width: '100%',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 1

  },
  title: {
    fontSize: 16,
    color: '#0a0538',
    zIndex: 2,
    position: 'absolute'

  },
  modalImovel: {
    position: 'absolute',
    top: 0.5,
    zIndex: 2
  },
  icon:{
    color: 'green',
    position: 'absolute',
    right: 20,
    bottom: 20,   
}
})