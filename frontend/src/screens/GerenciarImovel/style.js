import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import color from 'color'


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    firstContainer: {
        width: '100%',
        height: '100%',
        marginLeft:20
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
        width: '90%',
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'grey',
    },
    containerText2: {
        flexDirection: 'row',
        width: '90%',
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
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
    secondText: {
        width: '65%',
        paddingLeft: 20,
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
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
        color: '#7FFF00',
        justifyContent:'center'
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
    buttonSalvar:{
        alignItems:'center',
        justifyContent:'center',
        padding:7,
        marginBottom:55
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      modalView: {
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        width:'100%',
        height:'100%',
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
        padding:10,
        position: "absolute",
        bottom:"5%",
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
        marginBottom: 15,
        textAlign: "center"
      },
      contentWrap:{
          flex:1,
      }

})

export default styles
