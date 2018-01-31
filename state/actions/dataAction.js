import fetch from './fetch'

const data = async (url, config = {
  method: 'GET'
}) => {
  try {
    const data = await fetch(url, config)
    // console.log({ data, url })
    if (!data || !data.ok || data._bodyText === '') return null
    const response = await data.json()
    return response
  } catch (error) {
    console.log(error)
  }

}

export default data
