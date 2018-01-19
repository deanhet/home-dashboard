import React, { PureComponent } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native'
import FlipCard from '../app/FlipCard'
import MealDay from './MealDay'
import AddMeals from './AddMeals'

export default class MealPlan extends PureComponent {
  
  state = {
    showDays: true
  }

  keyExtractor = (item, index) => index

  flipCard = () => {
    this.setState({ showDays: !this.state.showDays })
  }

  render() {
    const data = [
      { day: 'Sunday', meal: 'Steak' },
      { day: 'Monday', meal: 'Chicken' },
      { day: 'Tuesday', meal: 'Beef' },
      { day: 'Wednesday', meal: 'Curry' }
    ]
    return (
      <View style={{ 
        backgroundColor: 'rgba(50,50,50,0.6)',
        maxHeight:       400,
        padding:         15,
        margin:          15,
        overflow:        'hidden'
      }}>
        <TouchableOpacity onPress={this.flipCard}>
          <Text style={{ color: 'white', fontSize: 20 }}>Flip</Text>
        </TouchableOpacity>
        <FlipCard 
          shouldFlip={this.state.showDays}
          style={{ width: '100%', height: '100%' }}
        >
          <FlatList
            data={data}
            renderItem={({item}) => <MealDay data={item} />}
            keyExtractor={this.keyExtractor}
          />
          <AddMeals />
        </FlipCard>
      </View>
    )
  }

}
