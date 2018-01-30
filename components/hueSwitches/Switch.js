import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, StyleSheet, PanResponder, Animated } from 'react-native'
import { lightSwitch } from '../../state/actions/hue'

export default class Switch extends PureComponent {

  static propTypes = {
    roomLabel:     PropTypes.string,
    labelPosition: PropTypes.object,
    dispatch:      PropTypes.func,
    style:         PropTypes.object,
    children:      PropTypes.any,
    isActive:      PropTypes.bool
  }

  scrollYPosition = 0
  animatedValue = new Animated.Value(0)

  state = { 
    position: 0
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onMoveShouldSetPanResponder: (event, gesture) => true,
      onPanResponderGrant:         (event, gesture) => {
        // show dimmer UI
      },
      onPanResponderMove: (event, gesture) => {
        let newPosition = gesture.dy + this.scrollYPosition
        newPosition = Math.max(Math.min(newPosition + gesture.dy, 230), 0)
        console.log({ newPosition })

        this.animatedValue.setValue(newPosition)
        this.setState({ position: newPosition })
      },
      onPanResponderRelease: () => {
        this.scrollYPosition = this.state.position
      }
    })
  }
  
  toggleActive = () => {
    const { roomLabel } = this.props
    this.props.dispatch(lightSwitch(roomLabel))
  }

  render() {
    const { roomLabel, labelPosition, isActive } = this.props
    // const { width, height } = this.props.style
    return (
      <View 
        {...this.panResponder.panHandlers} 
        style={{ height: 230, width: 200, backgroundColor: 'orange' }}
      >
        <Animated.View {...this.panResponder.panHandlers }
          style={{ 
            position:        'absolute', 
            bottom:          0, 
            left:            0, 
            right:           0, 
            height:          this.animatedValue, 
            backgroundColor: 'blue' 
          }} 
        />
        {/* <TouchableOpacity 
        onPress={this.toggleActive} 
        style={[{position: 'absolute'}, styles.container, this.props.style]}>
        <View style={[styles.room, { opacity: isActive ? 1 : 0.5, width: width, height: height }]}>
          {this.props.children}
          <Text 
            style={[styles.text, labelPosition && [{ position: 'absolute' }, labelPosition]]}
          >
            {roomLabel}
          </Text>
        </View>
      </TouchableOpacity>*/}
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
  room: {
    borderWidth:     1,
    alignItems:      'center',
    justifyContent:  'center',
    backgroundColor: 'grey'
  },
  text: {
    zIndex:     2,
    fontSize:   20, 
    color:      'white'
  }
})
