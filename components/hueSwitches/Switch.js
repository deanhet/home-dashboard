import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native'
import { lightSwitch, lightBrightness } from '../../state/actions/hue'

export default class Switch extends PureComponent {

  static propTypes = {
    displayName:   PropTypes.string,
    roomLabel:     PropTypes.string,
    labelPosition: PropTypes.object,
    dispatch:      PropTypes.func,
    style:         PropTypes.object,
    children:      PropTypes.any,
    light:          PropTypes.object
  }

  scrollYPosition = this.props.style.height * (100 / 254) * this.props.light.brightness * 0.01
  animatedValue = new Animated.Value(0)
  previousPercentage = 0
  debounceTimeout = 0

  state = { 
    switchPercentage:      0,
    position:              0,
    showBrightnessOverlay: false
  }

  UNSAFE_componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        this.previousPercentage = this.state.switchPercentage
        return true
      },
      onMoveShouldSetPanResponder: (event, gesture) => true,
      onPanResponderMove:          (event, gesture) => {
        const { height } = this.props.style
        let newPosition = (-1 * gesture.dy) + this.scrollYPosition
        newPosition = Math.max(Math.min(newPosition + -1 * (gesture.dy), height), 0)
        const switchPercentage = newPosition / height
        this.setBrightness(newPosition)
        this.animatedValue.setValue(newPosition)
        this.setState({
          switchPercentage,  
          showBrightnessOverlay: true,
          position:              newPosition 
        })
      },
      onPanResponderRelease: () => {
        this.scrollYPosition = this.state.position
        if (this.state.switchPercentage === this.previousPercentage) {
          this.toggleActive()
        }
        this.setState({
          showBrightnessOverlay: false
        })
      }
    })
  }
  
  setBrightness = () => {
    const { roomLabel, dispatch } = this.props
    clearTimeout(this.debounceTimeout)
    this.debounceTimeout = setTimeout(() => {
      dispatch(lightBrightness(roomLabel, this.state.switchPercentage))
    }, 200)
  }

  toggleActive = (forceLightState) => {
    const { roomLabel } = this.props
    this.props.dispatch(lightSwitch(roomLabel, forceLightState))
  }

  render() {
    const { displayName, roomLabel, labelPosition, light } = this.props
    const { showBrightnessOverlay } = this.state
    const { width, height } = this.props.style
    return (
      <View
        {...this.panResponder.panHandlers}
        style={[{position: 'absolute'}, styles.container, this.props.style]}
      >
        <Animated.View
          style={[styles.brightness, { 
            height:          this.animatedValue, 
            opacity:         showBrightnessOverlay ? light.on ? 0.8 : 0.2 : 0
          }]} 
        />
        <View style={[ styles.room, { 
          backgroundColor: this.props.children ? 'transparent' : 'grey', 
          opacity:         light.on ? 0.9 : 0.5, 
          width:           width, 
          height:          height 
        }]}>
          <View {...this.panResponder.panHandlers } style={styles.childContainer}>
            {this.props.children}
          </View>
          <Text 
            style={[styles.text, labelPosition && [{ position: 'absolute' }, labelPosition]]}
          >
            {displayName || roomLabel}
          </Text>
          {showBrightnessOverlay && 
            <Text style={styles.brightnessPercentageText}>
              {(this.state.switchPercentage * 100).toFixed(0)}%
            </Text>
          }
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    position:       'absolute',
    alignItems:     'center',
    justifyContent: 'center'
  },
  childContainer: {
    position: 'absolute', 
    left:     0, 
    top:      0
  },
  brightness: {
    position:        'absolute', 
    bottom:          0, 
    left:            0, 
    right:           0, 
    backgroundColor: 'white'
  },
  brightnessPercentageText: {
    color:    'white',
    position: 'absolute',
    bottom:   5, 
    right:    5
  },
  room: {
    borderWidth:     1,
    alignItems:      'center',
    justifyContent:  'center'
  },
  text: {
    zIndex:     2,
    fontSize:   20, 
    color:      'white'
  }
})
