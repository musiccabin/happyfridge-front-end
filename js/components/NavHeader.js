import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { COLORS, globalStyles } from '../styles'

const NavHeader = ({ scene, navigation, profileIcon = true, renderTitle = true, children }) => {
  const { options } = scene?.descriptor
  const title =
    renderTitle &&
    (options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.screenName}>{title}</Text>
        <View>
          {children}
          {profileIcon && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile')
              }}
            >
              <Text>Profile Icon</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
  },
  content: {
    marginTop: 5,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  screenName: {
    ...globalStyles.titleXL,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
})

export default NavHeader
