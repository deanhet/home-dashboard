import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Switch from './Switch'

export class HueSwitches extends PureComponent {

  render() {
    const { lightsActive, dispatch } = this.props
    return (
      <View style={style.container}>
        <Switch 
          style={{ left: 50, top: 0 }} 
          roomLabel="Hallway" 
          dispatch={dispatch}
          isActive={lightsActive.Hallway}
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
          isActive={lightsActive.Bedroom} 
        />
        <Switch 
          style={{ top: 150, left: 150, height: 150, width: 200 }} 
          roomLabel="Living Room" 
          dispatch={dispatch}
          isActive={lightsActive.LivingRoom} 
        />
        <Switch 
          style={{ left: 0, top: 250, height: 100, width: 175 }}
          roomLabel="Kitchen" 
          dispatch={dispatch}
          isActive={lightsActive.Kitchen} 
        />
      </View>
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
