import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native'
import { IngredientList, FloatingEditButton } from '../components'
import { COLORS, globalStyles } from '../styles'
import { useMutation, useQuery } from '@apollo/client'
import { ingredientUsagesQuery } from '../graphql/queries'
import {
  leftoversQuery,
  dashboardIndStatsLastWeekQuery,
  dashboardIndStatsLast30DaysQuery,
  dashboardIndStatsLast6MonthsQuery,
  dashboardIndStatsLast90DaysQuery,
  dashboardIndStatsThisYearQuery,
  dashboardIndStatsAllHistoryQuery,
  dashboardComStatsLastWeekByCityQuery,
  // dashboardComStatsLastWeekByRegionQuery,
  dashboardComStatsLastWeekByProvinceQuery,
  dashboardComStatsLast30DaysByCityQuery,
  // dashboardComStatsLast30DaysByRegionQuery,
  dashboardComStatsLast30DaysByProvinceQuery,
  dashboardComStatsLast90DaysByCityQuery,
  // dashboardComStatsLast90DaysByRegionQuery,
  dashboardComStatsLast90DaysByProvinceQuery,
  dashboardComStatsLast6MonthsByCityQuery,
  // dashboardComStatsLast6MonthsByRegionQuery,
  dashboardComStatsLast6MonthsByProvinceQuery,
  dashboardComStatsThisYearByCityQuery,
  // dashboardComStatsThisYearByRegionQuery,
  dashboardComStatsThisYearByProvinceQuery,
  dashboardComStatsAllHistoryByCityQuery,
  // dashboardComStatsAllHistoryByRegionQuery,
  dashboardComStatsAllHistoryByProvinceQuery
} from '../graphql/queries'

import { usedRecipeAmountsMutation } from '../graphql/mutations'
// import { produceData, meatData, frozenData, dairyData, nutsData } from '../mock'

const EditUsages = ({ navigation, route }) => {
  const { ingredientUsages, id } = route.params

  const [usedRecipeAmountsReturned] = useMutation(usedRecipeAmountsMutation, { refetchQueries: [
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
  const { data } = useQuery(ingredientUsagesQuery,  {
    variables: {id: id}, fetchPolicy: 'cache-and-network'
  })

  let usages = [{
    title: 'Produce',
    data: [],
  },
  {
    title: 'Meat',
    data: [],
  },
  {
    title: 'Frozen',
    data: [],
  },
  {
    title: 'Dairy',
    data: [],
  },
  {
    title: 'Nuts & Seeds',
    data: [],
  },
  {
    title: 'Other',
    data: [],
  },
  ]

  const createUsages = (ingredientUsages) => {  
    for (link of ingredientUsages) {
      // console.log('ingredient is: ', ingredient)
      switch (link.ingredient.category) {
      case "produce":
        usages[0]['data'].push(link)
        break
      case "meat":
        usages[1]['data'].push(link)
        break
      case "frozen":
        usages[2]['data'].push(link)
        break
      case "dairy":
        usages[3]['data'].push(link)
        break
      case "nuts & seeds":
        usages[4]['data'].push(link) 
        break
      default:
        usages[5]['data'].push(link)
        break
      }
    }

    // console.log('usages: ', usages)

    return usages
  }

  const usagesTitles = []
  for (let i = 0; i < 6; i++) {
    if (usages[i]['data'].length > 0) usagesTitles.push(usages[i]['title'])
  }

  // console.log('usages is: ', usages)
  // console.log('usagesTitles are: ', usagesTitles)

  return (
    <View style={styles.container}>
      <View style={styles.separator}>
        <Text style={styles.title}>
          How much of each ingredient {'\n'} did you use?
        </Text>
        <Pressable onPress={() => {
          // console.log('id is: ', id)
          usedRecipeAmountsReturned({variables: {value: {recipeId: id}}}).then((data) => {            
            if (data.status) usagesFromQuery.refetch()
          })
          navigation.navigate('Recipe Details', { id: id })}
        }>
          <Text style={styles.text}>I used the exact recipe amounts!</Text>
        </Pressable>
      </View>
      <IngredientList data={data.ingredientUsages.length > 0 ? createUsages(data.ingredientUsages) : createUsages(ingredientUsages)} page={'Edit Usages'} titles={usagesTitles} componentName={'Update Usage'} recipeId={id} />
      <FloatingEditButton componentName={'Update Usage'} recipeId={id} />
    </View>
    )
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  title: {
    ...globalStyles.titleXL,
    textAlign: 'center',
    paddingBottom: 15,
  },
  text: {
    ...globalStyles.anchorText,
    textAlign: 'center',
  },
  separator: {
    ...globalStyles.content,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SEPARATOR,
    paddingBottom: 15,
  },
})

export default EditUsages
