import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import HueSwitches from './components/hueSwitches/'
import HueTemps from './components/hueTemps/'
import Clock from './components/clock'
import Spotify from './components/spotify/'

export default class App extends Component<{}> {

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Clock />
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <HueSwitches />
          </View>
          <HueTemps />
        </View>
        <Spotify />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    flexWrap:        'wrap',
    justifyContent:  'center',
    alignItems:      'center',
    backgroundColor: 'black'
  }
})
