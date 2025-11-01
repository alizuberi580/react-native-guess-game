import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import Colors from '../constants/colors';

const PrimaryButton = ({children, whenPress}) => {
    {/*
        function passed as argument from StartGameScreen, executed over here*/}
    function pressHandler(){
        whenPress();
    }
  return (
    <View style={styles.buttonOuterContainer}>
        <Pressable 
        style={({pressed})=>pressed?[styles.buttonInnerContainer, styles.pressed]: styles.buttonInnerContainer} 
            onPress={pressHandler}
            android_ripple={{color:Colors.primary600}}
        >
            <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
    </View>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
    buttonOuterContainer:{
        margin: 4,
        overflow:'hidden',
        borderRadius:28
    },
    buttonInnerContainer:{
        backgroundColor:Colors.primary500,
        paddingHorizontal:16,
        paddingVertical:8,
        elevation: 2,
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius: 6,
        shadowOffset:{width: 0, height:2},

    },
    buttonText:{
        color: "white",
        textAlign:'center'
    },
    pressed:{
        opacity:0.75
    }
})