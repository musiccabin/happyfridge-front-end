import { gql } from '@apollo/client'
import {UserFragment, GroceryFragment} from '../fregments'

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
      clientMutationId
      groceryUpdated
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

export const removeLeftoverMutation = gql`
mutation removeLeftover($value: RemoveLeftoverMutationInput!) {
  removeLeftover(input: $value) {
    status
    groceryUpdated
  }
}
`