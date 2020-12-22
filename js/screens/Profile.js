import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { COLORS, globalStyles } from '../styles'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { ProfileLink } from '../components'

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <FontAwesome
              name='user-circle'
              size={110}
              color={COLORS.PRIMARY_ICON}
            />
            <AntDesign
              style={styles.camera}
              name='camera'
              size={24}
              color={COLORS.SECONDARY_FONT}
            />
          </View>
          <Text style={styles.fullName}>Susannah Sun</Text>
          <Text style={styles.location}>Vancouver, BC</Text>
          <Text style={styles.email}>edinkaymakchi@gmail.com</Text>
        </View>
        <View style={styles.options}>
          <ProfileLink name='About' icon='infocirlceo' to='Home' />
          <ProfileLink name='Preferences' icon='setting' to='Home' />
          <ProfileLink name='Completed meals' icon='check' to='Home' />
          <ProfileLink name='Dashboard' icon='dashboard' to='Home' />
          <ProfileLink name='Edit profile' icon='profile' to='Home' />
          <ProfileLink name='Log Out' icon='logout' to='Home' />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    paddingHorizontal: 30,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
  },
  avatar: {
    width: 115,
    height: 115,
    borderRadius: 100 / 2,
  },
  camera: {
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
  fullName: {
    ...globalStyles.titleXL,
    paddingTop: 10,
  },
  location: {
    ...globalStyles.titleM,
    paddingTop: 5,
  },
  email: {
    ...globalStyles.titleM,
    paddingTop: 15,
  },
  options: {
    marginVertical: 40,
  },
})

export default Profile
