import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native'
import MainStack from './src/stacks/MainStack'


export default function App() {
  return (

    //Bloco principal de navegação. Todas as telas ficaram dentro dele
    <NavigationContainer>
      <MainStack></MainStack>
    </NavigationContainer>
  );
}


