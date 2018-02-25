import data from './dataAction'
import keys from '../../keys'

export const UPDATE_SHOWS = 'tv/UPDATE_SHOWS'

export function updateTV() {
  return async dispatch => {
    const request = await data(`${keys.tv.ip}/api/${keys.tv.key}/?cmd=future&type=today|soon|later&paused=1`)
    const { later, soon, today } = request.data
    dispatch({ type: UPDATE_SHOWS, data: [... today, ... soon, ... later] })
  }
}
