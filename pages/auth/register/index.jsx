import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { useForm } from 'react-hook-form'
import { styles } from "./styles";
import Input from "../../../components/Input";
import { ScrollView } from "react-native-gesture-handler";
import Select from "../../../components/Select";
import apiUrl from "../../../utils/api";

export default function Register({ navigation }) {
  const { setValue, getValues, reset } = useForm();
  const [usuario, setUsuario] = useState({});

  const validateAllFields = values => {
    if (!values.nome || !values.email || !values.genero || !values.cpf || !values.dataDeNascimento || !values.telefone || !values.estadoCivil || !values.senha) {
      ToastAndroid.show("Preencha todos os campos!", ToastAndroid.SHORT);
      return false
    }
    console.log('[CAMPOS PREENCHIDOS]')
  }

  const validateEmail = email => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (!regex.test(email)) {
      ToastAndroid.show("Email inválido!", ToastAndroid.SHORT);
      return false
    } else {
      console.log('[EMAIL VALIDADO]')
      return true
    }
  }

  const validateCPF = cpf => {
    const regex = /^[0-9]{11}$/
    if (!regex.test(cpf)) {
      ToastAndroid.show("CPF inválido!", ToastAndroid.SHORT);
      return false
    } else {
      console.log('[CPF VALIDADO]')
      return true
    }
  }

  const onSubmit = async () => {
    try {
      const values = getValues()
      if (validateAllFields(values) === false) return
      if (validateEmail(values.email) === false) return
      if (validateCPF(values.cpf) === false) return

      const schema = {
        nome: values.nome,
        email: values.email,
        id_genero: values.genero,
        cpf: values.cpf,
        dataNascimento: values.dataDeNascimento,
        ddi: "+55",
        ddd: parseInt(values.telefone.slice(1, 3)),
        telefone: values.telefone.slice(5, 16).replace('-', ''),
        estadoCivil: values.estadoCivil,
        senha: values.senha,
      }
      console.log(schema)

      const { data } = await apiUrl.post("/cliente", schema)
      console.log("Cliente cadastrado -> ", data)
      ToastAndroid.show("Cliente cadastrado com sucesso!", ToastAndroid.SHORT);
      setUsuario({})
      reset()
      navigation.navigate("Login")

    } catch (error) {
      ToastAndroid.show("Erro ao cadastrar o cliente!", ToastAndroid.SHORT);
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <View style={styles.login_box}>
        <Input
          required
          name="Nome completo"
          placeholder="Digite seu nome completo"
          onChange={text => setValue("nome", text)}
        />
        <Input
          name="Email"
          placeholder="Digite seu email"
          onChange={text => setValue("email", text)}
        />
        <Select
          name="Gênero"
          options={[
            { label: "Masculino", value: 1 },
            { label: "Feminino", value: 2 },
          ]}
          onChange={text => setValue("genero", text)}
        />
        <Input
          name="CPF"
          placeholder="Digite apenas os numeros"
          keyboardType="numeric"
          value={usuario.cpf}
          onChange={text => {
            const maxLength = 11;
            const truncatedText = text.slice(0, maxLength);
            setUsuario({ ...usuario, cpf: truncatedText })
            setValue('cpf', truncatedText);
          }}
        />
        <Input
          name="Data de Nascimento"
          placeholder="(dia-mes-ano)"
          keyboardType={"numeric"}
          onChange={text => setValue("dataDeNascimento", text)}
        />
        <Input
          name="Telefone"
          placeholder="Digite seu telefone"
          keyboardType="phone-pad"
          value={usuario.telefone}
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

            setUsuario({ ...usuario, telefone: formattedPhoneNumber });
            setValue('telefone', formattedPhoneNumber);
          }}
        />
        <Select
          name="Estado Civil"
          options={[
            { label: "Solteiro", value: "SOLTEIRO" },
            { label: "Casado", value: "CASADO" },
            { label: "Viúvo", value: "VIUVO" },
            { label: "Divorciado", value: "DIVORCIADO" },
          ]}
          onChange={text => setValue("estadoCivil", text)}
        />
        <Input
          isPassword
          name="Senha"
          placeholder="Digite sua senha"
          onChange={text => setValue("senha", text)}
        />
        <Pressable style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </Pressable>

        <View style={styles.otheroptions}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login")
              setUsuario({})
            }}
            style={{
              borderWidth: 2,
              borderColor: "#fff3",
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 12,
              marginTop: 12,
            }}
          >
            <Text style={styles.title2}>Já possui uma conta?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
