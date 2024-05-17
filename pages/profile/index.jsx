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
import formatCPF from "../../utils/cpfFormatter";
import Spinner from "../../components/Spinner";

export default function Profile({ navigation }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const getStaticData = async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('usuario'));
            const { data } = await apiUrl.get(`/cliente/${user.id}`);
            setUser(data);
        } catch (error) {
            console.log(error);
            ToastAndroid.show('Erro ao buscar dados do usuário', ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    }

    const verifyAuthentication = async () => {
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
            verifyAuthentication();
        }, [navigation])
    );

    return (
        <>
            {!loading && (
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={profileIMG} style={styles.image} />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileInfoName}>{user?.NM_CLIENTE}</Text>
                        {/* <Text style={styles.profileInfoAddress}>Rua Aleatoria, 123</Text> */}
                    </View>

                    <View style={styles.profileInfo}>
                        <TouchableOpacity 
                            onPress={logout}
                            style={{ display: "flex", flexDirection: "row", gap: 12, justifyContent: "center", alignItems: "center", backgroundColor: "#f00", padding: 12, borderRadius: 12 }}
                        >
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
                                <Text style={styles.text}>{user.EMAIL_CLIENTE}</Text>
                            </View>
                            <View style={styles.badgeInfo}>
                                <View style={{ width: 25 }}>
                                    <Entypo name="fingerprint" size={18} color="#fff" />
                                </View>
                                <Text style={styles.text}>{formatCPF(user.CPF_CLIENTE)}</Text>
                            </View>
                            <View style={styles.badgeInfo}>
                                <View style={{ width: 25 }}>
                                    <FA6 name="phone" size={18} color="#fff" />
                                </View>
                                <Text style={styles.text}>({user.DDD_TELEFONE}) {formatPhoneNumber(user.NR_TELEFONE)}</Text>
                            </View>
                            <View style={styles.badgeInfo}>
                                <View style={{ width: 25 }}>
                                    <Entypo name="cake" size={18} color="#fff" />
                                </View>
                                <Text style={styles.text}>{formatDate(user.DT_NASCIMENTO_CLIENTE)}</Text>
                            </View>
                            <View style={styles.badgeInfo}>
                                <View style={{ width: 25 }}>
                                    <FA6 name="slack" size={18} color="#fff" />
                                </View>
                                <Text style={styles.text}>{user.NM_GENERO}</Text>
                            </View>
                            <View style={styles.badgeInfo}>
                                <View style={{ width: 25 }}>
                                    <FA6 name="users" size={18} color="#fff" />
                                </View>
                                <Text style={styles.text}>{user.ESTADO_CIVIL_CLIENTE}</Text>
                            </View>
                        </View>
                    </View>

                    <StatusBar style="auto" />
                </ScrollView>
            )}
            {loading && (
                <ScrollView contentContainerStyle={styles.container}>
                    <Spinner />
                </ScrollView>
            )}
        </>
    );
}