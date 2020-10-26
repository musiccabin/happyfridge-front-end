import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Card, Recipe } from '../components'

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name='md-menu' size={32} color='black' />
      </View>
      <View style={styles.recommended}></View>
      <View>
        <Text style={styles.title}>Recommendation for you</Text>
        <ScrollView style={styles.list} horizontal>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>
      </View>
      <View style={styles.recipes}>
        <Text style={styles.title}>Popular recipes</Text>
        <ScrollView style={styles.recipes}>
          <Recipe />
          <Recipe />
          <Recipe />
          <Recipe />
          <Recipe />
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  header: {
    alignItems: 'flex-end',
    marginVertical: 20,
  },
  recommended: {
    backgroundColor: 'rgb(255, 209, 136)',
    width: 500,
    height: 500,
    borderRadius: 300,
    top: -180,
    left: 60,
    position: 'absolute',
    zIndex: -1,
  },
  title: {
    fontSize: 22,
    paddingVertical: 25,
  },
  list: {
    height: 235,
    width: 390,
  },
  recipes: {
    alignSelf: 'stretch',
    width: '105%',
  },
})

export default Home
