import React, { PureComponent } from 'react'
import { Dimensions, Animated, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Clock from '../clock'
import { hideScreenSaver } from '../../state/actions/nav'

export class Screensaver extends PureComponent {

  animatedValue = new Animated.Value(0)
  screenWidth = Dimensions.get('window').width - 250

  static propTypes = {
    dispatch: PropTypes.func
  }
  
  componentDidMount() {
    this.cycleAnimation()
  }

  hideScreen = () => {
    this.props.dispatch(hideScreenSaver())
  }

  cycleAnimation = () => {
    Animated.timing(this.animatedValue, {
      duration: 50000,
      useNativeDriver: false,
      toValue:  this.animatedValue._value === this.screenWidth ? 0 : this.screenWidth
    }).start(() => {
      this.cycleAnimation()
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.hideScreen}>  
        <View style={style.container}>
          <Animated.View style={[
            style.animated,
            {
              left: this.animatedValue
            }
          ]}>
            <Clock />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>

    )
  }

}

export default connect()(Screensaver)

const style = StyleSheet.create({
  container: { 
    position:        'absolute',
    top:             0,
    right:           0,
    bottom:          0,
    left:            0, 
    backgroundColor: 'black',
    justifyContent:  'center'
  },
  animated:  {
    position:        'absolute',
    right:           0,
    opacity:         0.5,
    height:          100, 
    width:           250 
  }
})
