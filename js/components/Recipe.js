import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS, globalStyles } from '../styles'

const Recipe = () => {
  return (
    <View style={[styles.card, globalStyles.card]}>
      <View style={styles.cardImageWrapper}>
        <Image
          style={globalStyles.cardImage}
          source={{
            uri:
              'https://cafedelites.com/wp-content/uploads/2016/11/Creamy-Herb-Chicken-2700.jpg',
          }}
        />
      </View>
      <View style={[styles.cardInfo, globalStyles.cardInfo]}>
        <Text style={[styles.cardTitle, globalStyles.cardTitle]}>
          Creamy Herb Chicken
        </Text>
        <View style={globalStyles.cardDetails}>
          <View style={globalStyles.cardTimer}>
            <MaterialIcons
              style={styles.clock}
              name='access-time'
              size={20}
              color='gray'
            />
            <Text>20 mins</Text>
          </View>
          <View style={globalStyles.icons}>
            <MaterialIcons
              name='add-circle'
              style={globalStyles.icon}
              size={24}
              color={COLORS.PRIMARY_ICON}
            />
            <MaterialIcons
              name='favorite-border'
              size={24}
              color={COLORS.SECONDARY_ICON}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    flexDirection: 'row',
    marginTop: 25,
  },
  cardImageWrapper: {
    flexBasis: '30%',
  },
  cardInfo: {
    flexBasis: '70%',
    justifyContent: 'center',
  },
  cardTitle: {
    paddingVertical: 5,
    fontSize: 18,
  },
})

export default Recipe
