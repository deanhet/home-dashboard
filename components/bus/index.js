import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { updateBusTimes } from '../../state/actions/bus'

export class Bus extends PureComponent {

  static propTypes = {
    dispatch:    PropTypes.func,
    times:       PropTypes.array,
    disruptions: PropTypes.bool
  }

  UNSAFE_componentWillMount() {
    this.checkBus = setInterval(() => {
      this.props.dispatch(updateBusTimes())
    }, 60000)
    // 1 min
  }

  componentWillUnmount() {
    clearInterval(this.checkBus)
  }

  render() {
    const { times, disruptions } = this.props
    if (times.length === 0) {
      return (
        <View style={style.container}>
          <Text style={{ color: 'white', fontSize: 50 }}>No bus data available</Text>
        </View>
      )
    }
    return (
      <View style={style.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>  
          <View style={{ alignItems: 'center' }}>
            <Icon name="directions-bus" style={{ fontSize: 50, color: 'grey' }} />
            <Text style={style.busNumber}>44</Text>
            {disruptions && <Icon name="warning" style={style.warningIcon} />}
          </View>
          <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
            <Text style={style.mainBusText}>{times[0].nameDest}</Text>
            <Text style={[style.mainBusText, {fontWeight: 'bold'}]}>{times[0].minutes} mins</Text>
            <Text style={style.mainBusText}>{times[0].time}</Text>
          </View>
          <ScrollView horiztonal style={{ paddingLeft: 15, height: '50%' }}>
            {times.map((time, index) => {
              if (index > 0) {
                return (
                  <View key={time.busId + time.time} style={style.otherBusesContainer}>
                    <Text style={{ color: 'white' }}>{time.nameDest}</Text>
                    <Text style={{ color: 'white' }}>{time.minutes} mins</Text>
                    <Text style={{ color: 'gray' }}>{time.time}</Text>
                  </View>
                )
              }
            }
            )}
          </ScrollView>
        </View>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    times:       state.bus.times,
    disruptions: state.bus.disruptions
  }
}

export default connect(mapStateToProps)(Bus)

const style = StyleSheet.create({
  container: {
    padding:        15,
    flex:           1,
    justifyContent: 'center'
  },
  busNumber: {
    marginTop: -5,
    fontSize:  30,
    color:     'gray'
  },
  mainBusText: {
    color:    'white',
    fontSize: 20
  },
  otherBusesContainer: {
    borderBottomWidth: 1, 
    borderColor:       'gray',
    justifyContent:    'flex-end'
  },
  warningIcon: { 
    fontSize: 20, 
    position: 'absolute',
    right:    0,
    top:      -5,
    color:    'white'
  }
})
