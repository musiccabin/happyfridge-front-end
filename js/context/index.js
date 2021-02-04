import React, { createContext, useState, useEffect } from 'react'

export const Context = createContext()

export const Provider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [refreshPage, setRefreshPage] = useState(false)
  // const values = {
  //   currentUser,
  //   setCurrentUser,
  // }
  return <Context.Provider value={{ currentUserContext: [currentUser, setCurrentUser], refreshPageContext: [refreshPage, setRefreshPage] }} >{children}</Context.Provider>
}
