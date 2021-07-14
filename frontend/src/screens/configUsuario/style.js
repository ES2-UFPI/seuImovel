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
        width: 150,
        height: 150,
        borderRadius: 80, //alterar depois 
    },
    notificationText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1E90FF'
    },
    containerText: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'grey',
    },
    containerTextIos: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'grey',
    },
    firstText: {
        width: '30%',
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        borderRightWidth: 1,
    },
    firstTextIos: {
        width: '30%',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        borderRightWidth: 1,
    },
    secondText: {
        width: '65%',
        paddingLeft: 20,
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
    },
    pickerText:{
        width: '70%',
        color: 'black',
        marginLeft: 20
    },
    editPerfil: {
        fontSize: 13,
        color: 'black',
        fontWeight: 'bold',
        paddingLeft: 80,
        paddingRight: 65
    },
    upgradeText: {
        marginTop: 20,
        fontSize: 13,
        fontWeight: 'bold',
        color: '#7FFF00'
    },
    cancelText: {
        marginTop: 20,
        fontSize: 13,
        fontWeight: 'bold',
        color: 'red'
    },
    modalContainer: {
        alignSelf: 'center',
        bottom: 1,
        position: 'absolute',
        backgroundColor: 'red',
        width: '70%',

    },
    modalContent: {
        width: '70%',
        height: '50%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: '#FFFAFA',
        marginTop: '50%',
        borderWidth: 2,
        paddingLeft: 15,
    },
    textPlano: {
        fontSize: 14,
        textAlign: 'left',
        color: 'black',
        textAlign: 'left'
    },
    iconeMenu: {
        position: 'absolute',
        top: 20,
        left: 20,
    },

})

export default styles
