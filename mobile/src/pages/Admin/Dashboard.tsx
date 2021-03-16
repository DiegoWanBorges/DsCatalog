import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { theme, text } from '../../styles'

import { useNavigation } from '@react-navigation/core';
const Dashboard: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View style={theme.container} >
            <Text>Dashboard</Text>
        </View>
    )
}

export default Dashboard;