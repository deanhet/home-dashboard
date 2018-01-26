export const TOGGLE_MODAL = 'nav/TOGGLE_MODAL'

export function toggleModal(forceToggle) {
  return dispatch => {
    dispatch({ type: TOGGLE_MODAL, data: forceToggle })
  }
}
