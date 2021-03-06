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

import { usedRecipeAmountsMutation, removeAllUsagesMutation } from '../graphql/mutations'
// import { produceData, meatData, frozenData, dairyData, nutsData } from '../mock'

const EditUsages = ({ navigation, route }) => {
  const { ingredientUsages, id } = route.params

  const [usedRecipeAmountsReturned] = useMutation(usedRecipeAmountsMutation, { refetchQueries: [
    { query: leftoversQuery },
    { query: ingredientUsagesQuery, variables: {id: id} },
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

  const [removeUsages] = useMutation(removeAllUsagesMutation, { refetchQueries: [
    { query: leftoversQuery },
    { query: ingredientUsagesQuery, variables: {id: id} },
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

  const { data, refetch } = useQuery(ingredientUsagesQuery,  {
    variables: {id: id}, fetchPolicy: 'cache-and-network'
  })

  const lastWeekProv = useQuery(dashboardComStatsLastWeekByProvinceQuery)
  const last30DaysProv = useQuery(dashboardComStatsLast30DaysByProvinceQuery)
  const last90DaysProv = useQuery(dashboardComStatsLast90DaysByProvinceQuery)
  const last6MonthsProv = useQuery(dashboardComStatsLast6MonthsByProvinceQuery)
  const thisYearProv = useQuery(dashboardComStatsThisYearByProvinceQuery)
  const allHistoryProv = useQuery(dashboardComStatsAllHistoryByProvinceQuery)

  const lastWeekCity = useQuery(dashboardComStatsLastWeekByCityQuery)
  const last30DaysCity = useQuery(dashboardComStatsLast30DaysByCityQuery)
  const last90DaysCity = useQuery(dashboardComStatsLast90DaysByCityQuery)
  const last6MonthsCity = useQuery(dashboardComStatsLast6MonthsByCityQuery)
  const thisYearCity = useQuery(dashboardComStatsThisYearByCityQuery)
  const allHistoryCity = useQuery(dashboardComStatsAllHistoryByCityQuery)

  const lastWeekInd = useQuery(dashboardIndStatsLastWeekQuery)
  const last30DaysInd = useQuery(dashboardIndStatsLast30DaysQuery)
  const last90DaysInd = useQuery(dashboardIndStatsLast90DaysQuery)
  const last6MonthsInd = useQuery(dashboardIndStatsLast6MonthsQuery)
  const thisYearInd = useQuery(dashboardIndStatsThisYearQuery)
  const allHistoryInd = useQuery(dashboardIndStatsAllHistoryQuery)

  const refetchAll = () => {
    lastWeekInd.refetch()
    last30DaysInd.refetch()
    last90DaysInd.refetch()
    last6MonthsInd.refetch()
    thisYearInd.refetch()
    allHistoryInd.refetch()

    lastWeekCity.refetch()
    last30DaysCity.refetch()
    last90DaysCity.refetch()
    last6MonthsCity.refetch()
    thisYearCity.refetch()
    allHistoryCity.refetch()

    lastWeekProv.refetch()
    last30DaysProv.refetch()
    last90DaysProv.refetch()
    last6MonthsProv.refetch()
    thisYearProv.refetch()
    allHistoryProv.refetch()
  }

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
      if (!['water', 'ice cube'].includes(link.ingredient.name.toLowerCase())) {
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
      }

    let numOfCat = 0
    let lastCat = 'Produce'
    for (let info of usages) {
      if (info['data'].length > 0) {
        numOfCat += 1
        lastCat = info['title']
      }
    }
    const fillSpace = {name: 'FillSpace', quantity: '1'}
    if (numOfCat > 0) {
      usages.find(info => info['title'] === lastCat)['data'].push(fillSpace, fillSpace)
    }

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
          const input = { recipeId: id }
          if (data?.ingredientUsages?.length > 0) {
            removeUsages({ variables: { value: input }}).then(() => {
              // if (data.removeAllUsages.status)
                usedRecipeAmountsReturned({ variables: { value: input }}).then(() => {
                  refetch()
                  refetchAll()
                })
            })
          } else {
            usedRecipeAmountsReturned({variables: { value: input }}).then(() => {
              refetch()
              refetchAll()
            })
          }
          navigation.navigate('Recipe Details', { id: id, shouldFetch: true })}
        }>
          <Text style={styles.text}>I used the exact recipe amounts!</Text>
        </Pressable>
      </View>
      <IngredientList data={data?.ingredientUsages?.length > 0 ? createUsages(data.ingredientUsages) : createUsages(ingredientUsages)} page={'Edit Usages'} titles={usagesTitles} componentName={'Update Usage'} recipeId={id} />
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
