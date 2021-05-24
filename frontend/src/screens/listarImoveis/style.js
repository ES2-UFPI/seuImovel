import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b3ff66',
    },
    contextHomes:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 15,
        marginHorizontal: 8,
        padding: 15,
        borderRadius: 12,
        flex: 1,
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
        borderRadius: 50,
    },
})

export default styles
