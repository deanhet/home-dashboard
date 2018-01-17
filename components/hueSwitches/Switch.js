import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { lightSwitch } from '../../actions/hue'

export default class Switch extends PureComponent {

  static propTypes = {
    roomLabel: PropTypes.string
  }
  
  state = {
    isActive: false
  }

  toggleActive = async () => {
    const { roomLabel } = this.props
    const lightToggle = await lightSwitch(roomLabel)
    this.setState({
      isActive: lightToggle
    })
  }

  render() {
    const { isActive } = this.state
    const { roomLabel, labelPosition } = this.props
    const { width, height } = this.props.style
    return (
      <TouchableOpacity onPress={this.toggleActive} style={[{position: 'absolute'}, styles.container, this.props.style]}>
        <View style={[styles.room, { opacity: isActive ? 1 : 0.5, width: width, height: height }]}>
          {this.props.children}
          <Text style={[styles.text, labelPosition && [{ position: 'absolute' }, labelPosition]]}>{roomLabel}</Text>
        </View>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  room: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey'
  },
  text: {
    zIndex: 2,
    fontSize: 20, 
    color: 'white',
    fontWeight: 'bold'
  }
})
