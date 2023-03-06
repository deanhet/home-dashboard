import * as actions from '../../state/actions/hue'

const initialState = { 
  lights: {
    'Living room': {on: false, brightness: 0},
    'Living room lamps':       {on: false, brightness: 0},
    'Halls + Stairs':       {on: false, brightness: 0},
    Bedroom:       {on: false, brightness: 0}
  }
  // TODO: Save temps here too
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case 'RESET_STATE':
      return initialState
    case actions.POLL_LIGHTS:
      return {
        ... state,
        lights: action.data
      }
    case actions.CHANGE_BRIGHTNESS:
      return {
        ... state,
        lights: {
          ... state.lights,
          [action.data.room]: 
          Object.assign({}, state.lights[action.data.room], {brightness: action.data.brightness})
        }
      }
    case actions.TOGGLE_LIGHT:
      return {
        ... state,
        lights: {
          ... state.lights,
          [action.data.room]: 
          Object.assign({}, state.lights[action.data.room], {on: action.data.state})
        }
      }
    default:
      return state
  
  }
}
