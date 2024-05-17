import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, ToastAndroid, TouchableOpacity } from 'react-native';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import Logo from '../assets/logo_sem_fundo_sem_texto.png';
import Profile from '../pages/profile';
import EditProfile from '../pages/profile/edit';
import Products from '../pages/products';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { Navigator, Screen } = createDrawerNavigator();

const DrawerHeader = ({ navigation, usuario }) => {
    const route = useRoute();

    return (
        <Navbar>
            {route.name === "Detalhes do Produto" && (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
            )}

            {route.name !== "Cadastro" && (
                <>
                    {route.name !== "Detalhes do Produto" && (
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <Feather name="menu" size={20} color="#fff" />
                        </TouchableOpacity>
                    )}
                </>
            )}
            {route.name === "Cadastro" && (
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Feather name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image
                    source={Logo}
                    style={{ width: 100, height: 40, objectFit: "contain" }}
                />
            </TouchableOpacity>
            {route.name !== "Perfil" && !usuario && (
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Feather name="log-in" size={20} color="#fff" />
                </TouchableOpacity>
            )}
            {route.name !== "Perfil" && usuario && (
                <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                    <Feather name="user" size={20} color="#fff" />
                </TouchableOpacity>
            )}
            {route.name === "Perfil" && (
                <TouchableOpacity onPress={() => navigation.navigate('Editar Perfil')}>
                    <Feather name="edit" size={20} color="#fff" />
                </TouchableOpacity>
            )}
        </Navbar>
    )
}

export default function DrawerRoutes() {
    const navigation = useNavigation();
    const [user, setUser] = useState({});

    const getUser = async () => {
        const user = await AsyncStorage.getItem('usuario');
        if (user) {
            const data = JSON.parse(user);
            setUser(data);
        } else setUser();
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            getUser()
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <Navigator screenOptions={{ title: '', header: (props) => <DrawerHeader {...props} usuario={user} /> }}>
            <Screen
                name="Home"
                component={Home}
                options={{
                    drawerIcon: () => <Feather name="home" size={24} />,
                    drawerLabel: "Página Inicial"
                }}
            />
            <Screen
                name="Login"
                component={Login}
                options={{
                    drawerIcon: () => <Feather name="log-in" size={24} />,
                    drawerLabel: "Login"
                }}
            />
            <Screen
                name="Cadastro"
                component={Register}
                options={{
                    drawerIcon: () => <Feather name="user-plus" size={24} />,
                    drawerLabel: "Cadastro"
                }}
            />
            <Screen
                name="Perfil"
                component={Profile}
                options={{
                    drawerIcon: () => <Feather name="user" size={24} />,
                    drawerLabel: "Perfil"
                }}
            />
            <Screen
                name="Editar Perfil"
                component={EditProfile}
                options={() => ({
                    drawerIcon: () => <Feather name="user" size={24} />,
                    drawerLabel: "Editar Perfil",
                })}
            />
            <Screen 
                name='Produtos'
                component={Products}
                options={{
                    drawerIcon: () => <Feather name="shopping-bag" size={24} />,
                    drawerLabel: "Produtos"
                }}
            />
        </Navigator>
    )
}
