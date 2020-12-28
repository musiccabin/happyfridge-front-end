import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { ProfileIcon } from '../../assets/icons'
import { COLORS, globalStyles } from '../styles'

const NavHeader = ({ scene, navigation, profileIcon = true, children }) => {
  const { options } = scene?.descriptor
  const title = options.headerTitle || options.title || scene.route.name

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
              <ProfileIcon heigth={50} width={50} />
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
