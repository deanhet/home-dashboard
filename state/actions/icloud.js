import data from './dataAction'
import AsyncStorage from '@react-native-community/async-storage'
import keys from '../../keys'

export const UPDATE_PHONES = 'icloud/UPDATE_PHONES'

export function deviceLocations() {
  return async dispatch => {
    const baseUrl = await login()
    const response = await listDevices(baseUrl)
    if (response) {
      const sazPhone = response.content.find((phone) => phone.name === 'SazPhone')
      const deanPhone = response.content.find((phone) => phone.name === 'Bob')
      if (sazPhone && deanPhone) {
        const key = keys.icloud.googleMapsKey
        const homeCoord = keys.homeCoord
        const mapResponse = await data(
          'https://maps.googleapis.com/maps/api/distancematrix/json' +
          '?mode=walking' +
          '&units=imperial' +
          `&origins=${homeCoord}` +
          `&destinations=${sazPhone.location.latitude},${sazPhone.location.longitude}` +
          `%7C${deanPhone.location.latitude},${deanPhone.location.longitude}` +
          `&key=${key}`)
        if (mapResponse.status === 'OK') {
          sazPhone.googleMaps = mapResponse.rows[0].elements[0]
          deanPhone.googleMaps = mapResponse.rows[0].elements[1]
        }
        dispatch({ type: UPDATE_PHONES, data: { sazPhone, deanPhone } })
      }
    }
  }
}

export function pingDevice() {
  return async dispatch => {
    const { deviceId, baseUrl } = await getDeviceId()
    if (deviceId) {
      const body = {
        subject: 'Find My iPhone Alert',
        device:  deviceId
      }

      const response = await data(`${baseUrl}/fmipservice/client/web/playSound`, {  
        method:  'POST',
        headers: {  
          Origin:         'https://www.icloud.com',
          'Content-Type': 'application/json',
          Cookie:         await AsyncStorage.getItem('@hd:cookie')
        }, 
        body: JSON.stringify(body)
      })
      // TODO: Show alert on screen or something
      console.log(response)
    }
  }
}

async function login() {
  const body = {
    apple_id:       keys.icloud.iCloudUsername,
    password:       keys.icloud.iCloudPassword,
    extended_login: true
  }
  const response = await data('https://setup.icloud.com/setup/ws/1/login', {
    method:  'POST',
    headers: {
      Origin:         'https://www.icloud.com',
      'Content-Type': 'application/json'
    },
    body:   JSON.stringify(body) 
  }, true)
  if (response) {
    return response.webservices.findme.url
  }
}

async function getDeviceId() {
  const baseUrl = await login()
  const response = await listDevices(baseUrl)
  if (response) {
    const sazPhone = response.content.find((phone) => phone.name === 'SazPhone')
    return {deviceId: sazPhone.id, baseUrl}
  }
}

async function listDevices(baseUrl) {
  const body = {
    clientContext: {
      appName:      'iCloud Find (Web)',
      appVersion:   '2.0',
      timezone:     'US/Eastern',
      inactiveTime: 3571,
      apiVersion:   '3.0',
      fmly:         true
    }
  }

  const response = await data(`${baseUrl}/fmipservice/client/web/initClient`, {
    method:  'POST',
    headers: {
      Origin:         'https://www.icloud.com',
      'Content-Type': 'application/json'
    },
    body:   JSON.stringify(body) 
  }, true)

  if (response) {
    return response
  } 
}
