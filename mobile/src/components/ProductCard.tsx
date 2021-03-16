import { useNavigation } from '@react-navigation/core';
import React from 'react'

import {View, Text,  TouchableOpacity, Image} from 'react-native'
import { text, theme } from '../styles';
import { Product } from '../utils/types';

type Props={
    product:Product;
    role?:string;
}

const ProductCard: React.FC<Props> = ({product, role }:Props)  =>{
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
            {
                role ==="admin" && (
                    <View style={theme.buttonContainer}>
                        <TouchableOpacity style={theme.deleteBtn}>
                            <Text style={text.deleteTxt}>Excluir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={theme.editBtn}>
                            <Text style={text.editTxt}>Editar</Text>
                        </TouchableOpacity>
                        
                    </View>
                    )
                
            }
        </TouchableOpacity>
    )
}

export default ProductCard;