import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import lightSwitch from '../../actions/hue'

export default class Switch extends PureComponent {

  state = {
    isActive: false
  }

  toggleActive = async () => {
    const { roomLabel } = this.props
    console.log(roomLabel)
    const lightToggle = await lightSwitch(roomLabel)
    this.setState({
      isActive: lightToggle
    })
  }

  render() {
    const { isActive } = this.state
    const { roomLabel } = this.props
    return (
      <TouchableOpacity onPress={this.toggleActive} style={{ flex: 1 }}>
        <View style={[{ opacity: isActive ? 1 : 0.5 }, style.container]}>
          <Text style={{ fontSize: 48, color: 'white' }}>{roomLabel}</Text>
        </View>
      </TouchableOpacity>
    )
  }

}

const style = StyleSheet.create({
  container: {
    alignItems:      'center', 
    justifyContent:  'center', 
    margin:          15, 
    padding:         15, 
    borderWidth:     1, 
    flex:            1, 
    backgroundColor: 'orange' 
  }
})
