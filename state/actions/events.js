import RNCalendarEvents from 'react-native-calendar-events'

export const UPDATE_EVENTS = 'events/UPDATE_EVENTS'

export function refreshEvents() {
  return async dispatch => {
    const isAuthorized = await RNCalendarEvents.authorizationStatus()
    if (isAuthorized !== 'authorized') {
      await RNCalendarEvents.authorizeEventStore()
    }
    const today = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 14)
    const upcomingEvents = await RNCalendarEvents
      .fetchAllEvents(today.toISOString(), nextWeek.toISOString(), ['2'])
    dispatch({ type: UPDATE_EVENTS, data: upcomingEvents })
  }
}
