import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image, Animated } from 'react-native'
import { currentlyPlaying } from '../../actions/spotify'

export default class Spotify extends PureComponent {

  state = {
    artist:  null,
    track:   null,
    visible: false,
    image:   null
  }

  barHeight = new Animated.Value(0)

  componentDidMount() {
    this.currentlyPlaying = setInterval(async () => {
      const currentSong = await currentlyPlaying()
      if (currentSong) {
        this.setState({
          image:   currentSong.item.album.images[2].url,
          visible: currentSong.is_playing,
          artist:  currentSong.item.artists[0].name,
          track:   currentSong.item.name
        })
      } else {
        this.setState({ visible: false })
      }
      Animated.timing(this.barHeight, {
        timing:  400,
        toValue: this.state.visible ? 60 : 0
      }).start()
    }, 15000)
  }

  componentWillUnmount() {
    clearInterval(this.currentlyPlaying)
  }

  render() {
    const { image, track, artist } = this.state
    return (
      <Animated.View style={[style.container, {height: this.barHeight}]}>
        {image && <Image source={{ uri: image }} style={style.image} />}  
        <View style={{ paddingLeft: 15 }}>
          <Text style={[style.text, {fontWeight: 'bold'}]}>{artist}</Text>
          <Text style={style.text}>{track}</Text>
        </View>
      </Animated.View>
    )
  }

}

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
  text: {
    fontSize: 18,
    color:    'white'
  }
})
