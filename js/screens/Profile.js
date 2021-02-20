import React, { useContext } from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { COLORS, globalStyles } from '../styles'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { ProfileLink } from '../components'
import { Context } from '../context'
import { useQuery, useMutation } from '@apollo/client'
import { userDietaryRestrictionsQuery, userTagsQuery, allDietaryRestrictionsQuery, allTagsQuery } from '../graphql/queries'
import { useNavigation } from '@react-navigation/native'
import { signOutMutation } from '../graphql/mutations'

const Profile = () => {
  const [signOut] = useMutation(signOutMutation)
  const { currentUserContext } = useContext(Context)
  const [currentUser, setCurrentUser] = currentUserContext
  const { navigate } = useNavigation()

  const logOut = () => {
    signOut({ variables: { value: { clientMutationId: null } } }).then(
      ({ data }) => {
        if (data) {
          setCurrentUser(null)
          navigate('Home')
        }
      }
    )
  }

  const userDietary = useQuery(userDietaryRestrictionsQuery)
  const userTags = useQuery(userTagsQuery)
  const allDietary = useQuery(allDietaryRestrictionsQuery)
  const allTags = useQuery(allTagsQuery)

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
            onPress={() => navigate('About')}
          />
          <ProfileLink
            name='Preferences'
            icon='setting'
            onPress={() => navigate('Preferences' )}
          />
          <ProfileLink
            name='Completed meals'
            icon='check'
            onPress={() => navigate('Completed')}
          />
          <ProfileLink
            name='Dashboard'
            icon='dashboard'
            onPress={() => navigate('Dashboard')}
          />
          <ProfileLink
            name='Edit profile'
            icon='profile'
            onPress={() => navigate('Home')}
          />
          <ProfileLink name='Log Out' icon='logout' onPress={() => logOut()} />
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
