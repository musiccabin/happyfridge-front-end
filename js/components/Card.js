import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS, globalStyles } from '../styles'
import { SimpleLineIcons } from '@expo/vector-icons'

const Card = ({
  onPress,
  marginTop,
  marginBottom,
  marginRight,
  height,
  width,
  recipe,
}) => {
  const recipeCompleted = false
  const styles = StyleSheet.create({
    card: {
      height: height,
      flexDirection: 'column',
      width: width,
      marginRight: marginRight,
      marginTop: marginTop,
      marginBottom: marginBottom,
    },
    cardImage: {
      height: 150,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  })

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, globalStyles.card]}>
        <Image
          style={[styles.cardImage, globalStyles.cardImage]}
          source={{
            uri: '' + recipe.avatarFileName,
          }}
        />
        <View style={[styles.cardInfo, globalStyles.cardInfo]}>
          <Text style={globalStyles.titleL}>{recipe.title}</Text>
          <View style={globalStyles.row}>
            <View style={globalStyles.cardTimer}>
              <MaterialIcons
                style={globalStyles.clock}
                name='access-time'
                size={20}
                color={COLORS.SECONDARY_FONT}
              />
              <Text style={globalStyles.titleS}>{recipe.cookingTimeInMin}</Text>
            </View>
            <View style={globalStyles.icons}>
              {recipeCompleted && (
                <SimpleLineIcons
                  name='badge'
                  style={globalStyles.icon}
                  size={24}
                  color='black'
                  color={COLORS.PRIMARY_ICON}
                />
              )}
              <MaterialIcons
                name='remove-circle'
                size={24}
                style={globalStyles.icon}
                color={COLORS.PRIMARY_ICON}
              />
              <MaterialIcons
                name='favorite'
                size={24}
                color={COLORS.SECONDARY_ICON}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Card
