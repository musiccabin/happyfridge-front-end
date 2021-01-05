import { gql }  from '@apollo/client'

export const MyRecipeFragment = gql`
  fragment Myrecipe on Myrecipe {
    id
    title
    cookingTime
    cookingTimeInMin
    instructions
    videoURL
    avatarContentType
    avatarFileName
    user {
      id
    }
  }
`

export const UserFragment = gql`
  fragment User on User {
    id
    firstName
    lastName
    email
    city
    isAdmin
    province
    region
  }
`
