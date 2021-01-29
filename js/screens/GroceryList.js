import React from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyles } from '../styles'
import { GroceryListTabs } from '../navigation'

import { useQuery } from '@apollo/client'
import { groceriesQuery } from '../graphql/queries'
import { FloatingEditButton } from '../components'

const GroceryList = () => {
  const { data, error, loading } = useQuery(groceriesQuery)
  if (loading) return null
  if (error) console.error(error)

  return (
    <SafeAreaView style={globalStyles.container}>
      <GroceryListTabs data={data.groceries} />
      <FloatingEditButton componentName={'AddEditGrocery'} />
    </SafeAreaView>
  )
}

export default GroceryList
