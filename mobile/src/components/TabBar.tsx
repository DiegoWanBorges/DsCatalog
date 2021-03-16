import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { tabbar } from '../styles'
import { useNavigation } from '@react-navigation/core';

type Props={
    screen?:string;
    setScreen: Function;
}

const TabBar: React.FC<Props> = ({ screen,setScreen }:Props) => {
    const navigation = useNavigation();


    function changeScreen(page:string){
        setScreen(page);
    }


    return (
        <View style={tabbar.container} >
            <TouchableOpacity 
                style={[tabbar.pill, screen ==='products'? tabbar.pillActive : null ]} 
                onPress={()=>changeScreen('products')}
            >
                <Text style={[tabbar.pillText,screen ==='products' ? tabbar.pillTextActive: null]} >
                    Produtos
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[tabbar.pill, screen ==='categories'? tabbar.pillActive : null]} 
                onPress={()=>changeScreen('categories')}
            >
                <Text style={[tabbar.pillText,screen ==='categories' ? tabbar.pillTextActive: null]}>
                    Categorias
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[tabbar.pill, screen ==='users'? tabbar.pillActive : null]} 
                onPress={()=>changeScreen('users')}
            >
                <Text style={[tabbar.pillText,screen ==='users' ? tabbar.pillTextActive: null]}>
                    Usuários
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export default TabBar;