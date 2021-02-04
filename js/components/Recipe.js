import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS, globalStyles } from '../styles'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Context } from '../context'

import { useQuery } from '@apollo/client'
import { recipesInMealplanQuery, favRecipesQuery, popularRecipesQuery, recommendedRecipesQuery, groceriesQuery } from '../graphql/queries'
import { useMutation } from '@apollo/client'
import { addToMealplanMutation, removeFromMealplanMutation, newFavMutation, removeFavMutation } from '../graphql/mutations'

const Recipe = ({ recipe,   mealplanRecipes, favourites, completions }) => {
  const { refreshPageContext } = useContext(Context)
  const [refreshPage, setRefreshPage] = refreshPageContext

  let mealplanRecipe = false
  let favRecipe = false
  let completedRecipe = false

  for (let mpRecipe of mealplanRecipes) {
    if (recipe.id === mpRecipe.id) {
      mealplanRecipe = true
      break
    }
  }
  for (let fRecipe of favourites) {
    if (recipe.id === fRecipe.id) {
      favRecipe = true
      break
    }
  }
  for (let cRecipe of completions) {
    if (recipe.id === cRecipe.id) {
      completedRecipe = true
      break
    }
  }

  const [inMealplan, setMealplanRecipe] = useState(mealplanRecipe)
  const [isFav, setFavRecipe] = useState(favRecipe)

  const fetchRecipesInMealplan = useQuery(recipesInMealplanQuery, { notifyOnNetworkStatusChange: true });

  const fetchFavs = useQuery(favRecipesQuery)

  const fetchRecommendations = useQuery(recommendedRecipesQuery)

  const fetchPopularRecipes = useQuery(popularRecipesQuery)

  const refetchAll = (() => {
    fetchRecipesInMealplan.refetch()
    fetchFavs.refetch()
    fetchPopularRecipes.refetch()
    fetchRecommendations.refetch()
  })

  const fetchGroceries = useQuery(groceriesQuery, {
    variables: {}
  })

  const input = {recipeId: recipe.id}


  const [addToMealplanReturned] = useMutation(addToMealplanMutation)
  const [removeFromMealplanReturned] = useMutation(removeFromMealplanMutation)

  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setRefreshPage(refresh)
  }, [refresh])

  const mealplanAction = () => {
    if (mealplanRecipe) {
      removeFromMealplanReturned({ variables: { value: input } }).then(({ data }) => {
        if (data.removeFromMealplanstatus) {
          refetchAll()
          fetchGroceries.refetch()
          const data = client.readQuery({ query: recipesInMealplanQuery })
          client.writeQuery({
            query: recipesInMealplanQuery,
            data: {
              recipesInMealplan: data.recipesInMealplan.filter((e) => { e !== recipe }),
            },
          })
        }
      })
    } else {
      addToMealplanReturned({ variables: { value: input } }).then(({ data }) => {
        if (data.addToMealplan.link) {
          refetchAll()
          fetchGroceries.refetch()         
          const data = client.readQuery({ query: recipesInMealplanQuery })
          client.writeQuery({
            query: recipesInMealplanQuery,
            data: {
              recipesInMealplan: [...data.recipesInMealplan, recipe],
            },
          })
        }
      })
    }
    setRefresh(true)
    setRefreshPage(true)
    // console.log('in cards, after setting: ', refreshMealplan)        
  }

  const [newFavReturned] = useMutation(newFavMutation)
  const [removeFavReturned] = useMutation(removeFavMutation)
  const favAction = () => {
    if (favRecipe) {
      removeFavReturned({ variables: { value: input } }).then(({ data }) => {
        if (data.removeFav.status) {
          refetchAll()
          const data = client.readQuery({ query: favRecipesQuery })
          client.writeQuery({
            query: favRecipesQuery,
            data: {
              favRecipes: data.favRecipes.filter((e) => { e !== recipe }),
            },
          })
        }
      })
    } else {
      newFavReturned({ variables: { value: input } }).then(({ data }) => {
        if (data.newFav.favourite) {
          refetchAll()
          const data = client.readQuery({ query: favRecipesQuery })
          client.writeQuery({
            query: favRecipesQuery,
            data: {
              favRecipes: [...data.favRecipes, recipe],
            },
          })
        }
      })
    }
    setRefresh(true)
    setRefreshPage(true)      
  }

  return (
    <View style={[styles.card, globalStyles.card]}>
      <View style={styles.cardImageWrapper}>
        <Image
          style={[styles.cardImage, globalStyles.cardImage]}
          source={{
            uri: '' + recipe.avatarFileName,
          }}
        />
      </View>
      <View style={[styles.cardInfo, globalStyles.cardInfo]}>
        <Text style={[styles.cardTitle, globalStyles.titleM]}>
          {recipe.title}
        </Text>
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
            {completedRecipe && (
              <SimpleLineIcons
                name='badge'
                style={globalStyles.icon}
                size={24}
                color='black'
                color={COLORS.PRIMARY_ICON}
              />
            )}
            <MaterialIcons
                name={mealplanRecipe ? 'remove-circle' : 'add-circle'}
                size={24}
                style={globalStyles.icon}
                color={COLORS.PRIMARY_ICON}
                onPress={() =>  {
                  setMealplanRecipe(!inMealplan)
                  mealplanAction()
                }}
            />
            <MaterialIcons
              name={favRecipe ? 'favorite' : 'favorite-border'}
              size={24}
              color={COLORS.SECONDARY_ICON}
              onPress={() =>  {
                setFavRecipe(!isFav)
                favAction()
              }}
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
    justifyContent: 'center',
  },
})

export default Recipe
