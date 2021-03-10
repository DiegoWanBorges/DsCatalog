import React from 'react'
import { Home, Catalog } from '../pages'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

const Routes: React.FC = () =>{
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Catalog" component={Catalog} />
        </Stack.Navigator>
    )
}

export default Routes;