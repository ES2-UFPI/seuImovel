import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const Input = ({containerStyle, inputStyle, placeholder, ...outrasProps}) => {
    return (
        <View style={[styles.caixa, {...containerStyle}]}>
            <TextInput {...outrasProps} 
            placeholder={placeholder}
            style={[ styles.entrada, {...inputStyle}]}
            />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    caixa: {
        height: 35,
        margin: 5
    },
    entrada: {
        flex: 1,
        paddingHorizontal: 3,
        borderWidth: 1,
    }
})
