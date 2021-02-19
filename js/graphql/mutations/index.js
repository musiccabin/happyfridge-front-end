import { gql } from '@apollo/client'
import {UserFragment, GroceryFragment, LeftoverFragment} from '../fregments'

export const signUpMutation = gql`
  mutation createUser($value: CreateUserMutationInput!) {
    createUser(input: $value) {
      user {
        ...User
      }
    }
  }
  ${UserFragment}
`

export const signInMutation = gql`
  mutation signIn($value: SignInMutationInput!) {
    signIn(input: $value) {
      status
      clientMutationId
      user {
        ...User
      }
    }
  }
  ${UserFragment}
`

export const signOutMutation = gql`
  mutation signOut($value: SignOutMutationInput!) {
    signOut(input: $value) {
      status
    }
  }
`
export const newLeftoverMutation = gql`
  mutation newLeftover($value: NewLeftoverMutationInput!) {
    newLeftover(input: $value) {
      leftover {
        ...Leftover
      }
      errors {
        fullMessages
      }
      groceryUpdated
    }
  }
  ${LeftoverFragment}
`

export const updateLeftoverMutation = gql`
  mutation updateLeftover($value: UpdateLeftoverMutationInput!) {
    updateLeftover(input: $value) {
      leftover {
        ...Leftover
      }
      errors {
        fullMessages
      }
      groceryUpdated
    }
  }
  ${LeftoverFragment}
`

export const removeLeftoverMutation = gql`
mutation removeLeftover($value: RemoveLeftoverMutationInput!) {
  removeLeftover(input: $value) {
    status
    groceryUpdated
  }
}
`

export const newGroceryMutation = gql`
  mutation newGrocery($value: NewGroceryMutationInput!) {
    newGrocery(input: $value) {
      grocery {
       ...Grocery
      }
      errors {
        fullMessages
      }
    }
  }
${GroceryFragment}
`

export const updateGroceryMutation = gql`
  mutation updateGrocery($value: UpdateGroceryMutationInput!) {
    updateGrocery(input: $value) {
      grocery {
       ...Grocery
      }
      errors {
        fullMessages
      }
    }
  }
${GroceryFragment}
`

export const removeGroceryMutation = gql`
mutation removeGrocery($value: RemoveGroceryMutationInput!) {
  removeGrocery(input: $value) {
    status
  }
}
`

export const completeGroceryMutation = gql`
mutation completeGrocery($value: CompleteGroceryMutationInput!) {
  completeGrocery(input: $value) {
    status
  }
}
`

export const uncompleteGroceryMutation = gql`
mutation uncompleteGrocery($value: UncompleteGroceryMutationInput!) {
  uncompleteGrocery(input: $value) {
    status
  }
}
`

export const updateUsageMutation = gql`
mutation updateUsage($value: UpdateUsageMutationInput!) {
  updateUsage(input: $value) {
    status
    errors {
      fullMessages
    }
  }
}
`

export const removeUsageMutation = gql`
mutation removeUsage($value: RemoveUsageMutationInput!) {
  removeUsage(input: $value) {
    status
  }
}
`

export const addToMealplanMutation = gql`
mutation addToMealplan($value: AddToMealplanMutationInput!) {
  addToMealplan(input: $value) {
    link {
      id
    }
  }
}
`

export const removeFromMealplanMutation = gql`
mutation removeFromMealplan($value: RemoveFromMealplanMutationInput!) {
  removeFromMealplan(input: $value) {
    status
  }
}
`

export const clearAllFromMealplanMutation = gql`
mutation clearAllFromMealplan($value: ClearAllFromMealplanMutationInput!) {
  clearAllFromMealplan(input: $value) {
    status
  }
}
`

export const newFavMutation = gql`
mutation newFav($value: NewFavMutationInput!) {
  newFav(input: $value) {
    favourite {
      id
    }
  }
}
`

export const removeFavMutation = gql`
mutation removeFav($value: RemoveFavMutationInput!) {
  removeFav(input: $value) {
    status
  }
}
`

export const newCompletionMutation = gql`
mutation newCompletion($value: NewCompletionMutationInput!) {
  newCompletion(input: $value) {
    completion {
      id
    }
  }
}
`

export const removeCompletionMutation = gql`
mutation removeCompletion($value: RemoveCompletionMutationInput!) {
  removeCompletion(input: $value) {
    status
  }
}
`

export const removeAllUsagesMutation = gql`
mutation removeAllUsages($value: RemoveAllUsagesMutationInput!) {
  removeAllUsages(input: $value) {
    status
  }
}
`

export const usedRecipeAmountsMutation = gql`
mutation usedRecipeAmounts($value: UsedRecipeAmountsMutationInput!) {
  usedRecipeAmounts(input: $value) {
    status
  }
}
`