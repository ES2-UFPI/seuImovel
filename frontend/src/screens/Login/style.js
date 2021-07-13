import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import color from 'color'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight + 10,
    },
    firstContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    imageUser: {
        marginBottom: 20,
        marginTop: 30,
        width: 150,
        height: 150,
        borderRadius: 80, //alterar depois 
    },
})

export default styles
