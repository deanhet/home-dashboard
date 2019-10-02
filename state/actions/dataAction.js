import fetch from './fetch'
import AsyncStorage from '@react-native-community/async-storage'

const data = async (url, config = {
  method: 'GET'
}, setCookie) => {
  try {
    const data = await fetch(url, config)
    // console.log({ data, url, config })
    if (!data || !data.ok || data._bodyText === '') return null
    if (setCookie) {
      await AsyncStorage.setItem('@hd:cookie', data.headers.map['set-cookie'][0])
    }
    const response = await data.json()
    return response
  } catch (error) {
    console.log(error, url, config)
  }

}

export default data
