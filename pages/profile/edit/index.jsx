import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { Text, View, TouchableOpacity, Image, Pressable } from "react-native";
import { styles } from "./styles";
import profileIMG from "../../../assets/profile-img.png";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import FA6 from "react-native-vector-icons/FontAwesome6";
import Entypo from "react-native-vector-icons/Entypo";
import { ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import formatPhoneNumber from "../../../utils/phoneFormatter";
import formatDate from "../../../utils/dateFormatter";

export default function EditProfile({ navigation }) {
    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState({});
    const [userEdit, setUserEdit] = useState({});

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

    useFocusEffect(
        useCallback(() => {
            isLogged();
        }, [navigation])
    );


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={profileIMG} style={styles.image} />
            </View>
            <View style={styles.profileInfo}>
                <Text style={styles.profileInfoName}>{user.nome}</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Text style={styles.infoTitle}>EDITAR INFORMAÇÕES</Text>

                    <TouchableOpacity
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 8,
                            backgroundColor: '#1C1E41',
                            borderRadius: 8,
                            height: 40,
                        }}
                        onPress={() => {
                            setIsEdit(!isEdit)
                            setUserEdit(user)
                        }}
                    >
                        <Text style={styles.text}>{!isEdit ? "Habilitar Edição" : "Desabilitar Edição"}</Text>
                        <FA6 name="edit" size={18} color="#fff" />
                    </TouchableOpacity>

                    {!isEdit && (
                        <>
                            <View style={styles.badgeInfo}>
                                <View style={{ width: 25 }}>
                                    <FA6 name="user" size={18} color="#fff" />
                                </View>
                                <Text style={styles.text}>{user.nome}</Text>
                            </View>
                            <View style={styles.badgeInfo}>
                                <View style={{ width: 25 }}>
                                    <FA6 name="envelope" size={18} color="#fff" />
                                </View>
                                <Text style={styles.text}>{user.email}</Text>
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
                                    <FA6 name="mars-and-venus" size={18} color="#fff" />
                                </View>
                                <Text style={styles.text}>{user.nomeGenero}</Text>
                            </View>
                            <View style={styles.badgeInfo}>
                                <View style={{ width: 25 }}>
                                    <FA6 name="people-arrows" size={18} color="#fff" />
                                </View>
                                <Text style={styles.text}>{user.estadoCivil}</Text>
                            </View>
                        </>
                    )}
                    {isEdit && (
                        <>
                            <View style={styles.badgeInfo}>
                                <Input
                                    name="Nome Completo"
                                    placeholder="Digite seu nome completo"
                                    value={userEdit.nome}
                                    onChange={text => setUserEdit({ ...userEdit, nome: text })}
                                />
                            </View>
                            <View style={styles.badgeInfo}>
                                <Input
                                    name="Email"
                                    placeholder="Digite seu email"
                                    value={userEdit.email}
                                    onChange={text => setUserEdit({ ...userEdit, email: text })}
                                />
                            </View>

                            <View style={styles.badgeInfo}>
                                <Input
                                    name="Telefone"
                                    placeholder="Digite seu telefone"
                                    value={userEdit.numeroTelefone}
                                    onChange={text => {
                                        const formattedText = text.replace(/\D/g, '');

                                        let formattedPhoneNumber = '';
                                        if (formattedText.length <= 2) {
                                            formattedPhoneNumber = `(${formattedText}`;
                                        } else if (formattedText.length <= 6) {
                                            formattedPhoneNumber = `(${formattedText.slice(0, 2)}) ${formattedText.slice(2)}`;
                                        } else if (formattedText.length <= 10) {
                                            formattedPhoneNumber = `(${formattedText.slice(0, 2)}) ${formattedText.slice(2, 6)}-${formattedText.slice(6)}`;
                                        } else {
                                            formattedPhoneNumber = `(${formattedText.slice(0, 2)}) ${formattedText.slice(2, 7)}-${formattedText.slice(7, 11)}`;
                                        }

                                        setUserEdit({ ...userEdit, numeroTelefone: formattedPhoneNumber });
                                    }}
                                />
                            </View>
                            <View style={styles.badgeInfo}>
                                <Input
                                    name="Data de Nascimento"
                                    placeholder="(dia-mes-ano)"
                                    value={formatDate(userEdit.dataNascimento)}
                                    onChange={text => setUserEdit({ ...userEdit, dataNascimento: text })}
                                />
                            </View>
                            <View style={styles.badgeInfo}>
                                <Select
                                    name="Gênero"
                                    value={userEdit.nomeGenero}
                                    options={[
                                        { label: 'Masculino', value: 'Masculino' },
                                        { label: 'Feminino', value: 'Feminino' },
                                        { label: 'Outro', value: 'Outro' },
                                    ]}
                                />
                            </View>
                            <View style={styles.badgeInfo}>
                                <Select
                                    name="Estado Civil"
                                    value="Solteiro"
                                    options={[
                                        { label: 'Solteiro', value: 'Solteiro' },
                                        { label: 'Casado', value: 'Casado' },
                                    ]}
                                />
                            </View>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#1C1A41",
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 12,
                                    borderRadius: 8,
                                }}
                                onPress={() => setIsEdit(false)}
                            >
                                <Text style={{ color: "#fff", fontSize: 18, textTransform: "uppercase", fontWeight: 800 }}>Salvar Alterações</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>

            <StatusBar style="auto" />
        </ScrollView >
    );
}