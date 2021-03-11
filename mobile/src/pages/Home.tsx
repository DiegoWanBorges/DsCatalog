import React from 'react'
import { View, Text, Image } from 'react-native'
import { theme, text } from '../styles'

import arrow from '../assets/images/arrow.png';
import draw from '../assets/images/draw.png';
const Home: React.FC = () => {
    return (
        <View style={theme.container} >
            <View style={theme.card}>
                <Image source={draw} style={theme.draw} />
                <View style={theme.textContainer}>
                    <Text style={text.bold}>Conheça o melhor catálogo de produtos</Text>
                    <Text style={text.regular}>Ajudaremos você a encontrar os melhores produtos disponíveis no mercado.</Text>
                </View>
            </View>

        </View>
    )
}

export default Home;