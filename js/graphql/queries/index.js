import { gql }  from '@apollo/client'
import {MyRecipeFragment, UserFragment} from '../fregments'

export const popularRecipesQuery = gql`
  query popularRecipes {
    popularRecipes {
      ...Myrecipe
    }
  }
  ${MyRecipeFragment}
`

export const recommendedRecipesQuery = gql`
  query recommendedRecipes {
    recommendedRecipes {
      ...Myrecipe
    }
  }
  ${MyRecipeFragment}
`

export const currentUserQuery = gql`
  query currentUser {
    currentUser {
      ...User
    }
  }
  ${UserFragment}
`
