import React, {useContext} from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import Card from './Card'
import { recommendedRecipesQuery } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import { Context } from '../context'

const CardList = ({ navigation, mealplanRecipes, favourites, completions }) => {
  const { refreshPageContext } = useContext(Context)
  const [refreshPage, setRefreshPage] = refreshPageContext
  const { data, error, loading, networkStatus, refetch } = useQuery(recommendedRecipesQuery, { notifyOnNetworkStatusChange: true })

  if (refreshPage) {
    refetch()
    setRefreshPage(false)
}

  if (error) return <Text>error</Text>
  if (loading || networkStatus === 4) return <Text>loading...</Text>

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
