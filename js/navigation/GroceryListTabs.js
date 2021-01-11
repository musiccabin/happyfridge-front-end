import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { COLORS } from '../styles'
import { IngredientList } from '../components'

const Tab = createMaterialTopTabNavigator()

const GroceryListTabs = ({ data }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 14,
          textTransform: 'capitalize',
        },
        style: {
          borderTopWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.SEPARATOR,
        },
        inactiveTintColor: COLORS.PRIMARY_FONT,
        activeTintColor: COLORS.PRIMARY,
        indicatorStyle: {
          backgroundColor: COLORS.PRIMARY,
          top: 0,
        },
      }}
    >
      <Tab.Screen name='To Buy'>
        {() => <IngredientList data={data} />}
      </Tab.Screen>
      <Tab.Screen name='Completed'>
        {() => <IngredientList data={data} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

export default GroceryListTabs
