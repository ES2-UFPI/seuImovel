import React,{useEffect, useState} from 'react'
import { ScrollView } from 'react-native'
import {View,Text,StyleSheet,StatusBar,Image, SafeAreaView, Alert, Modal} from 'react-native'
import Formulario from '../../components/formulario/index'
import { Inter_900Black } from '@expo-google-fonts/inter';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import api from '../../services/api'
import * as ImagePicker from 'expo-image-picker'
import {firebaseConfig }  from '../../../config/config'
import * as firebase from 'firebase'
import 'firebase/firestore'

import Constants from 'expo-constants'
import Input from '../../components/Input';
import { RadioButton, Button} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import CarregarFotos from '../../components/CarregarFotos';



export default()=>{

    const [imageUri,setImageUri] = useState('');
    const [imageUri2,setImageUri2] = useState('');
    const [dataLoaded,setDataLoaded] = useState(false);
    
    const [usuario, setUsuario] = React.useState({nome: 'John Doe', cpf: '41789623615', numeroDeFotos: 3}) 
    const [checked, setChecked] = React.useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const linkImagem = (nomeDaImagemNoStorage) => {//retorna o link da imagem no storage
                
        const Initial =  'https://firebasestorage.googleapis.com/v0/b/seuimovel-2b042.appspot.com/o/imagens%2F'
        const Final = '?alt=media'
        return Initial+nomeDaImagemNoStorage+Final
    }

 
    const uploadImagem = async (url) => {
        
        let fileName = null; //nome do arquivo
        fileName = url.split('ImagePicker/').pop() //eu quebro a url da img da galeria
        const response = await fetch(url) //retorna uma promise resolvida, o dado  .. aqui eu busco as imagem la do diretorio do teu celular
        const blob = await response.blob(); //convertendo a resposta para BLob

        let ref = firebase.storage().ref().child("imagens/" + fileName); //ref do storage
        let uploadTask = ref.put(blob) //envio o arquivo

        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function() {
            // Handle successful uploads on complete

            uploadTask.then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    enviarBD(fileName, downloadURL)
                });
            });
            
            /*
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
             enviarBD(fileName, downloadURL)
            var firebaseUrl = "https://firebasestorage.googleapis.com/v0/b/seuimovel-2b042.appspot.com"  + "/o/";
                   

            });*/
          });
    }
    const enviarBD = (fileName, downloadURL) => {
        let refDB = firebase.firestore();
        setImageUri(downloadURL);
        setImageUri2(downloadURL)
        refDB.collection('imagens').doc(fileName).set({
            fileName: fileName, 
            uri: downloadURL
        }).then(() => alert('Foto enviada com sucesso!!')).catch(error => alert('bd erro'))
    }

    


    const getPermission = async ()=>{
        const {granted}  = await ImagePicker.requestCameraPermissionsAsync()
        if(!granted){
            Alert.alert('Permissão negada', 'Precisamos da sua permissão para carregar imagens.')
        }
    }

    const getImage = async(image_op)=>{

        const result = await ImagePicker.launchImageLibraryAsync();
        if(!result.cancelled){
            if(image_op===1){
            setImageUri(result.uri)
            }
            else if(image_op===2){
                setImageUri2(result.uri)
            }
        }
    }
     
    useEffect(()=>{
        getPermission()

    },[])

    const [imovel,setImovel] = useState({
        descricao:'',
        proprietario: usuario.nome,
        banheiros:'',
        dimensao:'',
        complemento:'',
        latitude:'',
        longitude:'',
        quartos:'',
        tipo:'',
        valor:'',
        numero:'',
        imagens:[]


    })

    const sendPost = async ()=>{
        try{//faz a inicializacao da conexao com o firebase
            await firebase.initializeApp(firebaseConfig)
        }
        catch{//se der erro é pq a inicializacao já foi feita

        }
        
        uploadImagem(imageUri)
        uploadImagem(imageUri2)
        setImageUri(fileName)
        setImageUri2(fileName)


        const response = await api.post('/cadastrarImovel',{

            cpf:"41789623615",
            banheiros: Number(imovel.banheiros),
            descricao:imovel.descricao,
            complemento:imovel.complemento,
            dimensao:Number(imovel.dimensao),
            latitude:Number(imovel.latitude),
            longitude:Number(imovel.longitude),
            quartos:Number(imovel.quartos),
            tipo:imovel.tipo,
            valor:Number(imovel.valor),
            imagens:[imageUri,imageUri2],
            numero:Number(imovel.numero),
            proprietario:"Hugo"

        })

        console.log(imovel)
    }

    /* CARREGANDO FONTE */
    const fetchFonts = () => {
        return Font.loadAsync({
            Inter_900Black: Inter_900Black,
        });
        };
    
    
   
    if(!dataLoaded){
        return(
          <AppLoading
              startAsync={fetchFonts}
              onFinish={()=>setDataLoaded(true)}
              onError={console.warn}
            />
        );
      }

      const montarImovel = () => {
         if(!imovel.tipo){
             Alert.alert('Defina o tipo', 'Imóvel para vender ou alugar')
         }else{
            if(imovel.imagens.length === 0){
                Alert.alert('Imagens', 'Cadastre as fotos do imóvel')
            }
            console.log(imovel);
            //  setImovel({...imovel,tipo:checked})

             
         }
      }

    return (
        <SafeAreaView style = {styles.screenContainer}>        
            <ScrollView>
                <View style={{alignSelf: 'center', marginTop: 10}}>
                    <Text style={{fontWeight: 'bold'}}>Cadastro de Imóvel</Text>
                </View>

 

                {/* Radios - venda ou aluguel */}
                <View style={{flexDirection:'row', borderWidth: 1, height: 40, marginHorizontal:5, marginVertical: 15, justifyContent: 'space-around'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton value='vender' color='green'
                         status={ imovel.tipo === 'vender' ? 'checked' : 'unchecked' }
                         onPress={() => setImovel({...imovel,tipo:"vender"})}/>
                        <Text style={{fontWeight: 'bold'}}>Vender</Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton value='alugar' color='green'
                         status={ imovel.tipo === 'alugar' ? 'checked' : 'unchecked' }
                         onPress={() => setImovel({...imovel,tipo:"alugar"})}/>
                        <Text style={{fontWeight: 'bold'}}>Alugar</Text>
                    </View>
                </View>

                {/* Carregar Imagens */}
                <View style={{ marginRight: 5, margin: 5 , flexDirection: 'row', 
                borderWidth: 1,
                justifyContent: 'space-between',
                alignItems: 'center'}}> 
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Carregar Imagens</Text>

                    <TouchableOpacity style={{width: 100, alignItems: 'center'}}
                    onPress={() => setModalVisible(true)}
                    >
                      <MaterialCommunityIcons  name="plus" size={30} color="green" />
                    </TouchableOpacity>
                   
                </View> 
                {/* Carregar fotos MODAL */}
                <CarregarFotos setImovel={setImovel} imovel={imovel} modalVisible={modalVisible} setModalVisible={setModalVisible} numeroDeFotos={usuario.numeroDeFotos}/>

                <View style={{borderWidth: 1}}>
                    <Text>{checked}</Text>

                    <Input
                    inputStyle={{height: 20, borderWidth: 0, color: 'black', fontWeight: 'bold', backgroundColor: '#bfbfbf'}}
                    value={usuario.nome}
                    editable={false} 
                    containerStyle={{marginBottom: 10}}/>

                    <Input placeholder="Descrição" 
                    onChangeText={text => setImovel({...imovel,descricao:text})}
                    containerStyle={{height: 70, marginBottom: 10}}/>

                    <Input placeholder="Valor" 
                    inputStyle={{height: 20}}
                    onChangeText={val => setImovel({...imovel,valor:val})}
                    containerStyle={{marginBottom: 10}}/>

                    <Input placeholder="Banheiros"
                     onChangeText={text => setImovel({...imovel,banheiros:text})}
                    keyboardType='numeric'/>

                    <Input placeholder="Quartos" 
                     onChangeText={text => setImovel({...imovel,quartos:text})}
                    keyboardType='numeric'/>

                    <Input placeholder="Complemento"
                     onChangeText={text => setImovel({...imovel,complemento:text})}
                    />

                    <Input placeholder="Dimensão"
                     onChangeText={text => setImovel({...imovel,dimensao:text})}
                    keyboardType='numeric'
                    />
                    <Input placeholder="Número" 
                     onChangeText={text => setImovel({...imovel,numero:text})}
                    keyboardType='numeric'/>


                    <Input placeholder="Latitude" 
                     onChangeText={text => setImovel({...imovel,latitude:text})}
                    keyboardType='numeric'/>

                    <Input placeholder="Longitude" 
                     onChangeText={text => setImovel({...imovel,longitude:text})}
                     keyboardType='numeric'/>                    
                </View>

                {/* FOOTER */}
                <View style={{marginTop: 10}}>
                    <Button onPress={() => montarImovel()} mode='outlined' color='green'>Enviar</Button>
                </View>
 
                
                {/* <StatusBar></StatusBar>
                <View style = {styles.titleContainer}>
                    <Text style = {styles.title} >Cadastro de Imóvel</Text>
                </View>

                <Formulario setValue = {value =>setImovel({
                                ...imovel,descricao:value})} 
                      formPlaceHolder = {'Descricao'}>
                </Formulario>

                <Formulario formPlaceHolder = {'Banheiros'}
                keyboardType = {"numeric"}
                            setValue = {value=>setImovel({...imovel,banheiros:value})}
                > </Formulario>


                <Formulario formPlaceHolder = {'Complemento'}
                        setValue = {value=>setImovel({...imovel,complemento:value})}

                ></Formulario>

                <Formulario formPlaceHolder = {'Dimensão'}
                keyboardType = {"numeric"}
                    setValue = {value=>setImovel({...imovel,dimensao:value})}>
                </Formulario>
                
                <View style = {{justifyContent:'center',width:'100%',flex:1,alignItems:'center'}}>
                    <Text style = {styles.firstText}>Imagens</Text>
                    <View style = {{display:'flex',flexDirection:'row',padding:10,justifyContent:'space-around',width:'100%'}}>
                    <TouchableOpacity onPress = {()=>{
                        getImage(1)
                    }}>
                    <View style = {{width:140,height:120,borderWidth:1,borderRadius:15,flex:1}}>
                        {imageUri!==''?
                            <Image source = {{uri:imageUri}} style = {{flex:1,width:'100%',height:'100%'}} />:
                            <View style ={{alignItems:'center',justifyContent:'center'}}>
                                <Text>Imagem 1</Text>
                            </View>
                        }
                    </View>    
                </TouchableOpacity>                         
                    <TouchableOpacity onPress = {()=>{getImage(2)}}>
                        <View style = {{width:140,height:120,borderWidth:1,borderRadius:15,flex:1}}>
                            {imageUri2!==''?
                                <Image source = {{uri:imageUri2}} style = {{flex:1,width:'100%',height:'100%'}} />:
                                <View style ={{alignItems:'center',justifyContent:'center'}}>
                                    <Text>Imagem 2</Text>
                                </View>
                            }
                        </View>    
                    </TouchableOpacity> 
                    </View>
                </View>  

                <Formulario formPlaceHolder = {'Latitude'}
                    keyboardType = {"numeric"}
                    setValue = {value=>setImovel({...imovel,latitude:value})}
                ></Formulario>

                <Formulario formPlaceHolder = {'Longitude'}
                    keyboardType = {"numeric"}
                    setValue = {value=>setImovel({...imovel,longitude:value})}

                ></Formulario>
                

                <Formulario formPlaceHolder = {'Numero'}
                keyboardType = {"numeric"}
                    setValue = {value=>setImovel({...imovel,numero:value})}

                ></Formulario>
                
                <Formulario formPlaceHolder = {'Quartos'}
                keyboardType = {"numeric"}
                    setValue = {value=>setImovel({...imovel,quartos:value})}

                ></Formulario>

                <Formulario formPlaceHolder = {'Tipo'}
                    setValue = {value=>setImovel({...imovel,tipo:value})}
                ></Formulario>
                <Formulario formPlaceHolder = {'Valor'}
                    
                    keyboardType = {"numeric"}
                setValue = {value=>setImovel({...imovel,valor:value})}

                ></Formulario>

                <TouchableOpacity onPress = {sendPost}>
                    <View style = {styles.cadastrarBtn}>
                        <Text stlye = {styles.cadastrarText}>CADASTRAR</Text>
                    </View>
                </TouchableOpacity> */}
            </ScrollView>

        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    screenContainer:{
        flex:1,
        marginTop: Constants.statusBarHeight
    },
    title:{
        fontSize:18,
        textAlign:'left',
        color:'black',
        paddingLeft:15,
        fontFamily:'Inter_900Black'
    },
    titleContainer:{
        marginTop:30,
        justifyContent:'center',
        width:'100%',
        paddingBottom:10,   
        width:'100%',
    },
    cadastrarBtn:{
        backgroundColor:'green',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        padding:10,
        marginBottom:30,
        borderRadius:30,
        borderWidth:1
    },
    cadastrarText:{
        fontFamily:'Inter_900Black',
        fontSize:20,
        fontFamily:'Inter_900Black'
    },
    firstText:{
        width: '20%',
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        borderRightWidth: 1,
        paddingRight:4
    },
})