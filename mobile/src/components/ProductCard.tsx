import { useNavigation } from '@react-navigation/core';
import React from 'react'

import {View, Text, ImageSourcePropType, TouchableOpacity, Image} from 'react-native'
import { text, theme } from '../styles';
import { Product } from '../utils/types';


const ProductCard: React.FC<Product> = (product : Product)  =>{
    const navigation = useNavigation();
    const id = product.id;
    return (
        <TouchableOpacity style={theme.productCard} onPress={() => navigation.navigate('ProductDetails', {id} )}>
            <Image 
                source={{uri:product.imgUrl}} 
                style={theme.productImg}
            />
            <View style={theme.productDescription}>
                <Text style={text.productName}>{product.name}</Text>
                <View style={theme.priceContainer}>
                    <Text style={text.currency}>R$</Text>
                    <Text style={text.producPrice}>{product.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard;