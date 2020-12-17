import React from 'react'
import { View, Text, Pressable } from 'react-native'

const LeftOvers = ({ navigation }) => {
  return (
    <View>
      <Pressable onPress={() => navigation.navigate('UpdateUsage') }>
        <Text>update usage</Text>
      </Pressable>
    </View>
  )
}

export default LeftOvers
