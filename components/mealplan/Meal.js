import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'

export default class Meal extends PureComponent {

  static propTypes = {
    data:     PropTypes.string,
    onDelete: PropTypes.func
  }

  render() {
    const { data, onDelete } = this.props
    return (
      <View style={style.container}>
        <Text style={style.text}>{data}</Text>
        <TouchableOpacity onPress={() => { onDelete(data) }}>
          <Icon style={style.icon} name="clear" />
        </TouchableOpacity>
      </View>
    )
  }

}

const style = StyleSheet.create({
  container: { 
    marginBottom:    5,
    backgroundColor: 'rgb(64,64,64)',
    alignItems:      'center',
    padding:         15,
    flexDirection:   'row'
  },
  text: {
    flex:     1,
    color:    'white',
    fontSize: 30
  },
  icon: {
    color:      'white',
    fontSize:   30,
    paddingTop: 5
  }
})
