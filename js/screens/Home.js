import React, { useContext } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import { CardList, Recipe } from '../components'
import { COLORS, globalStyles } from '../styles'
import { useQuery } from '@apollo/client'
import { popularRecipesQuery, favRecipesQuery, completedRecipesQuery, recipesInMealplanQuery } from '../graphql/queries'
import { Context } from '../context'


const Home = ({ navigation }) => {
  const { currentUser } = useContext(Context)
  const { data, error, loading } = useQuery(popularRecipesQuery)

  const mealplanRecipesInfo = useQuery(recipesInMealplanQuery)
    if (mealplanRecipesInfo.error) console.error(error)

  const favRecipesInfo = useQuery(favRecipesQuery)
    if (favRecipesInfo.error) console.error(error)

  const completedRecipesInfo = useQuery(completedRecipesQuery)
    if (completedRecipesInfo.error) console.error(error)

  if (error) return <Text>error</Text>
  if (loading) return <Text>loading...</Text>

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundCircle}></View>
      {currentUser && (
        <View style={globalStyles.content}>
          <Text style={[globalStyles.titleXL, styles.title]}>
            Recommended for you
          </Text>
          <CardList
          navigation={navigation}
          mealplanRecipes={mealplanRecipesInfo.data.recipesInMealplan}
          favourites={favRecipesInfo.data.favRecipes}
          completions={completedRecipesInfo.data.completedRecipes} />
        </View>
      )}

      <View style={[globalStyles.content, styles.popularRecipes]}>
        <Text style={[globalStyles.titleXL, styles.title]}>
          Popular recipes
        </Text>
        <ScrollView>
          <View>
            {data?.popularRecipes.map(recipe => (
              <Recipe
              key={recipe.id}
              recipe={recipe}
              mealplanRecipe={mealplanRecipesInfo.data.recipesInMealplan.includes(recipe)}
              favRecipe={favRecipesInfo.data.favRecipes.includes(recipe)}
              completedRecipe={completedRecipesInfo.data.completedRecipes.includes(recipe)} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    alignItems: 'flex-end',
    marginVertical: 10,
    marginRight: 25,
  },
  backgroundCircle: {
    backgroundColor: COLORS.PRIMARY_ICON,
    width: 500,
    height: 500,
    borderRadius: 300,
    top: -120,
    left: 50,
    position: 'absolute',
    zIndex: -1,
  },
  popularRecipes: {
    marginTop: 40,
  },
  title: {
    marginBottom: 20,
  },
})

export default Home
