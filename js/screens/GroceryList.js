import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { COLORS, globalStyles } from '../styles'
import { GroceryListTabs } from '../navigation'
import { produceData, meatData, frozenData, dairyData, nutsData } from '../mock'

const GroceryList = () => {
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
    <SafeAreaView style={styles.container}>
      <GroceryListTabs data={structuredData} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    backgroundColor: COLORS.WHITE,
  },
})

export default GroceryList
