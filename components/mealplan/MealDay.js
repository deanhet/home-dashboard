import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

export default class MealDay extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired
  }
  
  render() {
    const { data } = this.props
    return (
      <TouchableOpacity>
        <View style={style.container}>
          <Text style={{ color: 'grey', fontSize: 30 }}>{data.day}</Text>
          <Text style={{ color: 'white', fontSize: 50 }}>{data.meal}</Text>
        </View> 
      </TouchableOpacity>
    )
  }

}

const style = StyleSheet.create({
  container: { 
    padding:         15, 
    backgroundColor: 'rgb(64,64,64)', 
    marginBottom:    5,  
    width:           '100%' 
  }
})
