import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Phone extends PureComponent {

  static propTypes = {
    phone:      PropTypes.object,
    name:       PropTypes.string,
    searchable: PropTypes.bool,
    onSearch:   PropTypes.func
  }

  formatDistance = () => {
    const { phone } = this.props
    if (phone.googleMaps.distance.value < 300) {
      return (
        <View style={[style.locationContainer, {height: 33}]}>
          <Icon name="home" style={{ color: 'grey', fontSize: 25 }} />
          <Text style={{ color: 'grey', fontSize: 25 }}>Home</Text>
        </View>
      )
    }
    return (
      <View style={[style.locationContainer, {height: 35}]}>
        <Icon name="directions-walk" style={{ color: 'grey', fontSize: 30 }} />
        <View>
          <Text style={{ color: 'white', fontSize: 15 }}>{phone.googleMaps.distance.text}</Text>
          <Text style={{ color: 'grey', fontSize: 15, marginTop: -2 }}>
            {phone.googleMaps.duration.text}
          </Text>
        </View>
      </View>
    )
  }
  render() {
    const { phone, name, searchable, onSearch } = this.props
    if(!phone.googleMaps.distance) return <View />
    return (
      <View style={style.container}>
        <View style={{marginTop: -10, alignItems: 'center'}}>
          {searchable
            ? <TouchableOpacity onPress={onSearch}>
              <Icon name="phonelink-ring" style={[style.icon, { paddingLeft: 5 }]} />
            </TouchableOpacity>
            : <Icon name="phone-iphone" style={style.icon} />
          }
          <Text style={style.battery}>{(phone.batteryLevel * 100).toFixed(0)}%</Text>
        </View>
        <View style={{ paddingLeft: 5 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>{name}</Text>
          {this.formatDistance()}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="access-time" style={{ color: 'grey' }} />
            <Text style={{ color: 'gray', fontSize: 15, paddingLeft: 5 }}>{
              new Date(phone.location.timeStamp)
                .toLocaleString('en-GB', { 
                  hour:   'numeric', 
                  minute: 'numeric', 
                  hour12: true 
                })
            }</Text>
          </View>
        </View>
      </View>
    )
  }

}

const style = StyleSheet.create({
  container: {
    alignItems:    'center', 
    flex:          1, 
    flexDirection: 'row'
  },
  battery: { 
    paddingTop: 2, 
    fontSize:   20, 
    color:      'grey' 
  },
  icon: {
    paddingTop: 6, 
    fontSize:   50, 
    color:      'grey' 
  },
  locationContainer: { 
    marginLeft:    -5, 
    flexDirection: 'row', 
    alignItems:    'center' 
  }
})
