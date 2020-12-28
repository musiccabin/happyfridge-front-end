import React from 'react'
import { Navigation } from './js/navigation'
import { ApolloProvider } from '@apollo/client'
import { client } from './js/apollo'
import { Provider } from './js/context'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider>
        <Navigation />
      </Provider>
    </ApolloProvider>
    )
}

export default App
