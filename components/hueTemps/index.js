import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { sensors } from '../../actions/hue'

export default class HueTemps extends PureComponent {

  state = {
    hallwayTemp: 0,
    kitchenTemp: 0
  }

  componentDidMount() {
    this.interval = setInterval(async () => {
      const sensorStates = await sensors()
      this.setState({
        hallwayTemp: sensorStates['8'].state.temperature / 100,
        kitchenTemp: sensorStates['16'].state.temperature / 100
      })
    }, 300000)
    // 5 minutes
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  thermometerIcon = (temp) => {
    if (temp < 5) {
      return 'thermometer-empty'
    } else if (temp < 10) {
      return 'thermometer-quarter'
    } else if (temp < 15) {
      return 'thermometer-half'
    } else if (temp < 20) {
      return 'thermometer-three-quarters'
    } else {
      return 'thermometer-full'
    }
  }

  render() {
    const { hallwayTemp, kitchenTemp } = this.state
    return (
      <View style={{ paddingTop: 15, flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name={this.thermometerIcon(hallwayTemp)} style={style.icon} />
          <View>
            <Text style={style.title}>{hallwayTemp}℃</Text>
            <Text style={style.subtitle}>Hallway</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name={this.thermometerIcon(kitchenTemp)} style={style.icon} />
          <View>
            <Text style={style.title}>{kitchenTemp}℃</Text>
            <Text style={style.subtitle}>Kitchen</Text>
          </View>
        </View>
      </View>
    )
  }

}

const style = StyleSheet.create({
  title: {
    fontWeight:  'bold',
    color:       'white',
    fontSize:    48
  },
  icon: {
    color:        'grey',
    fontSize:     40,
    paddingRight: 5
  },
  subtitle: {
    marginTop:   -10,
    color:       'grey',
    fontSize:    24,
    paddingLeft: 5
  }
})
