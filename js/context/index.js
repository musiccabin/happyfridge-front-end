import React, { createContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

export const Context = createContext()

export const Provider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
  }, [])
  const values = {
    currentUser,
    setCurrentUser,
  }
  return <Context.Provider value={values}>{children}</Context.Provider>
}
