import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import HueSwitches from './components/hueSwitches/'
import HueTemps from './components/hueTemps/'

export default class App extends Component<{}> {

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <HueSwitches />
          <HueTemps />
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    justifyContent:  'center',
    alignItems:      'center',
    backgroundColor: 'black'
  }
})
