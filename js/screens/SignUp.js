import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Picker,
} from 'react-native'
import { Button } from '../components'
import { cities, provinces } from '../mock'
import { globalStyles, COLORS } from '../styles'
import { signUpMutation } from '../graphql/mutations'
import { useMutation } from '@apollo/client'
import { auth } from '../firebase'

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [province, setProvince] = useState()
  const [selectedProvince, setSelectedProvince] = useState('BC')
  const [city, setCity] = useState()
  const [selectedCity, setSelectedCity] = useState('Vancouver')
  const [postalCode, setPostalCode] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [signUp] = useMutation(signUpMutation)

  useEffect(() => {
    setCity(cities)
    setProvince(provinces)
  }, [])

  const submit = () => {
    let value = {
      attributes: {
        firstName: firstName,
        lastName: lastName,
        city: selectedCity,
        province: selectedProvince,
      },
      authProvider: {
        credentials: {
          email: email,
          password: password,
        },
      },
    }

    signUp({ variables: { value: value } }).then(() =>
      auth
        .createUserWithEmailAndPassword(email, password)
        .catch(error => console.error(error))
    )
  }

  return (
    <View style={styles.container}>
      <Text style={[globalStyles.titleXL, styles.signInTitle]}>Sign Up</Text>
      <View style={styles.form}>
        <View style={globalStyles.inputWrapper}>
          <View style={globalStyles.half}>
            <Text style={globalStyles.label}>First name</Text>
            <TextInput
              style={globalStyles.input}
              textContentType='name'
              autoCompleteType='name'
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
          </View>
          <View style={globalStyles.half}>
            <Text style={globalStyles.label}>Last name</Text>
            <TextInput
              style={globalStyles.input}
              textContentType='name'
              autoCompleteType='name'
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </View>
        </View>

        <View style={globalStyles.inputWrapper}>
          <View style={globalStyles.small}>
            <Text style={globalStyles.label}>Province</Text>
            <Picker
              selectedValue={selectedProvince}
              textStyle={{ fontSize: 12 }}
              itemStyle={[globalStyles.input, globalStyles.picker]}
              onValueChange={value => setSelectedProvince(value)}
            >
              {provinces.map(province => (
                <Picker.Item
                  key={province.id}
                  label={province.name}
                  value={province.name}
                />
              ))}
            </Picker>
          </View>
          <View style={globalStyles.half}>
            <Text style={[globalStyles.label, globalStyles.pickerLabel]}>
              City
            </Text>
            <Picker
              selectedValue={selectedCity}
              itemStyle={[globalStyles.input, globalStyles.picker]}
              onValueChange={value => setSelectedCity(value)}
            >
              {cities.map(city => (
                <Picker.Item
                  key={city.id}
                  label={city.name}
                  value={city.name}
                />
              ))}
            </Picker>
          </View>
          <View style={globalStyles.medium}>
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
          <View style={globalStyles.full}>
            <Text style={globalStyles.label}>Email</Text>
            <TextInput
              style={globalStyles.input}
              textContentType='emailAddress'
              autoCapitalize='none'
              autoCorrect={false}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
        </View>

        <View style={globalStyles.inputWrapper}>
          <View style={globalStyles.half}>
            <Text style={globalStyles.label}>Password</Text>
            <TextInput
              style={[globalStyles.input]}
              textContentType='password'
              autoCompleteType='password'
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View style={globalStyles.half}>
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

        <Button style={styles.registerButton} onPress={submit}>
          Create account
        </Button>
        <Pressable
          style={styles.haveAccount}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={globalStyles.anchorText}>I have an account!</Text>
        </Pressable>
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
  haveAccount: {
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    marginTop: 10,
  },
})

export default SignUp
