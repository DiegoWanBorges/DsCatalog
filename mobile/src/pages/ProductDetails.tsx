import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import { theme, text } from '../styles'
import { useNavigation } from '@react-navigation/core';
import { Product } from '../@types';
import { makeRequest } from '../services';

import arrow from '../assets/images/leftArrow.png'
const ProductDetails = ({ route: { params: { id } } }) => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        setLoading(true);
        makeRequest({ url: `/products/${id}` })
            .then(response => setProduct(response.data))
            .finally(() => {
                setLoading(false)
            })
    }, []);


    return (
            <View > 
                {
                    loading ? (<ActivityIndicator size="large"/>) :
                    (
                        <View>
                            <TouchableOpacity>
                                <Image source={arrow} />
                                <Text>VOLTAR</Text>
                            </TouchableOpacity>
                            <View>
                                <Image source={{uri:product?.imgUrl}}  />
                            </View>
                            <Text>{product?.name}</Text>
                            <View>
                                <Text>R$</Text>
                                <Text>{product?.price}</Text>
                            </View>
                            <ScrollView>
                                <Text>
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