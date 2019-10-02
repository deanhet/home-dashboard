import AsyncStorage from '@react-native-community/async-storage'
import data from './dataAction'
import keys from '../../keys'

export const SPOTIFY_CURRENTLY_PLAYING = 'spotify/SPOTIFY_CURRENTLY_PLAYING'

const makeParams = (obj) => {
  return Object.keys(obj).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
  }).join('&')
}
export async function refreshToken() {

  const refreshToken = await AsyncStorage.getItem('@hd:refresh_token')
  if (!refreshToken) {
    await AsyncStorage.setItem('@hd:refresh_token', keys.spotify.refreshToken)
  }
  const options = {
    grant_type:    'refresh_token',
    refresh_token: refreshToken
  }

  const params = makeParams(options)
  const config = {
    method:  'POST',
    body:    params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization:  `Basic ${keys.spotify.authorization}`
    }
  }
  const token = await data('https://accounts.spotify.com/api/token', config)
  if (token && token.refresh_token) {
    await AsyncStorage.setItem('@hd:refresh_token', token.refresh_token)
  }
  if (token) {
    return token.access_token
  } else {
    return false
  }
}

export function currentlyPlaying() {
  return async dispatch => {
    const accessToken = await refreshToken()
    if (accessToken) {
      const config = {
        method:  'GET',
        headers: {
          Authorization:  `Bearer ${accessToken}`
        }
      }
      const currentlyPlaying = await data('https://api.spotify.com/v1/me/player/currently-playing', config)
      if (currentlyPlaying) {
        dispatch({ type: SPOTIFY_CURRENTLY_PLAYING, data: currentlyPlaying })
      }
    }
  } 
}

export function skipTrack(direction) {
  return async dispatch => {
    const accessToken = await refreshToken()
    if (accessToken) {
      const config = {
        method:  'POST',
        headers: {
          Authorization:  `Bearer ${accessToken}`
        }
      }
      await data(`https://api.spotify.com/v1/me/player/${direction}`, config)
      dispatch(currentlyPlaying())
    }
  } 
}


