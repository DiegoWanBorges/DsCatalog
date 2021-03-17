import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Modal, ScrollView, TextInput, Alert } from 'react-native'
import { colors, theme, admin, text } from '../../../styles';
import { useNavigation } from '@react-navigation/core';
import { makePrivateRequest, makeRequest } from '../../../services';
import arrow from '../../../assets/images/leftArrow.png'
import Toast from 'react-native-tiny-toast';
import { TextInputMask } from 'react-native-masked-text';
type Props = {
    setScreen: Function;
}
const params = {
    linesPerPage: 1000,
    direction: "ASC",
    orderBy: "name"
}

const FormProducts: React.FC<Props> = ({ setScreen }: Props) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const productId =0;
    const [product, setProduct] = useState({
            name: "",
            description: "",
            imgUrl: "",
            price: "",
            categories: [],
        });
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);

    async function listCategopries() {
        setLoading(true)
        await makeRequest({ url: '/categories', params })
            .then(response => setCategories(response.data.content))
            .finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        listCategopries()
    }, []);

   async function handleSave() {
        setLoading(true)
        const data ={
            ...product,
            price: getRaw(),
            categories:[
                {
                    id:replaceCategory()
                }
            ]
        };
        await  makePrivateRequest({
            url: edit ? `/products/${productId}`: '/products/',
            method: edit ? 'PUT': 'POST',
            data: data
        })
            .then((response) => {
                Toast.showSuccess("Produto salvo com sucesso")
                setLoading(false);
            })
            .catch((erro) => {
                Toast.show("Erro ao salvar produto")
                console.log(erro)
                setLoading(false);
            })

    }
    function replaceCategory(){
        const cat =categories.find(category => category.name === product.categories);
        return cat.id;
    }
    function getRaw() {
        const str = product.price
        const res = str.slice(2).replace(/\./g, "").replace(/./g,".");    
        return res;
    }
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
                            value={product.name}
                            onChangeText={e => setProduct({ ...product, name: e })}
                        />
                        <TouchableOpacity
                            onPress={() => setShowCategories(!showCategories)}
                            style={theme.selectInput}
                        >
                            <Text >
                                {product?.categories.length === 0
                                    ? ("Escolha uma categoria")
                                    : (product?.categories)
                                }
                            </Text>
                        </TouchableOpacity>
                       
                        
                        <TextInputMask
                            type="money"
                            placeholder="Preço"
                            style={theme.formInput}
                            value={product.price}
                            onChangeText={(e) => setProduct({ ...product, price: e })}
                        />
                     
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={theme.uploadBtn}
                        >
                            <Text
                                style={text.uploadText}
                            >
                                Carregar Imagem
                        </Text>
                        </TouchableOpacity>
                        <Text
                            style={text.fileSize}
                        >
                            As imagens devem ser  JPG ou PNG e não devem ultrapassar 5 mb.
                    </Text>
                        <TextInput
                            multiline
                            placeholder="Descrição"
                            style={theme.textArea}
                            value={product.description}
                            onChangeText={(value) => setProduct({ ...product, description: value })}
                        />
                        <View
                            style={theme.buttonContainer}
                        >
                            <TouchableOpacity
                                style={theme.deleteBtn}
                                onPress={() => {
                                    Alert.alert("Deseja cancelar?", "Os dados inseridos não serão salvos",
                                        [
                                            {
                                                text: "Voltar",
                                                style: "cancel"
                                            },
                                            {
                                                text: "Confirmar",
                                                onPress: () => setScreen("products")
                                            }
                                        ]
                                    )
                                }}
                            >
                                <Text
                                    style={text.deleteTxt}
                                >
                                    Cancelar
                            </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={theme.saveBtn}
                                onPress={() => handleSave()}
                            >
                                <Text
                                    style={text.saveText}
                                >
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