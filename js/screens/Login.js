import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Button } from '../components'
import { globalStyles, COLORS } from '../styles'
import { signInMutation } from '../graphql/mutations'
import { useMutation } from '@apollo/client'

const Login = ({navigation}) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [signIn, { data }] = useMutation(signInMutation)

  const login = () => {
    let value = {
      credentials: {
        email: email,
        password: password,
      }
    }
    signIn({variables: {value: value}}).then(({data}) => {
      if (data) {
        navigation.navigate('Home')
      }
    })
  }
  return (
    <View style={styles.container}>
      <Text style={[globalStyles.titleXL, styles.signInTitle]}>Sign in</Text>
      <View style={styles.form}>
        <Text style={globalStyles.label}>Email</Text>
        <TextInput
          style={globalStyles.input}
          textContentType='emailAddress'
          autoCompleteType='email'
          value={email}
          autoCapitalize='none'
          onChangeText={text => setEmail(text)}
        />
        <Text style={[globalStyles.label, styles.spacing]}>Password</Text>
        <TextInput
          style={globalStyles.input}
          autoCapitalize='none'
          secureTextEntry={true}
          autoCompleteType='password'
          textContentType='password'
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
        <Button style={styles.registerButton} onPress={() => login()}>Let's go!</Button>
        <View style={styles.createAccount}>
          <Text style={styles.createAccountText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  signInTitle: {
    marginTop: 100,
  },
  form: {
    width: '100%',
  },
  spacing: {
    paddingTop: 30,
  },
  forgotPassword: {
    marginLeft: 10,
    marginTop: 10,
    color: COLORS.SECONDARY,
  },
  registerButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
  },
  createAccount: {
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    marginTop: 10,
  },
  createAccountText: {
    color: COLORS.SECONDARY_FONT,
  },
  signUp: {
    color: COLORS.SECONDARY,
    marginLeft: 5,
  },
})

export default Login
