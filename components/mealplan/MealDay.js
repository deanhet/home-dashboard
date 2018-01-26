import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleModal } from '../../state/actions/nav'

export class MealDay extends PureComponent {

  static propTypes = {
    data:     PropTypes.object.isRequired,
    dispatch: PropTypes.func
  }

  handleToggleModal = () => {
    this.props.dispatch(toggleModal())
  }
  
  render() {
    const { data } = this.props
    return (
      <TouchableOpacity onPress={this.handleToggleModal}>
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

export default connect()(MealDay)
