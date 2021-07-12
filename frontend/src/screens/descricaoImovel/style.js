import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight + 10,
    },
    firstContainer:{
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
    },
    containerText:{
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'grey',
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '90%',
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
    thirdText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    favoriteText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red', 
    },
    unFavoriteText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'grey', 
    },
    containerShare:{
      
        backgroundColor: '#90EE90',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: 50,
        paddingVertical: 10,
        marginTop: 10,
        width: '70%',
    },
    containerFavorite:{
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        width: '25%',
    },
    imageHome:{
        width: "80%",
        height: "80%",
    },
    swipe:{  
        height: '40%', 
    }
})

export default styles
