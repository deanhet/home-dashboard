import React, { PureComponent } from 'react'
import { Animated, Easing, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FlipCard from '../app/FlipCard'
import MealDay from './MealDay'
import AddMeals from './AddMeals'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

export default class MealPlan extends PureComponent {
  
  iconRotation = new Animated.Value(0)

  state = {
    showDays: true
  }

  keyExtractor = (item, index) => index

  flipCard = () => {
    Animated.timing(this.iconRotation, {
      toValue:         Number(this.state.showDays),
      duration:        400,
      easing:          Easing.elastic(2),
      useNativeDriver: true
    }).start()
    this.setState({ showDays: !this.state.showDays })
  }

  render() {
    const data = [
      { day: 'Sunday', meal: 'Steak' },
      { day: 'Monday', meal: 'Chicken' },
      { day: 'Tuesday', meal: 'Beef' },
      { day: 'Wednesday', meal: 'Curry' }
    ]
    const rotateIconValue = this.iconRotation.interpolate({
      inputRange:  [0, 1],
      outputRange: ['45deg', '0deg']      
    })
    return (
      <View style={style.container}>
        <TouchableOpacity onPress={this.flipCard}>
          <AnimatedIcon 
            name="clear" 
            style={[style.icon, {transform: [{ rotate: rotateIconValue }]}]}
          />
        </TouchableOpacity>
        <FlipCard 
          shouldFlip={this.state.showDays}
          style={{ width: '100%', height: '100%' }}
        >
          <FlatList
            data={data}
            style={{ marginTop: 15, marginBottom: 15 }}
            renderItem={({item}) => <MealDay data={item} />}
            keyExtractor={this.keyExtractor}
          />
          <AddMeals />
        </FlipCard>
      </View>
    )
  }

}

const style = StyleSheet.create({
  container: { 
    backgroundColor: 'rgba(50,50,50,0.6)',
    maxHeight:       400,
    padding:         15,
    margin:          15,
    overflow:        'hidden'
  },
  icon: {
    alignSelf: 'flex-end',
    height:    30,
    width:     30,
    color:     'white',
    fontSize:  30
  }
})
