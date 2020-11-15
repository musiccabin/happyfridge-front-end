import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native'
import { Button } from '../components'
import { cities, provinces } from '../mock'
import { globalStyles, COLORS } from '../styles'

const SignUp = () => {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [province, setProvince] = useState()
  const [city, SetCity] = useState()
  const [postalCode, setPostalCode] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  return (
    <View style={styles.container}>
      <Text style={[globalStyles.titleXL, styles.signInTitle]}>Sign Up</Text>
      <View style={styles.form}>
        <View style={globalStyles.inputWrapper}>
          <View style={styles.half}>
            <Text style={globalStyles.label}>First name</Text>
            <TextInput
              style={[globalStyles.input]}
              textContentType='name'
              autoCompleteType='name'
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
          </View>
          <View style={styles.half}>
            <Text style={[globalStyles.label]}>Last name</Text>
            <TextInput
              style={[globalStyles.input]}
              textContentType='name'
              autoCompleteType='name'
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </View>
        </View>

        <View style={globalStyles.inputWrapper}>
          <View style={styles.small}>
            <Text style={globalStyles.label}>Province</Text>
            <TextInput
              style={[globalStyles.input]}
              textContentType='name'
              autoCompleteType='name'
              value={province}
              onChangeText={text => setProvince(text)}
            />
          </View>
          <View style={styles.half}>
            <Text style={[globalStyles.label]}>City</Text>
            <TextInput
              style={[globalStyles.input]}
              textContentType='addressCity'
              autoCompleteType='name'
              value={city}
              onChangeText={text => SetCity(text)}
            />
          </View>
          <View style={styles.medium}>
            <Text style={[globalStyles.label]}>Postal code</Text>
            <TextInput
              style={[globalStyles.input]}
              textContentType='postalCode'
              autoCompleteType='postal-code'
              value={postalCode}
              onChangeText={text => setPostalCode(text)}
            />
          </View>
        </View>

        <View style={globalStyles.inputWrapper}>
          <View style={styles.full}>
            <Text style={globalStyles.label}>Email</Text>
            <TextInput
              style={[globalStyles.input]}
              textContentType='emailAddress'
              autoCompleteType='email'
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
        </View>

        <View style={globalStyles.inputWrapper}>
          <View style={styles.half}>
            <Text style={globalStyles.label}>Password</Text>
            <TextInput
              style={[globalStyles.input]}
              textContentType='password'
              autoCompleteType='password'
              secureTextEntry={true}
              value={[password]}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View style={styles.half}>
            <Text style={[globalStyles.label]}>Confirm Password</Text>
            <TextInput
              style={[globalStyles.input]}
              textContentType='password'
              autoCompleteType='password'
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
            />
          </View>
        </View>

        <Button style={styles.registerButton}>Create account</Button>
        <TouchableOpacity style={styles.haveAccount}>
          <Text style={styles.haveAccountText}>I have an account!</Text>
        </TouchableOpacity>
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
    color: COLORS.RED,
  },
  registerButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
  },
  haveAccount: {
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    marginTop: 10,
  },
  haveAccountText: {
    color: COLORS.RED,
  },
  signUp: {
    color: COLORS.RED,
    marginLeft: 5,
  },
  full: {
    width: '100%',
  },
  half: {
    width: '50%',
  },
  small: {
    width: '20%',
  },
  medium: {
    width: '30%',
  },
})

export default SignUp
