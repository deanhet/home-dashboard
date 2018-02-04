import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { pingDevice, deviceLocations } from '../../state/actions/icloud'

export class FindPhone extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func
  }
  
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'orange' }}>
        <TouchableOpacity onPress={() => {
          this.props.dispatch(pingDevice())
        }}>
          <Text>Ping saz phone</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

export default connect()(FindPhone)
