import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'
import Dimensions from 'Dimensions'
import { GatewayProvider, GatewayDest } from 'react-gateway'
import Icon from 'react-native-vector-icons/MaterialIcons'
import HueSwitches from './components/hueSwitches/'
import HueTemps from './components/hueTemps/'
import Clock from './components/clock'
import Spotify from './components/spotify/'
import MealPlan from './components/mealplan'

export default class App extends Component {

  state = {
    showModal: false
  }

  toggleModal = () => {
    // TODO: This should be dispatch instead
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    return (
      <GatewayProvider>
        <View style={styles.container}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Clock />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <HueSwitches />
            </View>
            <View style={{ flex: 1 }}>
              <HueTemps />
              <MealPlan />
            </View>
          </View>
          <Spotify />
          {this.state.showModal &&
            <View style={styles.modal}>
              <TouchableOpacity onPress={this.toggleModal} style={styles.closeButton}>
                <Icon name="clear" style={{ color: 'white', fontSize: 50 }}/>
              </TouchableOpacity>
              <GatewayDest name="modal" component={View} />
            </View>
          }
        </View>
      </GatewayProvider>
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
  },
  closeButton: {
    position: 'absolute',
    top:      15,
    right:    15
  },
  modal: {
    backgroundColor: 'rgba(52,52,52,0.9)',
    alignItems:      'center',
    flex:            1,
    position:        'absolute',
    right:           0,
    left:            0,
    bottom:          0,
    top:             0,
    padding:         Dimensions.get('window').height / 4
  }
})
