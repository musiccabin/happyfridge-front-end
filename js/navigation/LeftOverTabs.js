import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { LeftOverList } from '../components'
import { COLORS } from '../styles'

const Tab = createMaterialTopTabNavigator()

const LeftOverTabs = ({ data }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 11,
        },
        tabStyle: {
          height: 45,
          borderBottomWidth: 0.3,
          borderTopWidth: 0,
        },
        inactiveTintColor: COLORS.PRIMARY_FONT,
        activeTintColor: COLORS.PRIMARY,
        indicatorStyle: { backgroundColor: COLORS.PRIMARY },
      }}
    >
      <Tab.Screen
        name='produce'
        children={() => <LeftOverList data={data} />}
      />
      <Tab.Screen name='meat' children={() => <LeftOverList data={data} />} />
      <Tab.Screen name='frozen' children={() => <LeftOverList data={data} />} />
      <Tab.Screen name='dairy' children={() => <LeftOverList data={data} />} />
      <Tab.Screen name='other' children={() => <LeftOverList data={data} />} />
    </Tab.Navigator>
  )
}

export default LeftOverTabs
