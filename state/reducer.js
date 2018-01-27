import storage from 'redux-persist/lib/storage'
import { persistCombineReducers } from 'redux-persist'

import meals from './reducers/meals'
import nav from './reducers/nav'
import hue from './reducers/hue'
import spotify from './reducers/spotify'

const config = {
  key: 'primary',
  storage
}
export default persistCombineReducers(config, {
  nav,
  meals,
  hue,
  spotify
})
