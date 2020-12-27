import React, {useContext, useEffect, useState} from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { CardList, Recipe } from '../components'
import { COLORS, globalStyles } from '../styles'
import { useQuery } from '@apollo/client'
import { Context } from '../context'
import { getPopularRecipes } from '../graphql/queries'


const Home = ({ navigation }) => {
  const { data, error } = useQuery(getPopularRecipes)
  const [login, setLogin] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather name='menu' size={32} color={COLORS.SECONDARY_FONT} />
      </View>
      <View style={styles.backgroundCircle}></View>
      <View style={globalStyles.content}>
        <Text style={[globalStyles.titleXL, styles.title]}>Recommended for you</Text>
        <CardList navigation={navigation} />
      </View>
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
