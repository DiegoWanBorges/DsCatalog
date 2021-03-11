import React, { useState } from 'react'

import {View, Text, ScrollView} from 'react-native'
import { ProductCard, SearchInput }  from '../components'
import productImg from '../assets/images/computer.png'
import { theme } from '../styles'

const products  = [
    {
        id:1,
        imgUrl:productImg,
        name:"Mapa",
        description:"The best computer in 2021",
        price:2279.0
    },
    {
        id:2,
        imgUrl:productImg,
        name:"Computador Desktop - Intel Core i7",
        description:"The best computer in 2021",
        price:2279.0
    },
    {
        id:3,
        imgUrl:productImg,
        name:"Computador Desktop - Intel Core i7",
        description:"The best computer in 2021",
        price:2279.0
    },
    {
        id:4,
        imgUrl:productImg,
        name:"Computador Desktop - Intel Core i7",
        description:"The best computer in 2021",
        price:2279.0
    },
    {
        id:5,
        imgUrl:productImg,
        name:"Computador Desktop - Intel Core i7",
        description:"The best computer in 2021",
        price:2279.0
    },
]

const Catalog: React.FC = ()  =>{
    const [search,setSearch]=useState('');

    const data = search.length > 0 
    ? products.filter((product) =>
        product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    : products;

    return (
        <ScrollView contentContainerStyle={theme.scrollContainer}>
            <SearchInput 
                    placeHolder="Nome do produto"
                    search={search}
                    setSearch={setSearch}
            />
            {
                data.map(product =>(
                    <ProductCard {...product} />
                ))
            }
        </ScrollView>
        
    )
}

export default Catalog;