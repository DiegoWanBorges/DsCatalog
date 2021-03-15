import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { theme, text, nav } from '../styles'
import { useNavigation, useRoute } from '@react-navigation/core';
import menu from '../assets/images/menu.png'

const NavBar: React.FC = () => {
    const [show, setShow] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();


    const navigate = (path: any) => {
        if (path) {
            console.warn("passou em: " + path)
            setShow(false);
            navigation.navigate(path);
        }
        setShow(false);
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={nav.drawer}
            onPress={() => setShow(!show)}
        >
            <Image source={menu} />

            {show ? (
                <View style={nav.options}>

                    <TouchableOpacity
                        onPress={() => navigate("Home")}
                        style={nav.option}
                    >
                        <Text
                            style={[nav.textOption, route.name === "Home" ? nav.textActive : null]}
                        >
                            Home
                            </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigate("Catalog")}
                        style={nav.option}
                    >
                        <Text
                            style={[nav.textOption, route.name === "Catalog" ? nav.textActive : null]}
                        >
                            Catalog
                            </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigate("Adm")}
                        style={nav.option}
                    >
                        <Text
                            style={[nav.textOption, route.name === "Adm" ? nav.textActive : null]}
                        >
                            Adm
                            </Text>
                    </TouchableOpacity>
                </View>
                ):<></>
            }
        </TouchableOpacity>
    )
}

export default NavBar;