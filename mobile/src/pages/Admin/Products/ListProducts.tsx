import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { ProductCard, SearchInput } from '../../../components';
import { makeRequest } from '../../../services';
import { Product } from '../../../utils/types';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, theme, admin, text } from '../../../styles';
const params = {
    linesPerPage: 1000,
}
type Props={
    setScreen:Function;
}
const Products: React.FC<Props> = ({ setScreen }:Props) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const data = search.length > 0
        ? products.filter((product) =>
            product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
        : products;
    useEffect(() => {
        setLoading(true)
        makeRequest({ url: '/products', params })
            .then(response => setProducts(response.data.content))
            .finally(() => {
                setLoading(false)
            })
    }, []);
    return (
        <ScrollView contentContainerStyle={admin.container}>
            <TouchableOpacity 
                style={admin.addButton}
                onPress={() => setScreen("newProduct")}
            >
                <Text style={text.addButtonText}>
                    Adcionar
                </Text>
            </TouchableOpacity>
            <SearchInput
                placeHolder="Nome do produto"
                search={search}
                setSearch={setSearch}
            />
            {
                loading ? (
                    <ActivityIndicator size="large" color={colors.primary} />
                ) :
                    (data.map((product) => (
                    <ProductCard key={product.id} product={product} role="admin" />
            )))}
        </ScrollView>
    )
}

export default Products;