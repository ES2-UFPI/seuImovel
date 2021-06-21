import React from 'react'
import { Image, Text, View, Dimensions, TouchableOpacity, Linking } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ImoveisNoMap from '../screens/ImoveisNoMap/index'
import ListarImoveis from '../screens/listarImoveis/index'
import ConfigUsuario from '../screens/configUsuario/index'
import styles from '../styles/global'

import DescricaoImovel from '../screens/descricaoImovel'
import GerenciarPerfil  from '../screens/gerenciarPerfil';


import CadastroImovel from '../screens/CadastroImovel/index'


const Drawer = createDrawerNavigator()//Drawer
const AppStack = createStackNavigator() //tela 1
const AppStack2 = createStackNavigator() //tela 2
const AppStack3 = createStackNavigator() //tela 3


function mapaStack() {//Stack 1 -> telas: mapa + listagem + descrição 
    return (
        <AppStack.Navigator screenOptions={{ headerShown: true }}>{/*headershown titulo da parte de cima ativado*/}
            <AppStack.Screen name="Mapa" component={ImoveisNoMap}
                options={{
                    headerShown: false,
                    title: 'Imóveis',
                    //headerStyle:styles.headerStyle,
                    //headerTitleStyle:styles.headerTitleStyle  
                }}
            />
            <AppStack.Screen name="ListagemDeImoveis" component={ListarImoveis}
                options={{
                    title: 'Listagem De Imóveis',
                    //headerStyle:styles.headerStyle,
                    //headerTitleStyle:styles.headerTitleStyle  
                }}
            />

            <AppStack.Screen name="DescricaoImovel" component={DescricaoImovel}
                options={{
                    title: 'Listagem De Imóveis',
                    //headerStyle:styles.headerStyle,
                    //headerTitleStyle:styles.headerTitleStyle  
                }}
            />

        </AppStack.Navigator>
    )
}

function configuracaoStack() {//Stack 2 -> telas : configuração do Usuário
    return (
        <AppStack2.Navigator screenOptions={{ headerShown: false }}>{/*headershown titulo da parte de cima ativado*/}
            <AppStack2.Screen name="ConfigUsuario" component={ConfigUsuario}
                options={{
                    title: 'Configurações',
                    //headerStyle:styles.headerStyle,
                    //headerTitleStyle:styles.headerTitleStyle  
                }}
            />
             <AppStack2.Screen name="GerenciarPerfil" component={GerenciarPerfil}
                options={{
                    title: 'Gerenciar Perfil',
                    //headerStyle:styles.headerStyle,
                    //headerTitleStyle:styles.headerTitleStyle  
                }}
            />
        </AppStack2.Navigator>
    )
}

function cadastroDeImovelStack() {
    return (
        <AppStack3.Navigator screenOptions={{ headerShown: false }}>{/*headershown titulo da parte de cima ativado*/}
            <AppStack3.Screen name="CadastroImovel" component={CadastroImovel}
                options={{
                    title: 'Cadastro de Imóvel',
                    //headerStyle:styles.headerStyle,
                    //headerTitleStyle:styles.headerTitleStyle  
                }}
            />
        </AppStack3.Navigator>


    )
}



export default () => {
    return (

        <Drawer.Navigator>

            <Drawer.Screen name="mapaStack" component={mapaStack}
                options={{
                    title: () => {
                        return (
                            <View style={styles.container}>
                                <MaterialIcons style={styles.iconDrawer} name='house' size={28} />
                                <Text style={styles.textDrawer}>Imóveis</Text>
                            </View>
                        )
                    }
                }}
            />


            <Drawer.Screen name="cadastroDeImovelStack" component={cadastroDeImovelStack}
                options={{
                    title: () => {
                        return (
                            <View style={styles.container}>
                                <MaterialCommunityIcons style={styles.iconDrawer} name='home-currency-usd' size={28} />
                                <Text style={styles.textDrawer}>Anúncie seu Imóvel</Text>
                            </View>
                        )
                    }
                }}
            />


            <Drawer.Screen name="configuracaoStack" component={configuracaoStack}
                options={{
                    title: () => {
                        return (
                            <View style={styles.container}>
                                <MaterialIcons style={styles.iconDrawer} name='settings' size={28} />
                                <Text style={styles.textDrawer}>Configurações</Text>
                            </View>
                        )
                    }
                }}
            />


        </Drawer.Navigator>

    )
}
