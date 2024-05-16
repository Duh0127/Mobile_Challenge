import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback } from "react";
import { Text, View, TouchableOpacity, Image, ToastAndroid } from "react-native";
import { styles } from "./styles";
import profileIMG from "../../assets/profile-img.png";
import FA6 from "react-native-vector-icons/FontAwesome6";
import Entypo from "react-native-vector-icons/Entypo";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import formatPhoneNumber from "../../utils/phoneFormatter";
import formatDate from "../../utils/dateFormatter";

export default function Profile({ navigation }) {
    const [user, setUser] = useState({});

    const getStaticData = async () => {
        const user = await AsyncStorage.getItem('usuario')
        if (user) setUser(JSON.parse(user))
        else setUser()
    }

    const isLogged = async () => {
        const user = await AsyncStorage.getItem('usuario');
        if (!user) {
            navigation.navigate('Login');
        } else {
            getStaticData();
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem('usuario');
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
    }

    useFocusEffect(
        useCallback(() => {
            isLogged();
            console.log('ACESSOU PERFIL');
        }, [navigation])
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={profileIMG} style={styles.image} />
            </View>
            <View style={styles.profileInfo}>
                <Text style={styles.profileInfoName}>{user?.nome}</Text>
                {/* <Text style={styles.profileInfoAddress}>Rua Aleatoria, 123</Text> */}
            </View>

            <View style={styles.profileInfo}>
                <TouchableOpacity onPressOut={logout}
                    style={{ display: "flex", flexDirection: "row", gap: 12, justifyContent: "center", alignItems: "center", backgroundColor: "#f00", padding: 12, borderRadius: 12 }} onPress={() => navigation.navigate('EditProfile')}>
                    <Text style={{ color: "#fff", fontSize: 18 }}>Deslogar</Text>
                    <FA6 name="arrow-right-from-bracket" size={18} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <View style={styles.blueContainer}>
                    <View style={styles.buy}>
                        <Text style={styles.title}>BUSCAS</Text>
                        <Text style={styles.value}>10</Text>
                    </View>
                    <View style={styles.lastBuy}>
                        <Text style={styles.title}>ÚLTIMA BUSCA</Text>
                        <Text style={styles.value}>Shampoo Clear</Text>
                    </View>
                </View>

                <View style={styles.blueContainer}>
                    <View style={styles.frequency}>
                        <Text style={styles.title}>BUSCA COM FREQUÊNCIA</Text>
                        <Text style={styles.value}>Rexona Black and White</Text>
                    </View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Text style={styles.infoTitle}>INFORMAÇÕES DO PERFIL</Text>
                    <View style={styles.badgeInfo}>
                        <View style={{ width: 25 }}>
                            <Entypo name="email" size={18} color="#fff" />
                        </View>
                        <Text style={styles.text}>{user.email}</Text>
                    </View>
                    <View style={styles.badgeInfo}>
                        <View style={{ width: 25 }}>
                            <Entypo name="fingerprint" size={18} color="#fff" />
                        </View>
                        <Text style={styles.text}>{user.cpf}</Text>
                    </View>
                    <View style={styles.badgeInfo}>
                        <View style={{ width: 25 }}>
                            <FA6 name="phone" size={18} color="#fff" />
                        </View>
                        <Text style={styles.text}>({user.dddTelefone}) {formatPhoneNumber(user.numeroTelefone)}</Text>
                    </View>
                    <View style={styles.badgeInfo}>
                        <View style={{ width: 25 }}>
                            <Entypo name="cake" size={18} color="#fff" />
                        </View>
                        <Text style={styles.text}>{formatDate(user.dataNascimento)}</Text>
                    </View>
                    <View style={styles.badgeInfo}>
                        <View style={{ width: 25 }}>
                            <FA6 name="slack" size={18} color="#fff" />
                        </View>
                        <Text style={styles.text}>{user.nomeGenero}</Text>
                    </View>
                    <View style={styles.badgeInfo}>
                        <View style={{ width: 25 }}>
                            <FA6 name="users" size={18} color="#fff" />
                        </View>
                        <Text style={styles.text}>{user.estadoCivil}</Text>
                    </View>
                </View>
            </View>

            <StatusBar style="auto" />
        </ScrollView >
    );
}