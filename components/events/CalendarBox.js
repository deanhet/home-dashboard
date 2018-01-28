import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class CalendarBox extends PureComponent {

  static propTypes = {
    date: PropTypes.any
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.borderTop} />
        <Text style={style.text}>
          {this.props.date}
        </Text>
      </View>
    )
  }

}

const style = StyleSheet.create({
  container: {
    width:       40,
    height:      40,
    borderWidth: 3,
    borderColor: 'grey',
    alignItems:  'center'
  },
  borderTop: {
    width:           40,
    height:          10,
    backgroundColor: 'grey'
  },
  text: {
    paddingTop: 3,
    fontSize:   15,
    fontWeight: 'bold',
    color:      'grey'
  }
})
