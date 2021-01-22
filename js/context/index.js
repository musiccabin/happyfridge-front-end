import React, { createContext, useState, useEffect } from 'react'

export const Context = createContext()

export const Provider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const values = {
    currentUser,
    setCurrentUser,
  }
  return <Context.Provider value={values}>{children}</Context.Provider>
}
