import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Constants from 'expo-constants'

import api from '../../services/api'

const index = () => {





    return (
       <SafeAreaView style={styles.container}>
           <Text>Seus imoveis</Text>
       </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight + 10
    }
})
