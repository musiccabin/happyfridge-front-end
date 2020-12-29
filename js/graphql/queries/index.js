import { gql }  from '@apollo/client'

export const popularRecipes = gql`
  query popularRecipes {
    popularRecipes {
      id
      title
      cookingTime
      cookingTimeInMin
    }
  }
`

export const recommendedRecipes = gql`
  query recommendedRecipes {
    recommendedRecipes {
      id
      title
      cookingTime
      cookingTimeInMin
    }
  }
`

export const currentUser = gql`
  query currentUser {
    currentUser {
      id
      firstName
      lastName
    }
  }
`
