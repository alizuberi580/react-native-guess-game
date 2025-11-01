import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../constants/colors'

const Card = ({children}) => {
  return (
    <View style={styles.card}>{children}</View>
  )
}


export default Card

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({

    card:{
        alignItems:'center',
        padding: 16,
        marginTop: deviceWidth < 380 ? 20 : 30,
        backgroundColor:Colors.primary800,
        marginHorizontal: 24,
        borderRadius: 8,
        elevation:4,
        shadowColor:'black',
        shadowOffset:{width: 0, height:4},
        shadowRadius: 8,
        shadowOpacity: 0.25
    },

})


// adding the children prompt, then outputing it between the opening and closing tags of view means that
// we can use this card component to wrap it around other things to implement its styling etc
// card component can be wrapped up around other different styling and things that can come inside it