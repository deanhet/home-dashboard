import * as actions from '../actions/weather'

const initialState = {
  data: {}
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case actions.UPDATE_WEATHER:
      return {
        data: action.data
      }
    default:
      return state
  
  }
}
