import React, {Component} from 'react'
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {GatewayDest} from 'react-gateway'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {toggleModal} from '../../state/actions/nav'

import HueSwitches from '../hueSwitches'
import HueTemps from '../hueTemps'
import Clock from '../clock'
import Spotify from '../spotify'
import MealPlan from '../mealplan'
import Events from '../events'
import Weather from '../weather'
import TV from '../tv'
import Bus from '../bus'
import FindPhone from '../findPhone/'
import Screensaver from './Screensaver'
import Timers from '../timers'

export class AppBody extends Component {

  static propTypes = {
    dispatch:        PropTypes.func,
    modalOpen:       PropTypes.bool,
    screensaver: PropTypes.bool
  }

  handleToggleModal = () => {
    this.props.dispatch(toggleModal())
  }

  render() {
    const { modalOpen, screensaver } = this.props
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Clock />
          <Timers />
          <HueTemps />
        </View>
        <View style={{ flex: 3, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>  
            <Events />
            <TV />
          </View>
          <HueSwitches />
          <View style={{ flex: 1 }}>
            <MealPlan />
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Weather />
          <View style={{flex: 1}} />
          { /* <FindPhone /> */}
          <Bus />
        </View>
        <Spotify />
        {screensaver && <Screensaver />}
        {modalOpen &&
        <View style={styles.modal}>
          <TouchableOpacity onPress={this.handleToggleModal} style={styles.closeButton}>
            <Icon name="clear" style={{ color: 'white', fontSize: 50 }}/>
          </TouchableOpacity>
          <GatewayDest name="modal" component={View} />
        </View>
        }
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    modalOpen:       state.nav.modalOpen,
    screensaver: state.nav.screensaver
  }
}

export default connect(mapStateToProps)(AppBody)

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

