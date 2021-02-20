import React, { useState, useContext, useEffect } from 'react'
import {
  View, 
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Dialog, { DialogTitle, DialogFooter, DialogContent, DialogButton } from 'react-native-popup-dialog'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Carousel, Button, ButtonInactive, CardList, FavoriteIcon } from '../components'
import { globalStyles, COLORS } from '../styles'
// import { ingridients } from '../mock'
import { SimpleLineIcons } from '@expo/vector-icons'
import {useSpring, animated} from 'react-spring'
import { PanGestureHandler, Animated, State } from 'react-native-gesture-handler'
import { Context } from '../context'

import { client } from '../apollo'
import { useQuery, useMutation } from '@apollo/client'
import { recipeInfoQuery, ingredientListQuery, recipesInMealplanQuery, favRecipesQuery, completedRecipesQuery, completedInMealplanQuery, groceriesQuery, recommendedRecipesQuery, popularRecipesQuery, ingredientUsagesQuery, leftoversQuery } from '../graphql/queries'
import {
  dashboardIndStatsLastWeekQuery,
  dashboardIndStatsLast30DaysQuery,
  dashboardIndStatsLast6MonthsQuery,
  dashboardIndStatsLast90DaysQuery,
  dashboardIndStatsThisYearQuery,
  dashboardIndStatsAllHistoryQuery,
  dashboardComStatsLastWeekByCityQuery,
  dashboardComStatsLastWeekByRegionQuery,
  dashboardComStatsLastWeekByProvinceQuery,
  dashboardComStatsLast30DaysByCityQuery,
  dashboardComStatsLast30DaysByRegionQuery,
  dashboardComStatsLast30DaysByProvinceQuery,
  dashboardComStatsLast90DaysByCityQuery,
  dashboardComStatsLast90DaysByRegionQuery,
  dashboardComStatsLast90DaysByProvinceQuery,
  dashboardComStatsLast6MonthsByCityQuery,
  dashboardComStatsLast6MonthsByRegionQuery,
  dashboardComStatsLast6MonthsByProvinceQuery,
  dashboardComStatsThisYearByCityQuery,
  dashboardComStatsThisYearByRegionQuery,
  dashboardComStatsThisYearByProvinceQuery,
  dashboardComStatsAllHistoryByCityQuery,
  dashboardComStatsAllHistoryByRegionQuery,
  dashboardComStatsAllHistoryByProvinceQuery
} from '../graphql/queries'

import { addToMealplanMutation, removeFromMealplanMutation, newFavMutation, removeFavMutation, newCompletionMutation, removeCompletionMutation, removeAllUsagesMutation } from '../graphql/mutations'
import { Navigation } from '../navigation'

const RecipeDetails = ({ route, navigation }) => {
  // const [favorite, setFavorite] = useState(false)
  // const toogleFavorite = () => setFavorite(!favorite)
  const even = (index) => (index + 1) % 2 == 0
  const [drag, setDrag] = useState(false)
  const draggable = useSpring({
    top: drag ? '0%' : '50%', 
    height: drag ? '100%' : '50%'
  })
  const AnimatedView = animated(View)

  const { id } = route.params

  const { refreshPageContext } = useContext(Context)
  const [refreshPage, setRefreshPage] = refreshPageContext

  const [visible, setVisibility] = useState(false)
  const [recipeCompleted, setRecipeCompleted] = useState(false)

  const fetchRecipesInMealplan = useQuery(recipesInMealplanQuery, { notifyOnNetworkStatusChange: true }, { fetchPolicy: 'cache-and-network' })

  const fetchFavs = useQuery(favRecipesQuery, { notifyOnNetworkStatusChange: true }, { fetchPolicy: 'cache-and-network' })
  
  const fetchCompletions = useQuery(completedRecipesQuery, { notifyOnNetworkStatusChange: true }, { fetchPolicy: 'cache-and-network' })

  const mealplanCompletions = useQuery(completedInMealplanQuery, { notifyOnNetworkStatusChange: true }, { fetchPolicy: 'cache-and-network' })
  
  const fetchRecommendations = useQuery(recommendedRecipesQuery)

  const fetchPopularRecipes = useQuery(popularRecipesQuery)

  const recipeInfo = useQuery(recipeInfoQuery, {
    variables: { id: id },
  })

  const ingredientUsages = useQuery(ingredientUsagesQuery,  {
    variables: {id: id}
  })

  const { data, loading, error } = useQuery(ingredientListQuery, {
    variables: { id: id },
  })

  const refetchAll = (() => {
    fetchRecipesInMealplan.refetch()
    fetchFavs.refetch()
    fetchCompletions.refetch()
    mealplanCompletions.refetch()
    fetchPopularRecipes.refetch()
    fetchRecommendations.refetch()
  })

  const fetchGroceries = useQuery(groceriesQuery, {
    variables: {}
  })
  
  const [refresh, setRefresh] = useState(false)

  // console.log('refreshPage is: ', refreshPage)

  if (!refresh) {
    refetchAll()
    // console.log('refetched all')
    setRefresh(true)
}

  const favourites = client.readQuery({ query: favRecipesQuery })
  const completions = client.readQuery({ query: completedRecipesQuery })
  // const mealplanCompletions = client.readQuery({ query: completedInMealplanQuery })
  const mealplanRecipes = client.readQuery({ query: recipesInMealplanQuery })

  let isFav = false
  for (recipe of favourites.favRecipes) {
    if (recipe.id === id) {
      isFav = true
      break
    }
  }

  let isCompleted = false
  for (recipe of completions.completedRecipes) {
    if (recipe.id === id) {
      isCompleted = true
      break
    }
  }

  let inMealplan = false
  for (recipe of mealplanRecipes.recipesInMealplan) {
    if (recipe.id === id) {
      inMealplan = true
      break
    }
  }

  // console.log('mealplanCompletions.completedInMealplan is: ', mealplanCompletions.data.completedInMealplan)

  // let completedInMealplan = false
  // for (recipe of mealplanCompletions.completedInMealplan) {
  //   if (recipe.id === id) {
  //     completedInMealplan = true
  //     break
  //   }
  // }


  // const [completedInMealplan, setMealCompleted] = useState(false)
  // const [updatedInMealplan, setMealplanRecipe] = useState(inMealplan)
  // const [updatedIsFav, setFavRecipe] = useState(isFav)


  const input = {recipeId: id}


  const [addToMealplanReturned] = useMutation(addToMealplanMutation)
  const [removeFromMealplanReturned] = useMutation(removeFromMealplanMutation)


  useEffect(() => {
    setRefreshPage(refresh)
  }, [refresh])

  const mealplanAction = () => {
    if (inMealplan) {
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
    if (isFav) {
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
  
  const [newCompletionReturned] = useMutation(newCompletionMutation)
  const [removeCompletionReturned] = useMutation(removeCompletionMutation)
  const [removeUsagesReturned] = useMutation(removeAllUsagesMutation, { refetchQueries: [
    { query: leftoversQuery },
    { query: dashboardIndStatsLastWeekQuery },
    { query: dashboardIndStatsLast30DaysQuery },
    { query: dashboardIndStatsLast6MonthsQuery },
    { query: dashboardIndStatsLast90DaysQuery },
    { query: dashboardIndStatsThisYearQuery },
    { query: dashboardIndStatsAllHistoryQuery},
    { query: dashboardComStatsLastWeekByCityQuery },
    // { query: dashboardComStatsLastWeekByRegionQuery },
    { query: dashboardComStatsLastWeekByProvinceQuery },
    { query: dashboardComStatsLast30DaysByCityQuery },
    // { query: dashboardComStatsLast30DaysByRegionQuery },
    { query: dashboardComStatsLast30DaysByProvinceQuery },
    { query: dashboardComStatsLast90DaysByCityQuery },
    // { query: dashboardComStatsLast90DaysByRegionQuery },
    { query: dashboardComStatsLast90DaysByProvinceQuery },
    { query: dashboardComStatsLast6MonthsByCityQuery },
    // { query: dashboardComStatsLast6MonthsByRegionQuery },
    { query: dashboardComStatsLast6MonthsByProvinceQuery },
    { query: dashboardComStatsThisYearByCityQuery },
    // { query: dashboardComStatsThisYearByRegionQuery },
    { query: dashboardComStatsThisYearByProvinceQuery },
    { query: dashboardComStatsAllHistoryByCityQuery },
    // { query: dashboardComStatsAllHistoryByRegionQuery },
    { query: dashboardComStatsAllHistoryByProvinceQuery }
  ], awaitRefetchQueries: true, notifyOnNetworkStatusChange: true })

  const completionAction = (action) => {
    if (action === 'uncomplete') {
      setRecipeCompleted(false)
      const existingUsages = client.readQuery({ query: ingredientUsagesQuery,
        variables: {id: id}
      })

      if (existingUsages?.ingredientUsages?.length > 0) {
        removeUsagesReturned({ variables: { value: input } }).then(({ data }) => {
          if (data.status) {
            ingredientUsages.refetch()
            client.writeQuery({
              query: ingredientUsagesQuery,
              data: {
                ingredientUsages: [],
              },
            })
          }
        })
      }
      removeCompletionReturned({ variables: { value: input } }).then(({ data }) => {
        if (data.removeCompletion.status) {
          refetchAll()
          const data = client.readQuery({ query: completedRecipesQuery })
          client.writeQuery({
            query: completedRecipesQuery,
            data: {
              completedRecipes: data.completedRecipes.filter((e) => { e !== recipe }),
            },
          })
        }
      })
    } else {
      newCompletionReturned({ variables: { value: input } }).then(({ data }) => {
        setRecipeCompleted(true)
        const first_time_completion = data.newCompletion.completion
        const existing_completion = data.newCompletion.status
        if (first_time_completion || existing_completion) {
          refetchAll()
          const data = client.readQuery({ query: completedInMealplanQuery })
          client.writeQuery({
            query: completedInMealplanQuery,
            data: {
              completedInMealplan: [...data.completedInMealplan, recipe],
            },
          })
          if (first_time_completion) {
            const data = client.readQuery({ query: completedRecipesQuery })
            client.writeQuery({
              query: completedRecipesQuery,
              data: {
                completedRecipes: [...data.completedRecipes, recipe],
              },
            })
          }
        }
      })
    }
    setRefresh(true)   
    setRefreshPage(true)   
  }

  if (recipeInfo.loading) return null
  if (recipeInfo.error) console.error(recipeInfo.error)

  if (loading) return null
  if (error) console.error(error)

  // console.log('ingredientList is: ', ingredientList)


  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.container}>
        <Carousel id={id} />
        <AnimatedView style={[globalStyles.card, globalStyles.content, styles.card, draggable]}>
          <TouchableOpacity style={styles.dragger} onPress={() => setDrag(!drag)} />
          <ScrollView>
            <View style={styles.cardHeader}>
              <Text style={globalStyles.titleXL}>{recipeInfo.data.recipeInfo.title}</Text>
              <View style={globalStyles.icons}>
                {/* <MaterialCommunityIcons
                  name='pencil'
                  size={32}
                  style={globalStyles.icon}
                  color={COLORS.SECONDARY_FONT}
                /> */}
                {isCompleted && 
                <SimpleLineIcons
                  name="badge"
                  size={30}
                  style={globalStyles.icon}
                  color={COLORS.PRIMARY_ICON} 
                />}
                <MaterialIcons
                  name={inMealplan ? 'remove-circle' : 'add-circle'}
                  size={32}
                  style={globalStyles.icon}
                  color={COLORS.PRIMARY_ICON}
                  onPress={() =>  {
                    mealplanAction()
                    // setMealplanRecipe(!updatedInMealplan)
                  }}
                />
                <MaterialIcons
                  name={isFav ? 'favorite' : 'favorite-border'}
                  size={32}
                  color={COLORS.SECONDARY_ICON}
                  onPress={() =>  {
                    favAction()
                    // setFavRecipe(!updatedIsFav)
                  }}/>
              </View>
            </View>
            <View style={globalStyles.cardTimer}>
              <MaterialIcons
                style={globalStyles.clock}
                name='access-time'
                size={20}
                color={COLORS.SECONDARY_FONT}
              />
              <Text style={globalStyles.titleS}>{recipeInfo.data.recipeInfo.cookingTime}</Text>
            </View>
            <TouchableOpacity>
              <Text
              style={styles.anchorText}
              onPress={() => {
                let usages = ingredientUsages.data.ingredientUsages
                if (usages.length == 0) usages = data.ingredientList
                navigation.navigate('Edit Usages', { ingredientUsages: usages, id: id })}
              }
              >Edit ingredient usages</Text>
            </TouchableOpacity>
            <View style={styles.wrapper}>
              <Text style={[globalStyles.titleL, styles.marginBottom]}>Ingredients</Text>
              <View style={styles.ingredients}>
                {data.ingredientList.map((item, index) =>
                  <View style={[styles.ingredient, even(index) && styles.even]}>
                    <View style={styles.dot}></View>
                    <Text style={[globalStyles.titleS, styles.ingredientTitle]}>
                      {item.ingredient.name}
                    </Text>
                    <Text style={[globalStyles.titleS, styles.ingredientSize]}>
                      {item.quantity}{" "}{item.unit}
                    </Text>
                  </View>
                )}
                {/* { (data.ingredientList.length + 1) % 3 == 0 && <View style={[styles.ingredient, styles.even]}></View>} */}
              </View>
            </View>
            {/* <View style={styles.wrapper}>
              <Text style={[globalStyles.titleL, styles.marginBottom]}>Intro</Text>
              <Text style={globalStyles.titleS}>
                I first put this recipe up on the blog nearly 3 years ago, and
                it’s totally stood the test of time!
              </Text>
            </View> */}
            <View style={styles.wrapper}>
              <Text style={[globalStyles.titleL, styles.marginBottom]}>Instructions</Text>
              {recipeInfo.data.recipeInfo.instructions.split('\r\n\r\n').map((step, index) =>
                <Text style={[globalStyles.titleS, styles.marginBottom]}>{index + 1}. {step}</Text>
              )}
              <View style={styles.buttonWrapper}>
                {inMealplan && mealplanCompletions.data.completedInMealplan.filter(recipe => recipe.id == id).length == 0 &&
                <Button onPress={() => {
                  completionAction('complete')
                  navigation.navigate('Edit Usages', {ingredientUsages: data.ingredientList, id: id})}}
                  >Recipe Complete</Button>}
                {recipeCompleted || inMealplan && mealplanCompletions.data.completedInMealplan.filter(recipe => recipe.id === id).length > 0 &&
                <ButtonInactive onPress={() => {
                  if (ingredientUsages.data.ingredientUsages.length > 0) {
                    setVisibility(true)
                  } else {
                    completionAction('uncomplete')
                  }
                }}
                  >Recipe Completed</ButtonInactive>}
              </View>
            </View>

            {/* <View style={styles.wrapper}>
              <Text style={[globalStyles.titleL, styles.marginBottom]}>
                Similar Recipes
              </Text>
              <CardList />
            </View> */}
          </ScrollView>
        </AnimatedView>
      </View>
      <Dialog
                visible={visible}
                dialogTitle={<DialogTitle title="Did you make the recipe already?" />}
                footer={
                  <DialogFooter>
                    <DialogButton
                      text="Yes"
                      onPress={() => {
                        setVisibility(false)
                        navigation.navigate('RecipeDetails', { id: id })
                      }}
                    />
                    <DialogButton
                      text="No, delete my ingredient usages."
                      onPress={() => {
                        completionAction('uncomplete')
                        setVisibility(false)
                        navigation.navigate('RecipeDetails', { id: id })
                      }}
                    />
                  </DialogFooter>}
                onTouchOutside={() => {
                  setVisibility(false)                  
                }}
              >
              </Dialog>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    zIndex: 10,
  },
  dragger: {
    height: 20,
  },
  cardHeader: {
    ...globalStyles.row,
    flexWrap: 'wrap',
  },
  ingredients: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap:'wrap',
  },
  ingredient: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 7,
    flexBasis: '46%',
  },
  even: {
    marginLeft: '4%',
  },
  ingredientTitle: {
    flexBasis: '60%',
  },
  ingredientSize: {
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
    marginTop: 10
  }})

export default RecipeDetails
