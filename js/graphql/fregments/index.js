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

export const GroceryFragment = gql`
  fragment Grocery on Grocery {
    id
    name
    quantity
    unit
    category
    isCompleted
    userAdded
    user {
      id
    }
  }
`

export const LeftoverFragment = gql`
  fragment Leftover on Leftover {
    id
    ingredient {
      id
      name
      category
    }
    quantity
    unit
    user {
      id
    }
  }
`

// export const FavouriteFragment = gql`
//   fragment Favourite on Favourite {
//     id
//   }
// `

// export const CompletionFragment = gql`
//   fragment Completion on Completion {
//     id
//   }
// `

// export const MyRecipeMealplanLinkFragment = gql`
//   fragment Myrecipemealplanlink on Myrecipemealplanlink {
//     id
//   }
// `

export const UsageCountFragment = gql`
  fragment UsageCount on UsageCount {
    dairy
    frozen
    meat
    nutsAndSeeds
    other
    produce
  }
`
