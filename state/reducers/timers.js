import * as actions from '../actions/timers'

const initialState = []

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.GET_TIMERS:
      return action.data  
    default:
      return state
  }
}