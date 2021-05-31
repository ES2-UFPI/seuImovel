import React from 'react'
import {TextInput,View,Text,StyleSheet} from 'react-native'

export default({keyboardType,formPlaceHolder,setValue})=>{
    return (
        <View style = {styles.formContainer}>
            <View style = {styles.containerText}>
                <Text style = {styles.firstText}>{formPlaceHolder}</Text>
                <TextInput
                keyboardType = {keyboardType}
                onChangeText= {setValue} 
                style = {styles.secondText} 
                placeholder = {formPlaceHolder}
                ></TextInput>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        width:'100%',
        fontSize:20,
        justifyContent:'center',
        marginBottom:10,
        alignItems:'center',
        marginBottom:5,
    },
 
    firstText:{
        width: '20%',
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        borderRightWidth: 1,
        paddingRight:2,
        
        
    },
    secondText:{
        width: '85%',
        paddingLeft: 20,
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        
    },
    containerText:{
        flexDirection: 'row',
        width: '90%',
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
        borderColor: 'grey',
        borderWidth: 1 
        
    },
})