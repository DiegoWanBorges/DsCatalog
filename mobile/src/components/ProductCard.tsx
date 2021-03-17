import { useNavigation } from '@react-navigation/core';
import React from 'react'

import { View, Text, TouchableOpacity, Image } from 'react-native'
import { TextInputMask } from 'react-native-masked-text';
import { text, theme } from '../styles';
import { Product } from '../utils/types';

type Props = {
    id:number;
    name:string;
    imgUrl:string;
    price:string;
    role?: string;
    handleDelete: Function;
}

const ProductCard: React.FC<Props> = ({ id,name,imgUrl,price, role, handleDelete }: Props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={theme.productCard}
            onPress={() => role ? "" : navigation.navigate('ProductDetails', { id })}

        >
            <Image
                source={{ uri: imgUrl }}
                style={theme.productImg}
            />
            <View style={theme.productDescription}>
                <Text style={text.productName}>{name}</Text>
                <View style={theme.priceContainer}>
                    <Text style={text.currency}>R$</Text>
                    <TextInputMask
                        type="money"
                        placeholder="Preço"
                        options={{
                            precision: 2,
                            separator: ",",
                            delimiter:".",
                            unit:" ",
                            suffixUnit:""
                        
                        }}
                        value={ price }
                        style={text.producPrice}
                    />
                    {/* <Text style={text.producPrice}>{product.price}</Text> */}
                </View>
            </View>
            {
                role === "admin" && (
                    <View style={theme.buttonContainer}>
                        <TouchableOpacity
                            style={theme.deleteBtn}
                            onPress={() => handleDelete(id)}
                        >
                            <Text style={text.deleteTxt}>Excluir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={theme.editBtn}>
                            <Text style={text.editTxt}>Editar</Text>
                        </TouchableOpacity>

                    </View>
                )

            }
        </TouchableOpacity>
    )
}

export default ProductCard;