import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native'
import MainStack from './src/stacks/MainStack'
import ListarImoveis from './src/screens/listarImoveis/'
import {firebaseConfig }  from './config/config'

// Firebase
import firebase from 'firebase/app'
import 'firebase/database'
 
 if(!firebase.apps.length){
   firebase.initializeApp(firebaseConfig)
   console.log(firebase.app().name);  // "[DEFAULT]"
 }

export default function App() {
  return (

    //Bloco principal de navegação. Todas as telas ficaram dentro dele
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  );
}


