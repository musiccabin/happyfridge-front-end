import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS, globalStyles } from '../styles'
import { SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { client } from '../apollo'
import { useQuery } from '@apollo/client'
import { recipesInMealplanQuery, favRecipesQuery, popularRecipesQuery, recommendedRecipesQuery, groceriesQuery } from '../graphql/queries'
import { useMutation } from '@apollo/client'
import { addToMealplanMutation, removeFromMealplanMutation, newFavMutation, removeFavMutation } from '../graphql/mutations'

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

  let mealplanRecipe = false
  let favRecipe = false
  let completedRecipe = false

  for (mpRecipe of mealplanRecipes) {
    if (recipe.id === mpRecipe.id) {
      mealplanRecipe = true
      break
    }
  }
  for (fRecipe of favourites) {
    if (recipe.id === fRecipe.id) {
      favRecipe = true
      break
    }
  }
  for (cRecipe of completions) {
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
  const mealplanAction = () => {
    if (mealplanRecipe) {
      removeFromMealplanReturned({ variables: { value: input } }).then(({ data }) => {
        if (data.removeFromMealplanstatus) {
          refetchAll()
          fetchGroceries.refetch()
          navigation.navigate('MealPlan')
        }
      })
    } else {
      addToMealplanReturned({ variables: { value: input } }).then(({ data }) => {
        if (data.addToMealplan.link) {
          // refetchAll()
          // fetchGroceries.refetch()
          console.log('in else block')
          const data = client.readQuery({ recipesInMealplanQuery })
          console.log('data from read query is: ', client.readQuery({ recipesInMealplanQuery }))
          // client.writeQuery({
          //   query,
          //   data: {
          //     recipesInMealplan: [...data.recipesInMealplan, recipe],
          //   },
          // })
          // mutate({
          //   refetchQueries: [
          //     { query: recipesInMealplanQuery }, { query: groceriesQuery }
          //   ],
          // })
          console.log('nvgt')
          navigation.navigate('MealPlan')
        }
      })
    }        
  }

  const [newFavReturned] = useMutation(newFavMutation)
  const [removeFavReturned] = useMutation(removeFavMutation)
  const favAction = () => {
    if (favRecipe) {
      removeFavReturned({ variables: { value: input } }).then(({ data }) => {
        if (data.removeFav.status) refetchAll()
      })
    } else {
      newFavReturned({ variables: { value: input } }).then(({ data }) => {
        if (data.newFav.favourite) {
          refetchAll()
          console.log('ready to go to favourites page')
          navigation.navigate('Home')
        }
      })
    }        
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
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, globalStyles.card]}>
        <Image
          style={[styles.cardImage, globalStyles.cardImage]}
          source={{
            uri: '' + recipe.avatarFileName,
          }}
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
