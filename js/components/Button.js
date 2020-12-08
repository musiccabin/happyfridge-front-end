import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, globalStyles } from '../styles'

const Button = ({ onPress, children, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={globalStyles.titleM}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 10,
    alignItems: 'center',
    width: 180,
    marginVertical: 10,
    borderRadius: 10,
  }
})

export default Button