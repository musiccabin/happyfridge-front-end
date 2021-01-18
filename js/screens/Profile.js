import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { COLORS, globalStyles } from '../styles'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { ProfileLink } from '../components'
import { auth } from '../firebase'
import { currentUserQuery } from '../graphql/queries'
import { useQuery, useMutation } from '@apollo/client'
import { signOutMutation } from '../graphql/mutations'

const Profile = ({ navigation }) => {
  const { client, data, error, loading } = useQuery(currentUserQuery)
  const [signOut] = useMutation(signOutMutation)

  const logOut = () => {
    signOut({ variables: { value: {} } })
      .then(() => auth.signOut())
      .then(() => client.resetStore())
  }

  if (error) return <Text>error</Text>
  if (loading) return <Text>loading...</Text>

  const { currentUser } = data

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
          <Text style={styles.fullName}>
            {currentUser.firstName} {currentUser.lastName}
          </Text>
          <Text style={styles.location}>
            {currentUser.city}, {currentUser.province}
          </Text>
          <Text style={styles.email}>{currentUser.email}</Text>
        </View>
        <View style={styles.options}>
          <ProfileLink
            name='About'
            icon='infocirlceo'
            onPress={() => navigation.navigate('About')}
          />
          <ProfileLink
            name='Preferences'
            icon='setting'
            onPress={() => navigation.navigate('Preferences')}
          />
          <ProfileLink
            name='Completed meals'
            icon='check'
            onPress={() => navigation.navigate('Home')}
          />
          <ProfileLink
            name='Dashboard'
            icon='dashboard'
            onPress={() => navigation.navigate('Dashboard')}
          />
          <ProfileLink
            name='Edit profile'
            icon='profile'
            onPress={() => navigation.navigate('Home')}
          />
          <ProfileLink name='Log Out' icon='logout' onPress={logOut} />
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
