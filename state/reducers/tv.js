import * as actions from '../actions/tv'

const initialState = []

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case actions.UPDATE_SHOWS:
      return action.data
    default:
      return state
  
  }
}
