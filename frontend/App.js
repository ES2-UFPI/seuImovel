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

  return (
   
    //Bloco principal de navegação. Todas as telas ficaram dentro dele
  <DadosContext.Provider value={{regiao, setRegiao, cadastrando, setCadastrando}}>
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  </DadosContext.Provider>
  );
}


