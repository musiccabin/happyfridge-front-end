import React from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import Card from './Card'
import { recommendedRecipesQuery } from '../graphql/queries'
import { useQuery } from '@apollo/client'


const CardList = ({ navigation, mealplanRecipes, favourites, completions }) => {
  const { data, error, loading } = useQuery(recommendedRecipesQuery)


  if (error) return <Text>error</Text>
  if (loading) return <Text>loading...</Text>

  return (
    <ScrollView horizontal>
      <View style={styles.list}>
        {data?.recommendedRecipes.map(recipe => {
          return (
            <Card
              recipe={recipe}
              mealplanRecipes={mealplanRecipes}
              favourites={favourites}
              completions={completions}
              onPress={() => navigation.navigate('RecipeDetails')}
              marginRight={15}
              height={218}
              width={250}
            />
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    height: 235,
  },
})

export default CardList
