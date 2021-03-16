import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core';

const Categories: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View >
            <Text>Tela de categorias</Text>
        </View>
    )
}

export default Categories;