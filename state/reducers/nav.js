import * as actions from '../actions/nav'

export default function reducer(state = {
  modalOpen:   false,
  screensaver: false
}, action = {}) {
  switch (action.type) {

    case actions.TOGGLE_MODAL:
      return {... state, modalOpen: action.data || !state.modalOpen}
    case actions.SHOW_SCREENSAVER:
      return {... state, screensaver: true}
    case actions.HIDE_SCREENSAVER:
      return {... state, screensaver: false}
    default:
      return state
  
  }
}
