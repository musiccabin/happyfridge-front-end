import React from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import { CardList, Recipe } from '../components'
import { COLORS, globalStyles } from '../styles'
import { useQuery } from '@apollo/client'
import { popularRecipes, recommendedRecipes } from '../graphql/queries'
import { Context } from '../context'

const { currentUser, initCurrentUser } = useContext(Context)

const Home = ({ navigation }) => {
  const { data, error, loading } = useQuery(popularRecipes)
  if (loading) return null
  if (!currentUser) { initCurrentUser() }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundCircle}></View>
      {currentUser && <View style={globalStyles.content}>
        <Text style={[globalStyles.titleXL, styles.title]}>Recommended for you</Text>
        <CardList navigation={navigation} />
      </View>}
      <View style={[globalStyles.content, styles.popularRecipes]}>
        <Text style={[globalStyles.titleXL, styles.title]}>Popular recipes</Text>
        <ScrollView >
          <View>
            {data.popularRecipes.map((recipe) => {
              <Recipe recipeCompleted={true} />
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    alignItems: 'flex-end',
    marginVertical: 10,
    marginRight: 25,
  },
  backgroundCircle: {
    backgroundColor: COLORS.PRIMARY_ICON,
    width: 500,
    height: 500,
    borderRadius: 300,
    top: -120,
    left: 50,
    position: 'absolute',
    zIndex: -1,
  },
  popularRecipes: {
    marginTop: 40
  },
  title: {
    marginBottom: 20
  }
})

export default Home
