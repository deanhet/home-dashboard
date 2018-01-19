import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, Easing, View, StyleSheet } from 'react-native'

export default class FlipCard extends PureComponent {

  static defaultProps = {
    animationDuration: 750
  }

  static propTypes = {
    onFlipEnd:         PropTypes.func,
    shouldFlip:        PropTypes.bool,
    children:          PropTypes.any,
    style:             PropTypes.object,
    animationDuration: PropTypes.number
  }

  rotationValue = new Animated.Value(0)

  state = {
    showFront: true
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldFlip !== this.props.shouldFlip) {
      this.flipFace(nextProps.shouldFlip)
    }
  }

  flipFace = (isFlipped) => {
    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.setState({ showFront: !this.state.showFront })
        this.timer = null
      }, 120)
    }
    Animated.timing(this.rotationValue, {
      toValue:         isFlipped ? 0 : 1,
      duration:        this.props.animationDuration,
      easing:          Easing.elastic(1),
      useNativeDriver: true
    }).start(this.props.onFlipEnd)
  }

  render() {
    const { style, children } = this.props
    const rotationDegrees = this.rotationValue.interpolate({
      inputRange:  [0, 0.499, 0.5, 1],
      outputRange: ['0deg', '90deg', '-90deg', '0deg'],
      extrapolate: 'clamp'
    })

    return (
      <Animated.View style={[ 
        styles.container, 
        style, 
        { transform: [{ rotateY: rotationDegrees }
        ]}
      ]}>
        <View style={[
          styles.child 
        ]}>
          {children[this.state.showFront ? 0 : 1]}
        </View>
      </Animated.View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    height:      300,
    width:       300
  }, 
  child: {
    position: 'absolute',
    top:      0,
    right:    0,
    bottom:   0,
    left:     0
  }
})
