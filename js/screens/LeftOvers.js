import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native'
import { IngredientList, FloatingEditButton } from '../components'
import { COLORS, globalStyles } from '../styles'
import { useQuery } from '@apollo/client'
// import { produceData, meatData, frozenData, dairyData, nutsData } from '../mock'
import { leftoversQuery } from '../graphql/queries'

const Leftovers = ({ navigation }) => {

  const { data, error, loading } = useQuery(leftoversQuery)
  
  if (loading) return null
  if (error) console.error(error)

  const leftoverIngredients = [{
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

  for (leftover of data?.leftovers) {
    // console.log('leftover is: ', leftover)
    // console.log('leftover category is: ', leftover.ingredient.category)
    switch (leftover.ingredient.category) {
    case "produce":
      leftoverIngredients[0]['data'].push(leftover)
      break
    case "meat":
      leftoverIngredients[1]['data'].push(leftover)
      break
    case "frozen":
      leftoverIngredients[2]['data'].push(leftover)
      break
    case "dairy":
      leftoverIngredients[3]['data'].push(leftover)
      break
    case "nuts & seeds":
      leftoverIngredients[4]['data'].push(leftover) 
      break
    default:
      leftoverIngredients[5]['data'].push(leftover)
      break
    }
  }

  leftoversTitles = []
  for (let i = 0; i < 6; i++) {
    if (leftoverIngredients[i]['data'].length > 0) leftoversTitles.push(leftoverIngredients[i]['title'])
  }
    return (
      <SafeAreaView style={globalStyles.container}>
        <IngredientList data={leftoverIngredients} page={'Leftovers'} titles={leftoversTitles} componentName={"AddEditGrocery"} />
        <FloatingEditButton componentName={'AddEditGrocery'} />
      </SafeAreaView>
    )

//   const [structuredData, setStructuredData] = useState()

//   useEffect(() => {
//     setStructuredData([
//       {
//         title: 'Produce',
//         data: [...produceData],
//       },
//       {
//         title: 'Meat',
//         data: [...meatData],
//       },
//       {
//         title: 'Frozen',
//         data: [...frozenData],
//       },
//       {
//         title: 'Dairy',
//         data: [...dairyData],
//       },
//       {
//         title: 'Nuts & Seeds',
//         data: [...nutsData],
//       },
//     ])
//   }, [])
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

export default Leftovers
