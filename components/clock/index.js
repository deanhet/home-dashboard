import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Clock extends PureComponent {

  state = {
    time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }

  componentWillMount() {
    this.timeoutClock = setInterval(() => {
      const time = new Date()
      this.setState({
        time: time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timeoutClock)
  }

  render() {
    return (
      <View style={{ padding: 15, alignItems: 'center' }}>
        <Text style={style.text}>{this.state.time.toLowerCase()}</Text>
      </View>
    )
  }

}

const style = StyleSheet.create({
  text: {
    color:      'white',
    fontWeight: 'bold',
    fontSize:   48
  }
})
