import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyles } from '../styles'
import { GroceryListTabs } from '../navigation'
import { useQuery } from '@apollo/client'
import { groceriesQuery } from '../graphql/queries'
// import { produceData, meatData, frozenData, dairyData, nutsData } from '../mock'

const GroceryList = () => {
  const [structuredData, setStructuredData] = useState()
  const { data, error, loading } = useQuery(groceriesQuery)
  if (loading) return null
  if (error) console.error(error)

  useEffect(() => {
    const allData = data.groceriesQuery
    const produceData = []
    const meatData = []
    const frozenData = []
    const dairyData = []
    const nutsData = []
    const otherData = []

    for (grocery of allData) {
      switch (grocery.category) {
        case "produce":
          produceData.push(grocery)
          break
        case "meat":
          meatData.push(grocery)
          break
        case "frozen":
          frozenData.push(grocery)
          break
        case "dairy":
          dairyData.push(grocery)
          break
        case "nutsAndSeeds":
          nutsData.push(grocery)
          break
        default:
          otherData.push(grocery)
          break
      }

    }
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
      {
        title: 'Other',
        data: [...otherData],
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
