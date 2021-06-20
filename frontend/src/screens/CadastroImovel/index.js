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
    
    const [usuario, setUsuario] = React.useState({nome: 'Juarez', cpf: '78945612301', numeroDeFotos: 3}) 
    
    const [arrLinksImagens, setArrLinks] = React.useState([])

    const [checked, setChecked] = React.useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const linkImagem = (nomeDaImagemNoStorage, nomePasta) => {//retorna o link da imagem no storage
                
        const Initial =  `https://firebasestorage.googleapis.com/v0/b/seuimovel-2b042.appspot.com/o/${nomePasta}%2F`
        const Final = '?alt=media'
        return Initial+nomeDaImagemNoStorage+Final
    }

 
  
    const enviarBD = (array) => {
        let arr = []
        array.map(uri => {
          let fileName = null;
          fileName = uri.split('ImagePicker/').pop()   
          arr.push(uri)
        })

        setImovel({...imovel, imagens: arr})
       
        console.log(imovel);

        
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
        cpf: usuario.cpf,
        descricao:'Imovel barato e bem feito',
        proprietario: usuario.nome,
        banheiros:2,
        dimensao:11,
        complemento:'Entre as ruas 69 e 100',
        latitude:-5.0945523,
        longitude:-42.8345395,
        quartos:2,
        tipo:'alugar',
        valor:375,
        numero:1,
        imagens:[]


    })

    const upload = (uploadTask) => {
        let arr = []
        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                // console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
            //  console.log('Upload is running');
                break;
            }
        }, function(error) {
            alert('deu error ', error.message)
        }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) { 
                console.log(downloadURL);
                arr.push(downloadURL)
                console.log("UPLOAD REALIZADO")
            });
        });
    }

    const enviar = async (uri, fileName) => {

            const response = await fetch(uri) //retorna uma promise resolvida, o dado 
            const blob = await response.blob(); //convertendo a resposta para BLob
        
            let ref = firebase.storage().ref().child("imoveis/" + fileName);
            let uploadTask = ref.put(blob)

            upload(uploadTask)
    
    }
    //https://firebasestorage.googleapis.com/v0/b/seuimovel-2b042.appspot.com/o/imoveis%2F44cdeada-4c8e-4034-aad4-b3a8a0795c24.jpg?alt=media&token=62dc2ee4-c9c2-4039-82f8-30ce8376bfb1
    // https://firebasestorage.googleapis.com/v0/b/seuimovel-2b042.appspot.com/o/imoveis%2F44cdeada-4c8e-4034-aad4-b3a8a0795c24.jpg
    // https://firebasestorage.googleapis.com/v0/b/seuimovel-2b042.appspot.com/o/imagens%2F44cdeada-4c8e-4034-aad4-b3a8a0795c24.jpg?alt=media
    const uploadImagem = async (produto) => {
        // console.log(produto);
        
        produto.map(async uri => {

            let fileName = null;
            fileName = uri.split('ImagePicker/').pop()
           
            await enviar(uri, fileName)
            
        })

        // Alert.alert('Deletar','Tem certeza que deseja cancelar o envio?', [
        //     {text: 'Não'}, 
        //     {text: 'Sim', onPress: () => enviarBD(imovel.imagens)}, 
             
        //  ])
         console.log(imovel);
        // console.log(arrLinksImagens);
        // sendPost()
       
     }


    const sendPost = async ()=>{
        // try{//faz a inicializacao da conexao com o firebase
        //     await firebase.initializeApp(firebaseConfig)
        //     console.log(imovel)
           
            const response = await api.post('/cadastrarImovel', imovel)
            
            console.log(response.status);
    
            // console.log(imovel)
        // }
        // catch(error){//se der erro é pq a inicializacao já foi feita
        //     console.log(error)
        // }
        
   
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

            // sendPost()
             uploadImagem(arrLinksImagens)
            // console.log(imovel);
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
                <CarregarFotos arrLinksImagens={arrLinksImagens} setArrLinks={setArrLinks} setImovel={setImovel} imovel={imovel} modalVisible={modalVisible} setModalVisible={setModalVisible} numeroDeFotos={usuario.numeroDeFotos}/>

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
                    <Button onPress={montarImovel} mode='outlined' color='green'>Enviar</Button>
                </View>
 
                
              
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