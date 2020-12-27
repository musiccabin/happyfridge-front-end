import {gql} from '@apollo/client'

export const getPopularRecipes = gql`
  mutation test($value: CreateUserMutationInput!) {
    createUser(input: $value ) {
      user{
        id
        email
      }
    }
  }
`

