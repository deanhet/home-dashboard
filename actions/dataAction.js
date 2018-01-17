import fetch from './fetch'

const data = async (url, config = {
  method: 'GET'
}) => {
  const data = await fetch(url, config)
  if (!data.ok) return
  const response = await data.json()
  return response
}

export default data
