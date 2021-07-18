import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import styles from './style'
import * as Google from 'expo-google-app-auth';
import firebase from "firebase/app";
import api from '../../services/api'
import { DadosContext } from '../../DadosContext'
import Spinner from 'react-native-loading-spinner-overlay';
import * as GoogleSignIn from 'expo-google-sign-in';



const Login = ({ navigation }) => {
    const {setFotoDoPerfil, setCpf,setTipoDeconta} = React.useContext(DadosContext)

    const [user,setUset] = useState({})

    
    signInWithGoogleAsync2 = async () => {
        try {
          const result = await Google.logInAsync({
            androidClientId: '467362086277-c78a8fb1u0utipoi7da95hvu78nrnvko.apps.googleusercontent.com',
            iosClientId: '467362086277-v9sb1qbf58at9airp4gc6dng9t8enpab.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          })
    
          if (result.type === 'success') {
            const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
            firebase.auth().signInWithCredential(credential)
              .then(async (result) => {
                api.get(`/usuarioConfig2/${result.user.email}`).
                then((response)=>{
                    setCpf(response.data.cpf)
                    setFotoDoPerfil(result.user.photoURL)//coloca o link da foto do perfil do usuario
                    navigation.navigate('Mapa')


                    api.get(`/usuarioConfig/${response.data.cpf}`)
                    .then((response2)=>{
                      setTipoDeconta(response2.data.plano)
                    })
                    .catch(()=>{
                      //erro ao obter dados da api
                    })



                }).catch((e)=>{
                    console.log(e)
                    Alert.alert("Usuário não foi cadastrado!")
                })
                
                
                // User signed in.
              })
              .catch((error) => {
                console.log(error)
                Alert.alert("Erro ao fazer login!")
                // Error occurred.
              });
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }


      //Usar quando o usuario acessar de um dispotivo físico mobile e não pelo expo go, apk ou ipa, por exemplo
      /*_syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        setUser({ user });
      };*/

      signInAsync = async () => {
        try {
          await GoogleSignIn.askForPlayServicesAsync();
          const result = await GoogleSignIn.signInAsync();
          if (result.type === 'success') {
            const credential = firebase.auth.GoogleAuthProvider.credential(result.user.auth.idToken,result.user.auth.accessToken);
            firebase.auth().signInWithCredential(credential)
              .then(async (result) => {
                api.get(`/usuarioConfig2/${result.user.email}`).
                then((response)=>{
                    setCpf(response.data.cpf)
                    setFotoDoPerfil(result.user.photoURL)//coloca o link da foto do perfil do usuario
                    navigation.navigate('Mapa')


                    api.get(`/usuarioConfig/${response.data.cpf}`)
                    .then((response2)=>{
                      setTipoDeconta(response2.data.plano)
                    })
                    .catch(()=>{
                      //erro ao obter dados da api
                    })



                }).catch((e)=>{
                    console.log(e)
                    Alert.alert("Usuário não foi cadastrado!")
                })
                
                
                // User signed in.
              })
              .catch((error) => {
                console.log(error)
                Alert.alert("Erro ao fazer login!")
                // Error occurred.
              });
            return result.accessToken;

            //_syncUserWithStateAsync();
          }
        } catch ({ message }) {//Se não for um dispositivo físico, entao chama a outra função que só funciona para o expo go
          //alert('login: Error:' + message);
          signInWithGoogleAsync2()
        }
      };
      



    return (

        <View style={styles.cotainer}>
            {
            <View style={styles.firstContainer}>
                <Image
                    style={styles.imageUser}
                    source={require('../../../assets/splash.png')}
                />
                <Text style={styles.firstText}>Entrar com gmail: </Text>
                <IconButton
                    icon="gmail"
                    style={{ marginBottom: 20 }}
                    color='green'
                    size={50}
                    onPress={() => signInAsync()}
                />
                <Button color='green' mode="contained" onPress={() => navigation.navigate('Cadastrar Usuario')} >Cadastrar</Button>
            </View>
            }
        </View>
    )
}
export default Login