import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS } from '../styles'

const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{children}</Text>
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
  },
  text: {
    fontSize: 20,
    fontWeight: '300',
  },
})

export default Button
