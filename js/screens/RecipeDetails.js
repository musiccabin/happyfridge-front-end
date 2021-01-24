import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Carousel, Button, CardList, FavoriteIcon } from '../components'
import { globalStyles, COLORS } from '../styles'
import { ingridients } from '../mock'
import { SimpleLineIcons } from '@expo/vector-icons'
import { useSpring, animated } from 'react-spring'
import {
  PanGestureHandler,
  Animated,
  State,
} from 'react-native-gesture-handler'
import { useQuery } from '@apollo/client'
import { recipeInfoQuery } from '../graphql/queries'
import { useEffect } from 'react/cjs/react.development'

// const steps = [
//   'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet tenetur necessitatibus asperiores porro, obcaecati, repellendus aliquid corrupti accusantium iste, aperiam nisi. Libero nesciunt harum vitae natus, qui aliquid earum magni?',
//   'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet tenetur necessitatibus asperiores porro, obcaecati, repellendus aliquid corrupti accusantium iste, aperiam nisi. Libero nesciunt harum vitae natus, qui aliquid earum magni?',
//   'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet tenetur necessitatibus asperiores porro, obcaecati, repellendus aliquid corrupti accusantium iste, aperiam nisi. Libero nesciunt harum vitae natus, qui aliquid earum magni?',
//   'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet tenetur necessitatibus asperiores porro, obcaecati, repellendus aliquid corrupti accusantium iste, aperiam nisi. Libero nesciunt harum vitae natus, qui aliquid earum magni?',
//   'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet tenetur necessitatibus asperiores porro, obcaecati, repellendus aliquid corrupti accusantium iste, aperiam nisi. Libero nesciunt harum vitae natus, qui aliquid earum magni?',
// ]
const RecipeDetails = ({ route, navigation }) => {
  const { id } = route.params
  const [mealCompleted, setMealCompleted] = useState(true)
  const [favorite, setFavorite] = useState(false)
  const toogleFavorite = () => setFavorite(!favorite)
  const even = index => (index + 1) % 2 == 0
  const [drag, setDrag] = useState(false)
  const draggable = useSpring({
    top: drag ? '0%' : '50%',
    height: drag ? '100%' : '50%',
  })
  const AnimatedView = animated(View)

  const { data, error, loading } = useQuery(recipeInfoQuery, {
    variables: { id: id },
  })

  if (loading) return <Text>Loading...</Text>
  if (error) return `Error! ${error.message}`
  const ingrediantArr = data.recipeInfo.myrecipeingredientlinks

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.container}>
        <Carousel />
        <AnimatedView
          style={[
            globalStyles.card,
            globalStyles.content,
            styles.card,
            draggable,
          ]}
        >
          <TouchableOpacity
            style={styles.dragger}
            onPress={() => setDrag(!drag)}
          />
          <ScrollView>
            <View style={styles.cardHeader}>
              <Text style={globalStyles.titleXL}>{data.recipeInfo.title}</Text>
              <View style={globalStyles.icons}>
                <MaterialCommunityIcons
                  name='pencil'
                  size={32}
                  style={globalStyles.icon}
                  color={COLORS.SECONDARY_FONT}
                />
                {mealCompleted && (
                  <SimpleLineIcons
                    name='badge'
                    size={30}
                    style={globalStyles.icon}
                    color={COLORS.PRIMARY_ICON}
                  />
                )}
                <FavoriteIcon
                  favorite={favorite}
                  toogleFavorite={toogleFavorite}
                />
              </View>
            </View>
            <View style={globalStyles.cardTimer}>
              <MaterialIcons
                style={globalStyles.clock}
                name='access-time'
                size={20}
                color={COLORS.SECONDARY_FONT}
              />
              <Text style={globalStyles.titleS}>
                {data.recipeInfo.cookingTimeInMin} mins
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.anchorText}>Edit ingridient usages</Text>
            </TouchableOpacity>
            <View style={styles.wrapper}>
              <Text style={[globalStyles.titleL, styles.marginBottom]}>
                Ingredients
              </Text>
              <View style={styles.ingridients}>
                {ingrediantArr.map((item, index) => (
                  <View style={[styles.ingridient, even(index) && styles.even]}>
                    <View style={styles.dot}></View>
                    <Text style={[globalStyles.titleS, styles.ingridientTitle]}>
                      {item.ingredient.name}
                    </Text>
                    <Text style={[globalStyles.titleS, styles.ingridientSize]}>
                      {item.quantity} {item.unit}
                    </Text>
                  </View>
                ))}
                {(ingridients.length + 1) % 3 == 0 && (
                  <View style={[styles.ingridient, styles.even]}></View>
                )}
              </View>
            </View>
            <View style={styles.wrapper}>
              <Text style={[globalStyles.titleL, styles.marginBottom]}>
                Intro
              </Text>
              <Text style={globalStyles.titleS}>
                I first put this recipe up on the blog nearly 3 years ago, and
                it’s totally stood the test of time!
              </Text>
            </View>
            <View style={styles.wrapper}>
              <Text style={[globalStyles.titleL, styles.marginBottom]}>
                Instructions
              </Text>
              {/* {steps.map((step, index) => (
                <Text style={[globalStyles.titleS, styles.marginBottom]}>
                  {index + 1}. {step}
                </Text>
              ))} */}

              <Text style={[globalStyles.titleS, styles.marginBottom]}>
                {data.recipeInfo.instructions}
              </Text>

              <View style={styles.buttonWrapper}>
                <Button onPress={() => setMealCompleted(!mealCompleted)}>
                  Recipe Complete
                </Button>
              </View>
            </View>
            <View style={styles.wrapper}>
              <Text style={[globalStyles.titleL, styles.marginBottom]}>
                Similar Recipes
              </Text>
              <CardList navigation={navigation} />
            </View>
          </ScrollView>
        </AnimatedView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    zIndex: 10,
  },
  dragger: {
    height: 20,
  },
  cardHeader: {
    ...globalStyles.row,
    flexWrap: 'wrap',
  },
  ingridients: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  ingridient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 7,
    flexBasis: '46%',
  },
  even: {
    marginLeft: '4%',
  },
  ingridientTitle: {
    flexBasis: '60%',
  },
  ingridientSize: {
    flexBasis: '30%',
    textAlign: 'right',
  },
  wrapper: {
    marginTop: 20,
  },
  marginBottom: {
    marginBottom: 15,
  },
  buttonWrapper: { alignItems: 'center' },
  dot: {
    width: 5,
    height: 5,
    marginRight: 10,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 100 / 2,
  },
  anchorText: {
    ...globalStyles.anchorText,
    marginTop: 10,
  },
})

export default RecipeDetails
