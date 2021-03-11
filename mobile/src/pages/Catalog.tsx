import React, { useEffect, useState } from 'react'

import {View, Text, ScrollView, ActivityIndicator} from 'react-native'
import { ProductCard, SearchInput }  from '../components'
import { theme } from '../styles'
import { makeRequest } from '../services'
import { Product } from '../@types'

const params = {
    linesPerPage: 1000,
}

const Catalog: React.FC = ()  =>{
    const [search,setSearch]=useState('');
    const [products,setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const data = search.length > 0 
    ? products.filter((product) =>
        product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    : products;

    async function fillProducts() {
        setIsLoading(true)
      await  makeRequest({ url: '/products',params })
            .then(response => setProducts(response.data.content))
            .finally(() => {
                 setIsLoading(false)
            })
    }

    useEffect(()=>{
        fillProducts()
    },[]);

    return (
        <ScrollView contentContainerStyle={theme.scrollContainer}>
            <SearchInput 
                    placeHolder="Nome do produto"
                    search={search}
                    setSearch={setSearch}
            />
           
            {
                isLoading ?  (
                <ActivityIndicator size="large" />
                ) : 
                (data.map((product) => (
                    <ProductCard { ...product} />
                )))}
        </ScrollView>
        
    )
}

export default Catalog;