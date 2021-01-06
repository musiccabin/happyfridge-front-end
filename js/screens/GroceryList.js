import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyles } from '../styles'
import { GroceryListTabs } from '../navigation'
import { produceData, meatData, frozenData, dairyData, nutsData } from '../mock'

const GroceryList = ({ navigation }) => {
  const [structuredData, setStructuredData] = useState()

  useEffect(() => {
    setStructuredData([
      {
        title: 'Produce',
        data: [...produceData],
      },
      {
        title: 'Meat',
        data: [...meatData],
      },
      {
        title: 'Frozen',
        data: [...frozenData],
      },
      {
        title: 'Dairy',
        data: [...dairyData],
      },
      {
        title: 'Nuts & Seeds',
        data: [...nutsData],
      },
    ])
  }, [])

  return (
    <SafeAreaView style={globalStyles.container}>
      <GroceryListTabs data={structuredData} navigation={navigation} />
    </SafeAreaView>
  )
}

export default GroceryList
