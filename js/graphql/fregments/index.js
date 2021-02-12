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
  }
`

export const LeftoverUsageFragment = gql`
  fragment LeftoverUsage on LeftoverUsage {
    id
    ingredient {
      id
      name
      category
    }
    quantity
    unit
  }
`

export const UsageCountFragment = gql`
  fragment UsageCount on UsageCount {
    produce
    dairy
    frozen
    meat
    nutsAndSeeds
    other
  }
`

export const TopTenUsagesFragment = gql`
  fragment TopTenUsages on TopTenUsages {
    produce {
      count
      ingredient {
        id
        category
        name
      }
      quantity
      unit
    }
    dairy {
      count
      ingredient {
        id
        category
        name
      }
      quantity
      unit
    }
    frozen {
      count
      ingredient {
        id
        category
        name
      }
      quantity
      unit
    }
    meat {
      count
      ingredient {
        id
        category
        name
      }
      quantity
      unit
    }
    nutsAndSeeds {
      count
      ingredient {
        id
        category
        name
      }
      quantity
      unit
    }
    other {
      count
      ingredient {
        id
        category
        name
      }
      quantity
      unit
    }
  }
`