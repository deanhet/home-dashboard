import * as actions from '../actions/bus'

const initialState = {
  times:       [],
  disruptions: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case actions.UPDATE_TIMES:
      return {
        times:       action.data.times,
        disruptions: action.data.disruptions
      }
    default:
      return state
  
  }
}
