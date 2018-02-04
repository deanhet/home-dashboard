import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { pingDevice, deviceLocations } from '../../state/actions/icloud'
import Phone from './Phone'

export class FindPhone extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func
  }
  
  handleSearch = () => {
    this.props.dispatch(pingDevice())
  }

  componentDidMount() {
    this.phoneInterval = setInterval(() => {
      this.props.dispatch(deviceLocations())
    }, 300000)
    // 5 mins
  }

  componentWillUnmount() {
    clearInterval(this.phoneInterval)
  }

  render() {
    const { sazPhone, deanPhone } = this.props
    return (
      <View style={{ justifyContent: 'center', flex: 1, padding: 15, paddingLeft: 0, flexDirection: 'row' }}>
        <Phone
          phone={sazPhone}
          name="Sarah"
          searchable={true}
          onSearch={this.handleSearch}
        />
        <Phone
          phone={deanPhone}
          name="Dean"
          searchable={false}
        />
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    sazPhone:  state.icloud.sazPhone,
    deanPhone: state.icloud.deanPhone
  }
}

export default connect(mapStateToProps)(FindPhone)
