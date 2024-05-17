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
import formatCPF from "../../../utils/cpfFormatter";
import apiUrl from "../../../utils/api";
import Spinner from "../../../components/Spinner";

export default function EditProfile({ navigation }) {
    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState({});
    const [userEdit, setUserEdit] = useState({});
    const [loading, setLoading] = useState(false);

    const getStaticData = async () => {
        try {
            setLoading(true);
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

    const handleEdit = () => {
        setIsEdit(!isEdit)
        setUserEdit({
            ...user,
            DDD_TELEFONE: user.DDD_TELEFONE.toString(),
            DT_NASCIMENTO_CLIENTE: formatDate(user.DT_NASCIMENTO_CLIENTE),
        })
    }

    const onSubmit = async () => {
        setLoading(true);
        try {
            const shemaData = {
                nome: userEdit.NM_CLIENTE,
                cpf: userEdit.CPF_CLIENTE,
                email: userEdit.EMAIL_CLIENTE,
                dataNascimento: userEdit.DT_NASCIMENTO_CLIENTE,
                estadoCivil: userEdit.ESTADO_CIVIL_CLIENTE,
                senha: userEdit.senha ? userEdit.senha : user.SENHA_CLIENTE,
                ddi: "+55",
                ddd: userEdit.DDD_TELEFONE,
                telefone: userEdit.NR_TELEFONE,
                id_genero: userEdit.ID_GENERO,
            }
            console.log({ shemaData });
            const { data } = await apiUrl.put(`/cliente/${user.ID_CLIENTE}`, shemaData)
            console.log({ data });
            setIsEdit(false);
            getStaticData();
        } catch (error) {
            console.error(error);
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

    useFocusEffect(
        useCallback(() => {
            verifyAuthentication();
        }, [navigation])
    );


    return (
        <ScrollView contentContainerStyle={styles.container}>
            {!loading && (
                <>
                    <View style={styles.imageContainer}>
                        <Image source={profileIMG} style={styles.image} />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileInfoName}>{user.NM_CLIENTE}</Text>
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
                                onPress={handleEdit}
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
                                        <Text style={styles.text}>{user.NM_CLIENTE}</Text>
                                    </View>
                                    <View style={styles.badgeInfo}>
                                        <View style={{ width: 25 }}>
                                            <FA6 name="envelope" size={18} color="#fff" />
                                        </View>
                                        <Text style={styles.text}>{user.EMAIL_CLIENTE}</Text>
                                    </View>
                                    <View style={styles.badgeInfo}>
                                        <View style={{ width: 25 }}>
                                            <FA6 name="fingerprint" size={18} color="#fff" />
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
                                            <FA6 name="mars-and-venus" size={18} color="#fff" />
                                        </View>
                                        <Text style={styles.text}>{user.NM_GENERO}</Text>
                                    </View>
                                    <View style={styles.badgeInfo}>
                                        <View style={{ width: 25 }}>
                                            <FA6 name="people-arrows" size={18} color="#fff" />
                                        </View>
                                        <Text style={styles.text}>{user.ESTADO_CIVIL_CLIENTE}</Text>
                                    </View>
                                </>
                            )}
                            {isEdit && (
                                !loading ? (
                                    <>
                                        <View style={styles.badgeInfo}>
                                            <Input
                                                name="Nome Completo"
                                                placeholder="Digite seu nome completo"
                                                value={userEdit.NM_CLIENTE}
                                                onChange={text => setUserEdit({ ...userEdit, NM_CLIENTE: text })}
                                            />
                                        </View>
                                        <View style={styles.badgeInfo}>
                                            <Input
                                                name="Email"
                                                placeholder="Digite seu email"
                                                value={userEdit.EMAIL_CLIENTE}
                                                onChange={text => setUserEdit({ ...userEdit, EMAIL_CLIENTE: text })}
                                            />
                                        </View>
                                        <View style={styles.badgeInfo}>
                                            <Input
                                                name="DDD"
                                                placeholder="Digite seu DDD"
                                                value={userEdit.DDD_TELEFONE}
                                                onChange={text => setUserEdit({ ...userEdit, DDD_TELEFONE: text })}
                                            />
                                        </View>
                                        <View style={styles.badgeInfo}>
                                            <Input
                                                name="Telefone"
                                                placeholder="Digite seu telefone"
                                                value={userEdit.NR_TELEFONE}
                                                onChange={text => setUserEdit({ ...userEdit, telefone: text })}
                                            />
                                        </View>
                                        <View style={styles.badgeInfo}>
                                            <Input
                                                name="Data de Nascimento"
                                                placeholder="(dia-mes-ano)"
                                                value={userEdit.DT_NASCIMENTO_CLIENTE}
                                                onChange={text => setUserEdit({ ...userEdit, DT_NASCIMENTO_CLIENTE: text })}
                                            />
                                        </View>
                                        <View style={styles.badgeInfo}>
                                            <Select
                                                name="Gênero"
                                                value={userEdit.ID_GENERO}
                                                options={[
                                                    { label: 'Masculino', value: 1 },
                                                    { label: 'Feminino', value: 2 },
                                                ]}
                                                onChange={text => setUserEdit({ ...userEdit, ID_GENERO: parseInt(text) })}
                                            />
                                        </View>
                                        <View style={styles.badgeInfo}>
                                            <Select
                                                name="Estado Civil"
                                                value={userEdit.ESTADO_CIVIL_CLIENTE}
                                                options={[
                                                    { label: 'SOLTEIRO', value: 'SOLTEIRO' },
                                                    { label: 'CASADO', value: 'CASADO' },
                                                ]}
                                                onChange={text => setUserEdit({ ...userEdit, ESTADO_CIVIL_CLIENTE: text })}
                                            />
                                        </View>
                                        <View style={styles.badgeInfo}>
                                            <Input
                                                isPassword
                                                name="Senha"
                                                placeholder="Digite sua nova senha"
                                                onChange={text => setUserEdit({ ...userEdit, senha: text })}
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
                                            onPress={onSubmit}
                                        >
                                            <Text style={{ color: "#fff", fontSize: 18, textTransform: "uppercase", fontWeight: 800 }}>Salvar Alterações</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : <Spinner />
                            )}
                        </View>
                    </View>
                </>
            )}

            {loading && <Spinner />}

            <StatusBar style="auto" />
        </ScrollView >
    );
}