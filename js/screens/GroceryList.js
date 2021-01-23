import React from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyles } from '../styles'
import { GroceryListTabs } from '../navigation'
import { useQuery } from '@apollo/client'
import { groceriesQuery } from '../graphql/queries'

const GroceryList = () => {
  const { data, error, loading } = useQuery(groceriesQuery)
  if (loading) return null
  if (error) console.error(error)

  return (
    <SafeAreaView style={globalStyles.container}>
      <GroceryListTabs data={data.groceries} />
    </SafeAreaView>
  )
}

export default GroceryList
