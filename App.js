import React, { Component } from 'react'
import { GatewayProvider } from 'react-gateway'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import {persistor, store} from './state/configureStore'
import AppBody from './components/app/AppBody'


export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <GatewayProvider>
            <AppBody />
          </GatewayProvider>
        </PersistGate>
      </Provider>
    )
  }

}
