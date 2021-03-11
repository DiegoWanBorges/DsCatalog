import React from 'react'

import {View, TextInput} from 'react-native'
import { theme } from '../styles'

interface SearchProps{
    placeHolder:string;
    search: string;
    setSearch: Function;
}

const SearchInput: React.FC<SearchProps> = ({placeHolder,search,setSearch}:SearchProps)  =>{
    return (
        <View style={theme.inputContainer}>
            <TextInput 
                    style={theme.searchInput} 
                    placeholder={placeHolder}
                    value={search}
                    onChangeText={(text) => setSearch(text)}
            />
        </View>
    )
}

export default SearchInput;