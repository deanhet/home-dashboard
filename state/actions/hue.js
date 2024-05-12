import data from './dataAction'
import keys from '../../keys'

export const TOGGLE_LIGHT = 'hue/TOGGLE_LIGHT'
export const POLL_LIGHTS = 'hue/POLL_LIGHTS'
export const CHANGE_BRIGHTNESS = 'hue/CHANGE_BRIGHTNESS'

const roomEnum = {
  'Living room big light': 85,
  Bedroom:       83,
  'Hallway': 82,
  'Living room lamps': 84
}

const username = keys.hue.username
const ip = keys.hue.ip

export function pollLights() {
  // Poll for brightness
  return async dispatch => {
    const lightsState = await data(`http://${ip}/api/${username}/groups`)
    const body = Object.values(lightsState).reduce((acc, room) => {
      acc[room.name] = { on: room.state.all_on || room.state.any_on, brightness: room.action.bri }
      return acc
    }, {})
    dispatch({ type: POLL_LIGHTS, data: body })
  }
}

export function lightBrightness(room, percentage) {
  return async dispatch => {
    const formattedPercentage = percentage * 255
    const huePercentage = parseFloat(Math.max(Math.min(formattedPercentage, 254), 1).toFixed(0))
    const body = { bri: huePercentage } 
    await data(`http://${ip}/api/${username}/groups/${roomEnum[room]}/action`, {
      method: 'PUT',
      body:   JSON.stringify(body)
    })
    dispatch({type: CHANGE_BRIGHTNESS, data: { room, brightness: huePercentage }})
  }
}

export function lightSwitch(room, forceLightState) {
  return async dispatch => {
    const lightState = await data(`http://${ip}/api/${username}/groups/${roomEnum[room]}`)
    let body = null
    if (forceLightState) {
      body = { on: forceLightState }
    } else if (lightState.state.all_on || lightState.state.any_on) {
      body = { on: false }
    } else {
      body = { on: true }
    }
    
    await data(`http://${ip}/api/${username}/groups/${roomEnum[room]}/action`, {
      method: 'PUT',
      body:   JSON.stringify(body)
    })
    dispatch({type: TOGGLE_LIGHT, data: { room, state: body.on }})
  }
}

export async function sensors() {
  const sensorStates = await data(`http://${ip}/api/${username}/sensors`)
  return sensorStates
}

