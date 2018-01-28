import React, { PureComponent } from 'react'
import { View } from 'react-native'
import RNCalendarEvents from 'react-native-calendar-events'

export default class Events extends PureComponent {

  async componentDidMount() {
    const isAuthorized = await RNCalendarEvents.authorizationStatus()
    if (isAuthorized !== 'authorized') {
      await RNCalendarEvents.authorizeEventStore()
    }
    const today = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    console.log(await RNCalendarEvents.findCalendars())
    console.log(await RNCalendarEvents.fetchAllEvents(today.toISOString(), nextWeek.toISOString(), ['2']))
  }

  render() {
    return <View style={{ flex: 1, backgroundColor: 'orange' }} />
  }

}
