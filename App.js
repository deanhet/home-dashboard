import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import HueSwitches from './components/hueSwitches/'

export default class App extends Component<{}> {

  render() {
    return (
      <View style={styles.container}>
        <HueSwitches />
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
