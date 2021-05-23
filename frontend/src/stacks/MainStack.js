import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import ImoveisNoMap from '../screens/ImoveisNoMap/index'


const Stack = createStackNavigator();

export default () =>{
    return (

        
        <Stack.Navigator 
        
        //InitialRouteName é o nome da primeira tela a ser renderizada. No caso, para testar novas telas basta criar novas Stack.Screen
        //E substituir o InitialRouteName pela Tela que Voce acabou de criar.
        //InitialRouteName = "NOME_DA_TELA_A_SER_TESTADA"
        // <Stack.Screen name = "NOME_DA_TELA_A_SER_TESTADA" component = {ComponenteDaTela(Arquivo .js)} />
        
        initialRouteName = "ImoveisNoMapa"
            screenOptions ={{
            
            headerShown:false

        }} >
            <Stack.Screen name = "ImoveisNoMapa" component = {ImoveisNoMap} />
        </Stack.Navigator>
    )
}