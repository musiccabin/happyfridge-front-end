import React from 'react'
import { Navigation } from './js/navigation'
import { ApolloProvider } from '@apollo/client'
import { client } from './js/apollo'
import { Provider } from './js/context'

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

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
