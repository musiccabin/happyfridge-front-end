import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import {
  Home,
  ShoppingList,
  Favorites,
  LeftOvers,
  About,
  RecipeDetails,
  SignUp,
  Login,
  MealPlan,
  Preferences,
  UpdateUsage
} from '../screens'

const HomeStack = createStackNavigator()

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Home' component={Home} />
      <HomeStack.Screen name='RecipeDetails' component={RecipeDetails} />
    </HomeStack.Navigator>
  )
}

const ShoppingListStack = createStackNavigator()

const ShoppingListScreen = () => {
  return (
    <ShoppingListStack.Navigator>
      <ShoppingListStack.Screen name='ShoppingList' component={ShoppingList} />
    </ShoppingListStack.Navigator>
  )
}

const FavoritesStack = createStackNavigator()

const FavoritesScreen = () => {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name='Favorites' component={Favorites} />
    </FavoritesStack.Navigator>
  )
}

const LeftOversStack = createStackNavigator()

const LeftOversScreen = () => {
  return (
    <LeftOversStack.Navigator>
      <LeftOversStack.Screen name='LeftOvers' component={LeftOvers} />
      <HomeStack.Screen name='UpdateUsage' component={UpdateUsage} />
    </LeftOversStack.Navigator>
  )
}

const AboutStack = createStackNavigator()

const AboutScreen = () => {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen name='About' component={About} />
    </AboutStack.Navigator>
  )
}

const PreferencesStack = createStackNavigator()

const PreferencesScreen = () => {
  return (
    <PreferencesStack.Navigator>
      <PreferencesStack.Screen name='Preferences' component={Preferences} />
    </PreferencesStack.Navigator>
  )
}

const RegisterStack = createStackNavigator()

const RegisterScreen = () => {
  return (
    <RegisterStack.Navigator>
      <RegisterStack.Screen name='SignUp' component={SignUp} />
      <RegisterStack.Screen name='Login' component={Login} />
    </RegisterStack.Navigator>
  )
}

const MealPlanStack = createStackNavigator()

const MealPlanScreen = () => {
  return (
    <MealPlanStack.Navigator>
      <MealPlanStack.Screen name='MealPlan' component={MealPlan} />
    </MealPlanStack.Navigator>
  )
}



const Tab = createBottomTabNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={HomeStackScreen} />
        <Tab.Screen name='ShoppingList' component={ShoppingListScreen} />
        <Tab.Screen name='Favorites' component={FavoritesScreen} />
        <Tab.Screen name='LeftOvers' component={LeftOversScreen} />
        <Tab.Screen name='Preferences' component={PreferencesScreen} />
        <Tab.Screen name='MealPlan' component={MealPlanScreen} />
        <Tab.Screen name='Register' component={RegisterScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
