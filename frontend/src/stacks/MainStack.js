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
import GerenciarPerfil from '../screens/gerenciarPerfil'
import ImoveisFavoritados from '../screens/imoveisFavoritados'
import GerenciarImovel from '../screens/GerenciarImovel';
import CadastroImovel from '../screens/CadastroImovel/index'
import CadastroUsuario from '../screens/CadastroUsuario/index'
import Login from '../screens/Login/index'
import logout from '../components/logout/logout'

import ListarImoveisVendedor from '../screens/listarImoveisVendedor/index'

const Drawer = createDrawerNavigator()//Drawer
const AppStack = createStackNavigator() //MAPA -> LISTAGEM GERAL -> DESCRICAO -> GERENCIAR IMÓVEL
const AppStack2 = createStackNavigator() //CONFIG DO USUARIO -> GERENCIAR PERFIL
const AppStack3 = createStackNavigator() //CADASTRO DE IMÓVEL
const AppStack4 = createStackNavigator() //FAVORITOS -> LISTAGEM DE FAVORITOS -> GERENCIAR IMÓVEL
const StackVendedor = createStackNavigator() // pilha dos imoveis do usuario
const AppStack5 = createStackNavigator()

// nome, nascimento, cpf, email, 


const ScreenVendedor = () => {//meus imóveis
    return (
        <StackVendedor.Navigator screenOptions={{ headerShown: true }} >
            <StackVendedor.Screen name='meusImoveis' component={ListarImoveisVendedor} options={{
                headerShown: false}}/>
            <StackVendedor.Screen name='DescricaoImovel' component={DescricaoImovel} />
            <AppStack.Screen name="GerenciarImovel" component={GerenciarImovel}
                options={{
                    title: 'Editar Imóvel',
                    //headerStyle:styles.headerStyle,
                    //headerTitleStyle:styles.headerTitleStyle  
                }}
            />
        </StackVendedor.Navigator>


    )
}



function mapaStack() {//Stack 1 -> telas: mapa + listagem + descrição 
    return (

        <AppStack.Navigator screenOptions={{ headerShown: true }}>{/*headershown titulo da parte de cima ativado*/}
            <AppStack.Screen name='Login' component={Login} options={{
                headerShown: false,
                gestureEnabled:false,//nao exibe o drawer no login
                    title: 'Login',
                    //headerStyle:styles.headerStyle,
                    //headerTitleStyle:styles.headerTitleStyle  
                }}/>
            <AppStack.Screen name='Cadastrar Usuario' component={CadastroUsuario} 
            options={{
                headerShown: true,
                    title: 'Cadastar Usuário',
                    //headerStyle:styles.headerStyle,
                    //headerTitleStyle:styles.headerTitleStyle  
                }}/>
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
                    title: 'Descrição do Imóvel',
                    //headerStyle:styles.headerStyle,
                    //headerTitleStyle:styles.headerTitleStyle  
                }}
            />

            <AppStack.Screen name="GerenciarImovel" component={GerenciarImovel}
                options={{
                    title: 'Editar Imóvel',
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






function imoveisFavoritadosStack() {//Stack 3 -> telas : imoveis favoritados do Usuário
    return (
        <AppStack4.Navigator screenOptions={{ headerShown: true }}>{/*headershown titulo da parte de cima ativado*/}
            <AppStack4.Screen name="ImoveisFavoritados" component={ImoveisFavoritados}
                options={{
                    headerShown: false,
                    title: 'Imoveis Favoritados',
                    //headerStyle:styles.headerStyle,
                    //headerTitleStyle:styles.headerTitleStyle  
                }}
            />
            <AppStack4.Screen name="DescricaoImovel" component={DescricaoImovel}
                options={{
                    title: 'Descrição Imovel',
                    //headerStyle:styles.headerStyle,
                    //headerTitleStyle:styles.headerTitleStyle  
                }}
            />
            <AppStack4.Screen name="GerenciarImovel" component={GerenciarImovel}
                options={{
                    title: 'Editar Imóvel',
                    //headerStyle:styles.headerStyle,
                    //headerTitleStyle:styles.headerTitleStyle  
                }}
            />

        </AppStack4.Navigator>
    )
}

function logoutStack() {
    return (
        <AppStack5.Navigator screenOptions={{ headerShown: false }}>{/*headershown titulo da parte de cima ativado*/}
            <AppStack5.Screen name="logoutStack" component={GerenciarImovel}
                options={{
                    title: 'logout',
                    //headerStyle:styles.headerStyle,
                    //headerTitleStyle:styles.headerTitleStyle  
                }}
            />
        </AppStack5.Navigator>


    )
}


export default () => {
    return (

        <Drawer.Navigator drawerContentOptions={{ activeTintColor: 'lime' }} initialRouteName="mapaStack">

            <Drawer.Screen name="mapaStack" component={mapaStack}
                options={{
                    title: () => {
                        return (
                            <View style={styles.container}>
                                <MaterialIcons style={styles.iconDrawer} color="green" name='house' size={28} />
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
                                <MaterialCommunityIcons style={styles.iconDrawer} color="green" name='home-currency-usd' size={28} />
                                <Text style={styles.textDrawer}>Anúncie seu Imóvel</Text>
                            </View>
                        )
                    }
                }}
            />


            <Drawer.Screen name="imoveisFavoritadosStack" component={imoveisFavoritadosStack}
                options={{
                    title: () => {
                        return (
                            <View style={styles.container}>
                                <MaterialIcons name="favorite" size={24} color="green" />
                                <Text style={styles.textDrawer}>Imóveis Favoritados</Text>
                            </View>
                        )
                    }
                }}
            />

            <Drawer.Screen name="Meus Imoveis" component={ScreenVendedor}
                options={{
                    title: () => {
                        return (
                            <View style={styles.container}>
                                <MaterialCommunityIcons name="home-city" size={24} color="green" />
                                <Text style={styles.textDrawer}>Meus Imoveis</Text>
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
                                <MaterialIcons style={styles.iconDrawer} name='settings' color="green" size={28} />
                                <Text style={styles.textDrawer}>Configurações</Text>
                            </View>
                        )
                    }
                }}
            />

            <Drawer.Screen name="Usuario" component={mapaStack}
                options={{
                    title: () => {
                        return (
                            <View style={styles.container}>
                                <MaterialIcons style={styles.iconDrawer} name='login' color="green" size={28} />
                                <Text style={styles.textDrawer}>Logout</Text>
                            </View>
                        )
                    }
                    
                }}
            />



        </Drawer.Navigator>

    )
}
