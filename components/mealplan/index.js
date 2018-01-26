import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, FlatList, AsyncStorage } from 'react-native'
import { Gateway } from 'react-gateway'
import MealDay from './MealDay'
import AddMeals from './AddMeals'

export default class MealPlan extends PureComponent {
  
  state = {
    activeDay: null,
    data:      null
  }

  async componentDidMount() {
    // TODO: make action
    const mealDays = await AsyncStorage.getItem('@hd:mealDays')
    if (!mealDays) {
      const templateDays = [
        { day: 'Sunday', meal: null },
        { day: 'Monday', meal: null },
        { day: 'Tuesday', meal: null },
        { day: 'Wednesday', meal: null },
        { day: 'Thursday', meal: null },
        { day: 'Friday', meal: null },
        { day: 'Saturday', meal: null }
      ]
      await AsyncStorage.setItem('@hd:mealDays', JSON.stringify(templateDays))
    }
    this.setState({ data: JSON.parse(mealDays) })
  }

  keyExtractor = (item, index) => index

  render() {
    const { activeDay, data } = this.state
    return (
      <View style={style.container}>
        <FlatList
          data={data}
          renderItem={({item}) => <MealDay data={item} />}
          keyExtractor={this.keyExtractor}
        />
        <Gateway into="modal">
          <AddMeals activeDay={activeDay} />
        </Gateway>
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
