import React, { useState, useEffect } from 'react'
import { Keyboard, Text, View, TouchableOpacity, TextInput, Modal, Pressable, ScrollView, StyleSheet, Alert } from 'react-native'
import styles from './style';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker';
import { BlurView } from 'expo-blur';
import MapView, { Marker } from 'react-native-maps';
import Search from '../../components/Search'
import api from '../../services/api'

export default function GerenciarImovel() {

    const route = useRoute()
    const imovel = route.params.imovel

    var cpf = 41789623615;
    const [imovelID, setImovelID] = useState(imovel.id)
    const [titulo, setTitulo] = useState(imovel.descricao)
    const [Endereço, setEndereço] = useState(imovel.complemento)
    const [anunciante, setAnunciante] = useState(imovel.anunciante)
    const [tipo, setTipo] = useState(imovel.tipo)
    const [banheiros, setBanheiros] = useState(imovel.banheiros)
    const [valor, setValor] = useState(imovel.valor)
    const [quartos, setQuartos] = useState(imovel.quartos)
    const [modalVisible, setModalVisible] = React.useState(false);
    const [numero, setNumero] = useState(imovel.numero)
    const [dimensao, setDimensao] = useState(imovel.dimensao)

    const [latitude, setLatitude] = React.useState(imovel.latitude);
    const [longitude, setLongitude] = React.useState(imovel.longitude);

    //Código em análise --------------------------------------
    const [localLat, setLocalLat] = React.useState(imovel.latitude)
    const [localLong, setLocalLong] = React.useState(imovel.long)



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

        await api.put(`cadastrarImovel/${cpf}`, {
            imovelID: imovelID,
            descricao: titulo,
            numero: parseInt(numero),
            banheiros: parseInt(banheiros),
            complemento: Endereço,
            dimensao: parseFloat(dimensao),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            quartos: parseInt(quartos),
            tipo: tipo,
            valor: parseFloat(valor) 
        })

    }


    return (

        <ScrollView style={styles.container}>
            <Pressable
                onPress={Keyboard.dismiss}
            >

                <ScrollView style={styles.firstContainer}>

                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Descrição</Text>
                        <TextInput
                            multiline={true}
                            value={titulo}
                            style={styles.secondText}
                            onChangeText={setTitulo}
                        />
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Complemento</Text>
                        <TextInput
                            value={Endereço}
                            style={styles.secondText}
                            onChangeText={setEndereço}

                        />
                    </View>

                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Número</Text>
                        <TextInput
                            value={String(numero)}
                            style={styles.secondText}
                            onChangeText={setNumero}
                            keyboardType='numeric'
                        />
                    </View>

                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Dimensao</Text>
                        <TextInput
                            style={styles.secondText}
                            value={String(dimensao)}
                            onChangeText={setDimensao}
                            keyboardType='numeric'
                        />
                    </View>


                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Banheiros</Text>
                        <TextInput
                            style={styles.secondText}
                            value={String(banheiros)}
                            onChangeText={setBanheiros}
                            keyboardType='numeric'
                        />
                    </View>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => {

                        setModalVisible(true)
                    }}

                    >
                        <View style={styles.containerText}>
                            <Text style={styles.firstText}>Posição Geográfica</Text>
                            <Text style={styles.secondText}> Abrir Mapa</Text>
                        </View>

                    </TouchableOpacity>
                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Tipo</Text>
                        <Picker
                            style={styles.secondText}
                            selectedValue={tipo}
                            onValueChange={(itemValue, itemIndex) =>
                                setTipo(itemValue)
                            }>
                            <Picker.Item label="Aluguel" value="Aluguel" />
                            <Picker.Item label="Venda" value="Venda" />
                        </Picker>
                    </View>


                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Valor</Text>
                        <TextInput
                            style={styles.secondText}
                            value={String(valor)}
                            onChangeText={setValor}
                            keyboardType='numeric'
                        />
                    </View>

                    <View style={styles.containerText}>
                        <Text style={styles.firstText}>Quartos</Text>
                        <TextInput
                            style={styles.secondText}
                            value={String(quartos)}
                            onChangeText={setQuartos}
                            keyboardType='numeric'
                        />
                    </View>

                    <TouchableOpacity onPress={sendPost} style={styles.buttonSalvar} ><Text style={styles.upgradeText}>Salvar Mudança</Text></TouchableOpacity>

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
                    <BlurView intensity={100} style={[styles.contentWrap, StyleSheet.absoluteFill]}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <MapView
                                    showsUserLocation={true}
                                    showsMyLocationButton={true}
                                    showsCompass={false}
                                    loadingEnabled={true}
                                    style={{ width: '100%', height: '100%' }}
                                    region={regionMiniMap}
                                    onPress={e => {
                                        setLatitude(e.nativeEvent.coordinate.latitude)
                                        setLongitude(e.nativeEvent.coordinate.longitude)
                                        Alert.alert("Localização alterada!");
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
                                <Search callBackFuntion={(data, details) => {
                                    const loc = details.geometry.location
                                    let lat = Number(loc.lat);
                                    let long = Number(loc.lng);
                                    setRegionMiniMap({ latitude: lat, longitude: long, latitudeDelta: 0.014, longitudeDelta: 0.014 })

                                }} />
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text>Fechar Mapa</Text>
                                </Pressable>
                            </View>
                        </View>
                    </BlurView>
                </Modal>

            </View>
        </ScrollView>
    )
}
