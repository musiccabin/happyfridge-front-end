import React, { useState, useEffect, createRef } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { COLORS } from '../styles'
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
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
})

export default GroceryList
