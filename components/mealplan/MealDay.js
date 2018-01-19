import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class MealDay extends PureComponent {

  render() {
    const { data } = this.props
    return (
      <TouchableOpacity>
        <View style={{ padding: 15, backgroundColor: 'rgb(64,64,64)', marginBottom: 5, height: 175, width: '100%' }}>
          <Text style={{ color: 'grey', fontSize: 30 }}>{data.day}</Text>
          <Text style={{ color: 'white', fontSize: 50 }}>{data.meal}</Text>
        </View> 
      </TouchableOpacity>
    )
  }

}
