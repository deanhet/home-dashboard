import data from './dataAction'
import keys from '../../keys'
import RNFetchBlob from 'rn-fetch-blob'

export const GET_TIMERS = 'timers/GET_TIMERS'

export function fetchTimers(){
  return async dispatch => {
    // Need to blob fetch as fetch api doesnt allow disabled SSL verification
    RNFetchBlob.config({
      trusty : true
    })
    .fetch('GET', keys.timers.url, {
      'cast-local-authorization-token': keys.timers.authToken
    })
    .then((resp) => {
      const { timer } = JSON.parse(resp.data)
      dispatch({ type: GET_TIMERS, data: timer })
    })
  }
}