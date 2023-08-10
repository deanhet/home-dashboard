import React, { PureComponent } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { updateTV } from '../../state/actions/tv'

export class TV extends PureComponent {

  static propTypes = {
    shows:    PropTypes.array,
    dispatch: PropTypes.func
  }
  
  componentDidMount() {
    this.tvCheck = setInterval(() => {
      this.props.dispatch(updateTV())
    }, 3600000)
    // 1 hour
  }

  componentWillUnmount() {
    clearInterval(this.tvCheck)
  }

  render() {
    const { shows } = this.props
    return (
      <ScrollView 
        style={style.container}
      >
        {shows.map((show) =>
          <View style={style.eventRow} key={show.id}>
            <Icon name="tv" style={{fontSize: 40, color: 'grey'}} />
            <View style={style.textContainer}>
            <Text style={style.eventTitle}>{show.series.title}</Text>
              <Text style={[style.eventTitle, {fontSize: 16, fontWeight: 'normal'}]}>{show.title}</Text>
              <Text style={{ color: 'white' }}>{new Date(show.airDate)
                .toLocaleDateString('en-GB', { 
                  weekday: 'short', 
                  year:    'numeric', 
                  month:   'short', 
                  day:     'numeric' 
                })
              }</Text>
            </View>
          </View>
        )}
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    shows: state.tv.sort((a, b) => {
      return new Date(a.airdate) - new Date(b.airdate)
    })
  }
}

export default connect(mapStateToProps)(TV)

const style = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor:    'grey',
    paddingTop:     5,
    flex:            1, 
    marginLeft:      15,
    marginRight:     20
  },
  eventRow: {
    flexDirection: 'row', 
    marginBottom:  5, 
    alignItems:    'center'
  },
  textContainer: {
    flex:        1, 
    paddingLeft: 5
  },
  eventTitle: {
    color:       'white',
    fontSize:    20,
    fontWeight: 'bold'
  }
})
