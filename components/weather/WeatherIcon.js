import React, { PureComponent } from 'react'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import PropTypes from 'prop-types'
import fontelloConfig from './config.json'

const Icon = createIconSetFromFontello(fontelloConfig)

export default class WeatherIcon extends PureComponent {

  static propTypes = {
    icon: PropTypes.string
  }

  chooseIcon = () => {
    switch (this.props.icon) {

      case 'clear-day':
      case 'clear-night':
        return 'sun'
      case 'rain':
        return 'drizzle'
      case 'snow':
      case 'sleet':
        return 'snow'
      case 'wind':
        return 'cloud-wind'
      case 'fog':
        return 'fog-cloud'
      case 'cloudy':
      case 'partly-cloudy-day':
      case 'partly-cloudy-night':
      default:
        return 'cloud'
    
    }
  }

  render() {
    return (
      <Icon name={this.chooseIcon()} style={{ fontSize: 40, color: 'grey' }} />
    )
  }

}
