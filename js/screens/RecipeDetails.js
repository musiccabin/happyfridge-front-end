import React from 'react'
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Carousel, Button } from '../components'
import { globalStyles, COLORS } from '../styles'
import { ingridients } from '../mock'

const RecipeDetails = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.container}>
        <Carousel />
        <View style={[globalStyles.card, styles.content, styles.card]}>
          <View style={styles.cardHeader}>
            <Text style={globalStyles.titleXL}>Crock Pot Butter Chicken</Text>
            <View style={styles.icons}>
              <MaterialCommunityIcons
                name='pencil'
                size={32}
                style={styles.icon}
                color={COLORS.SECONDARY_FONT}
              />
              <MaterialIcons
                name='favorite'
                size={32}
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
          <View style={styles.ingridientsWrapper}>
            <Text style={globalStyles.titleL}>Ingridients</Text>
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
                  <View style={styles.emptySpace}></View>
                </View>
              )}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
          <View style={styles.insctructions}>
            <Text style={globalStyles.titleL}>Instructions</Text>
            <Text style={[globalStyles.titleM, styles.insctruction]}>
              I first put this recipe up on the blog nearly 3 years ago, and
              it’s totally stood the test of time!
            </Text>
            <View style={styles.buttonWrapper}>
              <Button>Make It!</Button>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: -10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  content: {
    paddingHorizontal: 25,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    paddingRight: 10,
  },
  ingridientsWrapper: {
    marginTop: 15,
  },
  ingridients: {
    marginTop: 5,
    marginBottom: 20,
  },
  ingridient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  ingridientTitle: {
    flexBasis: '45%',
  },
  emptySpace: {
    paddingLeft: 10,
  },
  ingridientSize: {
    flexBasis: '45%',
    textAlign: 'right',
  },
  insctructions: {
    marginTop: 10,
  },
  insctruction: {
    paddingTop: 10,
  },
  buttonWrapper: { alignItems: 'center' },
})

export default RecipeDetails
