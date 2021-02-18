import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { COLORS } from '../styles'
import { IngredientList } from '../components'

const Tab = createMaterialTopTabNavigator()

const GroceryListTabs = ({ data }) => {

  const toBuy = [{
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

  const completed = [{
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

  for (grocery of data) {
    switch (grocery.category) {
    case "produce":
      if (grocery.isCompleted) {
        completed[0]['data'].push(grocery)
      } else {
        toBuy[0]['data'].push(grocery)
      } 
      break
    case "meat":
      if (grocery.isCompleted) {
        completed[1]['data'].push(grocery)
      } else {
        toBuy[1]['data'].push(grocery)
      } 
      break
    case "frozen":
      if (grocery.isCompleted) {
        completed[2]['data'].push(grocery)
      } else {
        toBuy[2]['data'].push(grocery)
      } 
      break
    case "dairy":
      if (grocery.isCompleted) {
        completed[3]['data'].push(grocery)
      } else {
        toBuy[3]['data'].push(grocery)
      } 
      break
    case "nuts & seeds":
      if (grocery.isCompleted) {
        completed[4]['data'].push(grocery)
      } else {
        toBuy[4]['data'].push(grocery)
      } 
      break
    default:
      if (grocery.isCompleted) {
        completed[5]['data'].push(grocery)
      } else {
        toBuy[5]['data'].push(grocery)
      } 
      break
    }
  }

  toBuyTitles = []
  for (let i = 0; i < 6; i++) {
    if (toBuy[i]['data'].length > 0) toBuyTitles.push(toBuy[i]['title'])
  }

  completedTitles = []
  for (let i = 0; i < 6; i++) {
    if (completed[i]['data'].length > 0) completedTitles.push(completed[i]['title'])
  }

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
        {() => <IngredientList data={toBuy} componentName={"Grocery Details"} page={'Grocery'} titles={toBuyTitles} iconName='check' />}
      </Tab.Screen>
      <Tab.Screen name='Completed'>
        {() => <IngredientList data={completed} componentName={"Grocery Details"} page={'Grocery'} titles={completedTitles} iconName='add' />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

export default GroceryListTabs
