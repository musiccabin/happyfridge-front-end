import { gql } from '@apollo/client'
import { MyRecipeFragment, UserFragment, GroceryFragment, LeftoverFragment, LeftoverUsageFragment, UsageCountFragment, TopTenUsagesFragment } from '../fregments'

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

export const allProvsQuery = gql`
  query allProvs {
    allProvs {
      prov
      cities
    }
  }
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

export const dashboardIndStatsAllHistoryQuery = gql`
  query dashboardIndStatsAllHistory { 
    dashboardIndStatsAllHistory {
      count {
        ...UsageCount
      }
      usages {
        ...TopTenUsages
      }
    }
  }
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardComStatsLastWeekByCityQuery = gql`
  query dashboardComStatsLastWeekByCity { 
    dashboardComStatsLastWeekByCity {
      count {
        ...UsageCount
      }
      city
    }
  }
  ${UsageCountFragment}
`

export const dashboardComStatsLastWeekByRegionQuery = gql`
  query dashboardComStatsLastWeekByRegion { 
    dashboardComStatsLastWeekByRegion {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardComStatsLastWeekByProvinceQuery = gql`
  query dashboardComStatsLastWeekByProvince { 
    dashboardComStatsLastWeekByProvince {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardComStatsLast30DaysByCityQuery = gql`
  query dashboardComStatsLast30DaysByCity { 
    dashboardComStatsLast30DaysByCity {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardComStatsLast30DaysByRegionQuery = gql`
  query dashboardComStatsLast30DaysByRegion { 
    dashboardComStatsLast30DaysByRegion {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardComStatsLast30DaysByProvinceQuery = gql`
  query dashboardComStatsLast30DaysByProvince { 
    dashboardComStatsLast30DaysByProvince {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardComStatsLast90DaysByCityQuery = gql`
  query dashboardComStatsLast90DaysByCity { 
    dashboardComStatsLast90DaysByCity {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardComStatsLast90DaysByRegionQuery = gql`
  query dashboardComStatsLast90DaysByRegio { 
    dashboardComStatsLast90DaysByRegio {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardComStatsLast90DaysByProvinceQuery = gql`
  query dashboardComStatsLast90DaysByProvince { 
    dashboardComStatsLast90DaysByProvince {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardComStatsLast6MonthsByCityQuery = gql`
  query dashboardComStatsLast6MonthsByCity { 
    dashboardComStatsLast6MonthsByCity {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardComStatsLast6MonthsByRegionQuery = gql`
  query dashboardComStatsLast6MonthsByRegion { 
    dashboardComStatsLast6MonthsByRegion {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardComStatsLast6MonthsByProvinceQuery = gql`
  query dashboardComStatsLast6MonthsByProvince { 
    dashboardComStatsLast6MonthsByProvince {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardComStatsThisYearByCityQuery = gql`
  query dashboardComStatsThisYearByCity { 
    dashboardComStatsThisYearByCity {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardComStatsThisYearByRegionQuery = gql`
  query dashboardComStatsThisYearByRegion { 
    dashboardComStatsThisYearByRegion {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardComStatsThisYearByProvinceQuery = gql`
  query dashboardComStatsThisYearByProvince { 
    dashboardComStatsThisYearByProvince {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardComStatsAllHistoryByCityQuery = gql`
  query dashboardComStatsAllHistoryByCity { 
    dashboardComStatsAllHistoryByCity {
      city
      province
      geoUsage {
        count {
          ...UsageCount
        }
        usages {
          ...TopTenUsages
        }
      }
    }
  }
  ${TopTenUsagesFragment}
  ${UsageCountFragment}
`

export const dashboardComStatsAllHistoryByRegionQuery = gql`
  query dashboardComStatsAllHistoryByRegion { 
    dashboardComStatsAllHistoryByRegion {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`

export const dashboardComStatsAllHistoryByProvinceQuery = gql`
  query dashboardComStatsAllHistoryByProvince { 
    dashboardComStatsAllHistoryByProvince {
      count {
        ...UsageCount
      }
    }
  }
  ${UsageCountFragment}
`