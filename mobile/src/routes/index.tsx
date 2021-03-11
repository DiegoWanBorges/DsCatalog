import React from 'react'
import { Home, Catalog, ProductDetails } from '../pages'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

const Routes: React.FC = () =>{
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Catalog" component={Catalog} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
    )
}

export default Routes;