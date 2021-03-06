import React, { useContext } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { ProfileIcon, ArrowBackIcon } from '../../assets/icons'
import { MaterialIcons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLORS, globalStyles } from '../styles'
import { Context } from '../context'


const NavHeader = ({ scene, navigation, profileIcon = true, renderTitle = true, children }) => {
  const { currentUserContext } = useContext(Context)
  const [currentUser, setCurrentUser] = currentUserContext

  const { options } = scene?.descriptor
  const title = renderTitle && (options.headerTitle || options.title || scene.route.name)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
      {navigation.canGoBack() && <ArrowBackIcon onPress={() => navigation.goBack()}/>}
        <Text style={styles.screenName}>{title}</Text>
        <View> 
          {/* {children} */}
          {profileIcon && (
            <TouchableOpacity
              onPress={() => {
                console.log('current user is: ', currentUser)
                navigation.navigate(currentUser ? 'Profile' : 'Login')
                // navigation.navigate('Profile')
              }}
            >
              <ProfileIcon />
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
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  screenName: {
    ...globalStyles.titleXL,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
})

export default NavHeader
