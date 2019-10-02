import AsyncStorage from '@react-native-community/async-storage';
import { persistCombineReducers } from 'redux-persist'

import meals from './reducers/meals'
import nav from './reducers/nav'
import hue from './reducers/hue'
import spotify from './reducers/spotify'
import events from './reducers/events'
import weather from './reducers/weather'
import tv from './reducers/tv'
import bus from './reducers/bus'
import icloud from './reducers/icloud'

const config = {
  key: 'primary',
  storage: AsyncStorage
}
export default persistCombineReducers(config, {
  nav,
  meals,
  hue,
  spotify,
  events,
  weather,
  tv,
  bus,
  icloud
})
