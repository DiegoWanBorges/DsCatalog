import { StyleSheet } from 'react-native'
import { ceil, color } from 'react-native-reanimated'

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
    regular:{ 
        fontSize: 16,
        fontWeight:"400",
        textAlign: "center",
        color: colors.mediumGray,
    },
    bold:{ 
        fontSize:26,
        fontWeight:"bold",
        textAlign:"center",
        marginBottom:15,
        color:colors.darkGray,
    },
    primaryText:{
        fontSize:14,
        fontWeight:"bold",
        color:colors.white,
        marginLeft:20,

    },

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
        justifyContent: "space-between"
    },
    draw:{
        width:313,
        height:225
    },
    textContainer:{
        paddingHorizontal: 20,
    },
    primaryButton:{
        backgroundColor:colors.primary,
        width:290,
        height:50,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        borderRadius:10
    },
    arrowContainer:{
        backgroundColor:colors.secondary,
        height:50,
        width:50,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        justifyContent:"center",
        alignItems:"center",
    },
})

export { colors, theme, text }