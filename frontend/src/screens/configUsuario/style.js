import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import color from 'color'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight + 10,
    },
    firstContainer:{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    secondContainer:{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    },
    imageUser:{
        marginBottom: 20,
        width: 150,
        height: 150,
        borderRadius: 80, //alterar depois 
    },
    notificationText:{
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1E90FF' 
    },
    containerText:{
        flexDirection: 'row',
        width: '90%',
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
        borderColor: 'grey',
        borderWidth: 1,
    },
    firstText:{
        width: '30%',
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        borderRightWidth: 1,
    },
    secondText:{
        width: '65%',
        paddingLeft: 20,
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
    },
    upgradeText:{
        marginTop: 20,
        fontSize: 13,
        fontWeight: 'bold',
        color: '#7FFF00' 
    },
    modalContainer:{
        alignSelf:'center',
        bottom:1,
        position:'absolute',
        backgroundColor:'red',
        width:'70%',

    },  
    modalContent:{
        width:'70%',
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:20,
        backgroundColor:'rgba(50,50,50,255)',
        marginTop:'50%',
        borderWidth:2,
        paddingLeft:15,
    }

})

export default styles
