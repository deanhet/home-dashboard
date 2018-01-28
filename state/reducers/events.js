import * as actions from '../actions/events'

export default function reducer(state = {
  calendarEvents: []
}, action = {}) {
  switch (action.type) {

    case actions.UPDATE_EVENTS:
      return { 
        calendarEvents: action.data.filter((event) => event.calendar.title === 'Family')
      }
    default:
      return state
  
  }
}
