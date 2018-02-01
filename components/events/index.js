import React, { PureComponent } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { refreshEvents } from '../../state/actions/events'
import CalendarBox from './CalendarBox'

export class Events extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func,
    events:   PropTypes.array
  }

  componentDidMount() {
    this.eventInterval = setInterval(() => {
      this.props.dispatch(refreshEvents())
    }, 3600000)
    // 1 hour
  }

  componentWillUnmount() {
    clearInterval(this.eventInterval)
  }

  render() {
    const { events } = this.props
    return (
      <View style={style.container}>
        { events.length 
          ? <ScrollView>
            {events.map((event) => {
              const eventDate = new Date(event.startDate)
              return ( 
                <View key={event.id + event.startDate}>
                  <View style={style.eventRow}>
                    <CalendarBox date={eventDate.getDate()}/>
                    <View style={style.textContainer}>
                      <Text style={style.eventTitle}>{event.title}</Text>
                      <Text style={{ marginTop: -3, color: 'white' }}>
                        {eventDate.toLocaleString(
                          'en-US', 
                          { hour: 'numeric', minute: 'numeric', hour12: true })
                        }
                      </Text>
                    </View>
                  </View>
                </View>
              )
            })}
          </ScrollView>
          : <View style={{ flexDirection: 'row', alignItems: 'center' }}> 
            <CalendarBox date={'?'}/>
            <View style={style.textContainer}>
              <Text style={style.eventTitle}>No upcoming events</Text>
            </View>
          </View>
        }
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    events: state.events.calendarEvents
  }
}

export default connect(mapStateToProps)(Events)

const style = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor:       'grey',
    flex:              1, 
    marginLeft:        15,
    marginRight:       20
  },
  eventRow: {
    flexDirection: 'row', 
    marginBottom:  5, 
    alignItems:    'center'
  },
  textContainer: {
    flex:        1, 
    paddingLeft: 5
  },
  eventTitle: {
    color:       'white',
    fontSize:    20,
    fontWeight: 'bold'
  }
})
