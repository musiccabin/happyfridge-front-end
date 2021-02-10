import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS, globalStyles } from '../styles'
import { SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { client } from '../apollo'
// import { MealPlan } from '../screens/MealPlan'
import { useQuery, useMutation } from '@apollo/client'
import { recipesInMealplanQuery, favRecipesQuery, popularRecipesQuery, recommendedRecipesQuery, groceriesQuery } from '../graphql/queries'
import { addToMealplanMutation, removeFromMealplanMutation, newFavMutation, removeFavMutation } from '../graphql/mutations'
import { Context } from '../context'
import { images } from '../images'


const Card = ({
  onPress,
  marginTop,
  marginBottom,
  marginRight,
  height,
  width,
  recipe,
  mealplanRecipes,
  favourites,
  completions
}) => {

  const navigation = useNavigation()
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
    console.log('in card, after setting, refreshPage is: ', refreshPage)
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

  const styles = StyleSheet.create({
    card: {
      height: height,
      flexDirection: 'column',
      width: width,
      marginRight: marginRight,
      marginTop: marginTop,
      marginBottom: marginBottom,
    },
    cardImage: {
      height: 150,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  })

  return (
    <TouchableOpacity 
    onPress={() => navigation.navigate('RecipeDetails', { id: recipe.id })}
    isFav={isFav}
    inMealplan={inMealplan}
    >
      <View style={[styles.card, globalStyles.card]}>
        <Image
          style={[styles.cardImage, globalStyles.cardImage]}
          source={{ uri: images[recipe.id] }}
        />
        <View style={[styles.cardInfo, globalStyles.cardInfo]}>
          <Text style={globalStyles.titleL}>{recipe.title}</Text>
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
                name={inMealplan ? 'remove-circle' : 'add-circle'}
                size={24}
                style={globalStyles.icon}
                color={COLORS.PRIMARY_ICON}
                onPress={() =>  {
                  setMealplanRecipe(!inMealplan)
                  mealplanAction()
                }}
              />
              <MaterialIcons
                name={isFav ? 'favorite' : 'favorite-border'}
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
    </TouchableOpacity>
  )
}

export default Card
