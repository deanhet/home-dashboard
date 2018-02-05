import data from './dataAction'
import keys from '../../keys'

export const UPDATE_WEATHER = 'weather/UPDATE_WEATHER'

export function updateWeather() {
  return async dispatch => {
    const weather = await data(`https://api.darksky.net/forecast/${keys.weather.key}/${keys.homeCoord}?units=uk2`)
    if (weather) {
      dispatch({ type: UPDATE_WEATHER, data: weather })
    }
  }
}
