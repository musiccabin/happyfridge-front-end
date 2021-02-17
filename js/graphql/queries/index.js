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

export const ingredientInfoQuery = gql`
query ingredientCategory($name: NAME!) {
  ingredientCategory(name: $name) {
    category
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
      usages {
        ...TopTenUsages
      }
    }
  }
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardIndStatsLast30DaysQuery = gql`
  query dashboardIndStatsLast30Days { 
    dashboardIndStatsLast30Days {
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

export const dashboardIndStatsLast90DaysQuery = gql`
  query dashboardIndStatsLast90Days { 
    dashboardIndStatsLast90Days {
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

export const dashboardIndStatsLast6MonthsQuery = gql`
  query dashboardIndStatsLast6Months { 
    dashboardIndStatsLast6Months {
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

export const dashboardIndStatsThisYearQuery = gql`
  query dashboardIndStatsThisYear { 
    dashboardIndStatsThisYear {
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
      city
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardComStatsLastWeekByRegionQuery = gql`
  query dashboardComStatsLastWeekByRegion { 
    dashboardComStatsLastWeekByRegion {
      region
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardComStatsLastWeekByProvinceQuery = gql`
  query dashboardComStatsLastWeekByProvince { 
    dashboardComStatsLastWeekByProvince {
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardComStatsLast30DaysByCityQuery = gql`
  query dashboardComStatsLast30DaysByCity { 
    dashboardComStatsLast30DaysByCity {
      city
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardComStatsLast30DaysByRegionQuery = gql`
  query dashboardComStatsLast30DaysByRegion { 
    dashboardComStatsLast30DaysByRegion {
      region
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardComStatsLast30DaysByProvinceQuery = gql`
  query dashboardComStatsLast30DaysByProvince { 
    dashboardComStatsLast30DaysByProvince {
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardComStatsLast90DaysByCityQuery = gql`
  query dashboardComStatsLast90DaysByCity { 
    dashboardComStatsLast90DaysByCity {
      city
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardComStatsLast90DaysByRegionQuery = gql`
  query dashboardComStatsLast90DaysByRegion { 
    dashboardComStatsLast90DaysByRegion {
      region
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardComStatsLast90DaysByProvinceQuery = gql`
  query dashboardComStatsLast90DaysByProvince { 
    dashboardComStatsLast90DaysByProvince {
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardComStatsLast6MonthsByCityQuery = gql`
  query dashboardComStatsLast6MonthsByCity { 
    dashboardComStatsLast6MonthsByCity {
      city
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardComStatsLast6MonthsByRegionQuery = gql`
  query dashboardComStatsLast6MonthsByRegion { 
    dashboardComStatsLast6MonthsByRegion {
      region
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardComStatsLast6MonthsByProvinceQuery = gql`
  query dashboardComStatsLast6MonthsByProvince { 
    dashboardComStatsLast6MonthsByProvince {
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardComStatsThisYearByCityQuery = gql`
  query dashboardComStatsThisYearByCity { 
    dashboardComStatsThisYearByCity {
      city
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardComStatsThisYearByRegionQuery = gql`
  query dashboardComStatsThisYearByRegion { 
    dashboardComStatsThisYearByRegion {
      region
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardComStatsThisYearByProvinceQuery = gql`
  query dashboardComStatsThisYearByProvince { 
    dashboardComStatsThisYearByProvince {
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
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
      region
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`

export const dashboardComStatsAllHistoryByProvinceQuery = gql`
  query dashboardComStatsAllHistoryByProvince { 
    dashboardComStatsAllHistoryByProvince {
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
  ${UsageCountFragment}
  ${TopTenUsagesFragment}
`