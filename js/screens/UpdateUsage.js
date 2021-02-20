import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS, globalStyles } from '../styles'
import { Button, CategoryUnit, Quantity, UsageBar } from '../components'

import { client } from '../apollo'
import { useMutation, useQuery } from '@apollo/client'
import { ingredientUsagesQuery, leftoversQuery } from '../graphql/queries'
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

import { updateUsageMutation } from '../graphql/mutations'

const UpdateUsage = ({ route }) => {
    const navigation = useNavigation()

    const { item, recipeId } = route.params
    const ingredientName = item?.ingredient?.name
    const ingredientCat = item?.ingredient?.category

    const category = ["Produce", "Dairy", "Meat", "Frozen", "Nuts & Seeds", "Other"]
    // const ingredientArray = ["Apple", "Mango", "Carrot", "Spice", "Orange", "Cajun"]
    const parts = ["", "1/4", "1/3", "1/2", "2/3", "3/4"]
    // const units = ["kg", "lb"]

    let wholeInit = 0
    let partInit = parts[0]
    const quantitySplit = item.quantity.split(' ')
    let firstPart = quantitySplit[0]
    if (!firstPart.includes('/')) {
    wholeInit = parseInt(firstPart)
    quantitySplit.shift()
    }
    if (quantitySplit.length > 0) partInit = quantitySplit[0]

    const [categoryTitle, setCategoryTitle] = useState(ingredientCat.charAt(0).toUpperCase() + ingredientCat.slice(1))
    const [wholeTitle, setWholeTitle] = useState(wholeInit)
    const [partTitle, setPartTitle] = useState(partInit)
    const [unitTitle, setUnitTitle] = useState(item.unit)
    const [ingredientValue, setIngredientValue] = useState(ingredientName)
    // const [ingredients, setIngredients] = useState(ingredientArray)
    const [isUserTyping, setIsUserTyping] = useState(false)
    const [failedStyling, setFailedStyling] = useState(false)
    const [highlightStyling, setHighlightStyling] = useState(false)

    const { data, refetch } = useQuery(ingredientUsagesQuery, { variables: { id: recipeId }, notifyOnNetworkStatusChange: true, fetchPolicy: 'cache-and-network' })
    const [updateUsage] = useMutation(updateUsageMutation, { refetchQueries: [
      { query: ingredientUsagesQuery, variables: { id: recipeId }},
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

    const filteredIngredientArray = value => {
      let tempArray = ingredientArray.filter(item => {
        if (item.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
          return item
      })
      setIngredients(tempArray)
    }

    const updateCurrentUsage = async () => {
        let quantity = wholeTitle + " " + partTitle
        if (partTitle === parts[0]) quantity = wholeTitle
        if (wholeTitle == 0) quantity = partTitle
        const data = await updateUsage({
            variables: {
                value: {
                    recipeId: recipeId,
                    attributes: {
                        ingredientName: ingredientName,
                        quantity: quantity.toString(),
                        unit: unitTitle,
                        category: ingredientCat
                    }
                }
            }
        })
        const dataReturned = data?.data?.updateUsage
        if (dataReturned.status) {
          refetch()
      } else {
          console.log(dataReturned?.errors?.fullMessages)
      }
    }
  
      const Separator = () => {
          return <View style={styles.separatorLine}></View>
      }

    // const navigation = useNavigation()
    // const category = ["Dairy", "Nuts and Seeds", "Meat", "Produce", "Frozen"]
    // const parts = ["1/4", "1/3", "1/3", "2/3", "0"]
    // const units = ["kg", "lb"]
    // const [categoryTitle, setCategoryTitle] = useState(category[0])
    // const [wholeTitle, setWholeTitle] = useState("1")
    // const [partTitle, setPartTitle] = useState(parts[0])
    // const [unitTitle, setUnitTitle] = useState(units[0])

    return (
        <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
          setIsUserTyping(false)
          setHighlightStyling(false)
          setFailedStyling(false)
        }}
      >
        <View style={styles.container}>
          <UsageBar
            name={ingredientName}
            quantity={(wholeTitle == 0 ? '' : wholeTitle) + (partTitle.includes('/') ? " " + partTitle : "")}
            unit={unitTitle}
          />
          <View style={styles.inputContainer}>
            <View style={styles.leftContainer}>
              {isUserTyping && (
                <FlatList
                  style={styles.list}
                  // data={ingredients}
                  ItemSeparatorComponent={Separator}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableHighlight
                      onPress={() => {
                        // setIngredientValue(item)
                        setIsUserTyping(false)
                        setHighlightStyling(false)
                      }}
                      activeOpacity={0.1}
                      underlayColor={COLORS.SECONDARY}
                    >
                      <Text style={styles.listText}>{item}</Text>
                    </TouchableHighlight>
                  )}
                />
              )}
              <View style={{ marginTop: 30 }}>
                <Quantity
                  whole={wholeTitle}
                  part={partTitle}
                  wholeCallback={value => setWholeTitle(value)}
                  partCallback={value => setPartTitle(value)}
                  parts={parts}
                />
              </View>
              <View style={styles.rightContainer}>
                <CategoryUnit
                    ingredient={ingredientValue}
                    categories={category}
                    // units={units}
                    categoryCallback={(value) => setCategoryTitle(value)}
                    unitCallback={(value) => setUnitTitle(value)}
                    callbackIngredientHighlight={() => setHighlightStyling(false)}
                    ingredientCategory={categoryTitle}
                    defaultUnitSelection={unitTitle}
                />
                <Button
                    children={"Save"}
                    style={styles.button}
                    onPress={() => {
                        setHighlightStyling(false)
                        setFailedStyling(false)
                        updateCurrentUsage(item.id)
                        console.log('data is: ', data)
                        navigation.goBack()
                        // navigation.navigate('Edit Usages', {ingredientUsages: data.ingredientUsages, id: recipeId})
                    }} />
         {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
             <View style={styles.container}>
                 <UsageBar
                    categoryTitle={categoryTitle}
                    wholeTitle={wholeTitle}
                    partTitle={partTitle}
                    unitTitle={unitTitle}
                />
                <View style={styles.parentContainer}>
                    <View style={styles.leftChildContainer}>
                        <CategoryUnit
                            categories={category}
                            units={units}
                            categoryCallback={(value) => setCategoryTitle(value)}
                            unitCallback={(value) => setUnitTitle(value)}
                        />

                    </View>
                    <View style={styles.rightChildContainer}>
                        <Quantity
                            wholeCallback={(value) => setWholeTitle(value)}
                            partCallback={(value) => setPartTitle(value)}
                            parts={parts}
                        />
                        <View style={styles.buttonContainer}>
                            <Button children={"Save"} style={{ width: 110 }} /> */}
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container,
        ...globalStyles.content,
        paddingTop: 50,
        backgroundColor: COLORS.WHITE,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    parentContainer: {
        flexDirection: 'row',
        marginTop: 70,
        justifyContent: 'space-between',
    },
    leftChildContainer: {
        flexBasis: '40%',
        paddingEnd: 7
    },
    rightChildContainer: {
        flexBasis: '60%',
        paddingStart: 7,
        marginTop: -7
    },
    buttonContainer: {
        marginTop: 38,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        zIndex: -2
    }
});

export default UpdateUsage