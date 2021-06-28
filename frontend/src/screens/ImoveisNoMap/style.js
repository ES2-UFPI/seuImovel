import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },

  map: {
    width: '100%',
    height: '100%',
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#E8E8E8',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: 'rgb(255,99,71)',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5
  },
  image: {
    width: 120,
    height: 80,
  },
  titulo: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center'
  },
  descricao: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'justify'
  },
  iconeMenu:{
    position: 'absolute',
    top: "5%",
    left: 20,
  },
  iconeLista: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  }

})

export default styles
