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


  var cpf = '41789623615'
  const [regiao, setRegiao] = useState()
  const [cadastrando, setCadastrando] = useState(false)
  const [fotoDoPerfil,setFotoDoPerfil] = useState('')

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

const [tipoDeConta,setTipoDeconta] = useState('grátis')

async function loadTipoDeConta(){
  const response = await api.get(`/usuarioConfig/${cpf}`)
  setTipoDeconta(response.data.plano.toString())
}




useEffect(() => {
  loadTipoDeConta()
}, []);

  return (
   
    //Bloco principal de navegação. Todas as telas ficaram dentro dele
  <DadosContext.Provider value={{regiao, setRegiao, cadastrando, setCadastrando, imovel, setImovel,tipoDeConta,setTipoDeconta,fotoDoPerfil,setFotoDoPerfil}}>
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  </DadosContext.Provider>
  );
}


