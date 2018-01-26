import * as actions from '../actions/nav'

export default function reducer(state = {
  modalOpen: false
}, action = {}) {
  switch (action.type) {

    case actions.TOGGLE_MODAL:
      return {... state, modalOpen: action.data || !state.modalOpen}
    default:
      return state
  
  }
}
