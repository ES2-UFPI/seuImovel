import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 30,
    },
    contextHomes:{
        height: 120,
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 8,
        padding: 15,
        borderBottomWidth: 2,
        borderColor: 'grey'

    },
    contextText:{
        width: '80%'
    },  
    title:{
        fontSize: 22,
        fontWeight: 'bold'
    },
    description:{
        fontSize: 18,
        opacity: 0.7
    },
    endereco:{
        fontSize: 14,
        opacity: 0.8,
        color: 'green'
    },
    imageHome: {
        width: 80,
        height: 80,
        borderRadius: 12,
    },
    icon:{
        color: 'green',
        position: 'absolute',
        right: 20,
        bottom: 20,   
    },
    iconeMenu: {
        position: 'absolute',
        top: "5%",
        left: 20,
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contextText2: {
        width: '80%',
        fontSize: 40,
    },
    upgradeText: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default styles
