import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Meal extends PureComponent {

  render() {
    const { data, onDelete } = this.props
    return (
      <View style={{ 
        marginBottom:    5,
        backgroundColor: 'rgb(64,64,64)',
        alignItems:      'center',
        padding:         15,
        flexDirection:   'row'
      }}>
        <Text style={{ flex: 1, color: 'white', fontSize: 30 }}>{data}</Text>
        <TouchableOpacity onPress={() => { onDelete(data) }}>
          <Icon style={{ color: 'white', fontSize: 30, paddingTop: 5 }} name="clear" />
        </TouchableOpacity>
      </View>
    )
  }

}
