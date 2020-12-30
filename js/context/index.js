import React, {createContext, useState} from 'react'

export const Context = createContext()

export const Provider = ({children}) => {
  const [currentUser, setcurrentUser] = useState(false)
  const values = {
    currentUser,
    setcurrentUser,
  }
  return (
    <Context.Provider value={values} >
      {children}
    </ Context.Provider>
  )
}
