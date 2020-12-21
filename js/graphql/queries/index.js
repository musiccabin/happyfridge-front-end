import {gql} from '@apollo/client'

export const getPopularRecipes = gql`
  query getPopularRecipes {
    popularRecipes {
      id
      title
      cookingTime
      cookingTimeInMin
    }
  }
`
