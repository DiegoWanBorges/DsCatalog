import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Modal, ScrollView, TextInput, Alert } from 'react-native'
import { colors, theme, admin, text } from '../../../styles';
import { useNavigation } from '@react-navigation/core';
import { makePrivateRequest, makeRequest } from '../../../services';
import arrow from '../../../assets/images/leftArrow.png'
import Toast from 'react-native-tiny-toast';
import { TextInputMask } from 'react-native-masked-text';
import * as ImagePicker from 'expo-image-picker'
import mime from 'mime'
type Props = {
    setScreen: Function;
    productId?: number
}

const params = {
    linesPerPage: 1000,
    direction: "ASC",
    orderBy: "name"
}

const EditProduct: React.FC<Props> = ({ setScreen, productId }: Props) => {
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        description: "",
        imgUrl: " ",
        price: "",
        categories: [{
            id:0,
            name:""
        }],
    });
    useEffect(() => {
        async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status != "granted") {
                Alert.alert("Sem acesso a biblioteca de imagem");
            }
        }
    }, []);



    async function selectImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        !result.cancelled && setImage(result.uri);
    }

    const handlerUpload = () => {

        const newImageUri = "file:///" + image.split("file:/").join("");

        const data = new FormData();
        data.append('file', {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
        });

        makePrivateRequest({
            url: '/products/image/',
            method: 'POST',
            data: data,
        })
            .then(response => {
                setProduct({ ...product, imgUrl: response.data.uri })
                console.log(response)
            })
            .catch((erro) => {
                console.log(erro)
            })
            .finally(() => {

            })
    }

    useEffect(() => {
        image ? handlerUpload() : null
    }, [image])

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
        loadProduct();
    }, []);


    async function handleSave() {
        setLoading(true)
        const data = {
            ...product            
        };
        await makePrivateRequest({
            url: `/products/${productId}`,
            method: 'PUT',
            data: data
        })
            .then((response) => {
                Toast.showSuccess("Produto salvo com sucesso")
                setLoading(false);
                setScreen('products')
            })
            .catch((erro) => {
                Toast.show("Erro ao salvar produto")
                console.log(erro)
                setLoading(false);
            })

    }
    
    function getRaw(e) {
        const str = e
        const res = str.slice(2).replace(/\./g, "").replace(/,/g, ".");
        setProduct({...product, price: res})
    }

    async function loadProduct() {
        setLoading(true)
        await makeRequest({ url: `/products/${productId}` })
            .then((response)=>{
                console.log(response.data)
                setProduct(response.data);
            })
            .catch((erro) => {
                console.log(erro)
            })
            .finally(() => {
                setLoading(false)
            })
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
                                    {categories.map(cat => {
                                        const { id, name } = cat
                                        return (
                                        <TouchableOpacity
                                            key={id}
                                            onPress={() => {
                                                setProduct({ ...product, categories: [{id, name}] })
                                                setShowCategories(!showCategories)
                                            }}
                                            style={theme.modalItem}
                                        >
                                            <Text>
                                                {name}
                                            </Text>
                                        </TouchableOpacity>
                                    )})

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
                           <Text>
                               
                                  { product.categories.length >0 && product.categories[0].name }
                               
                           </Text>
                        </TouchableOpacity>


                        <TextInputMask
                            type="money"
                            placeholder="Preço"
                            style={theme.formInput}
                            value={product.price}
                            onChangeText={(e) => setProduct({ ...product, price: getRaw(e) })}
                        />

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={theme.uploadBtn}
                            onPress={selectImage}
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
                        {
                            image != " " && (
                                <TouchableOpacity
                                    onPress={selectImage}
                                    activeOpacity={0.9}
                                    style={{
                                        width: "100%",
                                        height: 150,
                                        borderRadius: 10,
                                        marginVertical: 10,
                                    }}
                                >
                                    <Image 
                                          source={image == "" ? {uri: product.imgUrl} : { uri: image }} 
                                          style={{ width: "100%", height: "100%", borderRadius: 10 }} 

                                    />
                                </TouchableOpacity>
                            )
                        }
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
export default EditProduct;