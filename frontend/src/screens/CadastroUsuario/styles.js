import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerInputs: {
        justifyContent:"center",
        alignItems:"center",
    },

    input: {
        width:"90%",
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginTop: 15
    },
    buttonDescription:{
        fontSize:20,
        textAlign:'center',
        color:"#fff"
        
    },
    button:{
        backgroundColor: 'green',
        marginTop:30,
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'row',
        width: '60%',
        height: 48,
        borderRadius:7,
        shadowColor: "#000",
        shadowOffset: {width: 0,height: 3,},
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    logo: {
        width: "13%",
        height: "60%",
      }
})

export default styles
