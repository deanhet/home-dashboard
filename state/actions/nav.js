export const TOGGLE_MODAL = 'nav/TOGGLE_MODAL'

export function toggleModal(forceToggle) {
  return dispatch => {
    console.log('in handle toggle modal')
    dispatch({ type: TOGGLE_MODAL, data: forceToggle })
  }
}
