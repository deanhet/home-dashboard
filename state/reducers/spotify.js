import * as actions from '../actions/spotify'

const initialState = {
  image:   null,
  visible: false,
  artist:  null,
  track:   null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case actions.SPOTIFY_CURRENTLY_PLAYING:
      return {
        ... state,
        image:   action.data.item.album.images[2].url,
        visible: action.data.is_playing,
        artist:  action.data.item.artists[0].name,
        track:   action.data.item.name
      }
    default:
      return state
  
  }
}
