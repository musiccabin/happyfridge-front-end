import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS, globalStyles } from '../styles'
import { SimpleLineIcons } from '@expo/vector-icons'

const Recipe = ({ recipeCompleted }) => {
  return (
    <View style={[styles.card, globalStyles.card]}>
      <View style={styles.cardImageWrapper}>
        <Image
          style={[styles.cardImage, globalStyles.cardImage]}
          source={{
            uri:
              'https://cafedelites.com/wp-content/uploads/2016/11/Creamy-Herb-Chicken-2700.jpg',
          }}
        />
      </View>
      <View style={[styles.cardInfo, globalStyles.cardInfo]}>
        <Text style={[styles.cardTitle, globalStyles.titleM]}>
          Creamy Herb Chicken
        </Text>
        <View style={globalStyles.cardDetails}>
          <View style={globalStyles.cardTimer}>
            <MaterialIcons
              style={globalStyles.clock}
              name='access-time'
              size={20}
              color={COLORS.SECONDARY_FONT}
            />
            <Text style={globalStyles.titleS}>20 mins</Text>
          </View>
          <View style={globalStyles.icons}>
            {
              recipeCompleted && <SimpleLineIcons
                name="badge"
                style={globalStyles.icon}
                size={24}
                color="black"
                color={COLORS.PRIMARY_ICON}
              />
            }
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
    height: 73,
    width: '85%',
    flexDirection: 'row',
    marginBottom: 15,
  },
  cardImage: {
    height: '100%',
    width: 73,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  cardInfo: {
    flexBasis: '75%',
    justifyContent: 'center'
  },
})

export default Recipe
