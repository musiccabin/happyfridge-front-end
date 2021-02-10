import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { globalStyles } from '../styles'

const ButtonInactive = ({ onPress, children, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[globalStyles.buttonInactive, style]}>
      <Text style={globalStyles.titleM}>{children}</Text>
    </TouchableOpacity>
  )
}

export default ButtonInactive