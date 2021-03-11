import { StyleSheet } from 'react-native'

const colors ={
    white: "#FFF",
    lightGray: "#F2F2F2",
    mediumGray:"#9E9E9E",
    darkGray:"#263238",
    black:"#000",
    primary:"#407BEE",
    secondary:"#33569B",
    bluePill:"#407BFF61",
    red:"#DF5753"
}

const text = StyleSheet.create({
    regular:{ },
    bold:{ },
})

const theme = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding: 20,
    },
    card:{
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
        borderRadius:20,
        alignItems:'center',
        shadowColor:colors.black,
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
    },
    draw:{
        width:313,
        height:225
    },
    textContainer:{
        
    },
})

export { colors, theme, text }