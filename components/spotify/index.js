import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { currentlyPlaying, skipTrack } from '../../state/actions/spotify'

export class Spotify extends PureComponent {

  barHeight = new Animated.Value(0)

  static propTypes = {
    dispatch: PropTypes.func,
    visible:  PropTypes.bool,
    image:    PropTypes.string,
    track:    PropTypes.string,
    artist:   PropTypes.string
  }

  componentDidMount() {
    this.currentlyPlaying = setInterval(() => {
      this.props.dispatch(currentlyPlaying())
      Animated.timing(this.barHeight, {
        timing:  400,
        useNativeDriver: false,
        toValue: this.props.visible ? 60 : 0
      }).start()
    }, 25000)
  }

  componentWillUnmount() {
    clearInterval(this.currentlyPlaying)
  }

  previousSong = () => {
    this.props.dispatch(skipTrack('previous'))
  }

  nextSong = () => {
    this.props.dispatch(skipTrack('next'))
  }

  render() {
    const { image, track, artist } = this.props
    return (
      <Animated.View style={[style.container, {height: this.barHeight}]}>
        {image && <Image source={{ uri: image }} style={style.image} />}  
        <View style={{ flex: 1, paddingLeft: 15 }}>
          <Text style={[style.text, {fontWeight: 'bold'}]}>{artist}</Text>
          <Text style={style.text}>{track}</Text>
        </View>
        <TouchableOpacity onPress={this.previousSong}>
          <Icon style={style.icon} name="skip-previous" />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.nextSong}>
          <Icon style={style.icon} name="skip-next" />
        </TouchableOpacity>
      </Animated.View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    image:   state.spotify.image,
    visible: state.spotify.visible,
    artist:  state.spotify.artist,
    track:   state.spotify.track
  }
}

export default connect(mapStateToProps)(Spotify)

const style = StyleSheet.create({
  container: {
    overflow:        'hidden',
    flexDirection:   'row',
    alignItems:      'center',
    backgroundColor: 'rgba(50,50,50,0.6)',
    width:           '100%'
  },
  image: {
    height: 60,
    width:  60
  },
  icon: {
    color:    'white',
    fontSize: 60
  },
  text: {
    fontSize: 18,
    color:    'white'
  }
})
