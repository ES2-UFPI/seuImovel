import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,Image,TouchableOpacity,ScrollView } from "react-native";

export default({isVibile,onReqClose,descricao,imagem})=>{
    const url = imagem;
return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVibile}
        onRequestClose={onReqClose}
      >
        <View style={styles.centeredView}>
                        <Image  style = {styles.image} source={url}/>

          <View style={styles.modalView}>
          <ScrollView style = {{flex:.6,paddingRight:10,borderRight:1,height:70}}>
            <Text style={styles.modalText}>{descricao.substring(0,130)}...</Text>
           </ScrollView>
            <View style = {styles.imageContainer}>
                <Image  style = {styles.image} source={{uri:url}}/>
            </View>
          </View>
          <TouchableOpacity onPress = {onReqClose}>
            <Text>Fechar</Text>
          </TouchableOpacity>
      
        </View>
      </Modal>
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
