import { StatusBar } from 'expo-status-bar';
import api from '../frontend/src/services/api'
import React, {useState,useEffect} from 'react';
import { NavigationContainer} from '@react-navigation/native'
import MainStack from './src/stacks/MainStack'
import ListarImoveis from './src/screens/listarImoveis/'
import {firebaseConfig }  from './config/config'
import {DadosContext} from './src/DadosContext'
// Firebase
import './src/services/firebase'
 

export default function App() {

  const [cpf,setCpf] = useState('')
  const [regiao, setRegiao] = useState()
  const [cadastrando, setCadastrando] = useState(false)
  const [fotoDoPerfil,setFotoDoPerfil] = useState('')
  const [tipoDeConta,setTipoDeconta] = useState('')

  const [imovel,setImovel] = useState({
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
  <DadosContext.Provider value={{regiao, setRegiao, cadastrando, setCadastrando, imovel, setImovel,tipoDeConta,setTipoDeconta,fotoDoPerfil,setFotoDoPerfil, cpf, setCpf}}>
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  </DadosContext.Provider>
  );
}