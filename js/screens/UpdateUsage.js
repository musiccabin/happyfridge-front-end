import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TextInput,
  TouchableHighlight,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS, globalStyles } from '../styles'
import { Button, CategoryUnit, Quantity, UsageBar } from '../components'

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

import { newUsageMutation, updateUsageMutation } from '../graphql/mutations'

const UpdateUsage = ({ route }) => {
    const navigation = useNavigation()

    const { item, recipeId, editIngredient } = route.params
    const ingredientName = item?.ingredient?.name
    const ingredientCat = item?.ingredient?.category

    const category = ["Produce", "Dairy", "Meat", "Frozen", "Nuts & Seeds", "Other"]
    // const ingredientArray = ["Apple", "Mango", "Carrot", "Spice", "Orange", "Cajun"]
    const parts = ["   ", "1/4", "1/3", "1/2", "2/3", "3/4"]
    // const units = ["kg", "lb"]

    let wholeInit = 0
    let partInit = parts[0]
    if (!editIngredient) {
      const quantitySplit = item.quantity.split(' ')
      let firstPart = quantitySplit[0]
      if (!firstPart.includes('/')) {
        wholeInit = parseInt(firstPart)
        quantitySplit.shift()
      }
      if (quantitySplit.length > 0) partInit = quantitySplit[0]
    }

    const [categoryTitle, setCategoryTitle] = useState(category[0])
    const [wholeTitle, setWholeTitle] = useState(wholeInit)
    const [partTitle, setPartTitle] = useState(partInit)
    const [unitTitle, setUnitTitle] = useState('   ')
    const [ingredientValue, setIngredientValue] = useState('')
    // const [ingredients, setIngredients] = useState(ingredientArray)
    const [isUserTyping, setIsUserTyping] = useState(false)
    const [failedStyling, setFailedStyling] = useState(false)
    const [highlightStyling, setHighlightStyling] = useState(false)

    const { data, refetch } = useQuery(ingredientUsagesQuery, { variables: { id: recipeId }, notifyOnNetworkStatusChange: true, fetchPolicy: 'cache-and-network' })
    const [newUsage] = useMutation(newUsageMutation, {refetchQueries: [
      {query: ingredientUsagesQuery, variables: { id: recipeId }},
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
    ]}, { awaitRefetchQueries: true })
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

    const createNewUsage = async () => {
      console.log('it hit me!')
      let quantity = wholeTitle + " " + partTitle
      if (partTitle === parts[0]) quantity = wholeTitle.toString()
      if (wholeTitle == 0) quantity = partTitle
      const data = await newUsage({
          variables: {
              value: {
                  recipeId: recipeId,
                  attributes: {
                      ingredientName: ingredientValue.toLowerCase(),
                      quantity: quantity.toString(),
                      unit: unitTitle,
                      category: categoryTitle.toLowerCase()
                  }
              }
          }
      })
      if (data.data.newUsage.status) {
          Alert.alert(
              "Ingredient Usage Added",
              "",
              [
                  { text: "OK", onPress: () => {
                    refetch()
                  } }
              ],
              // { cancelable: false }
          )
      } else {
        console.log(data.data.newUsage.errors.fullMessages)
          Alert.alert(
              data.data.newUsage.errors.fullMessages[0],
              "",
              [
                  { text: "OK", onPress: () => { } }
              ],
              // { cancelable: false }
          )
      }
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

      const styles = StyleSheet.create({
        container: {
            ...globalStyles.container,
            ...globalStyles.content,
            paddingTop: 40,
            paddingHorizontal: 30,
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
        },
        input: {
          borderBottomColor: highlightStyling ? COLORS.PRIMARY : failedStyling ? COLORS.SECONDARY : COLORS.PRIMARY_FONT,
          borderBottomWidth: 1,
          marginVertical: 20,
          paddingBottom: 4,
          paddingHorizontal: 4,
          color: ingredientName ? COLORS.SECONDARY_FONT : COLORS.PRIMARY_FONT
        },
        ingredientText: {
            // color: highlightStyling ? COLORS.PRIMARY : failedStyling ? COLORS.SECONDARY : COLORS.PRIMARY_FONT
            color: COLORS.PRIMARY,
            fontWeight: '600'
        },
        list: {
          backgroundColor: COLORS.PRIMARY_ICON,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          position: 'absolute',
          right: 0,
          left: 0,
          top: 59,
          zIndex: 100
        },
        listText: {
            paddingVertical: 10,
            paddingHorizontal: 10,
        },
        separatorLine: {
            borderBottomColor: COLORS.PRIMARY_FONT,
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
        button: {
            marginTop: 60,
            width: 145,
            zIndex: -2
        },
      })

      useEffect(() => {
        ingredientName && setIngredientValue(ingredientName)
        ingredientCat && setCategoryTitle(ingredientCat)
        item.unit && setUnitTitle(item.unit)
    }, [])

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
            name={editIngredient ? ingredientValue : ingredientName}
            quantity={(wholeTitle == 0 ? '' : wholeTitle) + (partTitle.includes('/') ? " " + partTitle : "")}
            unit={unitTitle}
          />
            {editIngredient && <Text style={styles.ingredientText}>Ingredient</Text>}
            {editIngredient && <TextInput
              style={styles.input}
              // editable={editIngredient}
              onChangeText={value => {
                setIngredientValue(value)
                setIsUserTyping(true)
                setHighlightStyling(true)
                value.length == 0 && setIsUserTyping(false)
                  // : filteredIngredientArray(value)
              }}
              value={ingredientValue}
              maxLength={50}
            />}
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
            <Quantity
              whole={wholeTitle}
              part={partTitle}
              wholeCallback={value => setWholeTitle(value)}
              partCallback={value => setPartTitle(value)}
              parts={parts}
            />
          <View>
            <CategoryUnit
                ingredient={ingredientValue}
                categories={category}
                // units={units}
                categoryCallback={(value) => setCategoryTitle(value)}
                unitCallback={(value) => setUnitTitle(value)}
                callbackIngredientHighlight={() => setHighlightStyling(false)}
                ingredientCategory={ingredientCat || categoryTitle}
                defaultUnitSelection={unitTitle}
            />
            <Button
                children={"Save"}
                style={styles.button, { marginTop: 50 }}
                onPress={() => {
                    setHighlightStyling(false)
                    setFailedStyling(false)
                    if (ingredientValue.slice(-1) == 's' || ingredientValue.slice(-2) == 'es') choiceAlert()
                    else editIngredient ? createNewUsage() : updateCurrentUsage(item.id)
                    // console.log('data is: ', data)
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
        </TouchableWithoutFeedback>
    )
}

export default UpdateUsage