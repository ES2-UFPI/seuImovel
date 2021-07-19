import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 10,
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
        position: 'absolute',
        right: 20,
        bottom: 20,   
    }
})

export default styles
