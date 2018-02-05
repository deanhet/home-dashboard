export const TOGGLE_MODAL = 'nav/TOGGLE_MODAL'
export const SHOW_SCREENSAVER = 'nav/SHOW_SCREENSAVER'
export const HIDE_SCREENSAVER = 'nav/HIDE_SCREENSAVER'

export function toggleModal(forceToggle) {
  return dispatch => {
    dispatch({ type: TOGGLE_MODAL, data: forceToggle })
  }
}

export function showScreenSaver() {
  return dispatch => {
    dispatch({ type: SHOW_SCREENSAVER })
  }
}

export function hideScreenSaver() {
  return dispatch => {
    dispatch({ type: HIDE_SCREENSAVER })
  }
}
