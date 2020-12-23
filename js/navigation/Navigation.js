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
  UpdateUsage,
  GroceryList,
  Profile,
} from '../screens'
import { globalStyles } from '../styles'
import { NavHeader } from '../components'

const HomeStack = createStackNavigator()

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleStyle: { ...globalStyles.navHeaderWrapper },
        headerStyle: { ...globalStyles.navHeaderTitle },
        header: ({ scene, navigation }) => (
          <NavHeader
            scene={scene}
            navigation={navigation}
            profileIcon={false}
            renderTitle={false}
          />
        ),
      }}
    >
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

const GroceryListStack = createStackNavigator()

const GroceryScreen = () => {
  return (
    <GroceryListStack.Navigator
      screenOptions={{
        headerTitleStyle: { ...globalStyles.navHeaderWrapper },
        headerStyle: { ...globalStyles.navHeaderTitle },
        header: ({ scene, navigation }) => (
          <NavHeader scene={scene} navigation={navigation} />
        ),
      }}
    >
      <GroceryListStack.Screen name='Grocery List' component={GroceryList} />
    </GroceryListStack.Navigator>
  )
}

const ProfileStack = createStackNavigator()

const ProfileScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerTitleStyle: { ...globalStyles.navHeaderWrapper },
        headerStyle: { ...globalStyles.navHeaderTitle },
        header: ({ scene, navigation }) => (
          <NavHeader
            scene={scene}
            navigation={navigation}
            profileIcon={false}
          />
        ),
      }}
    >
      <ProfileStack.Screen name='Profile' component={Profile} />
    </ProfileStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='ShoppingList'>
        <Tab.Screen name='Home' component={HomeStackScreen} />
        <Tab.Screen name='ShoppingList' component={ShoppingListScreen} />
        <Tab.Screen name='Favorites' component={FavoritesScreen} />
        <Tab.Screen name='LeftOvers' component={LeftOversScreen} />
        <Tab.Screen name='Preferences' component={PreferencesScreen} />
        <Tab.Screen name='MealPlan' component={MealPlanScreen} />
        <Tab.Screen name='Register' component={RegisterScreen} />
        <Tab.Screen name='GroceryList' component={GroceryScreen} />
        <Tab.Screen name='Profile' component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
