import React, { PureComponent } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import WeatherIcon from './WeatherIcon'
import { updateWeather } from '../../state/actions/weather'

export class Weather extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func,
    weather:  PropTypes.object
  }

  componentDidMount() {
    this.weatherInterval = setInterval(() => {
      this.props.dispatch(updateWeather())
    }, 300000)
    // 5 mins
  }

  componentWillUnmount() {
    clearInterval(this.currentlyPlaying)
  }

  render() {
    const { weather } = this.props
    return (
      <View style={style.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <WeatherIcon icon={weather.currently.icon} />
          <Text style={style.bigText}>{weather.currently.apparentTemperature}℃</Text>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={style.smallText}>{weather.currently.temperature}℃</Text>  
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: -10 }}>
          <Text style={{ color: 'grey', fontSize: 20 }}>{weather.currently.summary}</Text>
        </View>
        <Text style={[style.subtitle, { color: 'white' }]}>{weather.minutely.summary}</Text>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    weather: state.weather.data
  }
}

const style = StyleSheet.create({
  container: {
    flex:    1, 
    padding: 15
  }, 
  bigText: {
    paddingLeft: 10,
    color:       'white',
    fontSize:    50
  },
  smallText: {
    flex:        1, 
    paddingLeft: 5, 
    color:       'grey',
    fontSize:    20
  },
  subtitle: {
    fontSize: 17
  }
})

export default connect(mapStateToProps)(Weather)
