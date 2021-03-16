import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core';

const Users: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View >
            <Text>Tela de usuários</Text>
        </View>
    )
}

export default Users;