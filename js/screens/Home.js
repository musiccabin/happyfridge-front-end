import React from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { Card, Recipe } from '../components'
import { COLORS, globalStyles } from '../styles'

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={globalStyles.content}>
        <View style={styles.header}>
          <Feather name='menu' size={32} color={COLORS.SECONDARY_FONT} />
        </View>
        <View style={styles.backgroundCircle}></View>
        <View>
          <Text style={globalStyles.titleXL}>Recommended for you</Text>
          <ScrollView horizontal>
            <View style={styles.list}>
              <Card onPress={() => navigation.navigate('RecipeDetails')} />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </View>
          </ScrollView>
        </View>
        <View>
          <Text style={globalStyles.titleXL}>Popular recipes</Text>
          <ScrollView>
            <View>
              <Recipe />
              <Recipe />
              <Recipe />
              <Recipe />
              <Recipe />
            </View>
          </ScrollView>
        </View>
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
  list: {
    flexDirection: 'row',
    height: 235,
  },
})

export default Home
