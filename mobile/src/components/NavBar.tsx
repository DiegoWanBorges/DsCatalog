import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { nav, text } from '../styles'
import { useNavigation, useRoute } from '@react-navigation/core';
import menu from '../assets/images/menu.png'
import { doLogout, isAuthenticated } from '../services/auth';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const NavBar: React.FC = () => {
    const [show, setShow] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const [authenticated, setAuthenticated ] = useState(false)

    async function logged() {
        const result = await isAuthenticated();
        result ? setAuthenticated(true) :setAuthenticated(false);
    }

    const navigate = (path: any) => {
        if (path) {
            setShow(false);
            navigation.navigate(path); 
        }
        setShow(false);
    }

    function logout(){
        doLogout();
        navigation.navigate("Login")
    }

    useEffect(() =>{
        logged()
    }, [])

    return (
        <>
            {
                authenticated ? (
                    <TouchableOpacity style={nav.logoutBtn} onPress={() => logout()}>
                        <Text style={text.logoutText}>Sair</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                    activeOpacity={0.8}
                    style={nav.drawer}
                    onPress={() => setShow(!show)}
                >
                    {
                        !show ? (<Image source={menu} />) : null
                    }
                    
        
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
                                    Catálogo
                                    </Text>
                            </TouchableOpacity>
        
                            <TouchableOpacity
                                onPress={() => navigate("Login")}
                                style={nav.option}
                            >
                                <Text
                                    style={[nav.textOption, route.name === "Adm" ? nav.textActive : null]}
                                >
                                    Adm
                                </Text>
                            </TouchableOpacity>
                            
                            { <TouchableOpacity
                                onPress={() => setShow(false)}
                                style={nav.option}
                            >
                                <Text
                                    style={nav.textOption}
                                >
                                    Cancel
                                </Text>
                            </TouchableOpacity> }

                        </View>
                        ):<></>
                    }
                </TouchableOpacity>
                )
            }
        </>
        
       
    )
}

export default NavBar;