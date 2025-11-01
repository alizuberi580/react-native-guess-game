import { StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/colors'
import React from 'react'

const InstructionText = ({children, style}) => {
  return (
      <Text style={[styles.instructionText, style]}>{children}</Text>
   
  )
}
// styling array implementation from left to right, hence the styling in the right side of array can overwrite the left one
export default InstructionText

const styles = StyleSheet.create({
    instructionText:{
        fontFamily:'open-sans',
        color:Colors.accent500,
        fontSize: 24
    },
})