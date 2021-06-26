import React, { useState, useEffect } from 'react'
import { Keyboard, Text, View, TouchableOpacity, TextInput, Modal, Pressable,ScrollView} from 'react-native'
import styles from './style';
import api from '../../services/api'
import { useNavigation, useRoute } from '@react-navigation/native'
import MapView, { Marker, Callout } from 'react-native-maps';
import Search from '../../components/Search'

export default function GerenciarImovel() {

    const route = useRoute()
    const imovel = route.params.imovel

    const [titulo, setTitulo] = useState(imovel.descricao)
    const [Endereço, setEndereço] = useState(imovel.complemento)
    const [anunciante, setAnunciante] = useState(imovel.anunciante)
    const [tipo, setTipo] = useState(imovel.tipo)
    const [banheiros, setBanheiros] = useState(imovel.banheiros)
    const [valor, setValor] = useState(imovel.valor)
    const [quartos, setQuartos] = useState(imovel.quartos)
    const [modalVisible, setModalVisible] = React.useState(false);

    const [latitude, setLatitude] = React.useState(imovel.latitude);
    const [longitude,setLongitude] = React.useState(imovel.longitude);

    //Código em análise --------------------------------------
    const [localLat,setLocalLat] = React.useState(imovel.latitude)
    const [localLong,setLocalLong] = React.useState(imovel.long)



    //State do Mini-Mapa
    const [regionMiniMap, setRegionMiniMap] = useState({
        latitude: imovel.latitude,
        longitude: imovel.longitude,
        latitudeDelta: 0.014,
        longitudeDelta: 0.014
      })
    //-----------------------------------------------------------------
    const navigation = useNavigation()

    //conexão de api
    async function sendPost() {
        //Latitude atualizada = latitude
        //Longitude atualizada = longitude
      //  api.post()


    }




    return (
        
        <ScrollView style={styles.container}>
            <Pressable
                onPress={Keyboard.dismiss}
            >

     <ScrollView style={styles.firstContainer}>
                   
                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Título</Text>
                        <TextInput
                            multiline={true}
                            placeholder={imovel.descricao}
                            style={styles.secondText}
                            onChange={setTitulo}
                        />
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Endereço</Text>
                        <TextInput
                            placeholder = {imovel.complemento}
                            style={styles.secondText}
                            onChange={setEndereço}

                        />
                    </View>

           
                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Banheiros</Text>
                        <TextInput
                            style={styles.secondText}
                            placeholder = { String(imovel.banheiros)}
                            onChange={setBanheiros}
                        />
                    </View>
                    <TouchableOpacity style  = {{width:'100%'}}   onPress={() => {
                        
                    setModalVisible(true)}}
                        
                        >
                        <View style={styles.containerText}>
                            <Text style={styles.firstText}>Posição Geográfica</Text>
                            <Text style = {styles.secondText}> Abrir Mapa</Text>
                        </View>
                
                    </TouchableOpacity>
                    <View style={styles.containerText2}>
                        <Text style={styles.firstText}>lat : {  latitude!==0?  String(latitude):String(imovel.latitude.toFixed(4))}</Text>                            
                    </View>
                    <View style={styles.containerText2}>
                        <Text style={styles.firstText}>lat : {  longitude!==0?  String(longitude):String(imovel.longitude.toFixed(4))}</Text>
                     </View>
                <View style={styles.containerText}>
                    <Text style={styles.firstText}>Tipo</Text>
                        <TextInput
                            style={styles.secondText}
                            placeholder = {imovel.tipo}
                            onChange={setTipo}
                        />
                    </View>


               <View style={styles.containerText}>
                    <Text style={styles.firstText}>Proprietário</Text>
                        <TextInput
                            style={styles.secondText}
                            placeholder = {imovel.proprietario}
                            onChangeText = {setAnunciante}
                        />
                    </View>

                 <View style={styles.containerText}>
                    <Text style={styles.firstText}>Valor</Text>
                        <TextInput
                            style={styles.secondText}
                            placeholder = {'R$ ' + String(imovel.valor) + ',00 '}
                            onChangeText = {setValor}
                        />
                    </View>

                   <View style={styles.containerText}>
                    <Text style={styles.firstText}>Quartos</Text>
                        <TextInput
                            style={styles.secondText}
                            placeholder = {String(imovel.quartos)}
                            onChangeText = {setQuartos}
                        />
                    </View>

     <TouchableOpacity onPress = {()=>sendPost()} style  = {styles.buttonSalvar} ><Text style={styles.upgradeText}>Salvar Mudança</Text></TouchableOpacity>
                    
        </ScrollView>
    
            </Pressable>

            <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <MapView
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsCompass={false}
                loadingEnabled={true}
                style={{width:'100%',height:'100%'}}
                region={regionMiniMap}
                onPress={e => {
                    setLatitude(e.nativeEvent.coordinate.latitude)
                    setLongitude(e.nativeEvent.coordinate.longitude)
                    setModalVisible(false)
                  
                }}
              >
            <Marker
                key={imovel.id}
                
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,

                }}
                image={require('../../../assets/map_marker.png')}
              >
           
              </Marker>
              </MapView>
              <Search callBackFuntion = {(data,details)=>{  
                const loc = details.geometry.location
                let lat = Number(loc.lat);
                let long = Number(loc.lng);
                setRegionMiniMap({ latitude:lat, longitude:long, latitudeDelta: 0.014, longitudeDelta: 0.014 })
      
   
           }}/>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                  <Text>Fechar Mapa</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
       
          </View>
        </ScrollView>
    )
}
