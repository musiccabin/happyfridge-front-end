import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyles } from '../styles'
import { GroceryListTabs } from '../navigation'
import { produceData, meatData, frozenData, dairyData, nutsData } from '../mock'

const GroceryList = () => {
  const [structuredData, setStructuredData] = useState()
  const { data, error, loading } = useQuery(groceriesQuery)
  if (loading) return null
  if (error) console.error(error)

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
      <GroceryListTabs data={structuredData} />
    </SafeAreaView>
  )
}

export default GroceryList
