import fetch from './fetch'

const data = async (url, config = {
  method: 'GET'
}) => {
  try {
    const data = await fetch(url, config)
    if (!data.ok || data._bodyText === "" ) return null
    const response = await data.json()
    return response
  } catch (error){
    console.log(error)
  }

}

export default data
