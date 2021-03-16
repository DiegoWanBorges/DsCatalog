import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Modal, ScrollView, TextInput } from 'react-native'
import { colors, theme, admin, text } from '../../../styles';
import { useNavigation } from '@react-navigation/core';
import { Category, Product } from '../../../utils/types';
import { makeRequest } from '../../../services';
import arrow from '../../../assets/images/leftArrow.png'
type Props = {
    setScreen: Function;
}
const params = {
    linesPerPage: 1000,
}

const FormProducts: React.FC<Props> = ({ setScreen }: Props) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [product, setProduct] = useState<Product>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [showCategories, setShowCategories] = useState(false);

    useEffect(() => {
        setLoading(true)
        makeRequest({ url: '/categories', params })
            .then(response => setCategories(response.data.content))
            .finally(() => {
                setLoading(false)
            })
    }, []);


    return (
        <View style={theme.formContainer}>
            {loading ? (<ActivityIndicator size="large" color={colors.primary} />) : (
                <View style={theme.formCard}>
                    <ScrollView>
                        <Modal
                            visible={showCategories}
                            animationType="fade"
                            transparent={true}
                            presentationStyle="overFullScreen"
                        >
                            <View style={theme.modalContainer}>
                                <ScrollView contentContainerStyle={theme.modalContent}>
                                    {categories.map(cat => (
                                        <TouchableOpacity
                                            key={cat.id}
                                            onPress={() => {
                                                setProduct({ ...product, categories: cat.name })
                                                setShowCategories(!showCategories)
                                            }}
                                            style={theme.modalItem}
                                        >
                                            <Text>
                                                {cat.name}
                                            </Text>
                                        </TouchableOpacity>
                                    ))

                                    }
                                </ScrollView>
                            </View>
                        </Modal>

                        <TouchableOpacity 
                            onPress={() => setScreen("products")}
                            style={theme.goBackContainer}
                        >
                            <Image source={arrow} />
                            <Text style={text.goBackText} >VOLTAR</Text>
                        </TouchableOpacity>

                        <TextInput
                            placeholder="Nome do produto"
                            style={theme.formInput}
                        />
                        <TouchableOpacity onPress={() => setShowCategories(!showCategories)}>
                            <Text >
                                {
                                    product?.categories === undefined 
                                        ? ("Escolha uma categoria")
                                        : (product?.categories)
                                }
                            </Text>
                        </TouchableOpacity>
                        <TextInput
                            placeholder="Preço"
                            style={theme.formInput}
                        />
                        <TouchableOpacity>
                            <Text>
                                Carregar Imagem
                        </Text>
                        </TouchableOpacity>
                        <Text>
                            As imagens devem ser  JPG ou PNG e não devem ultrapassar 5 mb.
                    </Text>
                        <TextInput 
                            multiline placeholder="Descrição" 
                            style={theme.textArea}
                        />
                        <View>
                            <TouchableOpacity>
                                <Text>
                                    Cancelar
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text>
                                    Salvar
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            )}
        </View>
    )
}
export default FormProducts;