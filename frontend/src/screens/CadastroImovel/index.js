import React,{useEffect, useState} from 'react'
import { ScrollView } from 'react-native'
import {View,Text,StyleSheet,StatusBar,Image} from 'react-native'
import Formulario from '../../components/formulario/index'
import { Inter_900Black } from '@expo-google-fonts/inter';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { TouchableOpacity } from 'react-native';
import api from '../../services/api'
import * as ImagePicker from 'expo-image-picker'
import {firebaseConfig }  from '../../../config/config'
import * as firebase from 'firebase'
import 'firebase/firestore'



export default()=>{

    const [imageUri,setImageUri] = useState('');
    const [imageUri2,setImageUri2] = useState('');
    const [dataLoaded,setDataLoaded] = useState(false);


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
            alert('Permissão negada')
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
        proprietario:'',
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

    return (
        <View style = {styles.screenContainer}>        
            <ScrollView style = {styles.container}>
                <StatusBar></StatusBar>
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
                </TouchableOpacity>
            </ScrollView>

        </View>

    )
}
const styles = StyleSheet.create({
    screenContainer:{
        flex:1,
        alignItems:'center'  ,
        justifyContent:'center',
        width:'100%'
    },
    container:{
        flex:1,
        width:'100%',
        borderWidth:1,
        borderColor:'green',
        borderRadius:20
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