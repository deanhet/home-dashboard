import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { pingDevice, deviceLocations } from '../../state/actions/icloud'
import Phone from './Phone'

export class FindPhone extends PureComponent {

  static propTypes = {
    dispatch:  PropTypes.func,
    sazPhone:  PropTypes.object,
    deanPhone: PropTypes.object
  }
  
  handleSearch = () => {
    this.props.dispatch(pingDevice())
  }

  componentDidMount() {
    this.phoneInterval = setInterval(() => {
      this.props.dispatch(deviceLocations())
    }, 600000)
    // 10 mins
  }

  componentWillUnmount() {
    clearInterval(this.phoneInterval)
  }

  render() {
    const { sazPhone, deanPhone } = this.props
    if (Object.keys(sazPhone).length === 0 || Object.keys(deanPhone).length === 0) {
      return <View style={{ flex: 1 }} />
    }
    return (
      <View style={style.container}>
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

const style = StyleSheet.create({
  container: { 
    justifyContent: 'center',
    flex:           1,
    padding:        15,
    paddingLeft:    0,
    flexDirection:  'row' 
  }
})

const mapStateToProps = (state) => {
  return {
    sazPhone:  state.icloud.sazPhone,
    deanPhone: state.icloud.deanPhone
  }
}

export default connect(mapStateToProps)(FindPhone)
