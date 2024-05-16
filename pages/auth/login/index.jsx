import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ToastAndroid, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import Input from "../../../components/Input";
import FA6 from "react-native-vector-icons/FontAwesome6";
import Categories from "../../../components/Categories";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../utils/api";

export default function Login({ navigation }) {
    const [usuario, setUsuario] = useState({ email: '', senha: '' });

    const onSubmit = async () => {
        console.log("[ USUARIO ] -> ", usuario);

        try {
            const { data } = await api.post("/login", usuario);
            console.log("[ LOGIN ] -> ", data);
            await AsyncStorage.setItem("token", data.token);
            await AsyncStorage.setItem("usuario", JSON.stringify(data.usuario));
            setUsuario({ email: '', senha: '' });
            navigation.navigate('Perfil');
            ToastAndroid.show("Login efetuado com sucesso!", ToastAndroid.SHORT);
        } catch (error) {
            console.log("[ ERRO ] -> ", error);
            ToastAndroid.show("Usuário ou senha inválidos!", ToastAndroid.SHORT);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Entrar</Text>
            <View style={styles.login_box}>
                <Input
                    name="Email"
                    placeholder="Digite seu email"
                    value={usuario.email}
                    onChange={text => setUsuario({ ...usuario, email: text })}
                />
                <Input
                    name="Senha"
                    placeholder="Digite sua senha"
                    isPassword
                    value={usuario.senha}
                    onChange={text => setUsuario({ ...usuario, senha: text })}
                />
                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ borderWidth: 2, borderColor: "#fff3", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginTop: 12 }}
                    onPress={() => navigation.navigate('Cadastro')}
                >
                    <Text style={styles.title2}>Não possui uma conta?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
