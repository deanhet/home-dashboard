import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import Switch from './Switch'

export default class HueSwitches extends PureComponent {

  render() {
    return (
      <View style={{ justifyContent: 'center', alignSelf: 'stretch', height: 350, width: 350 }}>
        <Switch 
          style={{ left: 50, top: 0 }} 
          roomLabel="Hallway" 
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
        <Switch style={{ top: 0, left: 200, height: 150, width: 150 }} roomLabel="Bedroom" />
        <Switch style={{ top: 150, left: 150, height: 150, width: 200 }} roomLabel="Living Room" />
        <Switch style={{ left: 0, top: 250, height: 100, width: 175 }} roomLabel="Kitchen" />
      </View>
    )
  }

} 

const style = StyleSheet.create({
  hallway: {
    backgroundColor: 'grey',
    position:        'absolute'
  }
})
