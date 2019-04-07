import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { sensors } from '../../state/actions/hue'

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
        kitchenTemp: sensorStates['21'].state.temperature / 100
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
    const averageTemp = ((hallwayTemp + kitchenTemp) / 2).toFixed(2)
    return (
      <View style={{ alignItems: 'flex-end', padding: 15 }}>
        <View style={style.row}>
          <Icon name={this.thermometerIcon(averageTemp)} style={[style.icon, { fontSize: 50 }]} />
          <View>
            <Text style={[style.title, {fontSize: 50}]}>{averageTemp}℃</Text>
            <Text style={[style.subtitle, { fontSize: 30, marginTop: -10 }]}>Home</Text>
          </View>
          <View style={{ paddingLeft: 10 }}>
            <View style={style.row}>
              <Icon name={this.thermometerIcon(hallwayTemp)} style={style.icon} />
              <View>
                <Text style={style.title}>{hallwayTemp}℃</Text>
                <Text style={style.subtitle}>Hallway</Text>
              </View>
            </View>
            <View style={style.row}>
              <Icon name={this.thermometerIcon(kitchenTemp)} style={style.icon} />
              <View>
                <Text style={style.title}>{kitchenTemp}℃</Text>
                <Text style={style.subtitle}>Kitchen</Text>
              </View>
            </View>
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
    fontSize:    20
  },
  row: {
    flexDirection: 'row',
    alignItems:    'center'
  },
  icon: {
    color:        'grey',
    fontSize:     20,
    paddingRight: 5
  },
  subtitle: {
    color:       'grey',
    fontSize:    13
  }
})
