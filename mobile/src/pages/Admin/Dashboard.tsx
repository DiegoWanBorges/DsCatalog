import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import EditProduct from './Products/EditProduct'



import { useNavigation } from '@react-navigation/core';
import { TabBar } from '../../components';
import Products from './Products/ListProducts';
import Categories from './Categories';
import Users from './Users';
import FormProducts from './Products/FormProduct';
const Dashboard: React.FC = () => {
    const [screen,setScreen]=useState('products');
    const navigation = useNavigation();
    const[productId, setProductId] = useState();
    return (
        <View >
            <TabBar 
                screen={screen}
                setScreen={setScreen}
            />
            {screen==="products" && <Products setScreen={setScreen} setProductId={setProductId} />}
            {screen==="newProduct" && <FormProducts setScreen={setScreen} />}
            {screen==="editProduct" && <EditProduct setScreen={setScreen} productId={productId} />}
            {screen==="categories" && <Categories/>}
            {screen==="users" && <Users/>}

        </View>
    )
}

export default Dashboard;