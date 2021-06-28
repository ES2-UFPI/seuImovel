import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native'
import MainStack from './src/stacks/MainStack'
import ListarImoveis from './src/screens/listarImoveis/'
import {firebaseConfig }  from './config/config'
import {DadosContext} from './src/DadosContext'

// Firebase
import firebase from 'firebase/app'
import 'firebase/database'
 
 if(!firebase.apps.length){
   firebase.initializeApp(firebaseConfig)
   console.log(firebase.app().name);  // "[DEFAULT]"
 }

export default function App() {

  const [regiao, setRegiao] = React.useState()
  const [cadastrando, setCadastrando] = React.useState(false)

  const [imovel,setImovel] = React.useState({
    cpf: '78945612301',
    descricao:'',
    proprietario: "Juarez",
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
  return (
   
    //Bloco principal de navegação. Todas as telas ficaram dentro dele
  <DadosContext.Provider value={{regiao, setRegiao, cadastrando, setCadastrando, imovel, setImovel}}>
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  </DadosContext.Provider>
  );
}


