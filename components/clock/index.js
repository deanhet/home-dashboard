import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Clock extends PureComponent {

  state = {
    date: new Date().toLocaleDateString('en-GB', { 
      weekday: 'short', 
      year:    'numeric', 
      month:   'short', 
      day:     'numeric' 
    }),
    time: new Date().toLocaleString('en-US', { 
      hour:   'numeric', 
      minute: 'numeric', 
      hour12: true 
    })
  }

  UNSAFE_componentWillMount() {
    this.timeoutClock = setInterval(() => {
      const time = new Date()
      this.setState({
        date: time.toLocaleDateString('en-GB', { 
          weekday: 'short', 
          year:    'numeric', 
          month:   'short', 
          day:     'numeric' 
        }),
        time: time.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true })
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timeoutClock)
  }

  render() {
    return (
      <View style={{ flex: 0.7, padding: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="clock-o" style={{ fontSize: 40, color: 'grey', paddingRight: 10 }}/>
          <Text style={style.text}>{this.state.time.toLowerCase()}</Text>
        </View>
        <Text style={{ color: 'grey', fontSize: 30, marginTop: -10 }}>{this.state.date}</Text>
      </View>
    )
  }

}

const style = StyleSheet.create({
  text: {
    color:      'white',
    fontWeight: 'bold',
    fontSize:   50
  }
})
