import fetch from './fetch'

const data = async (url, config = {
  method: 'GET'
}) => {
  const data = await fetch(url, config)
  if (!data.ok || data._bodyText === '') return false
  const response = await data.json()
  return response
}

export default data
