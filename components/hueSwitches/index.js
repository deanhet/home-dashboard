import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { pollLights } from '../../state/actions/hue'
import { showScreenSaver } from '../../state/actions/nav'
import Switch from './Switch'

export class HueSwitches extends PureComponent {

  static propTypes = {
    dispatch:     PropTypes.func,
    lights:   PropTypes.object
  }

  componentDidMount() {
    this.pollInteral = setInterval(() => {
      this.props.dispatch(pollLights())
    }, 60000)
    // 1 min
  }

  
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.timeoutRunning) {
      this.timeoutRunning = true
      this.screensaver = setTimeout(() => {
        this.props.dispatch(showScreenSaver())
        this.timeoutRunning = false
      }, 900000)
      // 15 mins
    }
  }

  componentWillUnmount() {
    clearInterval(this.pollInteral)
  }

  render() {
    const { lights, dispatch } = this.props
    console.log({lights})
    return (
      <View style={{ paddingTop: 40 }}>
        <View style={style.container}>
          <Switch 
          style={{ top: 0, right: 0, height: 200, width: 170 }} 
          roomLabel="Bedroom" 
          dispatch={dispatch}
          light={lights.Bedroom} 
        />
        <Switch 
          style={{ top: 0, left: 0, height: 200, width: 170 }} 
          roomLabel="Halls + Stairs" 
          displayName="Hall"
          dispatch={dispatch}
          light={lights["Halls + Stairs"]} 
        />
          <Switch 
            style={{ top: 210, left: 0, height: 200, width: 170 }} 
            roomLabel="Living room" 
            dispatch={dispatch}
            light={lights["Living room"]} 
          />
          <Switch 
            style={{ top: 210, right:0, height: 200, width: 170 }} 
            roomLabel="Living room lamps" 
            displayName="Lamps"
            dispatch={dispatch}
            light={lights["Living room lamps"]} 
          />
        </View>
      </View>
    )
  }

} 

const mapStateToProps = (state) => {
  return {
    lights: state.hue.lights
  }
}

export default connect(mapStateToProps)(HueSwitches)

const style = StyleSheet.create({
  container: {
    marginLeft:     -15, 
    justifyContent: 'center', 
    alignSelf:      'stretch', 
    height:         350, 
    width:          350
  }
})
