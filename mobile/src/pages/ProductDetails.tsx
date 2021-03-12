import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import { theme, text } from '../styles'
import { useNavigation } from '@react-navigation/core';

import { makeRequest } from '../services';

import arrow from '../assets/images/leftArrow.png'
import { Product } from '../utils/types';
const ProductDetails = ({ route: { params: { id } } }) => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<Product>();
    const navigation = useNavigation();
    useEffect(() => {
        setLoading(true);
        makeRequest({ url: `/products/${id}` })
            .then(response => setProduct(response.data))
            .finally(() => {
                setLoading(false)
            })
    }, []);


    return (
            <View style={theme.detailContainer}> 
                {
                    loading ? (<ActivityIndicator size="large"/>) :
                    (
                        <View style={theme.detailCard}> 
                            <TouchableOpacity style={theme.goBackContainer} onPress={() =>navigation.goBack()}>
                                <Image source={arrow} />
                                <Text style={text.goBackText}>VOLTAR</Text>
                            </TouchableOpacity>
                            <View  style={theme.productImageContainer}>
                                <Image source={{uri:product?.imgUrl}} style={theme.productImage}  />
                            </View>
                            <Text style={text.productDetailsTitle}>{product?.name}</Text>
                            <View style={theme.priceContainer}>
                                <Text style={text.currency}>R$</Text>
                                <Text style={text.producPrice}>{product?.price}</Text>
                            </View>
                            <ScrollView style={theme.scrollTextContainer}>
                                <Text style={text.productDescription}>
                                    {product?.description}
                                </Text>
                            </ScrollView>
                        </View>
                    )
                }
            </View>
    )
}
export default ProductDetails;