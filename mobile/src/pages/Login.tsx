import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import { theme, text } from '../styles'
import { useNavigation } from '@react-navigation/core';
import eyesOpened from '../assets/images/eyes-opened.png'
import eyesClosed from '../assets/images/eyes-closed.png'
import arrow from '../assets/images/arrow.png'
import { makeLogin } from '../services';
import { isAuthenticated, saveSessionData } from '../services/auth';


const Login: React.FC = () => {
    const navigation = useNavigation();
    const [hidePassword, setHidePassword] = useState(false);
    const [userInfo, setUserInfo] = useState(
        {
            username: "",
            password: ""
        }
    )

    async function handleLogin() {
        makeLogin(userInfo)
        .then(response => {
          saveSessionData(response.data.access_token);
          navigation.navigate("Dashboard")
        })
        .catch(response =>{
            console.warn(response)
        })
    }
    return (
        <View style={theme.container} >
            <View style={theme.loginCard}>
                <Text style={text.loginTitle}>Login</Text>
                <View style={theme.form}>
                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={theme.textInput}
                        value={userInfo.username}
                        onChangeText={(e) => {
                            const newUserInfo = { ...userInfo };
                            newUserInfo.username = e;
                            setUserInfo(newUserInfo);
                        }}
                    />
                    <View style={theme.passwordGroup}>
                        <TextInput
                            placeholder="Senha"
                            autoCapitalize="none"
                            style={theme.textInput}
                            value={userInfo.password}
                            onChangeText={(e) => {
                                const newUserInfo = { ...userInfo };
                                newUserInfo.password = e;
                                setUserInfo(newUserInfo);
                            }}
                            secureTextEntry={!hidePassword}
                        />
                        <TouchableOpacity
                            onPress={() => setHidePassword(!hidePassword)}
                            style={theme.toggle}
                        >
                            <Image
                                source={hidePassword ? eyesClosed : eyesOpened}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={theme.primaryButton}
                    activeOpacity={0.8}
                    onPress={()=>handleLogin()}
                >
                    <View >
                        <Text style={text.primaryText}>FAZER LOGIN</Text>
                    </View>
                    <View style={theme.arrowContainer}>
                        <Image source={arrow} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login;