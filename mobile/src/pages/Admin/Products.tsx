import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core';

const Products: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View >
            <Text>Tela de produtos</Text>
        </View>
    )
}

export default Products;