import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Modal, ScrollView } from 'react-native'
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
        <View >
            {loading ? (<ActivityIndicator size="large" color={colors.primary} />) : (
                <View>
                    <Modal 
                        visible={showCategories} 
                        animationType="fade"
                        transparent={true}
                        presentationStyle="overFullScreen"
                    > 
                        <View>
                            <ScrollView>
                                {categories.map(cat => (
                                    <TouchableOpacity key={cat.id}>
                                        <Text>
                                            {cat.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))

                                }
                            </ScrollView>
                        </View>
                    </Modal>
                    <TouchableOpacity>
                        <Image source={arrow} />
                        <Text>VOLTAR</Text>
                    </TouchableOpacity>

                </View>
            )}
        </View>
    )
}
export default FormProducts;