import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,Image,TouchableOpacity,ScrollView } from "react-native";
import {useNavigation, useRoute} from '@react-navigation/native'

export default({isVibile,onReqClose,descricao,imagem, data, setVisible})=>{
    const url = imagem;
    const navigation = useNavigation()
    const imovel = data;

    function navigateToDescricao(imovel){
      navigation.navigate('DescricaoImovel', { imovel })
    }
return (
  
    <View style={styles.centeredView}>
      <Pressable onPress={() => setVisible(false)}>
              <Text>Fechar</Text>
            </Pressable>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <ScrollView style = {{flex:.6,paddingRight:10,borderRight:1,height:70}}>
            <TouchableOpacity onPress = {() => navigateToDescricao(imovel)}>
            <Text style={styles.modalText}>{descricao.substring(0,80)}...</Text>
            </TouchableOpacity>
           </ScrollView>
            <View style = {styles.imageContainer}>
                <Image  style = {styles.image} source={{uri:url}}/>
            </View>
          </View>
      
        </View>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={isVibile}
        onRequestClose={onReqClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <ScrollView style = {{flex:.6,paddingRight:10,borderRight:1,height:70}}>

            <TouchableOpacity onPress = {() => {onReqClose(); navigateToDescricao(imovel)}}>

            <Text style={styles.modalText}>{descricao.substring(0,80)}...</Text>
            </TouchableOpacity>
           </ScrollView>
            <View style = {styles.imageContainer}>
                <Image  style = {styles.image} source={{uri:url}}/>
            </View>
            <TouchableOpacity style={{marginLeft:5,paddingLeft:5,borderLeftWidth:2}} onPress = {onReqClose}>
            <Text>Fechar</Text>
          </TouchableOpacity>
          </View>
    
      
        </View>
      </Modal> */}
    </View>
  );

}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
    width:'100%'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    flexDirection:'row',
    borderWidth:1,

    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 18,
    textAlign: "justify",

  },
  imageContainer:{

    flex:.4
  },
  image:{
      flex:1,
      width:'100%',
      height:'100%'
  }
});
