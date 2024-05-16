import React from 'react'
import { styles } from './styles'
import { Text, View } from 'react-native';

export default function Navbar({ children }) {
    return (
      <View style={styles.container}>
        {children}
      </View>
    );
  }
