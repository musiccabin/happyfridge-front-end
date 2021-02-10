import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native'
import { IngredientList, FloatingEditButton } from '../components'
import { COLORS, globalStyles } from '../styles'
import { useMutation, useQuery } from '@apollo/client'
import { ingredientUsagesQuery } from '../graphql/queries'
import { usedRecipeAmountsMutation } from '../graphql/mutations'
// import { produceData, meatData, frozenData, dairyData, nutsData } from '../mock'

const EditUsages = ({ navigation, route }) => {
  const { ingredientUsages, id } = route.params

  const usages = [{
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

  const usagesTitles = []
  for (let i = 0; i < 6; i++) {
    if (usages[i]['data'].length > 0) usagesTitles.push(usages[i]['title'])
  }

  // console.log('usages is: ', usages)
  // console.log('usagesTitles are: ', usagesTitles)

  const [usedRecipeAmountsReturned] = useMutation(usedRecipeAmountsMutation)
  const usagesFromQuery = useQuery(ingredientUsagesQuery,  {
    variables: {id: id}
  })

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
          navigation.navigate('RecipeDetails', { id: id })}
        }>
          <Text style={styles.text}>I used the exact recipe amounts!</Text>
        </Pressable>
      </View>
      <IngredientList data={usages} page={'EditUsages'} titles={usagesTitles} componentName={"UpdateUsage"} />
      <FloatingEditButton componentName={'UpdateUsage'} />
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
