import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { theme, text } from '../../styles'



import { useNavigation } from '@react-navigation/core';
import { TabBar } from '../../components';
import Products from './Products/ListProducts';
import Categories from './Categories';
import Users from './Users';
import FormProducts from './Products/FormProduct';
const Dashboard: React.FC = () => {
    const [screen,setScreen]=useState('products');
    const navigation = useNavigation();
    return (
        <View >
            <TabBar 
                screen={screen}
                setScreen={setScreen}
            />
            {screen==="products" && <Products setScreen={setScreen}/>}
            {screen==="newProduct" && <FormProducts setScreen={setScreen}/>}
            {screen==="categories" && <Categories/>}
            {screen==="users" && <Users/>}

        </View>
    )
}

export default Dashboard;