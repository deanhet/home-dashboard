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
  
  componentWillReceiveProps(nextProps) {
    if (!nextProps.lights['Living room'].on) {
      if (!this.timeoutRunning) {
        this.timeoutRunning = true
        this.screensaver = setTimeout(() => {
          this.props.dispatch(showScreenSaver())
          this.timeoutRunning = false
        }, 900000)
        // 15 mins
      }
    } else {
      this.timeoutRunning = false
      clearTimeout(this.screensaver)
    }
  }

  componentWillUnmount() {
    clearInterval(this.pollInteral)
  }

  render() {
    const { lights, dispatch } = this.props
    return (
      <View style={{ paddingTop: 40 }}>
        <View style={style.container}>
          <Switch 
            style={{ left: 50, top: 0, width: 150, height: 150 }} 
            roomLabel="Hallway" 
            dispatch={dispatch}
            light={lights.Hallway}
            labelPosition={{ top: 110, left: 25 }}
          >
            <View 
              style={[
                style.hallway, 
                {top: 0, height: 150, width: 50}
              ]} 
            />
            <View 
              style={[
                style.hallway, 
                {left: 0, top: 100, height: 50, width: 150}
              ]} 
            />
          </Switch>
          <Switch 
            style={{ top: 0, left: 200, height: 150, width: 150 }} 
            roomLabel="Bedroom" 
            dispatch={dispatch}
            light={lights.Bedroom} 
          />
          <Switch 
            style={{ top: 150, left: 150, height: 150, width: 200 }} 
            roomLabel="Living room" 
            dispatch={dispatch}
            light={lights['Living room']}
          />
          <Switch 
            style={{ left: 0, top: 250, height: 100, width: 175 }}
            roomLabel="Kitchen" 
            dispatch={dispatch}
            light={lights.Kitchen} 
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
  },
  hallway: {
    backgroundColor: 'grey',
    position:        'absolute'
  }
})
