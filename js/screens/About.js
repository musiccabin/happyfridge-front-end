import React from 'react'
import { View, Text, Pressable } from 'react-native'

const About = ({ navigation }) => {
  return (
    <View>
      <Text>About screen</Text>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </Pressable>
    </View>
  )
}

export default About
