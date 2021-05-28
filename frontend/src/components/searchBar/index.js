import React,{useState} from 'react'
import {View,Text,StyleSheet,Input, TextInput,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default ({performSearch})=>{
    Icon.loadFont();
    const [search,setSearch] = useState('')

    return (
        <View style ={styles.searchBarContainer} >
            <TextInput onChangeText = {(search)=>{
                 setSearch(search)

            }} style = {styles.textInput} placeholder={"Pesquisar Imóvel..."}  ></TextInput>
            <TouchableOpacity onPress= {
                ()=>console.log(search)
                }>
            <Icon  name="search" size={25} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    searchBarContainer:{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#000',
        paddingBottom: 10,
        position:'absolute',
        zIndex:2 ,
        backgroundColor:'#dddd',
        top:.3  ,
        paddingLeft:30,
        paddingTop:10,
        paddingRight:20,
        alignItems:'center',
        
    },
    textInput:{
     flex: 1,
     fontSize:20,

    }
})