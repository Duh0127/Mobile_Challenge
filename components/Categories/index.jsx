import React from 'react'
import { styles } from './styles'
import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';

export default function Categories({ text, image, onClick }) {
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.container}>
                <Image source={{ uri: image }} style={styles.image} />
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </TouchableOpacity>
    );
}
