import React from 'react'

import {View, Text, ImageSourcePropType, TouchableOpacity, Image} from 'react-native'
import { Product } from '../@types';
import { text, theme } from '../styles';




const ProductCard: React.FC<Product> = (product : Product)  =>{
    return (
        <TouchableOpacity style={theme.productCard}>
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