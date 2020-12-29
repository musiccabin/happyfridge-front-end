import React, {createContext, useState} from 'react'
import { useQuery } from '@apollo/client'
import { currentUserQuery } from '../graphql/queries'

export const Context = createContext()

export const Provider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(false)
  const initCurrentUser = () => {
    const { data } = useQuery(currentUserQuery)
    setCurrentUser(data)
  }
  const values = {
    currentUser,
    initCurrentUser,
  }
  return (
    <Context.Provider value={values} >
      {children}
    </ Context.Provider>
  )
}
