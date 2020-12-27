import React, { useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Carousel, Button, CardList } from '../components'
import { globalStyles, COLORS } from '../styles'
import { ingridients } from '../mock'
import { SimpleLineIcons } from '@expo/vector-icons'

const RecipeDetails = () => {
  const [mealCompleted, setMealCompleted] = useState(true)

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.container}>
        <Carousel />
        <View style={[globalStyles.card, globalStyles.content, styles.card]}>
          <View style={styles.dragger}></View>
          <View style={styles.cardHeader}>
            <Text style={globalStyles.titleXL}>Crock Pot Butter Chicken</Text>
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
                  size={32}
                  color={COLORS.PRIMARY_ICON}
                />
              )}
              <MaterialIcons
                name='favorite'
                size={32}
                style={globalStyles.icon}
                color={COLORS.SECONDARY_ICON}
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
            <Text style={globalStyles.titleS}>20 mins</Text>
          </View>
          <ScrollView>
            <View style={styles.wrapper}>
              <Text style={[globalStyles.titleL, styles.marginBottom]}>
                Ingridients
              </Text>
              <FlatList
                contentContainerStyle={styles.ingridients}
                data={ingridients}
                renderItem={({ item }) => (
                  <View style={styles.ingridient}>
                    <Text style={[globalStyles.titleS, styles.ingridientTitle]}>
                      {item.title}
                    </Text>
                    <Text style={[globalStyles.titleS, styles.ingridientSize]}>
                      {item.size}
                    </Text>
                  </View>
                )}
                keyExtractor={item => item.id}
                numColumns={2}
              />
            </View>
            <View style={styles.wrapper}>
              <Text style={[globalStyles.titleL, styles.marginBottom]}>
                Instructions
              </Text>
              <Text style={globalStyles.titleS}>
                I first put this recipe up on the blog nearly 3 years ago, and
                it’s totally stood the test of time!
              </Text>
              <View style={styles.buttonWrapper}>
                <Button>Recipe Complete</Button>
              </View>
            </View>
            <View style={styles.wrapper}>
              <Text style={[globalStyles.titleL, styles.marginBottom]}>
                Similar Recipes
              </Text>
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
    height: 20,
  },
  cardHeader: {
    ...globalStyles.row,
    flexWrap: 'wrap',
  },
  ingridient: {
    ...globalStyles.row,
    flex: 1,
    paddingBottom: 7,
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
})

export default RecipeDetails
