import storage from 'redux-persist/lib/storage'
import { persistCombineReducers } from 'redux-persist'

import nav from './reducers/nav'

const config = {
  key: 'primary',
  storage
}
export default persistCombineReducers(config, {
  nav
})
