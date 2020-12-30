import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Button, LeftOverList } from '../components'
import { COLORS, globalStyles } from '../styles'
import { produceData, meatData, frozenData, dairyData, nutsData } from '../mock'

const LeftOvers = ({ navigation }) => {
  const [structuredData, setStructuredData] = useState()

  useEffect(() => {
    setStructuredData([
      {
        title: 'Produce',
        data: [...produceData],
      },
      {
        title: 'Meat',
        data: [...meatData],
      },
      {
        title: 'Frozen',
        data: [...frozenData],
      },
      {
        title: 'Dairy',
        data: [...dairyData],
      },
      {
        title: 'Nuts & Seeds',
        data: [...nutsData],
      },
    ])
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.separator}>
        <Text style={styles.title}>
          How much of each ingredient {'\n'} did you use?
        </Text>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Text style={styles.text}>I used the exact recipe amounts!</Text>
        </Pressable>
      </View>
      <LeftOverList data={structuredData} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  title: {
    ...globalStyles.titleXL,
    textAlign: 'center',
    paddingBottom: 15,
  },
  text: {
    ...globalStyles.anchorText,
    textAlign: 'center',
  },
  separator: {
    ...globalStyles.content,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SEPARATOR,
    paddingBottom: 15,
  },
})

export default LeftOvers
