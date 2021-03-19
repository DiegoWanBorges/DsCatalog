import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { ProductCard, SearchInput } from '../../../components';
import { makePrivateRequest, makeRequest } from '../../../services';
import { Product } from '../../../utils/types';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, theme, admin, text } from '../../../styles';
import Toast from 'react-native-tiny-toast';
const params = {
    linesPerPage: 1000,
}
type Props={
    setScreen:Function;
    setProductId: Function;
}
const Products: React.FC<Props> = ({ setScreen,setProductId }:Props) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const data = search.length > 0
        ? products.filter((product) =>
            product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
        : products;
    async function fillProducts() {
        setLoading(true)
        await makeRequest({ url: '/products', params })
            .then(response => setProducts(response.data.content))
            .finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        fillProducts()
    }, []);

    async function handleDelete(id:number) {
        setLoading(true)
        await  makePrivateRequest({
            url: `/products/${id}`,
            method: 'DELETE',
            data: data
        })
            .then((response) => {
                Toast.showSuccess("Produto excluido com sucesso")
                setLoading(false);
                fillProducts()
            })
            .catch((erro) => {
                Toast.show("Erro ao excluir produto")
                console.log(erro)
                setLoading(false);
            })
        
    }
    function handleEdit(id:number){
        setProductId(id);
        setScreen("editProduct")
    }


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
                    <ProductCard 
                        {...product}
                        key={product.id} 
                        role="admin" 
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
            )))}
        </ScrollView>
    )
}

export default Products;