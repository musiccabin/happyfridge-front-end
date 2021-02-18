import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import {
  Home,
  ShoppingList,
  Favorites,
  Completed,
  Leftovers,
  About,
  RecipeDetails,
  // EditUsages,
  SignUp,
  Login,
  MealPlan,
  Preferences,
  UpdateUsage,
  GroceryList,
  Profile,
  AddEditGrocery,
  AddEditLeftover,
  Dashboard
} from '../screens'
import EditUsages from '../screens/EditUsages.js'
import { globalStyles } from '../styles'
import { NavHeader } from '../components'
import {
  HomeIcon,
  HomeInActiveIcon,
  GroceryIcon,
  GroceryInActiveIcon,
  FavoriteIcon,
  FavoriteInActiveIcon,
  MealPlanIcon,
  MealPlanInActiveIcon,
  LeftoverIcon,
  LeftoverInActiveIcon,
} from '../../assets/menu-icons'
import { Context } from '../context'

const navigationStyle = {
  headerTitleStyle: { ...globalStyles.navHeaderWrapper },
  headerStyle: { ...globalStyles.navHeaderTitle },
}

const HomeStack = createStackNavigator()

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        ...navigationStyle,
        header: ({ scene, navigation }) => (
          <NavHeader
            scene={scene}
            navigation={navigation}
            renderTitle={false}
          />
        ),
      }}
    >
      <HomeStack.Screen name='Home' component={Home} />
      <HomeStack.Screen name='RecipeDetails' component={RecipeDetails} />
      <HomeStack.Screen name='EditUsages' component={EditUsages} />
    </HomeStack.Navigator>
  )
}

// const EditUsagesStack = createStackNavigator()

// const EditUsagesStackScreen = () => {
//   return (
//     <EditUsagesStack.Navigator
//       screenOptions={{
//         ...navigationStyle,
//         header: ({ scene, navigation }) => (
//           <NavHeader
//             scene={scene}
//             navigation={navigation}
//             renderTitle={false}
//           />
//         ),
//       }}
//     >
//       <EditUsagesStack.Screen name='EditUsages' component={EditUsages}/>
//       {/* <HomeStack.Screen name='RecipeDetails' component={RecipeDetails} /> */}
//     </EditUsagesStack.Navigator>
//   )
// }

const ShoppingListStack = createStackNavigator()

const ShoppingListScreen = () => {
  return (
    <ShoppingListStack.Navigator
      screenOptions={{
        ...navigationStyle,
        header: ({ scene, navigation }) => (
          <NavHeader scene={scene} navigation={navigation} />
        ),
      }}
    >
      <ShoppingListStack.Screen name='ShoppingList' component={ShoppingList} />
    </ShoppingListStack.Navigator>
  )
}

const FavoritesStack = createStackNavigator()

const FavoritesScreen = () => {
  return (
    <FavoritesStack.Navigator
      screenOptions={{
        ...navigationStyle,
        header: ({ scene, navigation }) => (
          <NavHeader scene={scene} navigation={navigation} />
        ),
      }}
    >
      <FavoritesStack.Screen name='Favorites' component={Favorites} />
    </FavoritesStack.Navigator>
  )
}

const CompletionsStack = createStackNavigator()

const CompletionsScreen = () => {
  return (
    <CompletionsStack.Navigator
      screenOptions={{
        ...navigationStyle,
        header: ({ scene, navigation }) => (
          <NavHeader scene={scene} navigation={navigation} />
        ),
      }}
    >
      <CompletionsStack.Screen name='Completions' component={Completed} />
    </CompletionsStack.Navigator>
  )
}

const AddEditLeftoverStack = createStackNavigator()

const AddEditLeftoverScreen = () => {
  return (
    <AddEditLeftoverStack.Navigator>
      <AddEditLeftoverStack.Screen
        name=''
        component={AddEditLeftover}
      />
    </AddEditLeftoverStack.Navigator>
  )
}

const LeftoversStack = createStackNavigator()

const LeftoversScreen = () => {
  return (
    <LeftoversStack.Navigator
      screenOptions={{
        ...navigationStyle,
        header: ({ scene, navigation }) => (
          <NavHeader scene={scene} navigation={navigation} />
        ),
      }}
    >
      <LeftoversStack.Screen name='Leftovers' component={Leftovers} />
      <HomeStack.Screen name='Leftover Details' component={AddEditLeftover} />
      {/* <HomeStack.Screen name='Update Usage' component={UpdateUsage} /> */}
    </LeftoversStack.Navigator>
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

const AddEditGroceryStack = createStackNavigator()

const AddEditGroceryScreen = () => {
  return (
    <AddEditGroceryStack.Navigator>
      <AddEditGroceryStack.Screen
        name=''
        component={AddEditGrocery}
      />
    </AddEditGroceryStack.Navigator>
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
    <RegisterStack.Navigator initialRouteName='Login' headerMode='none'>
      <RegisterStack.Screen name='SignUp' component={SignUp} />
      <RegisterStack.Screen name='Login' component={Login} />
    </RegisterStack.Navigator>
  )
}

const MealPlanStack = createStackNavigator()

const MealPlanScreen = () => {
  return (
    <MealPlanStack.Navigator
      screenOptions={{
        ...navigationStyle,
        header: ({ scene, navigation }) => (
          <NavHeader scene={scene} navigation={navigation} />
        ),
      }}
    >
      <MealPlanStack.Screen name='MealPlan' component={MealPlan} />
    </MealPlanStack.Navigator>
  )
}

const GroceryListStack = createStackNavigator()

const GroceryScreen = () => {
  return (
    <GroceryListStack.Navigator
      screenOptions={{
        ...navigationStyle,
        header: ({ scene, navigation }) => (
          <NavHeader scene={scene} navigation={navigation} />
        ),
      }}
    >
      <GroceryListStack.Screen name='Grocery List' component={GroceryList} />
      <GroceryListStack.Screen
        name='Grocery Details'
        component={AddEditGrocery}
      />
    </GroceryListStack.Navigator>
  )
}

const ProfileStack = createStackNavigator()

const ProfileScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        ...navigationStyle,
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
      <ProfileStack.Screen name='About' component={About} />
      <ProfileStack.Screen name='Preferences' component={Preferences} />
      <ProfileStack.Screen name='Completed' component={Completed} />
      <ProfileStack.Screen name='Dashboard' component={Dashboard} />
    </ProfileStack.Navigator>
  )
}

const RootStack = createStackNavigator()

const RootScreen = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name='Home' component={HomeTabs} />
      <RootStack.Screen name='Profile' component={ProfileScreen} />
    </RootStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const { name } = route
          if (name === 'Home') {
            if (focused) {
              return <HomeIcon />
            } else {
              return <HomeInActiveIcon />
            }
          } else if (name === 'GroceryList') {
            if (focused) {
              return <GroceryIcon />
            } else {
              return <GroceryInActiveIcon />
            }
          } else if (name === 'Favorites') {
            if (focused) {
              return <FavoriteIcon />
            } else {
              return <FavoriteInActiveIcon />
            }
          } else if (name === 'MealPlan') {
            if (focused) {
              return <MealPlanIcon />
            } else {
              return <MealPlanInActiveIcon />
            }
          } else if (name === 'Leftovers') {
            if (focused) {
              return <LeftoverIcon />
            } else {
              return <LeftoverInActiveIcon />
            }
          }
        },
      })}
      tabBarOptions={{ showLabel: false }}
    >
      <Tab.Screen name='Home' component={HomeStackScreen} />
      <Tab.Screen name='GroceryList' component={GroceryScreen} />
      <Tab.Screen name='Favorites' component={FavoritesScreen} />
      <Tab.Screen name='MealPlan' component={MealPlanScreen} />
      <Tab.Screen name='Leftovers' component={LeftoversScreen} page={'Leftovers'} />
    </Tab.Navigator>
  )
}

const Navigation = () => {
  const { currentUserContext } = useContext(Context)
  const [currentUser, setCurrentUser] = currentUserContext

  return (
    <NavigationContainer>
      {currentUser ? <RootScreen /> : <RegisterScreen />}
    </NavigationContainer>
  )
}

export default Navigation
