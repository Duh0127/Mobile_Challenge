import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Image, ToastAndroid } from "react-native";
import { styles } from "./styles";
import Input from "../../components/Input";
import Categories from "../../components/Categories";
import Card from "../../components/Card";
import { ScrollView } from "react-native";
import CustomModal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import apiUrl from "../../utils/api";


export default function Home({ navigation }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const onGetProducts = useCallback(async () => {
        try {
            const { data } = await apiUrl.get("/produto")
            setProducts(data)
            setLoading(false)
        } catch (error) {
            console.error(error)
            ToastAndroid.show("Erro ao buscar produtos", ToastAndroid.SHORT)
        }
    }, [])

    useEffect(() => {
        onGetProducts()
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ paddingHorizontal: 12, paddingVertical: 12 }}>
                <Input placeholder="O que você está procurando?" />
            </View>

            <View style={styles.categories}>
                <Categories text="Shampoo" image="https://pngimg.com/d/shampoo_PNG32.png" onClick={() => navigation.navigate("Produtos")} />
                <Categories text="Esmaltes" image="https://images.vexels.com/media/users/3/204539/isolated/preview/4bcf75014423193d9394a54d44f29c87-esmalte-colorido-desenhado-a-mao.png" onClick={() => navigation.navigate("Produtos")} />
                <Categories text="Cabelo" image="https://gifs.eco.br/wp-content/uploads/2023/07/imagens-de-cabelo-liso-png-2.png" onClick={() => navigation.navigate("Produtos")} />
                <Categories text="Perfumes" image="https://static.vecteezy.com/system/resources/previews/023/337/987/non_2x/ai-generative-glass-perfume-bottle-illustration-free-png.png" onClick={() => navigation.navigate("Produtos")} />
            </View>

            <Text
                style={{
                    color: "#fff",
                    fontSize: 24,
                    fontWeight: 800,
                    marginTop: 32,
                    textAlign: "center",
                }}
            >
                DESTAQUES DA SEMANA
            </Text>

            <View style={styles.scrollViewContainer}>
                <ScrollView horizontal={true} contentContainerStyle={styles.cards}>
                    {!loading &&
                        products.length > 0 && products.map((product, index) => (
                            <Card key={index} image={product.IMG_PRODUTO} title={product.NM_PRODUTO} price={product.VL_PRODUTO} onClick={() => {
                                setModalOpen(true)
                                setSelectedProduct(product)
                            }} />
                        ))}
                    
                    {loading && (
                        <Spinner />
                    )}
                </ScrollView>

                <View style={styles.promotion}>
                    <Text style={{ color: "#9996", fontSize: 24, fontWeight: 800 }}>
                        PROMOÇÕES EM BREVE
                    </Text>
                </View>
            </View>

            {modalOpen && (
                <CustomModal visible={modalOpen} onClose={() => {
                    setModalOpen(false)
                    setSelectedProduct({})
                }}>
                    <View style={styles.modalContent}>
                        <Image source={{ uri: selectedProduct?.IMG_PRODUTO }} style={styles.modalImage} />
                        <Text style={{ color: "#000", fontSize: 24, fontWeight: 800 }}>
                            {selectedProduct?.NM_PRODUTO}
                        </Text>
                        <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ color: "#e9e9e9", fontSize: 14, backgroundColor: '#707070', padding: 8, borderRadius: 8 }}>
                                {selectedProduct?.CATEGORIA}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 15, textAlign: 'justify' }}>
                            {selectedProduct?.DESC_PRODUTO}
                        </Text>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ color: "#000", fontSize: 24, fontWeight: 800 }}>
                                R$ {selectedProduct?.VL_PRODUTO}
                            </Text>
                        </View>
                        {/* <TouchableOpacity style={{ backgroundColor: "#593596", padding: 12, borderRadius: 8 }}>
                                    <Text style={{ color: "#fff", fontSize: 12 }}>
                                        IR PARA O SITE DO VENDEDOR
                                    </Text>
                                </TouchableOpacity> */}
                    </View>
                </CustomModal>
            )}

            <StatusBar style="auto" />
        </ScrollView>
    );
}