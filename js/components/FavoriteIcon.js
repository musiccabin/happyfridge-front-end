import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS } from '../styles'

const FavoriteIcon = ({favorite, toogleFavorite}) => {
  return (
    <TouchableOpacity onPress={() => toogleFavorite()}>
      <MaterialIcons
        name={favorite ? 'favorite-border' : 'favorite-border'}
        size={32}
        color={COLORS.SECONDARY_ICON}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
})

export default FavoriteIcon
