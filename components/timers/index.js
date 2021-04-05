import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { fetchTimers } from '../../state/actions/timers'
import Icon from 'react-native-vector-icons/MaterialIcons'

function convertTime(sec) {
  var hours = Math.floor(sec/3600);
  (hours >= 1) ? sec = sec - (hours*3600) : hours = '00';
  var min = Math.floor(sec/60);
  (min >= 1) ? sec = sec - (min*60) : min = '00';
  (sec < 1) ? sec='00' : void 0;

  (min.toString().length == 1) ? min = '0'+min : void 0;    
  (sec.toString().length == 1) ? sec = '0'+sec : void 0;    

  return hours+':'+min+':'+sec;
}

const Timer = ({fireTime, duration}) => {
  const [countdown, setCountdown] = useState(Math.floor(fireTime - Date.now()))
  useEffect(() => {
    const tick = setInterval(() => {
      if(countdown <= 0){
        clearInterval(tick)
      } else {
        setCountdown(Math.floor((fireTime - Date.now()) / 1000))
      }
    }, 1000);
    return () => clearInterval(tick)
  }, [])

  if(countdown <= 0){
    return null
  }
  return (
    <View style={{ minWidth: 160, paddingVertical: 7, paddingHorizontal: 10 }}>
      <Text style={{ color: 'grey', fontSize: 20 }}>
        {`${duration / 1000 / 60} minutes`}
      </Text>
      <Text style={{ color: 'white', fontSize: 40 }}>
        {convertTime(countdown)}
      </Text>
    </View>
  )
}


const Timers = ({dispatch, timers}) => {
  useEffect(() => {
    const timerCheck = setInterval(() => {
      dispatch(fetchTimers())
    }, 60000);
    // 1 minute
    return () => clearInterval(timerCheck)
  }, [])

  if(!timers.length){
    return <View style={{ flex: 1 }} />
  }

  return (
    <View style={{ flex: 1, alignItems: 'flex-start', padding: 15 }}>
      <View style={{ flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => dispatch(fetchTimers())}>
        <Icon name="timer" style={style.icon} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
        {timers.map((t) => (
          <Timer 
            key={t.fire_time}
            duration={t.original_duration}
            fireTime={t.fire_time} 
          />
        ))}
      </View>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    timers: state.timers
  }
}

const style = StyleSheet.create({
  icon: { 
    fontSize: 45, 
    paddingTop: 7, 
    color:    'grey', 
  }
})

export default connect(mapStateToProps)(Timers)