import { gql } from '../../../node_modules/@apollo/client'
import { MyRecipeFragment, UserFragment } from '../fregments'

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

export const favRecipesQuery = gql`
  query favRecipes {
    favRecipes {
      ...Myrecipe
    }
  }
  ${MyRecipeFragment}
`

export const completedRecipesQuery = gql`
  query completedRecipes {
    completedRecipes {
      ...Myrecipe
    }
  }
  ${MyRecipeFragment}
`

export const recipesInMealplanQuery = gql`
  query recipesInMealplan {
    recipesInMealplan {
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

export const recipeInfoQuery = gql`
  query recipeInfo($id: ID!) {
    recipeInfo(id: $id) {
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
      myrecipeingredientlinks {
        id
        unit
        quantity
        ingredient {
          name
        }
      }
    }
  }
`
