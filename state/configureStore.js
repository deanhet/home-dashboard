import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import { persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const store = createStore(
  reducer,
  undefined,
  compose(
    applyMiddleware(
      thunk
    )
  ))

export const persistor = persistStore(store)
