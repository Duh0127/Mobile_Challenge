import React from 'react'
import { styles } from './styles'
import { Pressable, Text, View } from 'react-native';
import { Image } from 'react-native';

export default function Card({ image, title, price, onClick }) {
    return (
        <Pressable onPress={onClick}>
            <View style={styles.container}>
                <Image source={{ uri: image }} style={styles.image} />
                <View>
                    <Text style={styles.title}>{title.length > 20 ? `${title.substring(0, 20)}...` : title}</Text>
                    <Text style={{ fontSize: 17, fontWeight: "bold", textAlign: "center", color: "#fff" }}>R${price}</Text>
                </View>
            </View>
        </Pressable>
    );
}
