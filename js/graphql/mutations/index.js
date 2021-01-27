import { gql } from '../../../node_modules/@apollo/client'
import { UserFragment } from '../fregments'

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
export const NewLeftOverMutation = gql`
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
