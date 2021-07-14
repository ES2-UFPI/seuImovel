import React from 'react'
import { View, Text, Image, Alert } from 'react-native'
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'
import { TextInputMask } from 'react-native-masked-text'
import { auth } from '../../services/firebase'
import * as Google from 'expo-google-app-auth';
import firebase from "firebase/app";
import api from '../../services/api'
import { DadosContext } from '../../DadosContext'             



const CadastroUsuario = ({ navigation }) => {

  const [telefone, setTelefone] = React.useState('')
  const [cpf, setCpf] = React.useState('')
  const [nascimento, setNascimento] = React.useState('')
  const {setFotoDoPerfil } = React.useContext(DadosContext)


  signInWithGoogleAsync = async () => {
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
            await api.post('/usuarioPerfil', {//cadastra usuario no banco de dados
              "email":result.user.email,
              "cpf":cpf.replace('-','').replace('.','').replace('.',''),
              "nascimento":nascimento,
              "proprietario":result.user.displayName,
              "telefone":telefone.replace('(','').replace(')','').replace('-','').replace(' ','')
            }).then(()=>{
                setFotoDoPerfil(result.user.photoURL)//coloca o link da foto do perfil do usuario
                Alert.alert("Usuário cadastrado com sucesso!")
                //navigation.navigate('ImoveisNoMapa')
                navigation.goBack()
                /*
                navigation.reset({
                  routes: [{ name:'ImoveisNoMapa' }],
                  key: null,
                  index: 0
                });
                */


            }).catch((e)=>{
                console.log(e)
                Alert.alert("Email/CPF já cadastrados!")
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

  function cadastrar() {
    if (telefone.length != 15) {
      Alert.alert("Não foi possível cadastrar!\nNúmero de telefene incompleto!")
    }
    else if (cpf.length != 14) {
      Alert.alert("Não foi possível cadastrar!\nCPF Inválido!")
    }
    else if (nascimento.length != 10 ||
      Number(nascimento.substr(nascimento.length - 4)) < 1940 ||
      (Number(new Date().getFullYear()) - Number(nascimento.substr(nascimento.length - 4))) <= 7 ||
      Number(nascimento.substr(0, 2)) > 31 ||
      Number(nascimento.substr(3, 2)) > 12
    ) {
      //Se o campo da nascimento estiver preenchido
      //ou se a data for menor que 1940 ou 
      //se a diferença do ano de entrada com o ano da data atual for menor/igual a 7 
      //ou se a data for maior que 31
      //ou se o mês é maior que 12 entra aqui
      Alert.alert("Não foi possível cadastrar!\nData de nascimento inválida!")
    }
    else {//Todos campos foram preenchidos
      
      signInWithGoogleAsync()

    }
  }


  return (

    <View style={styles.container}>
      <View style={styles.containerInputs}>

        <TextInputMask
          style={styles.input}
          placeholder='Telefone'
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
          }}
          value={telefone}
          onChangeText={text => setTelefone(text)} />

        <TextInputMask
          style={styles.input}
          placeholder='CPF *'
          type={'cpf'}
          value={cpf}
          onChangeText={text => setCpf(text)}
        />

        <TextInputMask
          style={styles.input}
          placeholder='Nascimento *'
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY'
          }}
          value={nascimento}
          onChangeText={text => setNascimento(text)}
        />


        <RectButton rippleColor="#FFF" style={styles.button} onPress={() => cadastrar()}>
          <Image
            contain
            style={styles.logo}
            source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }} />
          <Text style={styles.buttonDescription}>Cadastrar com o Google</Text>
        </RectButton>


      </View>

    </View>
  )
}

export default CadastroUsuario

