import data from './dataAction'
import keys from '../../keys'

export const UPDATE_SHOWS = 'tv/UPDATE_SHOWS'

export function updateTV() {
  return async dispatch => {
    const request = await data(`${keys.tv.ip}/api/v3/calendar?end=${new Date(new Date().getTime() + (86400000 * 14)).toISOString().split('T')[0]}&includeSeries=true`, {
      headers: {
        'X-Api-Key': keys.tv.key
      }
    })
    dispatch({ type: UPDATE_SHOWS, data: request })
  }
}
