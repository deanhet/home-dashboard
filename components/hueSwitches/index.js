import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { pollLights } from '../../state/actions/hue'
import Switch from './Switch'

export class HueSwitches extends PureComponent {

  static propTypes = {
    dispatch:     PropTypes.func,
    lightsActive: PropTypes.object
  }

  componentDidMount() {
    this.pollInteral = setInterval(() => {
      this.props.dispatch(pollLights())
    }, 60000)
    // 1 min
  }
  
  componentWillUnmount() {
    clearInterval(this.pollInteral)
  }

  render() {
    const { lightsActive, dispatch } = this.props
    return (
      <Switch />
    )
  }

} 

const mapStateToProps = (state) => {
  return {
    lightsActive: state.hue.lightsActive
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
