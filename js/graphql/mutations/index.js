import { gql } from '@apollo/client'

export const signUpMutation = gql`
  mutation createUser($value: CreateUserMutationInput!) {
    createUser(input: $value ) {
      user{
        id
        email
      }
    }
  }
`

export const signInMutation = gql`
  mutation signIn($value: SignInMutationInput!) {
    signIn(input: $value ) {
      user{
        id
        email
      }
    }
  }
`

