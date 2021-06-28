import React, { Component } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { View } from 'react-native'
import { Platform } from 'react-native';

const Search = ({ callBackFuntion }) => {


    return (<GooglePlacesAutocomplete
        placeholder="Qual lugar?"
        placeholderTextColor='red'
        onPress={(data, details) => { callBackFuntion(data, details) }}
        query={{
            key: "AIzaSyC7PgJNfR5Iz1TsLp8wjHHcBb4prdNJGi4",
            language: 'pt'

        }}

        textInputProps={{
            autoCapitalize: "none",
            autoCorrect: false
        }}

        fetchDetails
        enablePoweredByContainer={false}
        styles={{
            container: {
                position: 'absolute',
                top: Platform.select({ ios: "5%", android: "5%" }),
                width: '75%',
                marginLeft: '20%',
                opacity: .9,
                borderRadius: 10,
                borderWidth: .0,
                backgroundColor: 'transparent'

            },
            textInput: {
                height: 45,
                margin: 0,
                borderWidth: 1,
                borderRadius: 14,
                borderColor: 'green',
                fontWeight: 'bold',
                fontSize: 16,
                paddingLeft: 15
            },
            listView: {
                borderWidth: 1,
                borderColor: 'green',
                backgroundColor: '#ffff',
                elevation: 5,

            },
            row: {
                padding: 15
            }
        }}

    />)

}
export default Search;