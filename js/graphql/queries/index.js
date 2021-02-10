import { gql } from '@apollo/client'
import { MyRecipeFragment, UserFragment, GroceryFragment, LeftoverFragment, LeftoverUsageFragment, UsageCountFragment } from '../fregments'

export const currentUserQuery = gql`
  query currentUser {
    currentUser {
      ...User
    }
  }
  ${UserFragment}
`

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

export const ingredientListQuery = gql`
query ingredientList($id: ID!) {
  ingredientList(id: $id) {
    id
    ingredient {
      id
      name
      category
    }
    quantity
    unit
  }
}
`

export const ingredientUsagesQuery = gql`
query ingredientUsages($id: ID!) {
  ingredientUsages(id: $id) {
    ...LeftoverUsage
  }
}
${LeftoverUsageFragment}
`

export const favRecipesQuery = gql`
  query favRecipes {
    favRecipes {
      ...Myrecipe
    }
  }
  ${MyRecipeFragment}
`

export const completedInMealplanQuery = gql`
  query completedInMealplan {
    completedInMealplan {
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

export const groceriesQuery = gql`
  query groceries {
    groceries {
      ...Grocery
    }
  }
  ${GroceryFragment}
`

export const leftoversQuery = gql`
  query leftovers {
    leftovers {
      ...Leftover
    }
  }
  ${LeftoverFragment}
  `

export const dashboardIndStatsLastWeekQuery = gql`
  query dashboardIndStatsLastWeek { 
    dashboardIndStatsLastWeek {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardIndStatsLast30DaysQuery = gql`
  query dashboardIndStatsLast30Days { 
    dashboardIndStatsLast30Days {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardIndStatsLast90DaysQuery = gql`
  query dashboardIndStatsLast90Days { 
    dashboardIndStatsLast90Days {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardIndStatsLast6MonthsQuery = gql`
  query dashboardIndStatsLast6Months { 
    dashboardIndStatsLast6Months {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardIndStatsThisYearQuery = gql`
  query dashboardIndStatsThisYear { 
    dashboardIndStatsThisYear {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`
