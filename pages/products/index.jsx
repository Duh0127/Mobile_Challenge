import React, { useState, useEffect, useCallback } from "react";
import { styles } from "./styles";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import apiUrl from "../../utils/api";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";
import CustomModal from "../../components/Modal";

export default function Products() {
    const [products, setProducts] = useState([])
    const [originalProducts, setOriginalProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('Todos')
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState({})

    const getStaticData = useCallback(async () => {
        try {
            const [productsResponse, categoriesResponse] = await Promise.all([
                apiUrl.get("/produto"),
                apiUrl.get("/categoria")
            ])
            setProducts(productsResponse.data)
            setOriginalProducts(productsResponse.data)
            setCategories(categoriesResponse.data)
        } catch (error) {
            console.error(error)
        } finally {
            if (loading) setLoading(false)
        }
    }, [])

    const filterByCategory = category => {
        if (category === "Todos") {
            setProducts(originalProducts)
            setSelectedCategory("Todos")
            return
        }

        const categoryName = categories.find(categoria => categoria.ID_CATEGORIA === category).NM_CATEGORIA
        setSelectedCategory(categoryName)
        const filteredProducts = originalProducts.filter(product => product.ID_CATEGORIA === category)
        if (filteredProducts.length > 0) setProducts(filteredProducts)
        else setProducts(originalProducts)
    }

    useEffect(() => {
        getStaticData()
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Produtos</Text>
            <View style={styles.categories}>
                {!loading && categories.length > 0 && (
                    <>
                        <TouchableOpacity onPress={() => filterByCategory("Todos")}>
                            <Text style={selectedCategory === "Todos" ? styles.selectedCategory : styles.titleCategories}>Todos</Text>
                        </TouchableOpacity>
                        {categories.map((categoria, index) => (
                            <TouchableOpacity key={index} onPress={() => filterByCategory(categoria.ID_CATEGORIA)}>
                                <Text style={selectedCategory == categoria.NM_CATEGORIA ? styles.selectedCategory : styles.titleCategories}>{categoria.NM_CATEGORIA}</Text>
                            </TouchableOpacity>
                        ))}
                    </>
                )}
            </View>
            {loading && (
                <Spinner />
            )}
            {!loading && (
                <View style={styles.scrollViewContainer}>
                    {products.length > 0
                        && products.map((product, index) => (
                            <Card
                                key={index}
                                title={product.NM_PRODUTO}
                                image={product.IMG_PRODUTO}
                                price={product.VL_PRODUTO}
                                onClick={() => {
                                    setModalOpen(true)
                                    setSelectedProduct(product)
                                }}
                            />
                        ))}
                </View>
            )}

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
        </ScrollView>
    )
}