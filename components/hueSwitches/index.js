import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Switch from './Switch'

export default class HueSwitches extends PureComponent {

  render() {
    return (
      <View style={{ alignSelf: 'stretch', flex: 1 }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Switch roomLabel="Bedroom" />
          <Switch roomLabel="Kitchen" />
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Switch roomLabel="Hallway" />
          <Switch roomLabel="Living Room" />
        </View>
      </View>
    )
  }

} 
