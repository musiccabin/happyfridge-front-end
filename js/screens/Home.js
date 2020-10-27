import React from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Card, Recipe } from '../components'
import { COLORS } from '../styles'

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <MaterialIcons name='menu' size={32} color={COLORS.SECONDARY_FONT} />
        </View>
        <View style={styles.backgroundCircle}></View>
        <View>
          <Text style={styles.title}>Recommended for you</Text>
          <ScrollView horizontal>
            <View style={styles.list}>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </View>
          </ScrollView>
        </View>
        <Text style={styles.title}>Popular recipes</Text>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    paddingLeft: 25,
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
    flexDirection: 'row',
    height: 235,
  },
})

export default Home
