import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Carousel, Button, CardList, FavoriteIcon } from '../components'
import { globalStyles, COLORS } from '../styles'
import { ingridients } from '../mock'
import { SimpleLineIcons } from '@expo/vector-icons';

const RecipeDetails = () => {

  const [mealCompleted, setMealCompleted] = useState(true)
  const [favorite, setFavorite] = useState(false)
  const toogleFavorite = () => setFavorite(!favorite)
  const even = (index) => (index + 1) % 2 == 0

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.container}>
        <Carousel />
        <View style={[globalStyles.card, globalStyles.content, styles.card]}>
          <View style={styles.dragger} ></View>
          <View style={styles.cardHeader}>
            <Text style={globalStyles.titleXL}>Crock Pot Butter Chicken</Text>
            <View style={globalStyles.icons}>
              <MaterialCommunityIcons
                name='pencil'
                size={32}
                style={globalStyles.icon}
                color={COLORS.SECONDARY_FONT}
              />
              {mealCompleted && 
              <SimpleLineIcons
                name="badge"
                size={30}
                style={globalStyles.icon}
                color={COLORS.PRIMARY_ICON} 
              />}
              <FavoriteIcon favorite={favorite} toogleFavorite={toogleFavorite} />
            </View>
          </View>
          <View style={globalStyles.cardTimer}>
            <MaterialIcons
              style={globalStyles.clock}
              name='access-time'
              size={20}
              color={COLORS.SECONDARY_FONT}
            />
            <Text style={globalStyles.titleS}>20 mins</Text>
          </View>
          <ScrollView>
            <View style={styles.wrapper}>
              <Text style={[globalStyles.titleL, styles.marginBottom]}>Ingridients</Text>
              <View style={styles.ingridients}>
                {ingridients.map((item, index) =>
                  <View style={[styles.ingridient, even(index) && styles.even]}>
                    <View style={styles.dot}></View>
                    <Text style={[globalStyles.titleS, styles.ingridientTitle]}>
                      {item.title}
                    </Text>
                    <Text style={[globalStyles.titleS, styles.ingridientSize]}>
                      {item.size}
                    </Text>
                  </View>
                )}
                { (ingridients.length + 1) % 3 == 0 && <View style={[styles.ingridient, styles.even]}></View>}
              </View>
            </View>
            <View style={styles.wrapper}>
              <Text style={[globalStyles.titleL, styles.marginBottom]}>Instructions</Text>
              <Text style={globalStyles.titleS}>
                I first put this recipe up on the blog nearly 3 years ago, and
                it’s totally stood the test of time!
              </Text>
              <View style={styles.buttonWrapper}>
                <Button onPress={() => setMealCompleted(!mealCompleted)}>Recipe Complete</Button>
              </View>
            </View>
            <View style={styles.wrapper}>
              <Text style={[globalStyles.titleL, styles.marginBottom]}>Similar Recipes</Text>
              <CardList />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  dragger: {
    height: 20
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  ingridients: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap:'wrap',
  },
  ingridient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 7,
    flexBasis: '46%',
  },
  even: {
    marginLeft: '4%'
  },
  ingridientTitle: {
    flexBasis: '60%',
  },
  ingridientSize: {
    flexBasis: '30%',
    textAlign: 'right',
  },
  wrapper: {
    marginTop: 20
  },
  marginBottom: {
    marginBottom: 15
  },
  buttonWrapper: { alignItems: 'center' },
  dot: {
    width: 5,
    height: 5,
    marginRight: 10,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 100 / 2,
  }
})

export default RecipeDetails
