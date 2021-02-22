import React, { useContext } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { ProfileIcon } from '../../assets/icons'
import { MaterialIcons } from '@expo/vector-icons'
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
      <MaterialIcons
          // style={globalStyles.clock}
          name='check'
          size={30}
          // color={COLORS.PRIMARY}
          onPress={() => navigation.goBack()}
        /> 
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
