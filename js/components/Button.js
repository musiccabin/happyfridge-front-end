import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { globalStyles } from '../styles'

const Button = ({ onPress, children, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[globalStyles.button, style]}>
      <Text style={globalStyles.titleM}>{children}</Text>
    </TouchableOpacity>
  )
}

export default Button