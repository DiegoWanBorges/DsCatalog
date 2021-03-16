import React, { useEffect, useState } from 'react'

import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { ProductCard, SearchInput } from '../components'
import { colors, theme } from '../styles'
import { makeRequest } from '../services'
import { Product } from '../utils/types'

const params = {
    linesPerPage: 1000,
}

const Catalog: React.FC = () => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

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
        <ScrollView contentContainerStyle={theme.scrollContainer}>
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

                        <ProductCard key={product.id} {...product} />
                    )))}
        </ScrollView>

    )
}

export default Catalog;