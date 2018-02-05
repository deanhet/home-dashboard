import * as actions from '../actions/icloud'

const initialState = {
  sazPhone:  {},
  deanPhone: {}
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case actions.UPDATE_PHONES:
      return {
        sazPhone:  action.data.sazPhone,
        deanPhone: action.data.deanPhone
      }
    default: 
      return state

  }
}
