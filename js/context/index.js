import React, {createContext, useState} from 'react'

export const Context = createContext()

export const Provider = ({children}) => {
  const [popularRecipes, setPopularRecipes] = useState([])
  const values = {
    popularRecipes, setPopularRecipes,
  }
  return (
    <Context.Provider value={values} >
      {children}
    </ Context.Provider>
  )
}
