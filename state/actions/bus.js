import md5 from 'react-native-md5'
import data from './dataAction'
import keys from '../../keys'

export const UPDATE_TIMES = 'bus/UPDATE_TIMES'

export function updateBusTimes() {
  return async dispatch => {
    const randomNumber = Math.floor(Math.random() * 90000000) + 10000000
    const dateString = new Date().toISOString()
      .replace(/-/, '')
      .replace(/-/, '')
      .replace(/T/, '')
      .split(':')[0]
    const apiKey = keys.bus.apiKey
    const key = md5.hex_md5(apiKey + dateString)
    const response = await data(
      `http://ws.mybustracker.co.uk/?module=json&key=${key}&function=getBusTimes&random=${randomNumber}&nb=6&stopId1=58232462`
    )
    const busTimes = response.busTimes.find((service) => service.mnemoService === '44')
    const { serviceDisruption, busStopDisruption } = busTimes
    const disruptions = serviceDisruption || busStopDisruption 
    dispatch({type: UPDATE_TIMES, data: {times: busTimes.timeDatas, disruptions}})
  }
}
